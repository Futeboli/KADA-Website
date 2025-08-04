require('dotenv').config(); 
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); 
app.use(bodyParser.json()); 
app.use(express.static('.')); 

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Todos os campos são obrigatórios.' });
  }

  try {
    const mailOptions = {
      from: email,
      to: process.env.RECIPIENT_EMAIL || 'contato@novasoft.com', // MUDAR
      subject: `Novo contato do site - ${name}`,
      html: `
        <h3>Nova mensagem de contato</h3>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    
    return res.status(200).json({ success: true, message: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return res.status(500).json({ success: false, message: 'Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});