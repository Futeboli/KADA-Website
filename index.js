// Menu Hambúrguer
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('nav a');

    // Toggle do menu
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', function(event) {
        if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Carrossel de Imagens (Projetos)
document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide-item');
    const navDots = document.querySelectorAll('.nav-dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Remove active class from all dots
        navDots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current dot
        if (navDots[index]) {
            navDots[index].classList.add('active');
        }
        
        // Move slider
        if (sliderContainer) {
            sliderContainer.style.transform = `translateX(-${index * 100}%)`;
        }
        
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 4000);
    }

    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    // Add click events to navigation dots
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopSlideshow();
            startSlideshow(); // Restart slideshow
        });
    });

    // Start automatic slideshow
    if (slides.length > 0) {
        startSlideshow();
        
        // Pause on hover
        const carrosselImagens = document.querySelector('.carrossel-imagens');
        if (carrosselImagens) {
            carrosselImagens.addEventListener('mouseenter', stopSlideshow);
            carrosselImagens.addEventListener('mouseleave', startSlideshow);
        }
    }
});

// Carrossel de Depoimentos
document.addEventListener('DOMContentLoaded', function() {
    const depoimentoCards = document.querySelectorAll('.item-card');
    const depoimentoDots = document.querySelectorAll('.dots-container .dot');
    let currentDepoimento = 0;
    let depoimentoInterval;

    function showDepoimento(index) {
        // Remove active class from all cards and dots
        depoimentoCards.forEach(card => {
            card.classList.remove('ativo', 'saindo');
        });
        depoimentoDots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current card and dot
        if (depoimentoCards[index]) {
            depoimentoCards[index].classList.add('ativo');
        }
        if (depoimentoDots[index]) {
            depoimentoDots[index].classList.add('active');
        }

        currentDepoimento = index;
    }

    function nextDepoimento() {
        const nextIndex = (currentDepoimento + 1) % depoimentoCards.length;
        
        // Add exit animation to current card
        if (depoimentoCards[currentDepoimento]) {
            depoimentoCards[currentDepoimento].classList.add('saindo');
        }
        
        setTimeout(() => {
            showDepoimento(nextIndex);
        }, 300);
    }

    function startDepoimentoSlideshow() {
        depoimentoInterval = setInterval(nextDepoimento, 5000);
    }

    function stopDepoimentoSlideshow() {
        clearInterval(depoimentoInterval);
    }

    // Add click events to depoimento dots
    depoimentoDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (index !== currentDepoimento) {
                // Add exit animation to current card
                if (depoimentoCards[currentDepoimento]) {
                    depoimentoCards[currentDepoimento].classList.add('saindo');
                }
                
                setTimeout(() => {
                    showDepoimento(index);
                }, 300);
                
                stopDepoimentoSlideshow();
                startDepoimentoSlideshow(); // Restart slideshow
            }
        });
    });

    // Start automatic slideshow for depoimentos
    if (depoimentoCards.length > 0) {
        startDepoimentoSlideshow();
        
        // Pause on hover
        const depoimentosSection = document.querySelector('.depoimentos');
        if (depoimentosSection) {
            depoimentosSection.addEventListener('mouseenter', stopDepoimentoSlideshow);
            depoimentosSection.addEventListener('mouseleave', startDepoimentoSlideshow);
        }
    }
});

// Smooth scrolling para links internos
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Header scroll effect
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

// Formulário de contato (mantendo funcionalidade original se existir)
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('Formulario-home');
    const formStatus = document.getElementById('form-status');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const message = document.getElementById('contact-message').value;
            
            if (name && email && message) {
                // Aqui você pode integrar com EmailJS ou outro serviço
                if (formStatus) {
                    formStatus.innerHTML = '<p style="color: #8a2be2;">Mensagem enviada com sucesso!</p>';
                    form.reset();
                    
                    setTimeout(() => {
                        formStatus.innerHTML = '';
                    }, 5000);
                }
            } else {
                if (formStatus) {
                    formStatus.innerHTML = '<p style="color: #ff6b6b;">Por favor, preencha todos os campos.</p>';
                    
                    setTimeout(() => {
                        formStatus.innerHTML = '';
                    }, 5000);
                }
            }
        });
    }
});

// Otimizações para touch devices
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar classe para dispositivos touch
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.classList.add('touch-device');
    }
    
    // Melhorar performance em dispositivos móveis
    let ticking = false;
    
    function updateOnScroll() {
        // Throttle scroll events
        if (!ticking) {
            requestAnimationFrame(function() {
                // Scroll effects aqui
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateOnScroll, { passive: true });
});

// Lazy loading para imagens (se necessário)
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// Prevenção de zoom em inputs em iOS
document.addEventListener('DOMContentLoaded', function() {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                if (input.style.fontSize !== '16px') {
                    input.style.fontSize = '16px';
                }
            });
        });
    }
});

