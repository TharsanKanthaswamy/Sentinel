import { Router, Request, Response } from 'express';
import { users, systemAuditLog } from '../data/mockData';

export const adminRouter = Router();

adminRouter.get('/users', (_req: Request, res: Response) => {
  res.json(users.map(({ password, ...u }) => u));
});

adminRouter.get('/audit-log', (_req: Request, res: Response) => {
  res.json(systemAuditLog);
});

adminRouter.get('/roles', (_req: Request, res: Response) => {
  res.json([
    { id: 'fraud_analyst', label: 'Fraud Analyst', permissions: ['view_cases', 'review_cases', 'add_notes'], count: users.filter(u => u.role === 'fraud_analyst').length },
    { id: 'senior_investigator', label: 'Senior Investigator', permissions: ['view_cases', 'review_cases', 'escalate_cases', 'close_cases', 'add_notes'], count: users.filter(u => u.role === 'senior_investigator').length },
    { id: 'compliance_manager', label: 'Compliance Manager', permissions: ['view_cases', 'approve_cases', 'generate_reports', 'manage_thresholds'], count: users.filter(u => u.role === 'compliance_manager').length },
    { id: 'administrator', label: 'Administrator', permissions: ['all'], count: users.filter(u => u.role === 'administrator').length }
  ]);
});

adminRouter.get('/api-keys', (_req: Request, res: Response) => {
  res.json([
    { id: 'key-1', name: 'FastAPI Integration', key: 'sk-sentinel-fast-****-****-7a3b', created: '2026-01-15', lastUsed: '2026-06-28', status: 'active' },
    { id: 'key-2', name: 'UiPath Maestro', key: 'sk-sentinel-uipa-****-****-9c4d', created: '2026-02-20', lastUsed: '2026-06-27', status: 'active' },
    { id: 'key-3', name: 'Webhook Service', key: 'sk-sentinel-hook-****-****-2e5f', created: '2026-03-10', lastUsed: '2026-06-28', status: 'active' },
    { id: 'key-4', name: 'Legacy API (Deprecated)', key: 'sk-sentinel-legc-****-****-1a2b', created: '2025-06-01', lastUsed: '2025-12-15', status: 'revoked' }
  ]);
});
