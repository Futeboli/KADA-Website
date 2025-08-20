import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

class DatabaseConnection {
  constructor() {
    this.pool = null;
    this.isConnected = false;
  }

  async connect() {
    try {
      this.pool = new Pool({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_NAME,
        // Configurações do pool
        max: 20, // máximo de conexões no pool
        idleTimeoutMillis: 30000, // timeout de conexões inativas
        connectionTimeoutMillis: 2000, // tempo máximo para tentar conectar
      });

      this.isConnected = true;
      console.log('✅ Conectado ao banco de dados PostgreSQL');
    } catch (err) {
      console.error('❌ Erro ao conectar no banco:', err);
      this.isConnected = false;
    }
  }

  async disconnect() {
    try {
      if (this.pool) {
        await this.pool.end();
        console.log('🔌 Conexão com banco encerrada');
      }
      this.isConnected = false;
    } catch (err) {
      console.error('❌ Erro ao encerrar conexão:', err);
    }
  }

  async query(text, params) {
    if (!this.pool) {
      throw new Error('Banco não conectado. Use connect() primeiro.');
    }
    return this.pool.query(text, params);
  }

  healthCheck(req, res) {
    res.status(200).json({
      status: this.isConnected ? 'connected' : 'disconnected',
      database: process.env.DB_NAME,
    });
  }
}

const db = new DatabaseConnection();

// Exporta funções que o server.js espera
export const connect = () => db.connect();
export const disconnect = () => db.disconnect();
export const healthCheck = (req, res) => db.healthCheck(req, res);

// Também exporta a instância para usar em outras rotas
export default db;
