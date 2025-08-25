import express from 'express';

const router = express.Router();

// exemplo de rota GET
router.get('/', (req, res) => {
  res.send('Lista de pedidos');
});

// exemplo de rota POST
router.post('/', (req, res) => {
  res.send('Pedido criado');
});

// exemplo de rota PUT
router.put('/:id', (req, res) => {
  res.send(`Pedido ${req.params.id} atualizado`);
});

// exemplo de rota DELETE
router.delete('/:id', (req, res) => {
  res.send(`Pedido ${req.params.id} deletado`);
});

export default router;
