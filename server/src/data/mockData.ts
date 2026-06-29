import { v4 as uuid } from 'uuid';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'fraud_analyst' | 'senior_investigator' | 'compliance_manager' | 'administrator';
  avatar: string;
  department: string;
  activeCases: number;
  resolvedCases: number;
  joinedDate: string;
}

export interface Transaction {
  id: string;
  caseId: string;
  type: 'credit' | 'debit' | 'transfer' | 'withdrawal' | 'login' | 'location_change' | 'device_change';
  amount?: number;
  currency?: string;
  from?: string;
  to?: string;
  description: string;
  timestamp: string;
  location?: string;
  device?: string;
  flagged: boolean;
}

export interface FraudIndicator {
  id: string;
  type: string;
  label: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  confidence: number;
  description: string;
  details: string;
}

export interface AiAnalysis {
  riskScore: number;
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
  confidence: number;
  decision: string;
  explanation: string;
  featuresUsed: string[];
  indicators: FraudIndicator[];
  modelVersion: string;
  analysisTime: string;
}

export interface WorkflowStage {
  id: string;
  name: string;
  status: 'completed' | 'active' | 'pending' | 'failed';
  startedAt?: string;
  completedAt?: string;
  assignee?: string;
  notes?: string;
}

export interface NetworkNode {
  id: string;
  label: string;
  type: 'primary' | 'linked' | 'suspicious' | 'flagged';
  riskScore: number;
  accountId: string;
  connections: number;
  totalFlow: number;
  bank?: string;
}

export interface NetworkEdge {
  id: string;
  source: string;
  target: string;
  amount: number;
  label: string;
  suspicious: boolean;
}

export interface Case {
  id: string;
  caseNumber: string;
  accountId: string;
  customerName: string;
  upiId: string;
  phoneNumber: string;
  email: string;
  transactionCount: number;
  riskScore: number;
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'under_review' | 'escalated' | 'closed' | 'pending_review';
  assignedInvestigator: string;
  assignedInvestigatorId: string;
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  category: string;
  aiAnalysis: AiAnalysis;
  transactions: Transaction[];
  workflow: WorkflowStage[];
  networkNodes: NetworkNode[];
  networkEdges: NetworkEdge[];
  auditLog: AuditEntry[];
  humanReview?: HumanReview;
}

export interface HumanReview {
  decision: 'approved' | 'rejected' | 'escalated' | 'info_requested';
  reviewer: string;
  reviewerId: string;
  timestamp: string;
  notes: string;
  confidence: number;
}

export interface AuditEntry {
  id: string;
  caseId: string;
  action: string;
  actor: string;
  actorRole: string;
  timestamp: string;
  details: string;
  category: 'system' | 'ai' | 'human' | 'workflow';
}

export interface Notification {
  id: string;
  type: 'high_risk' | 'review_required' | 'case_closed' | 'api_offline' | 'workflow_completed' | 'escalation' | 'assignment';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'critical' | 'high' | 'medium' | 'low';
  caseId?: string;
  actionUrl?: string;
}

export interface AnalyticsData {
  fraudTrends: { date: string; cases: number; resolved: number; falsePositive: number }[];
  riskDistribution: { level: string; count: number; percentage: number }[];
  investigatorPerformance: { name: string; resolved: number; avgTime: number; accuracy: number }[];
  casesByStatus: { status: string; count: number }[];
  monthlyStats: { month: string; total: number; critical: number; high: number; medium: number; low: number }[];
  avgResolutionTime: number;
  falsePositiveRate: number;
  aiAccuracy: number;
}

export interface Settings {
  riskThreshold: number;
  fastApiEndpoint: string;
  webhookUrl: string;
  ngrokUrl: string;
  humanReviewThreshold: number;
  aiConfidenceThreshold: number;
}

export interface MonitorData {
  apiStatus: 'online' | 'offline' | 'degraded';
  health: number;
  latency: number;
  totalRequests: number;
  failures: number;
  currentEndpoint: string;
  lastSuccessfulCall: string;
  uptimePercent: number;
  latencyHistory: { time: string; latency: number }[];
  requestHistory: { time: string; requests: number; failures: number }[];
}

// ─── Mock Users ──────────────────────────────────────────────────────────────

export const users: User[] = [
  {
    id: 'usr-001', email: 'priya.sharma@sentinel.ai', password: 'sentinel123',
    name: 'Priya Sharma', role: 'fraud_analyst', avatar: 'PS',
    department: 'Fraud Detection', activeCases: 8, resolvedCases: 142, joinedDate: '2024-03-15'
  },
  {
    id: 'usr-002', email: 'rajesh.kumar@sentinel.ai', password: 'sentinel123',
    name: 'Rajesh Kumar', role: 'senior_investigator', avatar: 'RK',
    department: 'Financial Crimes', activeCases: 5, resolvedCases: 287, joinedDate: '2023-08-20'
  },
  {
    id: 'usr-003', email: 'anita.desai@sentinel.ai', password: 'sentinel123',
    name: 'Anita Desai', role: 'compliance_manager', avatar: 'AD',
    department: 'Compliance', activeCases: 3, resolvedCases: 195, joinedDate: '2023-11-10'
  },
  {
    id: 'usr-004', email: 'vikram.mehta@sentinel.ai', password: 'sentinel123',
    name: 'Vikram Mehta', role: 'administrator', avatar: 'VM',
    department: 'IT Security', activeCases: 0, resolvedCases: 0, joinedDate: '2023-01-05'
  },
  {
    id: 'usr-005', email: 'deepa.nair@sentinel.ai', password: 'sentinel123',
    name: 'Deepa Nair', role: 'fraud_analyst', avatar: 'DN',
    department: 'Fraud Detection', activeCases: 6, resolvedCases: 98, joinedDate: '2024-06-01'
  },
  {
    id: 'usr-006', email: 'arjun.patel@sentinel.ai', password: 'sentinel123',
    name: 'Arjun Patel', role: 'senior_investigator', avatar: 'AP',
    department: 'Financial Crimes', activeCases: 7, resolvedCases: 321, joinedDate: '2022-12-18'
  },
  {
    id: 'usr-007', email: 'meera.iyer@sentinel.ai', password: 'sentinel123',
    name: 'Meera Iyer', role: 'fraud_analyst', avatar: 'MI',
    department: 'Fraud Detection', activeCases: 4, resolvedCases: 76, joinedDate: '2024-09-10'
  },
  {
    id: 'usr-008', email: 'admin@sentinel.ai', password: 'admin123',
    name: 'System Admin', role: 'administrator', avatar: 'SA',
    department: 'IT Security', activeCases: 0, resolvedCases: 0, joinedDate: '2022-01-01'
  }
];

// ─── Helper Functions ────────────────────────────────────────────────────────

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

function hoursAgo(n: number): string {
  const d = new Date();
  d.setHours(d.getHours() - n);
  return d.toISOString();
}

function minutesAgo(n: number): string {
  const d = new Date();
  d.setMinutes(d.getMinutes() - n);
  return d.toISOString();
}

// ─── Mock Cases ──────────────────────────────────────────────────────────────

function createCase(overrides: Partial<Case> & Pick<Case, 'id' | 'caseNumber' | 'accountId' | 'customerName' | 'upiId' | 'phoneNumber' | 'email' | 'riskScore' | 'riskLevel' | 'status' | 'assignedInvestigator' | 'assignedInvestigatorId' | 'category'>): Case {
  const riskLevel = overrides.riskLevel;
  const riskScore = overrides.riskScore;
  const confidence = overrides.aiAnalysis?.confidence ?? (70 + Math.random() * 25);

  const defaultIndicators: FraudIndicator[] = [];
  if (riskScore >= 85) {
    defaultIndicators.push(
      { id: uuid(), type: 'high_velocity', label: 'High Velocity Transactions', severity: 'critical', confidence: 94, description: 'Multiple high-value transactions within a short time window', details: '12 transactions totaling ₹4,80,000 within 47 minutes — exceeds velocity threshold by 340%' },
      { id: uuid(), type: 'circular_transfer', label: 'Circular Transfers', severity: 'critical', confidence: 91, description: 'Funds cycling back through linked accounts', details: 'Funds traced through 4 intermediary accounts before returning to originator within 2 hours' },
      { id: uuid(), type: 'network_anomaly', label: 'Network Anomaly', severity: 'high', confidence: 88, description: 'Unusual connections to previously flagged accounts', details: 'Connected to 3 accounts previously involved in fraud case FRD-2024-0847' }
    );
  } else if (riskScore >= 65) {
    defaultIndicators.push(
      { id: uuid(), type: 'shared_device', label: 'Shared Device', severity: 'high', confidence: 82, description: 'Multiple accounts accessed from the same device', details: 'Device fingerprint matches 4 other accounts flagged in the last 90 days' },
      { id: uuid(), type: 'location_mismatch', label: 'Location Mismatch', severity: 'medium', confidence: 76, description: 'Transaction locations inconsistent with account profile', details: 'Account registered in Mumbai but transactions originating from Lucknow and Patna within 30 minutes' }
    );
  } else {
    defaultIndicators.push(
      { id: uuid(), type: 'unusual_hours', label: 'Unusual Transaction Hours', severity: 'medium', confidence: 68, description: 'Transactions outside normal operating hours', details: 'Cluster of 5 transactions between 02:00-04:00 IST, deviation from usual pattern' }
    );
  }

  const defaultAiAnalysis: AiAnalysis = {
    riskScore,
    riskLevel,
    confidence: Math.round(confidence * 100) / 100,
    decision: riskScore >= 80 ? 'Flag for immediate review' : riskScore >= 60 ? 'Recommend investigation' : 'Monitor with periodic review',
    explanation: riskScore >= 80
      ? `The account exhibits mule account characteristics because funds rapidly move across multiple linked entities within minutes with little account retention. The transaction velocity is ${Math.round(riskScore / 10)}x above normal thresholds, and the network topology shows classic layering patterns consistent with money laundering operations.`
      : riskScore >= 60
      ? `The account shows moderate risk indicators including unusual transaction timing and device sharing patterns. While not definitively fraudulent, the behavioral deviation from baseline warrants closer examination by a human investigator.`
      : `The account displays minor anomalies in transaction timing but overall behavior remains within acceptable parameters. Continued automated monitoring is recommended with periodic human review.`,
    featuresUsed: ['Transaction Velocity', 'Network Topology', 'Device Fingerprinting', 'Geolocation Analysis', 'Temporal Patterns', 'Amount Distribution', 'Beneficiary Analysis'],
    indicators: overrides.aiAnalysis?.indicators ?? defaultIndicators,
    modelVersion: 'sentinel-v3.2.1',
    analysisTime: '2.3s'
  };

  const createdDaysAgo = Math.floor(Math.random() * 14) + 1;

  return {
    transactionCount: Math.floor(Math.random() * 30) + 5,
    createdAt: daysAgo(createdDaysAgo),
    updatedAt: hoursAgo(Math.floor(Math.random() * 48)),
    priority: riskScore >= 85 ? 'urgent' : riskScore >= 70 ? 'high' : riskScore >= 50 ? 'medium' : 'low',
    aiAnalysis: defaultAiAnalysis,
    transactions: [],
    workflow: [],
    networkNodes: [],
    networkEdges: [],
    auditLog: [],
    ...overrides
  };
}

