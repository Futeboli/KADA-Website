// server.js
const express = require('express');
const cors = require('cors');
const app = express();

const usuariosRouter = require('./routes/usuarios');

app.use(cors());
app.use(express.json());

app.use('/usuarios', usuariosRouter);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
