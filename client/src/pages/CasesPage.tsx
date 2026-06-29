import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { Search, ChevronDown } from 'lucide-react';

function riskColor(score: number) {
  if (score >= 80) return '#ef4444';
  if (score >= 60) return '#f59e0b';
  return '#22c55e';
}

function statusLabel(s: string) {
  return s.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
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

/* ── Dropdown ───────────────────────────── */

function FilterDropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const selected = options.find(o => o.value === value);
  const displayLabel = selected && selected.value ? selected.label : label;

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        className={`filter-btn${value ? ' active' : ''}`}
        onClick={() => setOpen(!open)}
      >
        {displayLabel}
        {value && <span className="filter-count">1</span>}
        <ChevronDown />
      </button>
      {open && (
        <div className="filter-dropdown">
          {options.map(opt => (
            <button
              key={opt.value}
              className={`filter-option${opt.value === value ? ' selected' : ''}`}
              onClick={() => { onChange(opt.value); setOpen(false); }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Main Page ──────────────────────────── */

export default function CasesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [risk, setRisk] = useState('');
  const [status, setStatus] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['cases', search, risk, status],
    queryFn: () => {
      const p: Record<string, string> = { limit: '50' };
      if (search) p.search = search;
      if (risk) p.riskLevel = risk;
      if (status) p.status = status;
      return api.getCases(p);
    },
  });

  const cases = data?.data || [];
  const total = data?.pagination?.total ?? cases.length;

  const riskOptions = [
    { value: '', label: 'All Risks' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'open', label: 'Open' },
    { value: 'under_review', label: 'Under Review' },
    { value: 'pending_review', label: 'Pending Review' },
    { value: 'escalated', label: 'Escalated' },
    { value: 'closed', label: 'Closed' },
  ];

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Case Management</div>
        <div className="page-meta">All fraud investigation cases · {total} cases</div>
      </div>

      {/* Filters — right-aligned */}
      <div className="filter-row">
        <div style={{ position: 'relative' }}>
          <Search
            size={13}
            style={{
              position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)',
              color: 'var(--color-text-ghost)',
            }}
          />
          <input
            className="search-input"
            placeholder="Search cases, accounts…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <FilterDropdown label="Risk Level" value={risk} options={riskOptions} onChange={setRisk} />
        <FilterDropdown label="Status" value={status} options={statusOptions} onChange={setStatus} />
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="loading"><div className="spinner" /></div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Case ID</th>
              <th>Account</th>
              <th>Customer</th>
              <th>Category</th>
              <th>Risk</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Created</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c: any) => {
              const color = riskColor(c.riskScore);
              return (
                <tr
                  key={c.id}
                  style={{ borderLeft: '2px solid transparent' }}
                  onMouseEnter={e => (e.currentTarget.style.borderLeftColor = color)}
                  onMouseLeave={e => (e.currentTarget.style.borderLeftColor = 'transparent')}
                >
                  <td>
                    <span className="case-id" onClick={() => navigate(`/cases/${c.id}`)}>
                      {c.caseNumber}
                    </span>
                  </td>
                  <td><span className="mono">{c.accountId}</span></td>
                  <td style={{ color: 'var(--color-text-primary)' }}>{c.customerName}</td>
                  <td>{c.category}</td>
                  <td><RiskSegments score={c.riskScore} /></td>
                  <td>
                    <span className={`status-badge status-${c.status}`}>
                      {statusLabel(c.status)}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right', color: 'var(--color-text-ghost)', fontSize: '11px' }}>
                    {formatDate(c.createdAt)}
                  </td>
                </tr>
              );
            })}
            {cases.length === 0 && (
              <tr><td colSpan={7} className="empty">No cases found</td></tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
