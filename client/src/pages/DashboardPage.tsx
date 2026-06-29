import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';

function riskColor(score: number) {
  if (score >= 80) return '#ef4444';
  if (score >= 60) return '#f59e0b';
  return '#22c55e';
}

function statusClass(s: string) {
  return `status-badge status-${s}`;
}

function statusLabel(s: string) {
  return s.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function timeAgo(date: string) {
  const sec = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (sec < 60) return 'now';
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m`;
  const hrs = Math.floor(min / 60);
  if (hrs < 24) return `${hrs}h`;
  return `${Math.floor(hrs / 24)}d`;
}

function RiskSegments({ score }: { score: number }) {
  const filled = Math.round(score / 10);
  const color = riskColor(score);
  return (
    <div className="risk-cell">
      <span className="risk-num" style={{ color }}>{score}</span>
      <div className="risk-segments">
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            className={`risk-seg${i < filled ? ' filled' : ''}`}
            style={i < filled ? { background: color } : undefined}
          />
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const { data: dashboard, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: api.getDashboard,
  });

  const { data: casesData } = useQuery({
    queryKey: ['cases-recent'],
    queryFn: () => api.getCases({ limit: '8', sortBy: 'createdAt', sortOrder: 'desc' }),
  });

  if (isLoading) return <div className="loading"><div className="spinner" /></div>;

  const s = dashboard || {};
  const cases = casesData?.data || [];

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Dashboard</div>
        <div className="page-meta">Fraud investigation overview · {s.totalCases ?? 0} total cases</div>
      </div>

      <div className="stats-row">
        <div className="stat-cell">
          <div className="stat-label">Total Cases</div>
          <div className="stat-value">{s.totalCases ?? '—'}</div>
          <div className="stat-sub">All accounts investigated</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label">Pending Review</div>
          <div className="stat-value" style={{ color: '#f59e0b' }}>{s.pendingReview ?? '—'}</div>
          <div className="stat-sub">Awaiting human decision</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label">AI Screened</div>
          <div className="stat-value">{s.aiScreened ?? '—'}</div>
          <div className="stat-sub">Processed by model</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label">Resolved</div>
          <div className="stat-value" style={{ color: '#22c55e' }}>{s.resolved ?? '—'}</div>
          <div className="stat-sub">Cases closed</div>
        </div>
      </div>

      <div className="card-label">Recent Cases</div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Case</th>
            <th>Account</th>
            <th>Risk</th>
            <th>Status</th>
            <th style={{ textAlign: 'right' }}>Updated</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((c: any) => {
            const color = riskColor(c.riskScore);
            return (
              <tr
                key={c.id}
                style={{ borderLeft: `2px solid transparent` }}
                onMouseEnter={e => (e.currentTarget.style.borderLeftColor = color)}
                onMouseLeave={e => (e.currentTarget.style.borderLeftColor = 'transparent')}
              >
                <td>
                  <span className="case-id" onClick={() => navigate(`/cases/${c.id}`)}>
                    {c.caseNumber}
                  </span>
                </td>
                <td><span className="mono">{c.accountId}</span></td>
                <td><RiskSegments score={c.riskScore} /></td>
                <td><span className={statusClass(c.status)}>{statusLabel(c.status)}</span></td>
                <td style={{ textAlign: 'right', color: 'var(--color-text-ghost)', fontSize: '11px' }}>
                  {timeAgo(c.updatedAt)}
                </td>
              </tr>
            );
          })}
          {cases.length === 0 && (
            <tr><td colSpan={5} className="empty">No cases yet</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
