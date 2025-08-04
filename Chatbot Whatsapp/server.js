const express = require('express');
const fs = require('fs');
const path = require('path');
const { getSock, isModoConversaAtivo } = require('./bot');
const app = express();
const PORT = 3000;

const pedidosPath = path.join(__dirname, 'pedidos.json');
const modoConversaPath = path.join(__dirname, 'modoConversa.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function lerPedidos() {
    if (!fs.existsSync(pedidosPath)) {
        fs.writeFileSync(pedidosPath, JSON.stringify([], null, 2));
    }
    return JSON.parse(fs.readFileSync(pedidosPath));
}

function salvarPedidos(pedidos) {
    fs.writeFileSync(pedidosPath, JSON.stringify(pedidos, null, 2));
}

function lerModoConversa() {
    if (!fs.existsSync(modoConversaPath)) {
        fs.writeFileSync(modoConversaPath, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(modoConversaPath));
}

function salvarModoConversa(lista) {
    fs.writeFileSync(modoConversaPath, JSON.stringify(lista, null, 2));
}

app.get('/', (req, res) => {
    const pedidos = lerPedidos();
    const modoConversaLista = lerModoConversa();

    let html = `
    <h1>Gerenciamento de Pedidos</h1>
    <table border="1" cellpadding="5" cellspacing="0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Número</th>
          <th>Nome/Empresa</th>
          <th>Email</th>
          <th>Serviço</th>
          <th>Data</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
    `;

    pedidos.forEach(p => {
        const modoAtivo = modoConversaLista.includes(p.numero);
        html += `
        <tr>
          <td>${p.id}</td>
          <td>${p.numero}</td>
          <td>${p.nome}</td>
          <td>${p.email}</td>
          <td>${p.servico}</td>
          <td>${new Date(p.data).toLocaleString()}</td>
          <td>${p.status}</td>
          <td>
            ${p.status === 'ativo' ? `<form method="POST" action="/finalizar" style="display:inline;">
              <input type="hidden" name="id" value="${p.id}">
              <button type="submit">Finalizar</button>
            </form>` : ''}
            <form method="POST" action="/remover" style="display:inline;" onsubmit="return confirm('Remover pedido?');">
              <input type="hidden" name="id" value="${p.id}">
              <button type="submit">Remover</button>
            </form>
            <form method="POST" action="/modo-conversa/toggle" style="display:inline;">
              <input type="hidden" name="numero" value="${p.numero}">
              <button type="submit" style="background-color: ${modoAtivo ? '#4CAF50' : '#f44336'}; color: white;">
                ${modoAtivo ? 'Modo Conversa ON' : 'Modo Conversa OFF'}
              </button>
            </form>
          </td>
        </tr>
        `;
    });

    html += `
      </tbody>
    </table>
    `;

    res.send(html);
});

app.post('/finalizar', async (req, res) => {
    const id = Number(req.body.id);
    const pedidos = lerPedidos();
    const index = pedidos.findIndex(p => p.id === id && p.status === 'ativo');

    if (index !== -1) {
        pedidos[index].status = 'finalizado';
        salvarPedidos(pedidos);

        const sock = getSock();
        if (sock) {
            try {
                await sock.sendMessage(pedidos[index].numero, { text: '✅ Seu pedido foi finalizado. Obrigado pelo contato!' });
            } catch (err) {
                console.error('Erro ao enviar mensagem:', err);
            }
        }
    }

    res.redirect('/');
});

app.post('/remover', (req, res) => {
    const id = Number(req.body.id);
    let pedidos = lerPedidos();
    pedidos = pedidos.filter(p => p.id !== id);
    salvarPedidos(pedidos);
    res.redirect('/');
});

app.post('/modo-conversa/toggle', (req, res) => {
    const numero = req.body.numero;
    let lista = lerModoConversa();

    if (lista.includes(numero)) {
        lista = lista.filter(n => n !== numero); 
    } else {
        lista.push(numero); 
    }

    salvarModoConversa(lista);

    res.redirect('/');
});

module.exports = app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
