// Simple email server for handling contact form submissions
require('dotenv').config(); // For loading environment variables
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON bodies
app.use(express.static('.')); // Serve static files from current directory

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this to another service
  auth: {
    user: process.env.EMAIL_USER || 'company@novasoft.com', // Replace with your email
    pass: process.env.EMAIL_PASS || 'your-app-password' // Use app password for Gmail
  }
});

// Handle contact form submissions
app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Todos os campos são obrigatórios.' });
  }

  try {
    // Email options
    const mailOptions = {
      from: email,
      to: process.env.RECIPIENT_EMAIL || 'contato@novasoft.com', // Replace with your company email
      subject: `Novo contato do site - ${name}`,
      html: `
        <h3>Nova mensagem de contato</h3>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message}</p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);
    
    return res.status(200).json({ success: true, message: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return res.status(500).json({ success: false, message: 'Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});