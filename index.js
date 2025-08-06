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

// === CARROSSEL DE DEPOIMENTOS COM TRANSIÇÕES SUAVES ===
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.item-card');
const testimonialDots = document.querySelectorAll('.dots-container .dot');
let isTransitioning = false;

function showTestimonial(index, direction = 'next') {
    if (testimonials.length === 0 || isTransitioning || index === currentTestimonial) return;
    
    isTransitioning = true;
    
    // Remove classe ativa do depoimento atual
    const currentCard = testimonials[currentTestimonial];
    currentCard.classList.add('saindo');
    
    // Determina a animação baseada na direção
    let animationClass = 'fade-in-up';
    if (direction === 'next') {
        animationClass = 'slide-in-right';
    } else if (direction === 'prev') {
        animationClass = 'slide-in-left';
    }
    
    setTimeout(() => {
        // Remove classe ativa do depoimento atual
        currentCard.classList.remove('ativo', 'saindo');
        
        // Atualiza o índice atual
        currentTestimonial = index;
        
        // Ativa o novo depoimento
        const newCard = testimonials[currentTestimonial];
        newCard.classList.add('ativo', animationClass);
        
        // Atualiza os pontos de navegação
        testimonialDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentTestimonial);
        });
        
        // Remove a classe de animação após a transição
        setTimeout(() => {
            newCard.classList.remove(animationClass);
            isTransitioning = false;
        }, 800);
        
    }, 400);
}

function nextTestimonial() {
    const nextIndex = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(nextIndex, 'next');
}

function prevTestimonial() {
    const prevIndex = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(prevIndex, 'prev');
}

// Event listeners para pontos dos depoimentos
testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        if (index !== currentTestimonial) {
            const direction = index > currentTestimonial ? 'next' : 'prev';
            showTestimonial(index, direction);
        }
    });
});

// Auto-play dos depoimentos com pausa ao hover
let testimonialAutoPlay;

function startTestimonialAutoPlay() {
    if (testimonials.length > 0) {
        testimonialAutoPlay = setInterval(nextTestimonial, 6000);
    }
}

function stopTestimonialAutoPlay() {
    if (testimonialAutoPlay) {
        clearInterval(testimonialAutoPlay);
        testimonialAutoPlay = null;
    }
}

// Controles de auto-play
const testimonialsSection = document.querySelector('.depoimentos');
if (testimonialsSection) {
    testimonialsSection.addEventListener('mouseenter', stopTestimonialAutoPlay);
    testimonialsSection.addEventListener('mouseleave', startTestimonialAutoPlay);
    
    // Inicia o auto-play
    startTestimonialAutoPlay();
}

// Navegação por teclado para depoimentos
document.addEventListener('keydown', (e) => {
    if (testimonialsSection && testimonialsSection.matches(':hover')) {
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                prevTestimonial();
                break;
            case 'ArrowRight':
                e.preventDefault();
                nextTestimonial();
                break;
        }
    }
});

// Suporte a gestos touch para depoimentos
let touchStartX = 0;
let touchEndX = 0;

if (testimonialsSection) {
    testimonialsSection.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    testimonialsSection.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleTestimonialSwipe();
    }, { passive: true });
}

function handleTestimonialSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - próximo depoimento
            nextTestimonial();
        } else {
            // Swipe right - depoimento anterior
            prevTestimonial();
        }
    }
}

// Pausa auto-play quando a aba não está visível
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopTestimonialAutoPlay();
    } else {
        startTestimonialAutoPlay();
    }
});

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

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Garantir que apenas o primeiro depoimento esteja visível inicialmente
    testimonials.forEach((testimonial, index) => {
        if (index === 0) {
            testimonial.classList.add('ativo');
        } else {
            testimonial.classList.remove('ativo');
        }
    });
    
    // Garantir que o primeiro dot esteja ativo
    testimonialDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === 0);
    });
});

console.log('NovaSoft - Website carregado com sucesso!');