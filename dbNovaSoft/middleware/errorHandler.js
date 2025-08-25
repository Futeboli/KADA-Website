// Middleware para tratamento de erros
const errorHandler = (err, req, res, next) => {
  console.error('❌ Erro capturado:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // Erro de banco de dados PostgreSQL
  if (err.code) {
    switch (err.code) {
      case '23505': // unique_violation
        return res.status(409).json({
          success: false,
          error: 'Dados duplicados',
          message: 'Este registro já existe'
        });
      
      case '23503': // foreign_key_violation
        return res.status(400).json({
          success: false,
          error: 'Referência inválida',
          message: 'Dados relacionados não encontrados'
        });
      
      case '23502': // not_null_violation
        return res.status(400).json({
          success: false,
          error: 'Campo obrigatório',
          message: 'Todos os campos obrigatórios devem ser preenchidos'
        });
      
      default:
        return res.status(500).json({
          success: false,
          error: 'Erro no banco de dados',
          message: 'Erro interno do servidor'
        });
    }
  }

  // Outros tipos de erro
  res.status(500).json({
    success: false,
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Algo deu errado'
  });
};

// Middleware para rotas não encontradas
const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Rota não encontrada',
    message: `A rota ${req.method} ${req.path} não existe`
  });
};

export { errorHandler, notFound };
