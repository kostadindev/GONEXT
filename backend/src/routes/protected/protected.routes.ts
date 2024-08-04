import { Router, Request, Response } from "express";
import { authenticateToken } from "../../middlewares/auth.middleware";
const protectedRouter = Router();

// Protected route
protectedRouter.get('/protected', authenticateToken, (req: any, res: Response) => {
  const user = req.user;

  // Return some protected data
  res.json({
    message: 'This is a protected endpoint',
    user: {
      id: user?.sub,
      email: user?.email,
      name: user?.name
    }
  });
});

export default protectedRouter;