export const cases: Case[] = [
  createCase({
    id: 'case-001', caseNumber: 'SEN-2026-0001', accountId: 'ACC-78234',
    customerName: 'Rahul Verma', upiId: 'rahul.v@okaxis', phoneNumber: '+91-98765-43210',
    email: 'rahul.verma@gmail.com', riskScore: 92, riskLevel: 'critical',
    status: 'under_review', assignedInvestigator: 'Priya Sharma', assignedInvestigatorId: 'usr-001',
    category: 'Mule Account', transactionCount: 34,
    createdAt: hoursAgo(6), updatedAt: minutesAgo(23),
    transactions: [
      { id: 't1', caseId: 'case-001', type: 'credit', amount: 80000, currency: 'INR', from: 'ACC-91823', to: 'ACC-78234', description: 'Received ₹80,000 from ACC-91823', timestamp: hoursAgo(5), location: 'Mumbai', flagged: true },
      { id: 't2', caseId: 'case-001', type: 'transfer', amount: 79900, currency: 'INR', from: 'ACC-78234', to: 'ACC-45612', description: 'Transferred ₹79,900 to ACC-45612', timestamp: hoursAgo(4.8), location: 'Mumbai', flagged: true },
      { id: 't3', caseId: 'case-001', type: 'transfer', amount: 79700, currency: 'INR', from: 'ACC-45612', to: 'ACC-33219', description: 'Transferred ₹79,700 to ACC-33219', timestamp: hoursAgo(4.5), location: 'Delhi', flagged: true },
      { id: 't4', caseId: 'case-001', type: 'device_change', description: 'New Device Login — Samsung Galaxy S24 Ultra', timestamp: hoursAgo(4.2), device: 'Samsung Galaxy S24 Ultra', flagged: true },
      { id: 't5', caseId: 'case-001', type: 'location_change', description: 'Location Changed — Mumbai to Lucknow (890 km)', timestamp: hoursAgo(4.0), location: 'Lucknow', flagged: true },
      { id: 't6', caseId: 'case-001', type: 'credit', amount: 150000, currency: 'INR', from: 'ACC-87654', to: 'ACC-78234', description: 'Received ₹1,50,000 from ACC-87654', timestamp: hoursAgo(3.5), location: 'Lucknow', flagged: true },
      { id: 't7', caseId: 'case-001', type: 'transfer', amount: 149800, currency: 'INR', from: 'ACC-78234', to: 'ACC-22198', description: 'Transferred ₹1,49,800 to ACC-22198', timestamp: hoursAgo(3.2), location: 'Lucknow', flagged: true },
      { id: 't8', caseId: 'case-001', type: 'withdrawal', amount: 49000, currency: 'INR', description: 'ATM Withdrawal ₹49,000 — Lucknow ATM', timestamp: hoursAgo(2.8), location: 'Lucknow', flagged: false },
      { id: 't9', caseId: 'case-001', type: 'credit', amount: 220000, currency: 'INR', from: 'ACC-55443', to: 'ACC-78234', description: 'Received ₹2,20,000 from ACC-55443', timestamp: hoursAgo(2), location: 'Lucknow', flagged: true },
      { id: 't10', caseId: 'case-001', type: 'transfer', amount: 219500, currency: 'INR', from: 'ACC-78234', to: 'ACC-91823', description: 'Transferred ₹2,19,500 to ACC-91823 (Circular)', timestamp: hoursAgo(1.5), location: 'Patna', flagged: true },
    ],
    workflow: [
      { id: 'wf1', name: 'AI Screening', status: 'completed', startedAt: hoursAgo(6), completedAt: hoursAgo(5.9), notes: 'Risk score: 92/100' },
      { id: 'wf2', name: 'Network Investigation', status: 'completed', startedAt: hoursAgo(5.8), completedAt: hoursAgo(5.5), assignee: 'AI Engine', notes: '8 linked accounts identified' },
      { id: 'wf3', name: 'Human Review', status: 'active', startedAt: hoursAgo(5), assignee: 'Priya Sharma', notes: 'Under investigation' },
      { id: 'wf4', name: 'Compliance Approval', status: 'pending' },
      { id: 'wf5', name: 'Final Report', status: 'pending' }
    ],
    networkNodes: [
      { id: 'n1', label: 'ACC-78234', type: 'primary', riskScore: 92, accountId: 'ACC-78234', connections: 6, totalFlow: 798200, bank: 'Axis Bank' },
      { id: 'n2', label: 'ACC-91823', type: 'flagged', riskScore: 78, accountId: 'ACC-91823', connections: 3, totalFlow: 320000, bank: 'SBI' },
      { id: 'n3', label: 'ACC-45612', type: 'suspicious', riskScore: 65, accountId: 'ACC-45612', connections: 4, totalFlow: 210000, bank: 'HDFC' },
      { id: 'n4', label: 'ACC-33219', type: 'suspicious', riskScore: 71, accountId: 'ACC-33219', connections: 2, totalFlow: 180000, bank: 'ICICI' },
      { id: 'n5', label: 'ACC-87654', type: 'linked', riskScore: 45, accountId: 'ACC-87654', connections: 2, totalFlow: 150000, bank: 'PNB' },
      { id: 'n6', label: 'ACC-22198', type: 'flagged', riskScore: 82, accountId: 'ACC-22198', connections: 5, totalFlow: 445000, bank: 'Kotak' },
      { id: 'n7', label: 'ACC-55443', type: 'suspicious', riskScore: 58, accountId: 'ACC-55443', connections: 3, totalFlow: 290000, bank: 'Yes Bank' },
      { id: 'n8', label: 'ACC-11234', type: 'linked', riskScore: 32, accountId: 'ACC-11234', connections: 1, totalFlow: 50000, bank: 'BOB' }
    ],
    networkEdges: [
      { id: 'e1', source: 'n2', target: 'n1', amount: 80000, label: '₹80,000', suspicious: true },
      { id: 'e2', source: 'n1', target: 'n3', amount: 79900, label: '₹79,900', suspicious: true },
      { id: 'e3', source: 'n3', target: 'n4', amount: 79700, label: '₹79,700', suspicious: true },
      { id: 'e4', source: 'n5', target: 'n1', amount: 150000, label: '₹1,50,000', suspicious: true },
      { id: 'e5', source: 'n1', target: 'n6', amount: 149800, label: '₹1,49,800', suspicious: true },
      { id: 'e6', source: 'n7', target: 'n1', amount: 220000, label: '₹2,20,000', suspicious: false },
      { id: 'e7', source: 'n1', target: 'n2', amount: 219500, label: '₹2,19,500', suspicious: true },
      { id: 'e8', source: 'n6', target: 'n8', amount: 50000, label: '₹50,000', suspicious: false }
    ],
    auditLog: [
      { id: 'a1', caseId: 'case-001', action: 'Case Created', actor: 'System', actorRole: 'system', timestamp: hoursAgo(6), details: 'Case SEN-2026-0001 auto-generated from account monitoring', category: 'system' },
      { id: 'a2', caseId: 'case-001', action: 'AI Screening Started', actor: 'Sentinel AI v3.2.1', actorRole: 'ai', timestamp: hoursAgo(6), details: 'Automated screening initiated for ACC-78234', category: 'ai' },
      { id: 'a3', caseId: 'case-001', action: 'AI Screening Completed', actor: 'Sentinel AI v3.2.1', actorRole: 'ai', timestamp: hoursAgo(5.9), details: 'Risk Score: 92/100 — Critical Risk — Mule account pattern detected', category: 'ai' },
      { id: 'a4', caseId: 'case-001', action: 'Network Investigation Completed', actor: 'Sentinel AI v3.2.1', actorRole: 'ai', timestamp: hoursAgo(5.5), details: '8 linked accounts identified, 3 previously flagged', category: 'ai' },
      { id: 'a5', caseId: 'case-001', action: 'Case Assigned', actor: 'System', actorRole: 'system', timestamp: hoursAgo(5), details: 'Assigned to Priya Sharma (Fraud Analyst) based on workload balancing', category: 'system' },
      { id: 'a6', caseId: 'case-001', action: 'Human Review Started', actor: 'Priya Sharma', actorRole: 'human', timestamp: hoursAgo(4.5), details: 'Investigator began manual review of transaction patterns', category: 'human' },
      { id: 'a7', caseId: 'case-001', action: 'UiPath Webhook Triggered', actor: 'System', actorRole: 'system', timestamp: hoursAgo(4.4), details: 'Maestro notified: case-escalation webhook fired', category: 'workflow' }
    ]
  }),

  createCase({
    id: 'case-002', caseNumber: 'SEN-2026-0002', accountId: 'ACC-34567',
    customerName: 'Suresh Babu', upiId: 'suresh.b@oksbi', phoneNumber: '+91-87654-32109',
    email: 'suresh.babu@outlook.com', riskScore: 87, riskLevel: 'critical',
    status: 'open', assignedInvestigator: 'Rajesh Kumar', assignedInvestigatorId: 'usr-002',
    category: 'Layering Scheme', transactionCount: 28,
    createdAt: hoursAgo(12), updatedAt: hoursAgo(2),
    transactions: [
      { id: 't20', caseId: 'case-002', type: 'credit', amount: 500000, currency: 'INR', from: 'ACC-99887', to: 'ACC-34567', description: 'Received ₹5,00,000 from ACC-99887', timestamp: hoursAgo(11), location: 'Chennai', flagged: true },
      { id: 't21', caseId: 'case-002', type: 'transfer', amount: 125000, currency: 'INR', from: 'ACC-34567', to: 'ACC-77654', description: 'Split transfer ₹1,25,000 to ACC-77654', timestamp: hoursAgo(10.5), location: 'Chennai', flagged: true },
      { id: 't22', caseId: 'case-002', type: 'transfer', amount: 125000, currency: 'INR', from: 'ACC-34567', to: 'ACC-88321', description: 'Split transfer ₹1,25,000 to ACC-88321', timestamp: hoursAgo(10.3), location: 'Chennai', flagged: true },
      { id: 't23', caseId: 'case-002', type: 'transfer', amount: 124500, currency: 'INR', from: 'ACC-34567', to: 'ACC-66542', description: 'Split transfer ₹1,24,500 to ACC-66542', timestamp: hoursAgo(10.1), location: 'Chennai', flagged: true },
      { id: 't24', caseId: 'case-002', type: 'transfer', amount: 124000, currency: 'INR', from: 'ACC-34567', to: 'ACC-44321', description: 'Split transfer ₹1,24,000 to ACC-44321', timestamp: hoursAgo(9.8), location: 'Bangalore', flagged: true },
    ],
    workflow: [
      { id: 'wf1', name: 'AI Screening', status: 'completed', startedAt: hoursAgo(12), completedAt: hoursAgo(11.9) },
      { id: 'wf2', name: 'Network Investigation', status: 'active', startedAt: hoursAgo(11.8) },
      { id: 'wf3', name: 'Human Review', status: 'pending' },
      { id: 'wf4', name: 'Compliance Approval', status: 'pending' },
      { id: 'wf5', name: 'Final Report', status: 'pending' }
    ],
    networkNodes: [
      { id: 'n1', label: 'ACC-34567', type: 'primary', riskScore: 87, accountId: 'ACC-34567', connections: 5, totalFlow: 998500, bank: 'SBI' },
      { id: 'n2', label: 'ACC-99887', type: 'suspicious', riskScore: 72, accountId: 'ACC-99887', connections: 2, totalFlow: 500000, bank: 'HDFC' },
      { id: 'n3', label: 'ACC-77654', type: 'linked', riskScore: 55, accountId: 'ACC-77654', connections: 2, totalFlow: 125000, bank: 'ICICI' },
      { id: 'n4', label: 'ACC-88321', type: 'linked', riskScore: 48, accountId: 'ACC-88321', connections: 1, totalFlow: 125000, bank: 'Axis' },
      { id: 'n5', label: 'ACC-66542', type: 'suspicious', riskScore: 62, accountId: 'ACC-66542', connections: 3, totalFlow: 224500, bank: 'PNB' },
      { id: 'n6', label: 'ACC-44321', type: 'linked', riskScore: 41, accountId: 'ACC-44321', connections: 1, totalFlow: 124000, bank: 'BOB' }
    ],
    networkEdges: [
      { id: 'e1', source: 'n2', target: 'n1', amount: 500000, label: '₹5,00,000', suspicious: true },
      { id: 'e2', source: 'n1', target: 'n3', amount: 125000, label: '₹1,25,000', suspicious: true },
      { id: 'e3', source: 'n1', target: 'n4', amount: 125000, label: '₹1,25,000', suspicious: true },
      { id: 'e4', source: 'n1', target: 'n5', amount: 124500, label: '₹1,24,500', suspicious: true },
      { id: 'e5', source: 'n1', target: 'n6', amount: 124000, label: '₹1,24,000', suspicious: false }
    ],
    auditLog: [
      { id: 'a1', caseId: 'case-002', action: 'Case Created', actor: 'System', actorRole: 'system', timestamp: hoursAgo(12), details: 'Suspicious layering pattern detected', category: 'system' },
      { id: 'a2', caseId: 'case-002', action: 'AI Screening Completed', actor: 'Sentinel AI v3.2.1', actorRole: 'ai', timestamp: hoursAgo(11.9), details: 'Risk Score: 87 — Critical — Layering scheme identified', category: 'ai' }
    ]
  }),

  createCase({
    id: 'case-003', caseNumber: 'SEN-2026-0003', accountId: 'ACC-56789',
    customerName: 'Fatima Khan', upiId: 'fatima.k@okhdfc', phoneNumber: '+91-76543-21098',
    email: 'fatima.khan@yahoo.com', riskScore: 74, riskLevel: 'high',
    status: 'under_review', assignedInvestigator: 'Deepa Nair', assignedInvestigatorId: 'usr-005',
    category: 'Identity Fraud', transactionCount: 18,
    createdAt: daysAgo(2), updatedAt: hoursAgo(8),
    transactions: [
      { id: 't30', caseId: 'case-003', type: 'login', description: 'Login from new IP — 103.21.58.xx (Proxy detected)', timestamp: daysAgo(2), device: 'Unknown Browser', flagged: true },
      { id: 't31', caseId: 'case-003', type: 'credit', amount: 45000, currency: 'INR', from: 'ACC-12398', to: 'ACC-56789', description: 'Received ₹45,000 from ACC-12398', timestamp: hoursAgo(44), location: 'Hyderabad', flagged: false },
      { id: 't32', caseId: 'case-003', type: 'transfer', amount: 44500, currency: 'INR', from: 'ACC-56789', to: 'ACC-88765', description: 'Transferred ₹44,500 to ACC-88765', timestamp: hoursAgo(43), location: 'Hyderabad', flagged: true },
      { id: 't33', caseId: 'case-003', type: 'device_change', description: 'New Device — iPhone 15 Pro Max', timestamp: hoursAgo(40), device: 'iPhone 15 Pro Max', flagged: true },
    ],
    workflow: [
      { id: 'wf1', name: 'AI Screening', status: 'completed', startedAt: daysAgo(2), completedAt: daysAgo(2) },
      { id: 'wf2', name: 'Network Investigation', status: 'completed', startedAt: daysAgo(2), completedAt: daysAgo(1) },
      { id: 'wf3', name: 'Human Review', status: 'active', startedAt: hoursAgo(8), assignee: 'Deepa Nair' },
      { id: 'wf4', name: 'Compliance Approval', status: 'pending' },
      { id: 'wf5', name: 'Final Report', status: 'pending' }
    ],
    networkNodes: [
      { id: 'n1', label: 'ACC-56789', type: 'primary', riskScore: 74, accountId: 'ACC-56789', connections: 3, totalFlow: 189500, bank: 'HDFC' },
      { id: 'n2', label: 'ACC-12398', type: 'linked', riskScore: 35, accountId: 'ACC-12398', connections: 1, totalFlow: 45000, bank: 'SBI' },
      { id: 'n3', label: 'ACC-88765', type: 'suspicious', riskScore: 68, accountId: 'ACC-88765', connections: 4, totalFlow: 344500, bank: 'Axis' }
    ],
    networkEdges: [
      { id: 'e1', source: 'n2', target: 'n1', amount: 45000, label: '₹45,000', suspicious: false },
      { id: 'e2', source: 'n1', target: 'n3', amount: 44500, label: '₹44,500', suspicious: true }
    ],
    auditLog: [
      { id: 'a1', caseId: 'case-003', action: 'Case Created', actor: 'System', actorRole: 'system', timestamp: daysAgo(2), details: 'Identity verification flags triggered', category: 'system' },
      { id: 'a2', caseId: 'case-003', action: 'AI Screening Completed', actor: 'Sentinel AI v3.2.1', actorRole: 'ai', timestamp: daysAgo(2), details: 'Risk Score: 74 — High Risk', category: 'ai' },
      { id: 'a3', caseId: 'case-003', action: 'Human Review Started', actor: 'Deepa Nair', actorRole: 'human', timestamp: hoursAgo(8), details: 'Reviewing identity fraud indicators', category: 'human' }
    ]
  }),

  createCase({
    id: 'case-004', caseNumber: 'SEN-2026-0004', accountId: 'ACC-23456',
    customerName: 'Arun Krishnan', upiId: 'arun.k@okicici', phoneNumber: '+91-65432-10987',
    email: 'arun.krishnan@gmail.com', riskScore: 45, riskLevel: 'medium',
    status: 'closed', assignedInvestigator: 'Arjun Patel', assignedInvestigatorId: 'usr-006',
    category: 'Unusual Activity', transactionCount: 12,
    createdAt: daysAgo(5), updatedAt: daysAgo(1), closedAt: daysAgo(1),
    transactions: [
      { id: 't40', caseId: 'case-004', type: 'credit', amount: 25000, currency: 'INR', from: 'ACC-55567', to: 'ACC-23456', description: 'Received ₹25,000 from ACC-55567', timestamp: daysAgo(5), location: 'Pune', flagged: false },
      { id: 't41', caseId: 'case-004', type: 'transfer', amount: 24800, currency: 'INR', from: 'ACC-23456', to: 'ACC-66789', description: 'Transferred ₹24,800 to ACC-66789', timestamp: daysAgo(4.5), location: 'Pune', flagged: false },
    ],
    workflow: [
      { id: 'wf1', name: 'AI Screening', status: 'completed', startedAt: daysAgo(5), completedAt: daysAgo(5) },
      { id: 'wf2', name: 'Network Investigation', status: 'completed', startedAt: daysAgo(5), completedAt: daysAgo(4) },
      { id: 'wf3', name: 'Human Review', status: 'completed', startedAt: daysAgo(4), completedAt: daysAgo(2), assignee: 'Arjun Patel' },
      { id: 'wf4', name: 'Compliance Approval', status: 'completed', startedAt: daysAgo(2), completedAt: daysAgo(1), assignee: 'Anita Desai' },
      { id: 'wf5', name: 'Final Report', status: 'completed', startedAt: daysAgo(1), completedAt: daysAgo(1) }
    ],
    networkNodes: [
      { id: 'n1', label: 'ACC-23456', type: 'primary', riskScore: 45, accountId: 'ACC-23456', connections: 2, totalFlow: 49800, bank: 'ICICI' },
      { id: 'n2', label: 'ACC-55567', type: 'linked', riskScore: 22, accountId: 'ACC-55567', connections: 1, totalFlow: 25000, bank: 'SBI' },
      { id: 'n3', label: 'ACC-66789', type: 'linked', riskScore: 18, accountId: 'ACC-66789', connections: 1, totalFlow: 24800, bank: 'HDFC' }
    ],
    networkEdges: [
      { id: 'e1', source: 'n2', target: 'n1', amount: 25000, label: '₹25,000', suspicious: false },
      { id: 'e2', source: 'n1', target: 'n3', amount: 24800, label: '₹24,800', suspicious: false }
    ],
    auditLog: [
      { id: 'a1', caseId: 'case-004', action: 'Case Created', actor: 'System', actorRole: 'system', timestamp: daysAgo(5), details: 'Unusual activity detected', category: 'system' },
      { id: 'a2', caseId: 'case-004', action: 'Case Closed', actor: 'Arjun Patel', actorRole: 'human', timestamp: daysAgo(1), details: 'False positive — legitimate business transactions', category: 'human' }
    ],
    humanReview: { decision: 'rejected', reviewer: 'Arjun Patel', reviewerId: 'usr-006', timestamp: daysAgo(2), notes: 'After thorough investigation, transactions appear to be legitimate business payments. Account holder is a registered freelance developer receiving client payments.', confidence: 95 }
  }),

  createCase({
    id: 'case-005', caseNumber: 'SEN-2026-0005', accountId: 'ACC-89012',
    customerName: 'Lakshmi Narayanan', upiId: 'lakshmi.n@ybl', phoneNumber: '+91-54321-09876',
    email: 'lakshmi.n@hotmail.com', riskScore: 88, riskLevel: 'critical',
    status: 'escalated', assignedInvestigator: 'Rajesh Kumar', assignedInvestigatorId: 'usr-002',
    category: 'Rapid Cash Out', transactionCount: 41,
    createdAt: daysAgo(1), updatedAt: hoursAgo(3),
    transactions: [
      { id: 't50', caseId: 'case-005', type: 'credit', amount: 300000, currency: 'INR', from: 'ACC-11122', to: 'ACC-89012', description: 'Received ₹3,00,000 from ACC-11122', timestamp: daysAgo(1), location: 'Kolkata', flagged: true },
      { id: 't51', caseId: 'case-005', type: 'withdrawal', amount: 50000, currency: 'INR', description: 'ATM Withdrawal ₹50,000 — Kolkata ATM', timestamp: hoursAgo(20), location: 'Kolkata', flagged: true },
      { id: 't52', caseId: 'case-005', type: 'withdrawal', amount: 50000, currency: 'INR', description: 'ATM Withdrawal ₹50,000 — Kolkata ATM (Different branch)', timestamp: hoursAgo(19.5), location: 'Kolkata', flagged: true },
      { id: 't53', caseId: 'case-005', type: 'withdrawal', amount: 50000, currency: 'INR', description: 'ATM Withdrawal ₹50,000 — Howrah ATM', timestamp: hoursAgo(18), location: 'Howrah', flagged: true },
      { id: 't54', caseId: 'case-005', type: 'transfer', amount: 148000, currency: 'INR', from: 'ACC-89012', to: 'ACC-33445', description: 'Transferred ₹1,48,000 to ACC-33445', timestamp: hoursAgo(16), location: 'Kolkata', flagged: true },
    ],
    workflow: [
      { id: 'wf1', name: 'AI Screening', status: 'completed', startedAt: daysAgo(1), completedAt: daysAgo(1) },
      { id: 'wf2', name: 'Network Investigation', status: 'completed', startedAt: daysAgo(1), completedAt: hoursAgo(20) },
      { id: 'wf3', name: 'Human Review', status: 'completed', startedAt: hoursAgo(18), completedAt: hoursAgo(6), assignee: 'Rajesh Kumar' },
      { id: 'wf4', name: 'Compliance Approval', status: 'active', startedAt: hoursAgo(5), assignee: 'Anita Desai' },
      { id: 'wf5', name: 'Final Report', status: 'pending' }
    ],
    networkNodes: [
      { id: 'n1', label: 'ACC-89012', type: 'primary', riskScore: 88, accountId: 'ACC-89012', connections: 3, totalFlow: 648000, bank: 'PNB' },
      { id: 'n2', label: 'ACC-11122', type: 'flagged', riskScore: 79, accountId: 'ACC-11122', connections: 4, totalFlow: 500000, bank: 'SBI' },
      { id: 'n3', label: 'ACC-33445', type: 'suspicious', riskScore: 65, accountId: 'ACC-33445', connections: 2, totalFlow: 248000, bank: 'Kotak' }
    ],
    networkEdges: [
      { id: 'e1', source: 'n2', target: 'n1', amount: 300000, label: '₹3,00,000', suspicious: true },
      { id: 'e2', source: 'n1', target: 'n3', amount: 148000, label: '₹1,48,000', suspicious: true }
    ],
    auditLog: [
      { id: 'a1', caseId: 'case-005', action: 'Case Created', actor: 'System', actorRole: 'system', timestamp: daysAgo(1), details: 'Rapid cash-out pattern detected', category: 'system' },
      { id: 'a2', caseId: 'case-005', action: 'Case Escalated', actor: 'Rajesh Kumar', actorRole: 'human', timestamp: hoursAgo(6), details: 'Escalated to compliance — suspected money laundering', category: 'human' }
    ],
    humanReview: { decision: 'escalated', reviewer: 'Rajesh Kumar', reviewerId: 'usr-002', timestamp: hoursAgo(6), notes: 'Multiple rapid ATM withdrawals following large credit. Pattern consistent with money laundering. Escalating to compliance for SAR filing consideration.', confidence: 88 }
  }),

  createCase({
    id: 'case-006', caseNumber: 'SEN-2026-0006', accountId: 'ACC-12345',
    customerName: 'Pooja Gupta', upiId: 'pooja.g@paytm', phoneNumber: '+91-43210-98765',
    email: 'pooja.gupta@gmail.com', riskScore: 35, riskLevel: 'low',
    status: 'closed', assignedInvestigator: 'Meera Iyer', assignedInvestigatorId: 'usr-007',
    category: 'Routine Check', transactionCount: 8,
    createdAt: daysAgo(7), updatedAt: daysAgo(4), closedAt: daysAgo(4),
    transactions: [
      { id: 't60', caseId: 'case-006', type: 'credit', amount: 15000, currency: 'INR', from: 'ACC-77788', to: 'ACC-12345', description: 'Received ₹15,000 from ACC-77788', timestamp: daysAgo(7), location: 'Delhi', flagged: false },
      { id: 't61', caseId: 'case-006', type: 'transfer', amount: 10000, currency: 'INR', from: 'ACC-12345', to: 'ACC-99001', description: 'Transferred ₹10,000 to ACC-99001', timestamp: daysAgo(6), location: 'Delhi', flagged: false },
    ],
    workflow: [
      { id: 'wf1', name: 'AI Screening', status: 'completed', startedAt: daysAgo(7), completedAt: daysAgo(7) },
      { id: 'wf2', name: 'Network Investigation', status: 'completed', startedAt: daysAgo(7), completedAt: daysAgo(6) },
      { id: 'wf3', name: 'Human Review', status: 'completed', startedAt: daysAgo(6), completedAt: daysAgo(5), assignee: 'Meera Iyer' },
      { id: 'wf4', name: 'Compliance Approval', status: 'completed', startedAt: daysAgo(5), completedAt: daysAgo(4) },
      { id: 'wf5', name: 'Final Report', status: 'completed', startedAt: daysAgo(4), completedAt: daysAgo(4) }
    ],
    networkNodes: [
      { id: 'n1', label: 'ACC-12345', type: 'primary', riskScore: 35, accountId: 'ACC-12345', connections: 2, totalFlow: 25000, bank: 'Paytm Payments' },
      { id: 'n2', label: 'ACC-77788', type: 'linked', riskScore: 15, accountId: 'ACC-77788', connections: 1, totalFlow: 15000, bank: 'HDFC' },
      { id: 'n3', label: 'ACC-99001', type: 'linked', riskScore: 12, accountId: 'ACC-99001', connections: 1, totalFlow: 10000, bank: 'SBI' }
    ],
    networkEdges: [
      { id: 'e1', source: 'n2', target: 'n1', amount: 15000, label: '₹15,000', suspicious: false },
      { id: 'e2', source: 'n1', target: 'n3', amount: 10000, label: '₹10,000', suspicious: false }
    ],
    auditLog: [
      { id: 'a1', caseId: 'case-006', action: 'Case Created', actor: 'System', actorRole: 'system', timestamp: daysAgo(7), details: 'Routine monitoring trigger', category: 'system' },
      { id: 'a2', caseId: 'case-006', action: 'Case Closed', actor: 'Meera Iyer', actorRole: 'human', timestamp: daysAgo(4), details: 'No suspicious activity found — routine personal transfers', category: 'human' }
    ],
    humanReview: { decision: 'rejected', reviewer: 'Meera Iyer', reviewerId: 'usr-007', timestamp: daysAgo(5), notes: 'Normal peer-to-peer transfer activity. No fraud indicators confirmed.', confidence: 98 }
  }),

  createCase({
    id: 'case-007', caseNumber: 'SEN-2026-0007', accountId: 'ACC-67890',
    customerName: 'Mohammed Ismail', upiId: 'md.ismail@oksbi', phoneNumber: '+91-32109-87654',
    email: 'md.ismail@gmail.com', riskScore: 78, riskLevel: 'high',
    status: 'pending_review', assignedInvestigator: 'Priya Sharma', assignedInvestigatorId: 'usr-001',
    category: 'Smurfing', transactionCount: 22,
    createdAt: hoursAgo(18), updatedAt: hoursAgo(4),
    transactions: [
      { id: 't70', caseId: 'case-007', type: 'credit', amount: 49500, currency: 'INR', from: 'ACC-33221', to: 'ACC-67890', description: 'Received ₹49,500 from ACC-33221', timestamp: hoursAgo(17), location: 'Jaipur', flagged: true },
      { id: 't71', caseId: 'case-007', type: 'credit', amount: 49000, currency: 'INR', from: 'ACC-44332', to: 'ACC-67890', description: 'Received ₹49,000 from ACC-44332', timestamp: hoursAgo(16), location: 'Jaipur', flagged: true },
      { id: 't72', caseId: 'case-007', type: 'credit', amount: 48500, currency: 'INR', from: 'ACC-55443', to: 'ACC-67890', description: 'Received ₹48,500 from ACC-55443', timestamp: hoursAgo(15), location: 'Jaipur', flagged: true },
      { id: 't73', caseId: 'case-007', type: 'transfer', amount: 145000, currency: 'INR', from: 'ACC-67890', to: 'ACC-99112', description: 'Consolidated transfer ₹1,45,000 to ACC-99112', timestamp: hoursAgo(12), location: 'Jaipur', flagged: true },
    ],
    workflow: [
      { id: 'wf1', name: 'AI Screening', status: 'completed', startedAt: hoursAgo(18), completedAt: hoursAgo(17.9) },
      { id: 'wf2', name: 'Network Investigation', status: 'completed', startedAt: hoursAgo(17.8), completedAt: hoursAgo(16) },
      { id: 'wf3', name: 'Human Review', status: 'pending', assignee: 'Priya Sharma' },
      { id: 'wf4', name: 'Compliance Approval', status: 'pending' },
      { id: 'wf5', name: 'Final Report', status: 'pending' }
    ],
    networkNodes: [
      { id: 'n1', label: 'ACC-67890', type: 'primary', riskScore: 78, accountId: 'ACC-67890', connections: 4, totalFlow: 292000, bank: 'SBI' },
      { id: 'n2', label: 'ACC-33221', type: 'suspicious', riskScore: 55, accountId: 'ACC-33221', connections: 2, totalFlow: 49500, bank: 'HDFC' },
      { id: 'n3', label: 'ACC-44332', type: 'suspicious', riskScore: 52, accountId: 'ACC-44332', connections: 2, totalFlow: 49000, bank: 'ICICI' },
      { id: 'n4', label: 'ACC-55443', type: 'linked', riskScore: 48, accountId: 'ACC-55443', connections: 1, totalFlow: 48500, bank: 'Axis' },
      { id: 'n5', label: 'ACC-99112', type: 'flagged', riskScore: 72, accountId: 'ACC-99112', connections: 5, totalFlow: 445000, bank: 'Kotak' }
    ],
    networkEdges: [
      { id: 'e1', source: 'n2', target: 'n1', amount: 49500, label: '₹49,500', suspicious: true },
      { id: 'e2', source: 'n3', target: 'n1', amount: 49000, label: '₹49,000', suspicious: true },
      { id: 'e3', source: 'n4', target: 'n1', amount: 48500, label: '₹48,500', suspicious: true },
      { id: 'e4', source: 'n1', target: 'n5', amount: 145000, label: '₹1,45,000', suspicious: true }
    ],
    auditLog: [
      { id: 'a1', caseId: 'case-007', action: 'Case Created', actor: 'System', actorRole: 'system', timestamp: hoursAgo(18), details: 'Smurfing pattern detected — multiple sub-50K deposits', category: 'system' },
      { id: 'a2', caseId: 'case-007', action: 'AI Screening Completed', actor: 'Sentinel AI v3.2.1', actorRole: 'ai', timestamp: hoursAgo(17.9), details: 'Structuring pattern identified — 3 deposits just below ₹50,000 threshold', category: 'ai' }
    ]
  }),

  createCase({
    id: 'case-008', caseNumber: 'SEN-2026-0008', accountId: 'ACC-11223',
    customerName: 'Sneha Reddy', upiId: 'sneha.r@okkotak', phoneNumber: '+91-21098-76543',
    email: 'sneha.reddy@gmail.com', riskScore: 62, riskLevel: 'medium',
    status: 'under_review', assignedInvestigator: 'Deepa Nair', assignedInvestigatorId: 'usr-005',
    category: 'Beneficiary Anomaly', transactionCount: 15,
    createdAt: daysAgo(3), updatedAt: hoursAgo(12),
    transactions: [
      { id: 't80', caseId: 'case-008', type: 'credit', amount: 75000, currency: 'INR', from: 'ACC-54321', to: 'ACC-11223', description: 'Received ₹75,000 from ACC-54321', timestamp: daysAgo(3), location: 'Bangalore', flagged: false },
      { id: 't81', caseId: 'case-008', type: 'transfer', amount: 74000, currency: 'INR', from: 'ACC-11223', to: 'ACC-65432', description: 'Transferred ₹74,000 to new beneficiary ACC-65432', timestamp: daysAgo(2.5), location: 'Bangalore', flagged: true },
    ],
    workflow: [
      { id: 'wf1', name: 'AI Screening', status: 'completed', startedAt: daysAgo(3), completedAt: daysAgo(3) },
      { id: 'wf2', name: 'Network Investigation', status: 'completed', startedAt: daysAgo(3), completedAt: daysAgo(2) },
      { id: 'wf3', name: 'Human Review', status: 'active', startedAt: hoursAgo(12), assignee: 'Deepa Nair' },
      { id: 'wf4', name: 'Compliance Approval', status: 'pending' },
      { id: 'wf5', name: 'Final Report', status: 'pending' }
    ],
    networkNodes: [
      { id: 'n1', label: 'ACC-11223', type: 'primary', riskScore: 62, accountId: 'ACC-11223', connections: 2, totalFlow: 149000, bank: 'Kotak' },
      { id: 'n2', label: 'ACC-54321', type: 'linked', riskScore: 28, accountId: 'ACC-54321', connections: 1, totalFlow: 75000, bank: 'HDFC' },
      { id: 'n3', label: 'ACC-65432', type: 'suspicious', riskScore: 58, accountId: 'ACC-65432', connections: 3, totalFlow: 174000, bank: 'Axis' }
    ],
    networkEdges: [
      { id: 'e1', source: 'n2', target: 'n1', amount: 75000, label: '₹75,000', suspicious: false },
      { id: 'e2', source: 'n1', target: 'n3', amount: 74000, label: '₹74,000', suspicious: true }
    ],
    auditLog: [
      { id: 'a1', caseId: 'case-008', action: 'Case Created', actor: 'System', actorRole: 'system', timestamp: daysAgo(3), details: 'New beneficiary anomaly detected', category: 'system' }
    ]
  }),

  createCase({
    id: 'case-009', caseNumber: 'SEN-2026-0009', accountId: 'ACC-44556',
    customerName: 'Amit Joshi', upiId: 'amit.j@okaxis', phoneNumber: '+91-10987-65432',
    email: 'amit.joshi@protonmail.com', riskScore: 91, riskLevel: 'critical',
    status: 'open', assignedInvestigator: 'Arjun Patel', assignedInvestigatorId: 'usr-006',
    category: 'Shell Company Network', transactionCount: 38,
    createdAt: hoursAgo(4), updatedAt: hoursAgo(1),
    transactions: [
      { id: 't90', caseId: 'case-009', type: 'credit', amount: 1200000, currency: 'INR', from: 'ACC-77889', to: 'ACC-44556', description: 'Received ₹12,00,000 from ACC-77889 (Shell Corp Ltd)', timestamp: hoursAgo(3.5), location: 'Mumbai', flagged: true },
      { id: 't91', caseId: 'case-009', type: 'transfer', amount: 400000, currency: 'INR', from: 'ACC-44556', to: 'ACC-88990', description: 'Transferred ₹4,00,000 to ACC-88990 (Rapid Ventures)', timestamp: hoursAgo(3), location: 'Mumbai', flagged: true },
      { id: 't92', caseId: 'case-009', type: 'transfer', amount: 400000, currency: 'INR', from: 'ACC-44556', to: 'ACC-11001', description: 'Transferred ₹4,00,000 to ACC-11001 (Global Trade)', timestamp: hoursAgo(2.8), location: 'Mumbai', flagged: true },
      { id: 't93', caseId: 'case-009', type: 'transfer', amount: 395000, currency: 'INR', from: 'ACC-44556', to: 'ACC-22112', description: 'Transferred ₹3,95,000 to ACC-22112 (Quick Services)', timestamp: hoursAgo(2.5), location: 'Mumbai', flagged: true },
    ],
    workflow: [
      { id: 'wf1', name: 'AI Screening', status: 'completed', startedAt: hoursAgo(4), completedAt: hoursAgo(3.9) },
      { id: 'wf2', name: 'Network Investigation', status: 'active', startedAt: hoursAgo(3.8) },
      { id: 'wf3', name: 'Human Review', status: 'pending' },
      { id: 'wf4', name: 'Compliance Approval', status: 'pending' },
      { id: 'wf5', name: 'Final Report', status: 'pending' }
    ],
    networkNodes: [
      { id: 'n1', label: 'ACC-44556', type: 'primary', riskScore: 91, accountId: 'ACC-44556', connections: 4, totalFlow: 2395000, bank: 'Axis' },
      { id: 'n2', label: 'ACC-77889', type: 'flagged', riskScore: 85, accountId: 'ACC-77889', connections: 6, totalFlow: 3200000, bank: 'ICICI' },
      { id: 'n3', label: 'ACC-88990', type: 'suspicious', riskScore: 71, accountId: 'ACC-88990', connections: 3, totalFlow: 800000, bank: 'HDFC' },
      { id: 'n4', label: 'ACC-11001', type: 'suspicious', riskScore: 68, accountId: 'ACC-11001', connections: 2, totalFlow: 600000, bank: 'Yes Bank' },
      { id: 'n5', label: 'ACC-22112', type: 'suspicious', riskScore: 64, accountId: 'ACC-22112', connections: 2, totalFlow: 395000, bank: 'IndusInd' }
    ],
    networkEdges: [
      { id: 'e1', source: 'n2', target: 'n1', amount: 1200000, label: '₹12,00,000', suspicious: true },
      { id: 'e2', source: 'n1', target: 'n3', amount: 400000, label: '₹4,00,000', suspicious: true },
      { id: 'e3', source: 'n1', target: 'n4', amount: 400000, label: '₹4,00,000', suspicious: true },
      { id: 'e4', source: 'n1', target: 'n5', amount: 395000, label: '₹3,95,000', suspicious: true }
    ],
    auditLog: [
      { id: 'a1', caseId: 'case-009', action: 'Case Created', actor: 'System', actorRole: 'system', timestamp: hoursAgo(4), details: 'Shell company network flagged by pattern recognition', category: 'system' },
      { id: 'a2', caseId: 'case-009', action: 'AI Screening Completed', actor: 'Sentinel AI v3.2.1', actorRole: 'ai', timestamp: hoursAgo(3.9), details: 'Risk Score: 91 — Critical — Shell company layering detected', category: 'ai' }
    ]
  }),

  createCase({
    id: 'case-010', caseNumber: 'SEN-2026-0010', accountId: 'ACC-99887',
    customerName: 'Kavitha Menon', upiId: 'kavitha.m@okpnb', phoneNumber: '+91-09876-54321',
    email: 'kavitha.menon@gmail.com', riskScore: 55, riskLevel: 'medium',
    status: 'pending_review', assignedInvestigator: 'Meera Iyer', assignedInvestigatorId: 'usr-007',
    category: 'Cross-Border Transfer', transactionCount: 10,
    createdAt: daysAgo(4), updatedAt: daysAgo(1),
    transactions: [
      { id: 't100', caseId: 'case-010', type: 'credit', amount: 95000, currency: 'INR', from: 'ACC-INTL-001', to: 'ACC-99887', description: 'International wire ₹95,000 from Dubai', timestamp: daysAgo(4), location: 'Kochi', flagged: true },
      { id: 't101', caseId: 'case-010', type: 'transfer', amount: 90000, currency: 'INR', from: 'ACC-99887', to: 'ACC-LOCAL-001', description: 'Transferred ₹90,000 to local account', timestamp: daysAgo(3.5), location: 'Kochi', flagged: false },
    ],
    workflow: [
      { id: 'wf1', name: 'AI Screening', status: 'completed', startedAt: daysAgo(4), completedAt: daysAgo(4) },
      { id: 'wf2', name: 'Network Investigation', status: 'completed', startedAt: daysAgo(4), completedAt: daysAgo(3) },
      { id: 'wf3', name: 'Human Review', status: 'pending', assignee: 'Meera Iyer' },
      { id: 'wf4', name: 'Compliance Approval', status: 'pending' },
      { id: 'wf5', name: 'Final Report', status: 'pending' }
    ],
    networkNodes: [
      { id: 'n1', label: 'ACC-99887', type: 'primary', riskScore: 55, accountId: 'ACC-99887', connections: 2, totalFlow: 185000, bank: 'PNB' },
      { id: 'n2', label: 'ACC-INTL-001', type: 'linked', riskScore: 42, accountId: 'ACC-INTL-001', connections: 1, totalFlow: 95000, bank: 'Emirates NBD' },
      { id: 'n3', label: 'ACC-LOCAL-001', type: 'linked', riskScore: 25, accountId: 'ACC-LOCAL-001', connections: 1, totalFlow: 90000, bank: 'SBI' }
    ],
    networkEdges: [
      { id: 'e1', source: 'n2', target: 'n1', amount: 95000, label: '₹95,000', suspicious: false },
      { id: 'e2', source: 'n1', target: 'n3', amount: 90000, label: '₹90,000', suspicious: false }
    ],
    auditLog: [
      { id: 'a1', caseId: 'case-010', action: 'Case Created', actor: 'System', actorRole: 'system', timestamp: daysAgo(4), details: 'Cross-border transfer flagged for review', category: 'system' }
    ]
  }),

  // Additional cases for bulk
  ...[
    { id: 'case-011', num: 'SEN-2026-0011', acc: 'ACC-22334', name: 'Ravi Shankar', upi: 'ravi.s@ybl', phone: '+91-88776-65544', email: 'ravi.s@gmail.com', risk: 82, level: 'critical' as const, status: 'open' as const, inv: 'Rajesh Kumar', invId: 'usr-002', cat: 'Account Takeover' },
    { id: 'case-012', num: 'SEN-2026-0012', acc: 'ACC-33445', name: 'Nandini Rao', upi: 'nandini.r@okhdfc', phone: '+91-77665-54433', email: 'nandini.r@outlook.com', risk: 68, level: 'high' as const, status: 'under_review' as const, inv: 'Deepa Nair', invId: 'usr-005', cat: 'Phishing Related' },
    { id: 'case-013', num: 'SEN-2026-0013', acc: 'ACC-44556B', name: 'Prakash Singh', upi: 'prakash.s@oksbi', phone: '+91-66554-43322', email: 'prakash.s@yahoo.com', risk: 41, level: 'medium' as const, status: 'closed' as const, inv: 'Arjun Patel', invId: 'usr-006', cat: 'Low Risk Alert' },
    { id: 'case-014', num: 'SEN-2026-0014', acc: 'ACC-55667', name: 'Divya Pillai', upi: 'divya.p@okicici', phone: '+91-55443-32211', email: 'divya.p@gmail.com', risk: 76, level: 'high' as const, status: 'escalated' as const, inv: 'Priya Sharma', invId: 'usr-001', cat: 'Synthetic Identity' },
    { id: 'case-015', num: 'SEN-2026-0015', acc: 'ACC-66778', name: 'Karthik Subramanian', upi: 'karthik.s@okaxis', phone: '+91-44332-21100', email: 'karthik.s@gmail.com', risk: 29, level: 'low' as const, status: 'closed' as const, inv: 'Meera Iyer', invId: 'usr-007', cat: 'Routine Check' },
    { id: 'case-016', num: 'SEN-2026-0016', acc: 'ACC-77889B', name: 'Sanjay Tiwari', upi: 'sanjay.t@ybl', phone: '+91-33221-10099', email: 'sanjay.t@gmail.com', risk: 85, level: 'critical' as const, status: 'open' as const, inv: 'Arjun Patel', invId: 'usr-006', cat: 'Money Laundering' },
    { id: 'case-017', num: 'SEN-2026-0017', acc: 'ACC-88990B', name: 'Anjali Deshpande', upi: 'anjali.d@okkotak', phone: '+91-22110-09988', email: 'anjali.d@outlook.com', risk: 53, level: 'medium' as const, status: 'pending_review' as const, inv: 'Deepa Nair', invId: 'usr-005', cat: 'Unusual Pattern' },
    { id: 'case-018', num: 'SEN-2026-0018', acc: 'ACC-99001B', name: 'Vijay Malhotra', upi: 'vijay.m@oksbi', phone: '+91-11009-98877', email: 'vijay.m@hotmail.com', risk: 71, level: 'high' as const, status: 'under_review' as const, inv: 'Rajesh Kumar', invId: 'usr-002', cat: 'Insider Threat' },
  ].map(c => createCase({
    id: c.id, caseNumber: c.num, accountId: c.acc,
    customerName: c.name, upiId: c.upi, phoneNumber: c.phone, email: c.email,
    riskScore: c.risk, riskLevel: c.level,
    status: c.status, assignedInvestigator: c.inv, assignedInvestigatorId: c.invId,
    category: c.cat,
    createdAt: daysAgo(Math.floor(Math.random() * 10) + 1),
    updatedAt: hoursAgo(Math.floor(Math.random() * 48)),
    transactions: [
      { id: `t-${c.id}-1`, caseId: c.id, type: 'credit', amount: Math.floor(Math.random() * 200000) + 10000, currency: 'INR', description: `Incoming transfer ₹${(Math.floor(Math.random() * 200000) + 10000).toLocaleString('en-IN')}`, timestamp: daysAgo(Math.floor(Math.random() * 5) + 1), location: ['Mumbai', 'Delhi', 'Chennai', 'Bangalore', 'Kolkata'][Math.floor(Math.random() * 5)], flagged: c.risk > 60 },
      { id: `t-${c.id}-2`, caseId: c.id, type: 'transfer', amount: Math.floor(Math.random() * 150000) + 5000, currency: 'INR', description: `Outgoing transfer ₹${(Math.floor(Math.random() * 150000) + 5000).toLocaleString('en-IN')}`, timestamp: daysAgo(Math.floor(Math.random() * 3)), location: ['Pune', 'Hyderabad', 'Jaipur', 'Lucknow', 'Patna'][Math.floor(Math.random() * 5)], flagged: c.risk > 70 }
    ],
    workflow: [
      { id: 'wf1', name: 'AI Screening', status: 'completed', startedAt: daysAgo(10), completedAt: daysAgo(10) },
      { id: 'wf2', name: 'Network Investigation', status: c.status === 'open' ? 'active' : 'completed', startedAt: daysAgo(9) },
      { id: 'wf3', name: 'Human Review', status: c.status === 'under_review' ? 'active' : c.status === 'closed' ? 'completed' : 'pending' },
      { id: 'wf4', name: 'Compliance Approval', status: c.status === 'closed' ? 'completed' : 'pending' },
      { id: 'wf5', name: 'Final Report', status: c.status === 'closed' ? 'completed' : 'pending' }
    ],
    networkNodes: [
      { id: 'n1', label: c.acc, type: 'primary', riskScore: c.risk, accountId: c.acc, connections: 2, totalFlow: Math.floor(Math.random() * 500000) + 50000, bank: ['SBI', 'HDFC', 'ICICI', 'Axis', 'Kotak'][Math.floor(Math.random() * 5)] },
    ],
    networkEdges: [],
    auditLog: [
      { id: `al-${c.id}`, caseId: c.id, action: 'Case Created', actor: 'System', actorRole: 'system', timestamp: daysAgo(10), details: `Case ${c.num} created — ${c.cat}`, category: 'system' as const }
    ]
  }))
];

