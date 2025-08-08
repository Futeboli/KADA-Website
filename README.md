# K.A.D.A. Systems - Website

Este é o website da empresa K.A.D.A. Systems, com informações sobre serviços, depoimentos e formulário de contato.

## Funcionalidades

- Design moderno com temática escura e neon
- Carrosséis de imagens e depoimentos
- Seções de serviços e sobre nós
- Formulário de contato funcional
- Botão flutuante de WhatsApp

## Configuração do Formulário de Contato

O formulário de contato tem três métodos de funcionamento, em ordem de prioridade:

### IMPORTANTE: Segurança para Github

**Antes de fazer upload para o Github:**
- Os arquivos de configuração foram sanitizados para remover dados sensíveis.
- Você DEVE configurar suas informações pessoais conforme as instruções abaixo.
- NÃO faça commit do arquivo `.env` ou de arquivos de configuração com suas credenciais reais.
- Considere adicionar estes arquivos ao seu `.gitignore`:
  ```
  .env
  emailjs-config.js
  ```

### 1. Servidor Node.js (Requer configuração)

Para habilitar o envio de emails via servidor Node.js:

1. Instale as dependências:
```
npm install
```

2. Crie um arquivo `.env` com seus dados (não incluído no GitHub):
```
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=sua_senha_app
RECIPIENT_EMAIL=contato@empresa.com
PORT=3000
```

3. Inicie o servidor:
```
npm start
```

**Nota**: Para Gmail, você precisa usar uma "senha de app" gerada nas configurações de segurança da sua conta Google.

### 2. EmailJS (Requer configuração)

Se não estiver usando o servidor Node.js, o site tentará usar o EmailJS:

1. Crie uma conta no [EmailJS](https://www.emailjs.com/)
2. Configure um serviço de email e um template
3. Atualize o arquivo `emailjs-config.js` com suas credenciais (não inclua no GitHub):
```javascript
const PUBLIC_KEY = "sua_chave_publica";
const SERVICE_ID = "seu_service_id";
const TEMPLATE_ID = "seu_template_id";
```

### 3. LocalStorage (Fallback)

Se os métodos anteriores falharem, os dados do formulário serão armazenados localmente no navegador do usuário (localStorage), e você verá as mensagens no console do navegador.

## Personalização

- Altere as cores em `index.css` na seção `:root` 
- Atualize o número do WhatsApp no arquivo `index.html`
- Substitua as imagens na pasta `img` por suas próprias imagens

- ADA senha: datatree1998
- admin senha: @dmin*c@o
