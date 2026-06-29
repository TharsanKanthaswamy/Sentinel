import express from 'express';
import cors from 'cors';
import { casesRouter } from './routes/cases';
import { analyticsRouter } from './routes/analytics';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3000'], credentials: true }));
app.use(express.json({ limit: '50mb' }));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'healthy',
    version: '3.2.1',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use('/api/cases', casesRouter);
app.use('/api/analytics', analyticsRouter);

app.listen(PORT, () => {
  console.log(`\n  🛡️  Sentinel AI Backend v3.2.1`);
  console.log(`  📡 Server running on http://localhost:${PORT}`);
  console.log(`  🔗 API Health: http://localhost:${PORT}/api/health\n`);
});
