import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'sentinel-ai-secret-key-2026';
const JWT_EXPIRY = '24h';

export interface AuthPayload {
  userId: string;
  email: string;
  role: string;
  name: string;
}

export function generateToken(payload: AuthPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
}

export function verifyToken(token: string): AuthPayload {
  return jwt.verify(token, JWT_SECRET) as AuthPayload;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized — No token provided' });
    return;
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    (req as any).user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Unauthorized — Invalid or expired token' });
  }
}
