import { Router, Request, Response } from 'express';

export const webhooksRouter = Router();

const webhookLog: any[] = [];

function logWebhook(event: string, data: any) {
  webhookLog.push({ event, data, timestamp: new Date().toISOString() });
  console.log(`[Webhook] ${event}:`, JSON.stringify(data).substring(0, 100));
}

webhooksRouter.post('/case-created', (req: Request, res: Response) => {
  logWebhook('case-created', req.body);
  res.json({ status: 'received', event: 'case-created', message: 'UiPath Maestro webhook placeholder — Case Created event received' });
});

webhooksRouter.post('/screening-completed', (req: Request, res: Response) => {
  logWebhook('screening-completed', req.body);
  res.json({ status: 'received', event: 'screening-completed', message: 'UiPath Maestro webhook placeholder — AI Screening Completed event received' });
});

webhooksRouter.post('/review-started', (req: Request, res: Response) => {
  logWebhook('review-started', req.body);
  res.json({ status: 'received', event: 'review-started', message: 'UiPath Maestro webhook placeholder — Human Review Started event received' });
});

webhooksRouter.post('/case-escalated', (req: Request, res: Response) => {
  logWebhook('case-escalated', req.body);
  res.json({ status: 'received', event: 'case-escalated', message: 'UiPath Maestro webhook placeholder — Case Escalated event received' });
});

webhooksRouter.post('/case-closed', (req: Request, res: Response) => {
  logWebhook('case-closed', req.body);
  res.json({ status: 'received', event: 'case-closed', message: 'UiPath Maestro webhook placeholder — Case Closed event received' });
});

webhooksRouter.post('/workflow-updated', (req: Request, res: Response) => {
  logWebhook('workflow-updated', req.body);
  res.json({ status: 'received', event: 'workflow-updated', message: 'UiPath Maestro webhook placeholder — Workflow Status Updated event received' });
});

webhooksRouter.get('/log', (_req: Request, res: Response) => {
  res.json(webhookLog);
});
