import { Router, Request, Response } from 'express';
import { cases } from '../data/mockData';

export const analyticsRouter = Router();

analyticsRouter.get('/dashboard', (_req: Request, res: Response) => {
  const totalCases = cases.length;
  const pendingReview = cases.filter(c => c.status === 'pending_review' || c.status === 'under_review').length;
  const aiScreened = cases.filter(c => c.aiAnalysis).length;
  const resolved = cases.filter(c => c.status === 'closed').length;

  res.json({ totalCases, pendingReview, aiScreened, resolved });
});
