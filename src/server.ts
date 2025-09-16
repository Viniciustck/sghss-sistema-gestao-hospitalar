import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import authRouter from './modules/auth/auth.router';
import patientsRouter from './modules/patients/patients.router';
import professionalsRouter from './modules/professionals/professionals.router';
import appointmentsRouter from './modules/appointments/appointments.router';
import prescriptionsRouter from './modules/prescriptions/prescriptions.router';
import telemedicineRouter from './modules/telemedicine/telemedicine.router';
import { requireAuth } from './middlewares/auth';
import { errorHandler } from './middlewares/error';
import { auditLogger } from './middlewares/audit';

const app = express();

const corsOrigins = (process.env.CORS_ORIGINS ?? '*')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

app.use(express.json());
app.use(cors({ origin: corsOrigins.length === 1 && corsOrigins[0] === '*' ? true : corsOrigins }));
app.use(helmet());
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 60_000, max: 120 }));
app.use(requireAuth);
app.use(auditLogger);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/auth', authRouter);
app.use('/patients', patientsRouter);
app.use('/professionals', professionalsRouter);
app.use('/appointments', appointmentsRouter);
app.use('/prescriptions', prescriptionsRouter);
app.use('/telemedicine', telemedicineRouter);

app.use(errorHandler);

export default app;

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`SGHSS API rodando na porta ${PORT}`);
  });
}
