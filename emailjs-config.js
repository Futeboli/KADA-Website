// EmailJS Configuration
(function() {
  // https://www.emailjs.com/docs/sdk/installation/
  const PUBLIC_KEY = "your_emailjs_public_key"; // SUBSTITUA com sua chave pública do EmailJS
  const SERVICE_ID = "your_emailjs_service_id"; // SUBSTITUA com seu ID de serviço do EmailJS
  const TEMPLATE_ID = "your_emailjs_template_id"; // SUBSTITUA com seu ID de template do EmailJS
  
  // Initialize EmailJS with your public key
  emailjs.init(PUBLIC_KEY);
  
  window.sendWithEmailJS = async function(name, email, message) {
    try {
      // Adicionar mais parâmetros para garantir que o nome e email apareçam no email recebido
      const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        from_name: name,
        name: name,
        email: email,
        reply_to: email,
        message: message,
        subject: `Novo contato via site - ${name}`,
        // Adicionar campos adicionais que possam ser usados no template do EmailJS
        contact_name: name,
        contact_email: email,
        contact_message: message
      });
      
      return {
        success: true,
        message: "Mensagem enviada com sucesso! Entraremos em contato em breve."
      };
    } catch (error) {
      console.error("Erro ao enviar com EmailJS:", error);
      return {
        success: false,
        message: "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde."
      };
    }
  };
})();