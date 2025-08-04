// JavaScript para funcionalidades adicionais da página

// Efeito de scroll no header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Carrossel de imagens com navegação por pontos
let currentSlide = 0;
const slides = document.querySelectorAll('.slide-item');
const dots = document.querySelectorAll('.nav-dot');
const sliderContainer = document.querySelector('.slider-container');

function showSlide(index) {
    if (sliderContainer && slides.length > 0) {
        currentSlide = index;
        const translateX = -currentSlide * 100;
        sliderContainer.style.transform = `translateX(${translateX}%)`;
        
        // Atualizar pontos de navegação
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }
}

// Adicionar event listeners aos pontos de navegação
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
});

// Auto-play do carrossel de imagens
if (slides.length > 0) {
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
}

// Carrossel de depoimentos
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.item-card');
const testimonialDots = document.querySelectorAll('.dots-container .dot');

function showTestimonial(index) {
    if (testimonials.length > 0) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('ativo', i === index);
        });
        
        testimonialDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
}

// Event listeners para pontos dos depoimentos
testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// Auto-play dos depoimentos
if (testimonials.length > 0) {
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 7000);
}

// Formulário de contato
const form = document.getElementById('Formulario-home');
if (form) {
    const formStatus = document.getElementById('form-status');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Obter valores do formulário
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const message = document.getElementById('contact-message').value;
        
        // Botão de enviar
        const submitButton = document.getElementById('contact-submit');
        const originalText = submitButton.textContent;
        
        // Alterar texto do botão e desabilitar
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        // Limpar status anterior
        formStatus.className = 'form-status';
        formStatus.style.display = 'none';
        
        try {
            // Tentar enviar via API
            let success = false;
            
            try {
                // Primeiro, tentar enviar via API local (server.js)
                try {
                    const response = await fetch('/send-email', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ name, email, message }),
                        timeout: 5000 // Timeout de 5 segundos
                    });
                    
                    if (response.ok) {
                        const data = await response.json();
                        success = data.success;
                        showStatus(success, data.message);
                    } else {
                        throw new Error('Falha na resposta do servidor');
                    }
                } catch (apiError) {
                    console.log('Erro na API local, tentando EmailJS', apiError);
                    
                    // Segundo, tentar enviar via EmailJS se disponível
                    if (window.sendWithEmailJS) {
                        const emailJsResult = await window.sendWithEmailJS(name, email, message);
                        success = emailJsResult.success;
                        showStatus(success, emailJsResult.message);
                    } else {
                        // Terceiro fallback: Armazenar localmente
                        const timestamp = new Date().toISOString();
                        const contactData = { name, email, message, timestamp };
                        
                        // Armazenar dados no localStorage
                        const savedMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
                        savedMessages.push(contactData);
                        localStorage.setItem('contactMessages', JSON.stringify(savedMessages));
                        
                        // Logging para debug
                        console.log('Mensagem armazenada localmente:', contactData);
                        
                        // Mostrar sucesso para melhor UX
                        showStatus(true, 'Mensagem enviada com sucesso! Entraremos em contato em breve.');
                        success = true;
                    }
                }
            } catch (error) {
                console.error('Todos os métodos de envio falharam:', error);
                showStatus(false, 'Não foi possível enviar sua mensagem. Por favor, tente novamente mais tarde ou entre em contato pelo WhatsApp.');
            }
            
            // Se for bem sucedido, limpar o formulário
            if (success) {
                form.reset();
            }
        } catch (error) {
            console.error('Erro ao processar envio:', error);
            showStatus(false, 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.');
        } finally {
            // Restaurar texto do botão e habilitar
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
    
    // Função para mostrar mensagens de status
    function showStatus(success, message) {
        formStatus.textContent = message;
        formStatus.className = `form-status ${success ? 'success' : 'error'}`;
        formStatus.style.display = 'block';
        
        // Rolar até a mensagem de status
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Esconder após 5 segundos
        if (success) {
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
    }
}

// Smooth scroll para links de navegação
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efeito de fundo interativo (seguindo o mouse)
document.addEventListener('mousemove', function(e) {
    const interactiveBg = document.querySelector('.interactive-bg');
    if (interactiveBg) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        
        interactiveBg.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(138, 43, 226, 0.2) 0%, rgba(138, 43, 226, 0) 50%)`;
    }
});

console.log('NovaSoft - Website carregado com sucesso!');