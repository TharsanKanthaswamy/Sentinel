import { Router, Request, Response } from 'express';
import { monitorData, settings } from '../data/mockData';

export const monitorRouter = Router();

monitorRouter.get('/', (_req: Request, res: Response) => {
  res.json({
    ...monitorData,
    currentEndpoint: `${settings.fastApiEndpoint}/predict`,
    lastSuccessfulCall: new Date().toISOString()
  });
});
