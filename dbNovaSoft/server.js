import dotenv from 'dotenv';
dotenv.config();

import express, { json, urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { connect } from './config/database.js';
import pedidosRouter from './routes/pedidos.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração de CORS (permitindo o front acessar o back)
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

// Rate limiting (anti-flood)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por IP
  message: {
    error: 'Muitas requisições deste IP, tente novamente mais tarde.'
  }
});
app.use(limiter);

// 🚀 Rota principal para pedidos
app.use('/api/pedidos', pedidosRouter);

// Middleware para erros
app.use(notFound);
app.use(errorHandler);

// Iniciar servidor e banco
connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Erro ao conectar no banco:', err);
    process.exit(1);
  });
  