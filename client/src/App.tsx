import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Sidebar from './components/layout/Sidebar';
import DashboardPage from './pages/DashboardPage';
import CasesPage from './pages/CasesPage';
import CaseDetailPage from './pages/CaseDetailPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="app-layout">
          <Sidebar />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/cases" element={<CasesPage />} />
              <Route path="/cases/:id" element={<CaseDetailPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
