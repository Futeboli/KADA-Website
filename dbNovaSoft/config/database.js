require('dotenv').config();
import { Pool } from 'pg';

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
        // Configurações do pool para melhor performance
        max: 20, // máximo de conexões no pool
        idleTimeoutMillis: 30000, // timeout de conexões idle
        connectionTimeoutMillis: 2000, // timeout para nova conexão
        // SSL para produção (opcional)
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
      });

      // Teste de conexão
      const client = await this.pool.connect();
      console.log('✅ Conexão com PostgreSQL estabelecida com sucesso!');
      client.release();
      this.isConnected = true;

      // Event listeners para monitoramento
      this.pool.on('error', (err) => {
        console.error('❌ Erro inesperado no pool de conexões:', err);
        this.isConnected = false;
      });

      this.pool.on('connect', () => {
        console.log('🔗 Nova conexão estabelecida no pool');
      });

    } catch (error) {
      console.error('❌ Erro ao conectar com PostgreSQL:', error.message);
      this.isConnected = false;
      throw error;
    }
  }

  async query(text, params) {
    if (!this.isConnected) {
      throw new Error('Banco de dados não conectado');
    }
    
    const start = Date.now();
    try {
      const result = await this.pool.query(text, params);
      const duration = Date.now() - start;
      console.log(`🔍 Query executada em ${duration}ms: ${text}`);
      return result;
    } catch (error) {
      console.error('❌ Erro na query:', error);
      throw error;
    }
  }

  async healthCheck() {
    try {
      await this.query('SELECT 1');
      return { status: 'healthy', timestamp: new Date().toISOString() };
    } catch (error) {
      return { status: 'unhealthy', error: error.message, timestamp: new Date().toISOString() };
    }
  }

  async disconnect() {
    if (this.pool) {
      await this.pool.end();
      console.log('🔌 Conexão com PostgreSQL encerrada');
      this.isConnected = false;
    }
  }
}

export default new DatabaseConnection();