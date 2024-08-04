import { Request, Response, NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize OAuth2 client with Google client ID
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || '');

// Extend the Express Request interface to include user information
interface CustomRequest extends Request {
  user?: any;
}

// Middleware to authenticate the token
export const authenticateToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    req.user = ticket.getPayload(); // Attach user info to request object
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};
