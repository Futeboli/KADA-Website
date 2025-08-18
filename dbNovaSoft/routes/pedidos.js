const express = require('express');
const router = express.Router();
const db = require('../config/database').default;
const { validate, schemas } = require('../middleware/validation');

// Criar novo pedido
router.post('/cadastro', validate(schemas.cadastroPedido), async (req, res, next) => {
  const { nome, email, mensagem } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO pedidos (nome, email, mensagem, data_criacao, foi_atendido, foi_resolvido) 
       VALUES ($1, $2, $3, NOW(), false, false) 
       RETURNING id, nome, email, mensagem, data_criacao, foi_atendido, foi_resolvido`,
      [nome.trim(), email.toLowerCase().trim(), mensagem.trim()]
    );

    console.log(`✅ Novo pedido cadastrado: ID ${result.rows[0].id}`);

    res.status(201).json({
      success: true,
      message: 'Pedido cadastrado com sucesso',
      data: result.rows[0]
    });

  } catch (error) {
    next(error);
  }
});

// Listar todos os pedidos com paginação
router.get('/', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Query para contar total de registros
    const countResult = await db.query('SELECT COUNT(*) as total FROM pedidos');
    const total = parseInt(countResult.rows[0].total);

    // Query para buscar pedidos com paginação
    const result = await db.query(
      `SELECT id, nome, email, mensagem, data_criacao, foi_atendido, foi_resolvido 
       FROM pedidos 
       ORDER BY data_criacao DESC 
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: result.rows,
      pagination: {
        currentPage: page,
        totalPages,
        totalRecords: total,
        recordsPerPage: limit,
        hasNext: page < totalPages,
        hasPrevious: page > 1
      }
    });

  } catch (error) {
    next(error);
  }
});

// Buscar pedido por ID
router.get('/:id', validate(schemas.idParam, 'params'), async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      'SELECT id, nome, email, mensagem, data_criacao, foi_atendido, foi_resolvido FROM pedidos WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Pedido não encontrado',
        message: `Pedido com ID ${id} não existe`
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {
    next(error);
  }
});

// Atualizar status do pedido
router.put('/:id/status', 
  validate(schemas.idParam, 'params'),
  validate(schemas.atualizarStatus),
  async (req, res, next) => {
    const { foi_atendido, foi_resolvido } = req.body;
    const { id } = req.params;

    try {
      const result = await db.query(
        `UPDATE pedidos 
         SET foi_atendido = $1, foi_resolvido = $2, data_atualizacao = NOW()
         WHERE id = $3 
         RETURNING id, nome, email, foi_atendido, foi_resolvido, data_atualizacao`,
        [foi_atendido, foi_resolvido, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'Pedido não encontrado',
          message: `Pedido com ID ${id} não existe`
        });
      }

      console.log(`✅ Status do pedido ${id} atualizado`);

      res.json({
        success: true,
        message: 'Status do pedido atualizado com sucesso',
        data: result.rows[0]
      });

    } catch (error) {
      next(error);
    }
  }
);

// Excluir pedido (soft delete)
router.delete('/:id', validate(schemas.idParam, 'params'), async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      'UPDATE pedidos SET deletado = true, data_delecao = NOW() WHERE id = $1 AND deletado = false RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Pedido não encontrado',
        message: `Pedido com ID ${id} não existe ou já foi excluído`
      });
    }

    console.log(`🗑️ Pedido ${id} excluído (soft delete)`);

    res.json({
      success: true,
      message: 'Pedido excluído com sucesso'
    });

  } catch (error) {
    next(error);
  }
});

module.exports = router;