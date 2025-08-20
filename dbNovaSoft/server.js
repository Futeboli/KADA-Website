import dotenv from 'dotenv';
dotenv.config();

import express, { json, urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { healthCheck, connect, disconnect } from './config/database.js';
import pedidosRouter from './routes/pedidos.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração de CORS mais segura
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'] 
    : ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5500'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por IP
  message: {
    error: 'Muitas requisições deste IP, tente novamente mais tarde.'
  }
});
app.use(limiter);

// Rotas
app.get('/health', healthCheck);
app.use('/api/pedidos', pedidosRouter);

// Middlewares
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, async () => {
  await connect();
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

// Encerrar conexões ao fechar
process.on('SIGINT', async () => {
  await disconnect();
  process.exit(0);
});
