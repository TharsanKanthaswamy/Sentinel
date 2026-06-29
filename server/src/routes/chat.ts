import { Router, Request, Response } from 'express';
import { cases } from '../data/mockData';

export const chatRouter = Router();

chatRouter.post('/', (req: Request, res: Response) => {
  const { message, caseId } = req.body;
  const msg = message?.toLowerCase() || '';
  const linkedCase = caseId ? cases.find(c => c.id === caseId) : null;

  let reply = '';

  if (msg.includes('flagged') || msg.includes('why')) {
    if (linkedCase) {
      const indicators = linkedCase.aiAnalysis.indicators.map(i => i.label).join(', ');
      reply = `**Case ${linkedCase.caseNumber}** was flagged due to the following indicators:\n\n${linkedCase.aiAnalysis.indicators.map(i => `• **${i.label}** (${i.severity} severity, ${i.confidence}% confidence): ${i.description}`).join('\n')}\n\n**AI Decision:** ${linkedCase.aiAnalysis.decision}\n**Risk Score:** ${linkedCase.riskScore}/100`;
    } else {
      reply = 'This account was flagged because the AI model detected anomalous transaction patterns including high-velocity transfers, network anomalies with previously flagged accounts, and device fingerprint matches across multiple suspicious entities.';
    }
  } else if (msg.includes('transaction') || msg.includes('summary')) {
    if (linkedCase) {
      const totalAmount = linkedCase.transactions.filter(t => t.amount).reduce((sum, t) => sum + (t.amount || 0), 0);
      reply = `**Transaction Summary for ${linkedCase.caseNumber}:**\n\n• **Total Transactions:** ${linkedCase.transactions.length}\n• **Total Amount:** ₹${totalAmount.toLocaleString('en-IN')}\n• **Flagged Transactions:** ${linkedCase.transactions.filter(t => t.flagged).length}\n• **Time Window:** ${linkedCase.transactions.length > 0 ? 'Last 24 hours' : 'No transactions recorded'}\n• **Transaction Types:** Credits, Transfers, Withdrawals${linkedCase.transactions.some(t => t.type === 'device_change') ? ', Device Changes' : ''}`;
    } else {
      reply = 'Please select a specific case to view the transaction summary. You can ask "Show transaction summary for case SEN-2026-0001" for detailed information.';
    }
  } else if (msg.includes('network') || msg.includes('anomaly')) {
    if (linkedCase) {
      reply = `**Network Analysis for ${linkedCase.caseNumber}:**\n\n• **Connected Accounts:** ${linkedCase.networkNodes.length}\n• **Suspicious Connections:** ${linkedCase.networkEdges.filter(e => e.suspicious).length}\n• **Total Money Flow:** ₹${linkedCase.networkNodes.reduce((s, n) => s + n.totalFlow, 0).toLocaleString('en-IN')}\n\nThe network topology shows ${linkedCase.networkEdges.filter(e => e.suspicious).length > 2 ? 'classic layering patterns consistent with organized financial crime' : 'some suspicious connections requiring further investigation'}.`;
    } else {
      reply = 'Network anomalies are detected when accounts show unusual connection patterns, such as rapid fund movement through multiple intermediary accounts, connections to previously flagged entities, or circular transfer patterns.';
    }
  } else if (msg.includes('summarize') || msg.includes('investigation')) {
    if (linkedCase) {
      reply = `**Investigation Summary — ${linkedCase.caseNumber}:**\n\n• **Subject:** ${linkedCase.customerName} (${linkedCase.accountId})\n• **Category:** ${linkedCase.category}\n• **Risk Level:** ${linkedCase.riskLevel.toUpperCase()} (Score: ${linkedCase.riskScore}/100)\n• **Status:** ${linkedCase.status.replace(/_/g, ' ').toUpperCase()}\n• **Assigned To:** ${linkedCase.assignedInvestigator}\n• **Created:** ${new Date(linkedCase.createdAt).toLocaleString()}\n\n**AI Assessment:** ${linkedCase.aiAnalysis.explanation.substring(0, 200)}...`;
    } else {
      reply = 'Please specify a case ID to get a detailed investigation summary.';
    }
  } else {
    reply = `I'm the Sentinel AI Investigation Assistant. I can help you with:\n\n• **"Why was this account flagged?"** — Understand AI flagging reasons\n• **"Show transaction summary"** — Get transaction overview\n• **"Explain network anomaly"** — Network analysis details\n• **"Summarize investigation"** — Full investigation summary\n\n${linkedCase ? `Currently viewing **${linkedCase.caseNumber}** (${linkedCase.customerName}).` : 'Select a case for context-aware responses.'}`;
  }

  res.json({
    reply,
    timestamp: new Date().toISOString(),
    model: 'sentinel-chat-v2.1',
    tokens: Math.floor(Math.random() * 200) + 100
  });
});
