import { Router, Request, Response } from 'express';
import { settings } from '../data/mockData';

export const settingsRouter = Router();

settingsRouter.get('/', (_req: Request, res: Response) => {
  res.json(settings);
});

settingsRouter.put('/', (req: Request, res: Response) => {
  Object.assign(settings, req.body);
  res.json({ message: 'Settings updated successfully', settings });
});
