import { Router, Request, Response } from 'express';
import { users } from '../data/mockData';
import { generateToken, authMiddleware, verifyToken } from '../middleware/auth';

export const authRouter = Router();

authRouter.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    res.status(401).json({ error: 'Invalid email or password' });
    return;
  }
  const token = generateToken({ userId: user.id, email: user.email, role: user.role, name: user.name });
  const { password: _, ...userWithoutPassword } = user;
  res.json({ token, user: userWithoutPassword });
});

authRouter.get('/me', authMiddleware, (req: Request, res: Response) => {
  const authUser = (req as any).user;
  const user = users.find(u => u.id === authUser.userId);
  if (!user) { res.status(404).json({ error: 'User not found' }); return; }
  const { password: _, ...userWithoutPassword } = user;
  res.json({ user: userWithoutPassword });
});

authRouter.post('/logout', (_req: Request, res: Response) => {
  res.json({ message: 'Logged out successfully' });
});

authRouter.post('/forgot-password', (req: Request, res: Response) => {
  const { email } = req.body;
  const user = users.find(u => u.email === email);
  if (user) {
    res.json({ message: 'Password reset link sent to your email' });
  } else {
    res.json({ message: 'If the email exists, a reset link has been sent' });
  }
});
