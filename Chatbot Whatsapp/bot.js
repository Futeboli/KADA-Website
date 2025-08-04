const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const { delay } = require('@whiskeysockets/baileys/lib/Utils');

const pedidosPath = './pedidos.json';
const modoConversaPath = './modoConversa.json';

const donos = ['5511999999999@s.whatsapp.net'];

function inicializarArquivoPedidos() {
    if (!fs.existsSync(pedidosPath)) {
        console.log("📁 Criando arquivo pedidos.json...");
        fs.writeFileSync(pedidosPath, JSON.stringify([], null, 2));
    }
}

function gerarNovoId(pedidos) {
    if (pedidos.length === 0) return 1;
    const ids = pedidos.map(p => p.id || 0);
    return Math.max(...ids) + 1;
}

function salvarPedidos(pedidos) {
    fs.writeFileSync(pedidosPath, JSON.stringify(pedidos, null, 2));
}

function salvarPedido(pedido) {
    const pedidos = JSON.parse(fs.readFileSync(pedidosPath));
    pedido.id = gerarNovoId(pedidos);
    pedidos.push(pedido);
    salvarPedidos(pedidos);
}

function clienteTemPedidoAtivo(numero) {
    const pedidos = JSON.parse(fs.readFileSync(pedidosPath));
    return pedidos.some(p => p.numero === numero && p.status === 'ativo');
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

function ativarModoConversa(numero) {
    const lista = lerModoConversa();
    if (!lista.includes(numero)) {
        lista.push(numero);
        salvarModoConversa(lista);
    }
}

function desativarModoConversa(numero) {
    let lista = lerModoConversa();
    lista = lista.filter(n => n !== numero);
    salvarModoConversa(lista);
}

function isModoConversaAtivo(numero) {
    const lista = lerModoConversa();
    return lista.includes(numero);
}

const questions = [
    "1️⃣ Qual o seu Nome/Empresa?",
    "2️⃣ Qual o seu e-mail?",
    "3️⃣ Qual o Serviço a ser solicitado?"
];

const sessions = {};

const saudações = ['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'e aí', 'ei', 'olá!', 'oi!'];

let sockGlobal;

async function startBot() {
    inicializarArquivoPedidos();

    const { state, saveCreds } = await useMultiFileAuthState('auth_info');
    const { version, isLatest } = await fetchLatestBaileysVersion();

    console.log(`✅ Usando Baileys versão: ${version}, é a mais recente? ${isLatest}`);

    const sock = makeWASocket({
        auth: state,
        version
    });
    sockGlobal = sock;

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', ({ connection, lastDisconnect, qr }) => {
        if (qr) {
            qrcode.generate(qr, { small: true });
            console.log('📲 Escaneie o QR Code acima para conectar-se ao bot!');
        }
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut);
            console.log('❌ Conexão encerrada, reconectando?', shouldReconnect);
            if (shouldReconnect) startBot();
        }
        if (connection === 'open') {
            console.log('✅ Bot conectado!');
        }
    });

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const sender = msg.key.remoteJid;
        const rawText = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
        const messageText = rawText.toLowerCase().trim();

        if (donos.includes(sender)) {
            return;
        }

        if (sessions[sender]) {
            const session = sessions[sender];

            if (session.step === 0) {
                session.data.nome = rawText;
                session.step++;
                await sock.sendMessage(sender, { text: questions[1] });
            } else if (session.step === 1) {
                session.data.email = rawText;
                session.step++;
                await sock.sendMessage(sender, { text: questions[2] });
            } else if (session.step === 2) {
                session.data.servico = rawText;
                session.step++;

                await sock.sendMessage(sender, {
                    text: `✅ Pedido registrado com sucesso!

                            🧑 Nome/Empresa: ${session.data.nome}
                            📧 E-mail: ${session.data.email}
                            🛠️ Serviço: ${session.data.servico}

                            Em breve entraremos em contato.`
                });
                salvarPedido({
                    numero: sender,
                    ...session.data,
                    data: new Date().toISOString(),
                    status: 'ativo'
                });

                delete sessions[sender];
            }

            return;
        }

        if (!isModoConversaAtivo(sender)) {
            const saudacoesEncontradas = saudações.some(s => messageText.includes(s));
            if (saudacoesEncontradas) {
                await sock.sendMessage(sender, {
                    text: `Olá! 👋 Para fazer um pedido, digite *pedido* para iniciar o atendimento.`
                });
                return;
            }
        }

        if (messageText === 'pedido') {
            if (clienteTemPedidoAtivo(sender)) {
                await sock.sendMessage(sender, {
                    text: "🚫 Você já tem um pedido em andamento. Por favor, aguarde o contato ou entre em contato conosco para mais informações."
                });
                return;
            }

            sessions[sender] = { step: 0, data: {} };
            await sock.sendMessage(sender, { text: "Ótimo! Vamos começar o seu pedido." });
            await delay(500);
            await sock.sendMessage(sender, { text: questions[0] });
            return;
        }

    });

    return sock;
}

function getSock() {
    return sockGlobal;
}

module.exports = { startBot, getSock, ativarModoConversa, desativarModoConversa, isModoConversaAtivo };
