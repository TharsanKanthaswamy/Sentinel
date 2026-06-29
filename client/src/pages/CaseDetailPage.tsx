import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import {
  ArrowLeft, Brain, AlertTriangle, CheckCircle, Clock, XCircle, User
} from 'lucide-react';

function riskColor(score: number) {
  if (score >= 80) return '#ef4444';
  if (score >= 60) return '#f59e0b';
  return '#22c55e';
}

function statusLabel(s: string) {
  return s.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function fmtDate(d: string) {
  return new Date(d).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

function fmtCurrency(n: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

export default function CaseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [notes, setNotes] = useState('');
  const [tab, setTab] = useState<'overview' | 'transactions' | 'workflow'>('overview');

  const { data: c, isLoading } = useQuery({
    queryKey: ['case', id],
    queryFn: () => api.getCase(id!),
    enabled: !!id,
  });

  const review = useMutation({
    mutationFn: (data: { decision: string; notes: string }) =>
      api.submitReview(id!, { ...data, reviewer: 'Investigator', reviewerId: 'usr-001', confidence: 90 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['case', id] });
      queryClient.invalidateQueries({ queryKey: ['cases'] });
      setNotes('');
    },
  });

  if (isLoading) return <div className="loading"><div className="spinner" /></div>;
  if (!c) return <div className="empty">Case not found</div>;

  const ai = c.aiAnalysis;
  const score = ai?.riskScore ?? c.riskScore ?? 0;
  const color = riskColor(score);

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'transactions', label: 'Transactions' },
    { key: 'workflow', label: 'Workflow' },
  ] as const;

  return (
    <div>
      <Link to="/cases" className="back-link">
        <ArrowLeft size={13} /> Cases
      </Link>

      <div className="case-header">
        <div>
          <div className="case-title">{c.caseNumber}</div>
          <div className="case-subtitle">{c.customerName} · {c.accountId} · {c.category}</div>
        </div>
        <div className="case-badges">
          <span className={`status-badge status-${c.status}`}>{statusLabel(c.status)}</span>
        </div>
      </div>

      <div className="tab-row">
        {tabs.map(t => (
          <button
            key={t.key}
            className={`tab-btn${tab === t.key ? ' active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="detail-layout">
          <div>
            {/* AI Screening */}
            <div className="section">
              <div className="section-title"><Brain size={14} /> AI Screening Results</div>
              <div className="card">
                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  <div className="score-ring">
                    <svg width="80" height="80" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="4" />
                      <circle
                        cx="40" cy="40" r="34" fill="none"
                        stroke={color} strokeWidth="4" opacity="0.8"
                        strokeDasharray={`${score * 2.136} 214`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="score-ring-center">
                      <span className="score-ring-num" style={{ color }}>{score}</span>
                      <span className="score-ring-label">risk</span>
                    </div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: '1.6', marginBottom: '10px' }}>
                      {ai?.explanation || 'Analysis pending.'}
                    </p>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '11px', color: 'var(--color-text-ghost)' }}>
                      <span>Model: {ai?.modelVersion || '—'}</span>
                      <span>{ai?.analysisTime || '—'}</span>
                      <span>{ai?.confidence ? `${ai.confidence}% confidence` : ''}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fraud Indicators */}
            {ai?.indicators?.length > 0 && (
              <div className="section">
                <div className="section-title"><AlertTriangle size={14} /> Fraud Indicators</div>
                <div className="card" style={{ padding: '8px 16px' }}>
                  {ai.indicators.map((ind: any) => (
                    <div key={ind.id} className="indicator">
                      <div
                        className="indicator-dot"
                        style={{ background: riskColor(ind.severity === 'critical' ? 90 : ind.severity === 'high' ? 70 : 50) }}
                      />
                      <div>
                        <div className="indicator-label">
                          {ind.label}
                          <span className={`indicator-badge sev-${ind.severity}`}>{ind.severity}</span>
                        </div>
                        <div className="indicator-desc">{ind.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Human Review */}
            {c.humanReview ? (
              <div className="section">
                <div className="section-title"><User size={14} /> Human Review</div>
                <div className="card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    {c.humanReview.decision === 'approved' && <CheckCircle size={13} color="#22c55e" />}
                    {c.humanReview.decision === 'rejected' && <XCircle size={13} color="#ef4444" />}
                    {c.humanReview.decision === 'escalated' && <AlertTriangle size={13} color="#f59e0b" />}
                    <span style={{ fontSize: '13px', fontWeight: 500 }}>
                      {c.humanReview.decision.charAt(0).toUpperCase() + c.humanReview.decision.slice(1)}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-ghost)' }}>
                      · {c.humanReview.reviewer} · {fmtDate(c.humanReview.timestamp)}
                    </span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{c.humanReview.notes}</p>
                </div>
              </div>
            ) : c.status !== 'closed' && (
              <div className="section">
                <div className="section-title"><User size={14} /> Submit Review</div>
                <div className="card">
                  <textarea
                    className="review-textarea"
                    placeholder="Investigation notes…"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                  />
                  <div className="review-actions">
                    <button
                      className="btn btn-approve"
                      onClick={() => review.mutate({ decision: 'approved', notes })}
                      disabled={review.isPending}
                    >
                      <CheckCircle size={13} /> Approve
                    </button>
                    <button
                      className="btn btn-reject"
                      onClick={() => review.mutate({ decision: 'rejected', notes })}
                      disabled={review.isPending}
                    >
                      <XCircle size={13} /> Reject
                    </button>
                    <button
                      className="btn btn-escalate"
                      onClick={() => review.mutate({ decision: 'escalated', notes })}
                      disabled={review.isPending}
                    >
                      <AlertTriangle size={13} /> Escalate
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right column */}
          <div>
            <div className="card" style={{ marginBottom: '12px' }}>
              <div className="card-label">Case Information</div>
              <div className="info-row">
                <span className="info-key">Case</span>
                <span className="info-val" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px' }}>{c.caseNumber}</span>
              </div>
              <div className="info-row">
                <span className="info-key">Account</span>
                <span className="info-val" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px' }}>{c.accountId}</span>
              </div>
              <div className="info-row">
                <span className="info-key">UPI</span>
                <span className="info-val" style={{ fontSize: '11px' }}>{c.upiId}</span>
              </div>
              <div className="info-row">
                <span className="info-key">Customer</span>
                <span className="info-val">{c.customerName}</span>
              </div>
              <div className="info-row">
                <span className="info-key">Category</span>
                <span className="info-val">{c.category}</span>
              </div>
              <div className="info-row">
                <span className="info-key">Priority</span>
                <span className="info-val" style={{ textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.04em' }}>{c.priority}</span>
              </div>
              <div className="info-row">
                <span className="info-key">Created</span>
                <span className="info-val" style={{ fontSize: '11px' }}>{fmtDate(c.createdAt)}</span>
              </div>
            </div>

            {ai?.featuresUsed?.length > 0 && (
              <div className="card">
                <div className="card-label">Features Used</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {ai.featuresUsed.map((f: string, i: number) => (
                    <span key={i} className="tag">{f}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'transactions' && <TransactionsTab caseId={id!} />}
      {tab === 'workflow' && <WorkflowTab caseData={c} />}
    </div>
  );
}

/* ── Transactions ─────────────────────── */

function TransactionsTab({ caseId }: { caseId: string }) {
  const { data: txns, isLoading } = useQuery({
    queryKey: ['transactions', caseId],
    queryFn: () => api.getTransactions(caseId),
  });

  if (isLoading) return <div className="loading"><div className="spinner" /></div>;

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Type</th>
          <th>Description</th>
          <th style={{ textAlign: 'right' }}>Amount</th>
          <th>Time</th>
          <th>Location</th>
          <th style={{ textAlign: 'center' }}>Flag</th>
        </tr>
      </thead>
      <tbody>
        {(txns || []).map((t: any) => (
          <tr key={t.id} style={{ borderLeft: '2px solid transparent' }}>
            <td style={{
              textTransform: 'capitalize',
              color: t.flagged ? '#f87171' : undefined,
              fontWeight: t.flagged ? 500 : undefined,
            }}>
              {t.type}
            </td>
            <td>{t.description}</td>
            <td style={{ textAlign: 'right', fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}>
              {t.amount ? fmtCurrency(t.amount) : '—'}
            </td>
            <td style={{ fontSize: '11px', color: 'var(--color-text-ghost)' }}>
              {fmtDate(t.timestamp)}
            </td>
            <td style={{ fontSize: '11px' }}>{t.location || '—'}</td>
            <td style={{ textAlign: 'center' }}>
              {t.flagged && <AlertTriangle size={12} color="#f87171" />}
            </td>
          </tr>
        ))}
        {(!txns || txns.length === 0) && (
          <tr><td colSpan={6} className="empty">No transactions</td></tr>
        )}
      </tbody>
    </table>
  );
}

/* ── Workflow ─────────────────────────── */

function WorkflowTab({ caseData }: { caseData: any }) {
  const wf = caseData.workflow || [];

  return (
    <div className="card">
      <div className="card-label">Investigation Workflow</div>
      <div className="wf-steps">
        {wf.map((s: any) => (
          <div key={s.id} className={`wf-step ${s.status}`}>
            <div className={`wf-dot ${s.status}`}>
              {s.status === 'completed' && <CheckCircle />}
              {s.status === 'active' && <Clock />}
              {s.status === 'pending' && <Clock />}
              {s.status === 'failed' && <XCircle />}
            </div>
            <div>
              <div className="wf-name">{s.name}</div>
              <div className="wf-meta">
                {s.status === 'completed' && s.completedAt && fmtDate(s.completedAt)}
                {s.status === 'active' && 'In progress'}
                {s.status === 'pending' && 'Waiting'}
                {s.status === 'failed' && 'Failed'}
                {s.assignee && ` · ${s.assignee}`}
              </div>
            </div>
          </div>
        ))}
        {wf.length === 0 && <div className="empty">No workflow steps yet</div>}
      </div>
    </div>
  );
}