// ─── Mock Notifications ──────────────────────────────────────────────────────

export const notifications: Notification[] = [
  { id: 'notif-001', type: 'high_risk', title: 'New Critical Risk Case', message: 'Case SEN-2026-0009 flagged as critical risk (Score: 91) — Shell company network detected. Immediate review required.', timestamp: hoursAgo(4), read: false, priority: 'critical', caseId: 'case-009', actionUrl: '/cases/case-009' },
  { id: 'notif-002', type: 'review_required', title: 'Human Review Required', message: 'Case SEN-2026-0001 has completed AI screening and network analysis. Awaiting human investigator review.', timestamp: hoursAgo(5), read: false, priority: 'high', caseId: 'case-001', actionUrl: '/cases/case-001' },
  { id: 'notif-003', type: 'escalation', title: 'Case Escalated', message: 'Case SEN-2026-0005 escalated by Rajesh Kumar — Suspected money laundering via rapid cash-out pattern.', timestamp: hoursAgo(6), read: false, priority: 'critical', caseId: 'case-005', actionUrl: '/cases/case-005' },
  { id: 'notif-004', type: 'case_closed', title: 'Case Closed', message: 'Case SEN-2026-0004 closed by Arjun Patel — Determined to be false positive (legitimate business transactions).', timestamp: daysAgo(1), read: true, priority: 'low', caseId: 'case-004' },
  { id: 'notif-005', type: 'workflow_completed', title: 'Workflow Completed', message: 'Full investigation workflow completed for Case SEN-2026-0006. Report generated and archived.', timestamp: daysAgo(4), read: true, priority: 'medium', caseId: 'case-006' },
  { id: 'notif-006', type: 'assignment', title: 'New Case Assignment', message: 'You have been assigned to Case SEN-2026-0007 (Smurfing pattern). Please begin review within 4 hours.', timestamp: hoursAgo(18), read: true, priority: 'high', caseId: 'case-007', actionUrl: '/cases/case-007' },
  { id: 'notif-007', type: 'high_risk', title: 'New Critical Risk Case', message: 'Case SEN-2026-0002 flagged with risk score 87. Layering scheme pattern detected across 5 accounts.', timestamp: hoursAgo(12), read: false, priority: 'critical', caseId: 'case-002', actionUrl: '/cases/case-002' },
  { id: 'notif-008', type: 'api_offline', title: 'FastAPI Service Warning', message: 'FastAPI prediction endpoint latency increased to 2.4s (threshold: 1.5s). Monitoring for potential degradation.', timestamp: hoursAgo(2), read: false, priority: 'medium' },
  { id: 'notif-009', type: 'review_required', title: 'Compliance Review Pending', message: 'Case SEN-2026-0005 requires compliance manager approval for SAR filing. Current wait time: 3 hours.', timestamp: hoursAgo(3), read: false, priority: 'high', caseId: 'case-005', actionUrl: '/cases/case-005' },
  { id: 'notif-010', type: 'workflow_completed', title: 'AI Screening Batch Complete', message: 'Batch screening of 24 accounts completed. 3 flagged as critical, 5 as high risk, 8 as medium, 8 as low.', timestamp: hoursAgo(8), read: true, priority: 'medium' }
];

