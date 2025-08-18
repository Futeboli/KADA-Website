import { Router } from 'express';
const router = Router();
import { query } from '../db';

// Criar novo pedido
router.post('/cadastro', async (req, res) => {
  const { nome, email, mensagem } = req.body;

  try {
    const result = await query(
      'INSERT INTO pedidos (nome, email, mensagem) VALUES ($1, $2, $3) RETURNING *',
      [nome, email, mensagem]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao cadastrar pedido');
  }
});

// Listar todos os pedidos
router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM pedidos ORDER BY data_criacao DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao listar pedidos');
  }
});

// Atualizar status (foi_atendido e foi_resolvido)
router.put('/:id/status', async (req, res) => {
  const { foi_atendido, foi_resolvido } = req.body;
  const { id } = req.params;

  try {
    const result = await query(
      'UPDATE pedidos SET foi_atendido = $1, foi_resolvido = $2 WHERE id = $3 RETURNING *',
      [foi_atendido, foi_resolvido, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('Pedido não encontrado');
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao atualizar status do pedido');
  }
});

export default router;
