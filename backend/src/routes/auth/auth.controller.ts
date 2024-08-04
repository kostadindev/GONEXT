import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import dotenv from "dotenv";
import authService from '../../services/auth.service';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const client = new OAuth2Client(CLIENT_ID);

class AuthController {
  public async googleLogin(req: Request, res: Response): Promise<void> {
    const { token } = req.body;

    try {
      // Verify the Google token
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
      });

      const payload = ticket.getPayload();
      const googleId = payload?.sub;

      if (!googleId) {
        throw new Error('Invalid Google ID');
      }

      // Find or create the user
      const user = await authService.findOrCreateUser(
        googleId,
        payload.email!,
        payload.email_verified!,
        payload.name!,
        payload.picture!,
        payload.given_name!,
        payload.family_name!
      );

      // Create a JWT for your application
      const appToken = jwt.sign(
        { sub: googleId, name: user.name, picture: user.picture },
        JWT_SECRET,
        { expiresIn: '1d' }
      );

      // Store the application token in an HTTP-only cookie
      res.cookie('token', appToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      res.status(200).send('Login successful');
    } catch (error) {
      console.error('error', error);
      res.status(401).send('Invalid token');
    }
  }

  public getUser(req: Request, res: Response): void {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).send('No token provided');
      return;
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      res.status(200).json({ token: decoded });
    } catch (error) {
      res.status(401).send('Invalid token');
    }
  }

  public logout(req: Request, res: Response): void {
    res.clearCookie('token');
    res.status(200).send('Logged out');
  }
}

export default new AuthController();
