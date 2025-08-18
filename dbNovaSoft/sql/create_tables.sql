-- Script para criar a estrutura do banco de dados

-- Criar extensão para UUIDs (opcional)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Criar tabela de pedidos
CREATE TABLE IF NOT EXISTS pedidos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mensagem TEXT NOT NULL,
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    data_atualizacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    data_delecao TIMESTAMP WITH TIME ZONE NULL,
    foi_atendido BOOLEAN DEFAULT FALSE,
    foi_resolvido BOOLEAN DEFAULT FALSE,
    deletado BOOLEAN DEFAULT FALSE,
    
    -- Constraints
    CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT valid_nome CHECK (LENGTH(nome) >= 2),
    CONSTRAINT valid_mensagem CHECK (LENGTH(mensagem) >= 10)
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_pedidos_data_criacao ON pedidos(data_criacao DESC);
CREATE INDEX IF NOT EXISTS idx_pedidos_email ON pedidos(email);
CREATE INDEX IF NOT EXISTS idx_pedidos_status ON pedidos(foi_atendido, foi_resolvido);
CREATE INDEX IF NOT EXISTS idx_pedidos_deletado ON pedidos(deletado) WHERE deletado = false;

-- Trigger para atualizar data_atualizacao automaticamente
CREATE OR REPLACE FUNCTION update_data_atualizacao()
RETURNS TRIGGER AS $$
BEGIN
    NEW.data_atualizacao = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_data_atualizacao
    BEFORE UPDATE ON pedidos
    FOR EACH ROW
    EXECUTE FUNCTION update_data_atualizacao();

-- Inserir dados de exemplo (opcional)
INSERT INTO pedidos (nome, email, mensagem) VALUES
('João Silva', 'joao@exemplo.com', 'Gostaria de saber mais sobre os serviços oferecidos.'),
('Maria Santos', 'maria@exemplo.com', 'Preciso de ajuda com um projeto de desenvolvimento web.')
ON CONFLICT DO NOTHING;

-- Verificar se as tabelas foram criadas
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'pedidos'
ORDER BY ordinal_position;