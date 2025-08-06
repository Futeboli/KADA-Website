// routes/usuarios.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

//ROTA DE CADASTRO COM SENHA HASH
router.post('/cadastro', async (req, res) => {
  const { email, senha } = req.body;

  try {
    //Gera o hash da senha antes de salvar
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const result = await db.query(
      'INSERT INTO usuarios (email, senha) VALUES ($1, $2) RETURNING *',
      [email, senhaCriptografada]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao cadastrar usuário');
  }
});

//ROTA PARA LISTAR USUÁRIOS
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao listar usuários');
  }
});

module.exports = router;
