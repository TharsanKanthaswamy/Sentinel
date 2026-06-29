import { Router, Request, Response } from 'express';
import { cases } from '../data/mockData';

export const reportsRouter = Router();

reportsRouter.post('/', (req: Request, res: Response) => {
  const { caseId, format = 'json' } = req.body;
  const c = cases.find(c => c.id === caseId);
  if (!c) { res.status(404).json({ error: 'Case not found' }); return; }

  const report = {
    id: `RPT-${Date.now()}`,
    caseId: c.id,
    caseNumber: c.caseNumber,
    generatedAt: new Date().toISOString(),
    format,
    sections: {
      executiveSummary: `This report summarizes the investigation of Case ${c.caseNumber} involving account ${c.accountId} (${c.customerName}). The case was categorized as "${c.category}" with a risk score of ${c.riskScore}/100 (${c.riskLevel.toUpperCase()}). ${c.aiAnalysis.explanation}`,
      timeline: c.transactions.map(t => ({
        time: t.timestamp,
        event: t.description,
        flagged: t.flagged
      })),
      aiFindings: {
        riskScore: c.aiAnalysis.riskScore,
        riskLevel: c.aiAnalysis.riskLevel,
        confidence: c.aiAnalysis.confidence,
        indicators: c.aiAnalysis.indicators,
        explanation: c.aiAnalysis.explanation
      },
      evidence: {
        transactionCount: c.transactions.length,
        flaggedTransactions: c.transactions.filter(t => t.flagged).length,
        linkedAccounts: c.networkNodes.length,
        suspiciousConnections: c.networkEdges.filter(e => e.suspicious).length
      },
      humanNotes: c.humanReview?.notes || 'Pending human review',
      decision: c.humanReview?.decision || 'Awaiting decision',
      riskLevel: c.riskLevel,
      complianceNotes: c.status === 'closed' ? 'Case reviewed and closed per compliance guidelines.' : 'Pending compliance review.'
    }
  };

  res.json(report);
});

reportsRouter.get('/:id', (req: Request, res: Response) => {
  res.json({ message: 'Report retrieval endpoint', reportId: req.params.id });
});
