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
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aqui você pode adicionar a lógica para enviar o formulário
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        
        // Limpar formulário
        form.reset();
    });
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