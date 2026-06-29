import { Router, Request, Response } from 'express';
import { notifications } from '../data/mockData';

export const notificationsRouter = Router();

notificationsRouter.get('/', (_req: Request, res: Response) => {
  res.json({ data: notifications, unreadCount: notifications.filter(n => !n.read).length });
});

notificationsRouter.put('/:id/read', (req: Request, res: Response) => {
  const n = notifications.find(n => n.id === req.params.id);
  if (!n) { res.status(404).json({ error: 'Notification not found' }); return; }
  n.read = true;
  res.json(n);
});

notificationsRouter.put('/read-all', (_req: Request, res: Response) => {
  notifications.forEach(n => n.read = true);
  res.json({ message: 'All notifications marked as read' });
});