// ─── Mock Analytics ──────────────────────────────────────────────────────────

export const analyticsData: AnalyticsData = {
  fraudTrends: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 86400000).toISOString().split('T')[0],
    cases: Math.floor(Math.random() * 8) + 2,
    resolved: Math.floor(Math.random() * 6) + 1,
    falsePositive: Math.floor(Math.random() * 3)
  })),
  riskDistribution: [
    { level: 'Critical', count: 4, percentage: 22 },
    { level: 'High', count: 5, percentage: 28 },
    { level: 'Medium', count: 5, percentage: 28 },
    { level: 'Low', count: 4, percentage: 22 }
  ],
  investigatorPerformance: [
    { name: 'Priya Sharma', resolved: 142, avgTime: 4.2, accuracy: 94 },
    { name: 'Rajesh Kumar', resolved: 287, avgTime: 3.8, accuracy: 96 },
    { name: 'Deepa Nair', resolved: 98, avgTime: 5.1, accuracy: 91 },
    { name: 'Arjun Patel', resolved: 321, avgTime: 3.5, accuracy: 97 },
    { name: 'Meera Iyer', resolved: 76, avgTime: 4.8, accuracy: 93 }
  ],
  casesByStatus: [
    { status: 'Open', count: 4 },
    { status: 'Under Review', count: 4 },
    { status: 'Escalated', count: 2 },
    { status: 'Pending Review', count: 3 },
    { status: 'Closed', count: 5 }
  ],
  monthlyStats: [
    { month: 'Jan', total: 42, critical: 8, high: 12, medium: 14, low: 8 },
    { month: 'Feb', total: 38, critical: 6, high: 10, medium: 15, low: 7 },
    { month: 'Mar', total: 55, critical: 12, high: 16, medium: 18, low: 9 },
    { month: 'Apr', total: 47, critical: 9, high: 14, medium: 16, low: 8 },
    { month: 'May', total: 61, critical: 14, high: 18, medium: 20, low: 9 },
    { month: 'Jun', total: 52, critical: 11, high: 15, medium: 17, low: 9 }
  ],
  avgResolutionTime: 4.2,
  falsePositiveRate: 12.8,
  aiAccuracy: 94.7
};

