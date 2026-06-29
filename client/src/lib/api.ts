const API_BASE = '/api';

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers: { ...headers, ...options?.headers } });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error || 'Request failed');
  }
  return res.json();
}

export const api = {
  // Cases
  getCases: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return request<any>(`/cases${q}`);
  },
  getCase: (id: string) => request<any>(`/cases/${id}`),
  updateCase: (id: string, data: any) => request<any>(`/cases/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  submitReview: (id: string, data: any) => request<any>(`/cases/${id}/review`, { method: 'POST', body: JSON.stringify(data) }),
  getTransactions: (id: string) => request<any>(`/cases/${id}/transactions`),
  getNetwork: (id: string) => request<any>(`/cases/${id}/network`),
  getWorkflow: (id: string) => request<any>(`/cases/${id}/workflow`),
  analyze: (data: any) => request<any>('/cases/analyze', { method: 'POST', body: JSON.stringify(data) }),

  // Dashboard
  getDashboard: () => request<any>('/analytics/dashboard'),

  // Health
  getHealth: () => request<any>('/health'),
};
