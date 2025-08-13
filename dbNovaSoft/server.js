const express = require('express');
const cors = require('cors');
const app = express();

const pedidosRouter = require('./routes/pedidos');

app.use(cors());
app.use(express.json());

app.use('/pedidos', pedidosRouter);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