// ─── Mock Settings ───────────────────────────────────────────────────────────

export let settings: Settings = {
  riskThreshold: 70,
  fastApiEndpoint: 'https://overvalue-neuron-unloving.ngrok-free.dev',
  webhookUrl: 'https://webhooks.sentinel.ai/uipath',
  ngrokUrl: 'https://abc123.ngrok-free.app',
  humanReviewThreshold: 65,
  aiConfidenceThreshold: 80
};

// ─── Mock Monitor Data ───────────────────────────────────────────────────────

export const monitorData: MonitorData = {
  apiStatus: 'online',
  health: 98.5,
  latency: 245,
  totalRequests: 14523,
  failures: 23,
  currentEndpoint: 'http://localhost:8000/predict',
  lastSuccessfulCall: minutesAgo(2),
  uptimePercent: 99.84,
  latencyHistory: Array.from({ length: 24 }, (_, i) => ({
    time: `${String(i).padStart(2, '0')}:00`,
    latency: Math.floor(Math.random() * 300) + 100
  })),
  requestHistory: Array.from({ length: 24 }, (_, i) => ({
    time: `${String(i).padStart(2, '0')}:00`,
    requests: Math.floor(Math.random() * 150) + 50,
    failures: Math.floor(Math.random() * 5)
  }))
};

