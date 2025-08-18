# 🚀 API NovaSoft - Versão Aprimorada

API melhorada para gerenciamento de pedidos com PostgreSQL, Node.js e Express.

## 🆕 Melhorias Implementadas

### 🔒 Segurança
- **Helmet.js** para headers de segurança
- **Rate Limiting** para prevenir ataques
- **CORS configurável** por ambiente
- **Validação robusta** com Joi
- **SQL Injection protection** com prepared statements

### 🛠️ Funcionalidades
- **Pool de conexões** com retry automático
- **Paginação** na listagem de pedidos
- **Health Check** da aplicação e banco
- **Logs estruturados** para monitoramento
- **Soft Delete** para exclusão segura
- **Tratamento de erros** centralizado

### 📊 Banco de Dados
- **Índices otimizados** para performance
- **Triggers automáticos** para timestamps
- **Constraints de validação** no banco
- **Script SQL** para criação das tabelas

## 🚀 Como usar

### 1. Instalação
```bash
cd dbNovaSoft
npm install
```

### 2. Configuração
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Configure suas variáveis no .env
nano .env
```

### 3. Banco de Dados
```bash
# Execute o script SQL no seu PostgreSQL
psql -U seu_usuario -d sua_base -f sql/create_tables.sql
```

### 4. Execução
```bash
# Desenvolvimento (com auto-reload)
npm run dev

# Produção
npm start
```

## 📋 Endpoints da API

### Health Check
- `GET /health` - Status da aplicação e banco

### Pedidos
- `GET /api/pedidos` - Listar pedidos (com paginação)
  - Query params: `page`, `limit`
- `GET /api/pedidos/:id` - Buscar pedido específico
- `POST /api/pedidos/cadastro` - Criar novo pedido
- `PUT /api/pedidos/:id/status` - Atualizar status
- `DELETE /api/pedidos/:id` - Excluir pedido (soft delete)

## 📝 Exemplos de Uso

### Criar Pedido
```javascript
const response = await fetch('/api/pedidos/cadastro', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nome: 'João Silva',
    email: 'joao@exemplo.com',
    mensagem: 'Preciso de ajuda com meu projeto'
  })
});
```

### Listar Pedidos com Paginação
```javascript
const response = await fetch('/api/pedidos?page=1&limit=10');
const data = await response.json();
```

### Health Check
```javascript
const response = await fetch('/health');
const health = await response.json();
```

## 🔧 Variáveis de Ambiente

```env
# Banco de Dados
DB_HOST=localhost
DB_PORT=5432
DB_NAME=novasoft
DB_USER=seu_usuario
DB_PASSWORD=sua_senha

# Servidor
PORT=3000
NODE_ENV=development

# Segurança
ALLOWED_ORIGINS=http://localhost:3000
```

## 🏗️ Estrutura do Projeto

```
dbNovaSoft/
├── config/
│   └── database.js       # Configuração do banco
├── middleware/
│   ├── validation.js     # Validação de dados
│   └── errorHandler.js   # Tratamento de erros
├── routes/
│   └── pedidos.js        # Rotas dos pedidos
├── sql/
│   └── create_tables.sql # Script do banco
├── server.js             # Servidor principal
├── package.json
└── .env.example
```

## 🚀 Funcionalidades Principais

- ✅ **Conexão robusta** com PostgreSQL
- ✅ **Validação de dados** completa
- ✅ **Tratamento de erros** adequado
- ✅ **Logs estruturados**
- ✅ **Segurança implementada**
- ✅ **Paginação de resultados**
- ✅ **Health monitoring**
- ✅ **Graceful shutdown**

## 🔄 Próximos Passos

1. Instalar as novas dependências
2. Configurar as variáveis de ambiente
3. Executar o script SQL
4. Testar a API com os novos endpoints

Sua API agora está muito mais robusta e pronta para produção! 🎉