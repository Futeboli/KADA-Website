import { Router } from 'express';
import db from '../config/database.js';

const router = Router();

// Criar novo pedido
router.post('/cadastro', async (req, res) => {
  const { nome, email, mensagem } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO pedidos (nome, email, mensagem) VALUES ($1, $2, $3) RETURNING *',
      [nome, email, mensagem]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('❌ Erro ao cadastrar pedido:', err);
    res.status(500).send('Erro ao cadastrar pedido');
  }
});

// Listar pedidos
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM pedidos ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Erro ao buscar pedidos:', err);
    res.status(500).send('Erro ao buscar pedidos');
  }
});

export default router;