// ─── Dashboard Stats ─────────────────────────────────────────────────────────

export function getDashboardStats() {
  const open = cases.filter(c => c.status === 'open').length;
  const underReview = cases.filter(c => c.status === 'under_review').length;
  const highRisk = cases.filter(c => c.riskLevel === 'critical' || c.riskLevel === 'high').length;
  const closedToday = cases.filter(c => c.closedAt && new Date(c.closedAt).toDateString() === new Date().toDateString()).length;
  const pendingReview = cases.filter(c => c.status === 'pending_review').length;

  return {
    openCases: open,
    casesUnderReview: underReview,
    highRiskCases: highRisk,
    closedToday: closedToday || 3,
    avgResolutionTime: '4.2 hrs',
    aiAccuracy: '94.7%',
    pendingHumanReviews: pendingReview,
    totalCases: cases.length
  };
}

// ─── Recent Activity ─────────────────────────────────────────────────────────

export const recentActivity = [
  { id: 'act-1', type: 'case_created', title: 'New Case Created', description: 'SEN-2026-0009 — Shell Company Network flagged (Risk: 91)', timestamp: hoursAgo(4), icon: 'plus', color: 'blue' },
  { id: 'act-2', type: 'ai_completed', title: 'AI Screening Completed', description: 'SEN-2026-0009 — Critical risk, 4 shell entities identified', timestamp: hoursAgo(3.9), icon: 'brain', color: 'purple' },
  { id: 'act-3', type: 'review_started', title: 'Human Review Started', description: 'Priya Sharma began review of SEN-2026-0001', timestamp: hoursAgo(4.5), icon: 'user', color: 'green' },
  { id: 'act-4', type: 'case_escalated', title: 'Case Escalated', description: 'SEN-2026-0005 escalated by Rajesh Kumar — Money Laundering', timestamp: hoursAgo(6), icon: 'alert', color: 'red' },
  { id: 'act-5', type: 'case_closed', title: 'Case Closed', description: 'SEN-2026-0004 closed — False positive confirmed by Arjun Patel', timestamp: daysAgo(1), icon: 'check', color: 'emerald' },
  { id: 'act-6', type: 'ai_completed', title: 'AI Screening Completed', description: 'SEN-2026-0007 — Smurfing pattern detected (Risk: 78)', timestamp: hoursAgo(17.9), icon: 'brain', color: 'purple' },
  { id: 'act-7', type: 'case_created', title: 'New Case Created', description: 'SEN-2026-0002 — Layering Scheme detected (Risk: 87)', timestamp: hoursAgo(12), icon: 'plus', color: 'blue' },
  { id: 'act-8', type: 'review_started', title: 'Human Review Started', description: 'Deepa Nair reviewing SEN-2026-0003 — Identity Fraud', timestamp: hoursAgo(8), icon: 'user', color: 'green' },
  { id: 'act-9', type: 'workflow_update', title: 'Workflow Updated', description: 'SEN-2026-0005 moved to Compliance Approval stage', timestamp: hoursAgo(5), icon: 'workflow', color: 'cyan' },
  { id: 'act-10', type: 'case_created', title: 'New Case Created', description: 'SEN-2026-0001 — Mule Account flagged (Risk: 92)', timestamp: hoursAgo(6), icon: 'plus', color: 'blue' },
];

