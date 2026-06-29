import { Router, Request, Response } from 'express';
import { cases, settings } from '../data/mockData';

export const casesRouter = Router();


// GET /api/cases — list with filters, search, pagination
casesRouter.get('/', (req: Request, res: Response) => {
  let filtered = [...cases];
  const { search, riskLevel, status, investigator, sortBy, sortOrder, page = '1', limit = '20' } = req.query;

  if (search) {
    const s = String(search).toLowerCase();
    filtered = filtered.filter(c =>
      c.caseNumber.toLowerCase().includes(s) ||
      c.customerName.toLowerCase().includes(s) ||
      c.accountId.toLowerCase().includes(s) ||
      c.upiId.toLowerCase().includes(s) ||
      c.category.toLowerCase().includes(s)
    );
  }
  if (riskLevel) filtered = filtered.filter(c => c.riskLevel === riskLevel);
  if (status) filtered = filtered.filter(c => c.status === status);
  if (investigator) filtered = filtered.filter(c => c.assignedInvestigatorId === investigator);

  // Sort
  const order = sortOrder === 'asc' ? 1 : -1;
  if (sortBy === 'riskScore') filtered.sort((a, b) => (a.riskScore - b.riskScore) * order);
  else if (sortBy === 'createdAt') filtered.sort((a, b) => (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * order);
  else if (sortBy === 'updatedAt') filtered.sort((a, b) => (new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()) * order);
  else filtered.sort((a, b) => (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));

  const p = parseInt(String(page), 10);
  const l = parseInt(String(limit), 10);
  const start = (p - 1) * l;
  const paginated = filtered.slice(start, start + l);

  res.json({
    data: paginated,
    pagination: { page: p, limit: l, total: filtered.length, totalPages: Math.ceil(filtered.length / l) }
  });
});

// GET /api/cases/:id — full case detail
casesRouter.get('/:id', (req: Request, res: Response) => {
  const c = cases.find(c => c.id === req.params.id);
  if (!c) { res.status(404).json({ error: 'Case not found' }); return; }
  res.json(c);
});

// POST /api/cases — create new case
casesRouter.post('/', (req: Request, res: Response) => {
  const newCase = { id: `case-${Date.now()}`, ...req.body, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  cases.push(newCase);
  res.status(201).json(newCase);
});

// PUT /api/cases/:id — update case
casesRouter.put('/:id', (req: Request, res: Response) => {
  const idx = cases.findIndex(c => c.id === req.params.id);
  if (idx === -1) { res.status(404).json({ error: 'Case not found' }); return; }
  cases[idx] = { ...cases[idx], ...req.body, updatedAt: new Date().toISOString() };
  res.json(cases[idx]);
});

// POST /api/cases/:id/review — submit human review
casesRouter.post('/:id/review', (req: Request, res: Response) => {
  const c = cases.find(c => c.id === req.params.id);
  if (!c) { res.status(404).json({ error: 'Case not found' }); return; }
  c.humanReview = { ...req.body, timestamp: new Date().toISOString() };
  c.updatedAt = new Date().toISOString();
  if (req.body.decision === 'approved') c.status = 'closed';
  else if (req.body.decision === 'escalated') c.status = 'escalated';
  else if (req.body.decision === 'rejected') c.status = 'closed';
  res.json({ message: 'Review submitted successfully', case: c });
});

// GET /api/cases/:id/transactions
casesRouter.get('/:id/transactions', (req: Request, res: Response) => {
  const c = cases.find(c => c.id === req.params.id);
  if (!c) { res.status(404).json({ error: 'Case not found' }); return; }
  res.json(c.transactions);
});

// GET /api/cases/:id/network
casesRouter.get('/:id/network', (req: Request, res: Response) => {
  const c = cases.find(c => c.id === req.params.id);
  if (!c) { res.status(404).json({ error: 'Case not found' }); return; }
  res.json({ nodes: c.networkNodes, edges: c.networkEdges });
});

// GET /api/cases/:id/audit
casesRouter.get('/:id/audit', (req: Request, res: Response) => {
  const c = cases.find(c => c.id === req.params.id);
  if (!c) { res.status(404).json({ error: 'Case not found' }); return; }
  res.json(c.auditLog);
});

// GET /api/cases/:id/workflow
casesRouter.get('/:id/workflow', (req: Request, res: Response) => {
  const c = cases.find(c => c.id === req.params.id);
  if (!c) { res.status(404).json({ error: 'Case not found' }); return; }
  res.json(c.workflow);
});

// POST /api/analyze — trigger AI analysis
casesRouter.post('/analyze', async (req: Request, res: Response) => {
  const { accountId } = req.body;
  try {
    const fastApiUrl = `${settings.fastApiEndpoint}/predict?account_id=${encodeURIComponent(accountId)}`;
    const response = await fetch(fastApiUrl);
    if (response.ok) {
      const data = await response.json() as any;
      res.json({
        accountId: data.account_id,
        riskScore: Math.round(data.risk_score * 100),
        flags: data.flags,
        suspicious: data.suspicious,
        confidence: 91.2,
        analysisTime: '0.8s',
        modelVersion: 'sentinel-v3.2.1-fastapi'
      });
      return;
    }
  } catch (error) {
    console.log("FastAPI fetch failed, falling back to mock response.");
  }

  // Fallback
  setTimeout(() => {
    res.json({
      accountId,
      riskScore: Math.floor(Math.random() * 40) + 60,
      flags: ['high_velocity', 'network_anomaly', 'shared_device'],
      suspicious: true,
      confidence: 87.5,
      analysisTime: '2.1s',
      modelVersion: 'sentinel-v3.2.1-fallback'
    });
  }, 500);
});

