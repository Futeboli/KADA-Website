const Joi = require('joi');

// Esquemas de validação
const schemas = {
  cadastroPedido: Joi.object({
    nome: Joi.string().min(2).max(100).required().messages({
      'string.empty': 'Nome é obrigatório',
      'string.min': 'Nome deve ter pelo menos 2 caracteres',
      'string.max': 'Nome deve ter no máximo 100 caracteres'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Email deve ter um formato válido',
      'string.empty': 'Email é obrigatório'
    }),
    mensagem: Joi.string().min(10).max(1000).required().messages({
      'string.empty': 'Mensagem é obrigatória',
      'string.min': 'Mensagem deve ter pelo menos 10 caracteres',
      'string.max': 'Mensagem deve ter no máximo 1000 caracteres'
    })
  }),

  atualizarStatus: Joi.object({
    foi_atendido: Joi.boolean().required(),
    foi_resolvido: Joi.boolean().required()
  }),

  idParam: Joi.object({
    id: Joi.number().integer().positive().required().messages({
      'number.base': 'ID deve ser um número',
      'number.integer': 'ID deve ser um número inteiro',
      'number.positive': 'ID deve ser um número positivo'
    })
  })
};

// Middleware de validação
const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    
    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({
        success: false,
        error: 'Dados inválidos',
        details: errorMessage
      });
    }
    
    next();
  };
};

module.exports = {
  schemas,
  validate
};