// ─── Chart Data ──────────────────────────────────────────────────────────────

export const chartData = {
  fraudByDay: Array.from({ length: 14 }, (_, i) => ({
    date: new Date(Date.now() - (13 - i) * 86400000).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
    cases: Math.floor(Math.random() * 8) + 2,
    resolved: Math.floor(Math.random() * 5) + 1
  })),
  riskDistribution: [
    { name: 'Critical', value: 4, color: '#ef4444' },
    { name: 'High', value: 5, color: '#f97316' },
    { name: 'Medium', value: 5, color: '#eab308' },
    { name: 'Low', value: 4, color: '#22c55e' }
  ],
  caseStatusDistribution: [
    { name: 'Open', value: 4, color: '#3b82f6' },
    { name: 'Under Review', value: 4, color: '#8b5cf6' },
    { name: 'Escalated', value: 2, color: '#ef4444' },
    { name: 'Pending Review', value: 3, color: '#f59e0b' },
    { name: 'Closed', value: 5, color: '#22c55e' }
  ],
  investigatorWorkload: [
    { name: 'Priya Sharma', active: 8, resolved: 12, capacity: 15 },
    { name: 'Rajesh Kumar', active: 5, resolved: 18, capacity: 15 },
    { name: 'Deepa Nair', active: 6, resolved: 8, capacity: 12 },
    { name: 'Arjun Patel', active: 7, resolved: 22, capacity: 15 },
    { name: 'Meera Iyer', active: 4, resolved: 6, capacity: 12 }
  ]
};

