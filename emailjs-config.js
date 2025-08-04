// EmailJS Configuration
(function() {
  // https://www.emailjs.com/docs/sdk/installation/
  const PUBLIC_KEY = "YOUR_EMAILJS_PUBLIC_KEY"; // Replace with your EmailJS public key
  const SERVICE_ID = "YOUR_EMAILJS_SERVICE_ID"; // Replace with your EmailJS service ID
  const TEMPLATE_ID = "YOUR_EMAILJS_TEMPLATE_ID"; // Replace with your EmailJS template ID
  
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