// ─── System Audit Log ────────────────────────────────────────────────────────

export const systemAuditLog: AuditEntry[] = [
  { id: 'sal-1', caseId: '', action: 'System Startup', actor: 'System', actorRole: 'system', timestamp: hoursAgo(24), details: 'Sentinel AI Platform v3.2.1 initialized successfully', category: 'system' },
  { id: 'sal-2', caseId: '', action: 'User Login', actor: 'Priya Sharma', actorRole: 'human', timestamp: hoursAgo(8), details: 'Login from 10.0.1.45 — Chrome 126, Windows 11', category: 'system' },
  { id: 'sal-3', caseId: 'case-009', action: 'Case Created', actor: 'System', actorRole: 'system', timestamp: hoursAgo(4), details: 'Auto-generated from account monitoring — Shell Company Network', category: 'system' },
  { id: 'sal-4', caseId: 'case-009', action: 'AI Screening Initiated', actor: 'Sentinel AI v3.2.1', actorRole: 'ai', timestamp: hoursAgo(4), details: 'Batch processing 24 flagged accounts', category: 'ai' },
  { id: 'sal-5', caseId: 'case-001', action: 'Human Review Started', actor: 'Priya Sharma', actorRole: 'human', timestamp: hoursAgo(4.5), details: 'Investigator began manual review', category: 'human' },
  { id: 'sal-6', caseId: 'case-005', action: 'Case Escalated', actor: 'Rajesh Kumar', actorRole: 'human', timestamp: hoursAgo(6), details: 'Escalated to compliance — suspected money laundering', category: 'human' },
  { id: 'sal-7', caseId: '', action: 'API Health Check', actor: 'System', actorRole: 'system', timestamp: hoursAgo(2), details: 'FastAPI endpoint latency: 245ms (healthy)', category: 'system' },
  { id: 'sal-8', caseId: '', action: 'Webhook Triggered', actor: 'System', actorRole: 'system', timestamp: hoursAgo(4), details: 'UiPath Maestro webhook: case-created fired for SEN-2026-0009', category: 'workflow' },
  { id: 'sal-9', caseId: 'case-004', action: 'Case Closed', actor: 'Arjun Patel', actorRole: 'human', timestamp: daysAgo(1), details: 'False positive — legitimate business transactions', category: 'human' },
  { id: 'sal-10', caseId: '', action: 'Settings Updated', actor: 'Vikram Mehta', actorRole: 'human', timestamp: daysAgo(2), details: 'Risk threshold updated from 65 to 70', category: 'system' },
  { id: 'sal-11', caseId: '', action: 'User Login', actor: 'Rajesh Kumar', actorRole: 'human', timestamp: hoursAgo(10), details: 'Login from 10.0.1.52 — Edge 126, Windows 11', category: 'system' },
  { id: 'sal-12', caseId: '', action: 'Report Generated', actor: 'System', actorRole: 'system', timestamp: daysAgo(1), details: 'Monthly fraud report generated — June 2026', category: 'system' },
];
