// JavaScript para página de Serviços - K.A.D.A. Systems
// Animações e interatividade profissionais

document.addEventListener('DOMContentLoaded', function() {
    // Inicialização de todas as funcionalidades
    initHeader();
    initMobileMenu();
    initScrollAnimations();
    initCounterAnimations();
    initFloatingCards();
    initServiceCards();
    initProcessTimeline();
    initTechItems();
    initContactForm();
    initSmoothScrolling();
    initParallaxEffects();
    initPerformanceOptimizations();
});

// === HEADER E NAVEGAÇÃO ===
function initHeader() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Header hide/show on scroll
        if (scrollY > lastScrollY && scrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScrollY = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }, { passive: true });
}

function initMobileMenu() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-contact-btn');

    if (hamburgerMenu && mobileNav) {
        hamburgerMenu.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            const icon = hamburgerMenu.querySelector('i');
            
            if (mobileNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                document.body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });

        // Fechar menu ao clicar em links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                const icon = hamburgerMenu.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            });
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (mobileNav.classList.contains('active') && 
                !mobileNav.contains(e.target) && 
                !hamburgerMenu.contains(e.target)) {
                mobileNav.classList.remove('active');
                const icon = hamburgerMenu.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });

        // Fechar menu com ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                const icon = hamburgerMenu.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
    }
}

// === ANIMAÇÕES DE SCROLL ===
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animação especial para cards de serviço
                if (entry.target.classList.contains('service-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    entry.target.style.animationDelay = `${delay}ms`;
                }

                // Animação especial para steps do processo
                if (entry.target.classList.contains('process-step')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 200;
                    entry.target.style.animationDelay = `${delay}ms`;
                }

                // Não observar mais após animar
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elementos para animar
    const animatedElements = document.querySelectorAll(`
        .hero-content, .hero-visual, .section-header, .service-card, 
        .process-step, .tech-category, .contact-info, .contact-form
    `);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// === ANIMAÇÃO DE CONTADORES ===
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.5 });

    if (counters.length > 0) {
        counterObserver.observe(counters[0].closest('.hero-stats'));
    }

    function animateCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    }
}

// === FLOATING CARDS ANIMATION ===
function initFloatingCards() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        // Animação inicial com delay
        card.style.animationDelay = `${index * 0.2}s`;
        
        // Interação com mouse
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.boxShadow = '0 15px 50px rgba(138, 43, 226, 0.3)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });

        // Efeito de clique
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(-5px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Movimento sutil baseado no mouse
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function updateFloatingCards() {
        floatingCards.forEach((card, index) => {
            const intensity = (index + 1) * 0.5;
            const x = mouseX * intensity;
            const y = mouseY * intensity;
            
            card.style.transform += ` translate(${x}px, ${y}px)`;
        });
        
        requestAnimationFrame(updateFloatingCards);
    }

    updateFloatingCards();
}

// === SERVICE CARDS INTERACTIONS ===
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const btn = card.querySelector('.btn-service');
        
        // Efeito hover melhorado
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px)';
            this.style.boxShadow = '0 25px 70px rgba(138, 43, 226, 0.25)';
            
            // Animação do botão
            if (btn) {
                btn.style.transform = 'translateY(-2px)';
                btn.style.boxShadow = '0 8px 20px rgba(138, 43, 226, 0.3)';
            }
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            
            if (btn) {
                btn.style.transform = '';
                btn.style.boxShadow = '';
            }
        });

        // Animação de clique no botão
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Efeito ripple
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
                
                // Simular ação do botão
                console.log('Serviço selecionado:', card.querySelector('h3').textContent);
            });
        }
    });

    // Adicionar CSS para ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// === PROCESS TIMELINE ANIMATIONS ===
function initProcessTimeline() {
    const processSteps = document.querySelectorAll('.process-step');
    
    const processObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stepNumber = entry.target.querySelector('.step-number');
                const stepIcon = entry.target.querySelector('.step-icon');
                
                // Animação do número
                if (stepNumber) {
                    stepNumber.style.transform = 'scale(1.2)';
                    stepNumber.style.boxShadow = '0 0 30px rgba(138, 43, 226, 0.6)';
                    
                    setTimeout(() => {
                        stepNumber.style.transform = '';
                        stepNumber.style.boxShadow = '0 0 20px rgba(138, 43, 226, 0.5)';
                    }, 300);
                }
                
                // Animação do ícone
                if (stepIcon) {
                    stepIcon.style.transform = 'scale(1.1) rotate(360deg)';
                    setTimeout(() => {
                        stepIcon.style.transform = '';
                    }, 500);
                }
                
                processObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });

    processSteps.forEach(step => {
        processObserver.observe(step);
        
        // Hover effects
        step.addEventListener('mouseenter', function() {
            const content = this.querySelector('.step-content');
            if (content) {
                content.style.transform = 'translateY(-8px)';
                content.style.boxShadow = '0 15px 50px rgba(138, 43, 226, 0.25)';
            }
        });

        step.addEventListener('mouseleave', function() {
            const content = this.querySelector('.step-content');
            if (content) {
                content.style.transform = '';
                content.style.boxShadow = '';
            }
        });
    });
}

// === TECH ITEMS INTERACTIONS ===
function initTechItems() {
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach((item, index) => {
        // Animação de entrada com delay
        item.style.animationDelay = `${index * 50}ms`;
        
        // Hover effects
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.background = 'rgba(138, 43, 226, 0.15)';
            this.style.borderColor = 'var(--accent-color)';
            
            // Efeito no ícone
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.color = '#ffffff';
            }
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.background = '';
            this.style.borderColor = '';
            
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = '';
                icon.style.color = '';
            }
        });

        // Efeito de clique
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            console.log('Tecnologia selecionada:', this.querySelector('span').textContent);
        });
    });
}

// === FORMULÁRIO DE CONTATO ===
function initContactForm() {
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('input, select, textarea');
    const submitBtn = form.querySelector('.btn-submit');
    
    // Animações nos inputs
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 8px 25px rgba(138, 43, 226, 0.15)';
        });

        input.addEventListener('blur', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });

        // Validação em tempo real
        input.addEventListener('input', function() {
            validateField(this);
        });
    });

    // Submit do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Animação do botão
        submitBtn.style.transform = 'scale(0.98)';
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        // Simular envio
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado!';
            submitBtn.style.background = '#28a745';
            
            // Reset após 3 segundos
            setTimeout(() => {
                form.reset();
                submitBtn.innerHTML = '<span>Enviar Mensagem</span><i class="fas fa-paper-plane"></i>';
                submitBtn.style.background = '';
                submitBtn.style.transform = '';
            }, 3000);
        }, 2000);
    });

    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;

        // Remover classes de validação anteriores
        field.classList.remove('valid', 'invalid');

        // Validações específicas
        switch (field.type) {
            case 'email':
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                break;
            case 'tel':
                isValid = value === '' || /^[\d\s\-\(\)\+]+$/.test(value);
                break;
            default:
                isValid = field.required ? value !== '' : true;
        }

        // Aplicar classe de validação
        if (value !== '') {
            field.classList.add(isValid ? 'valid' : 'invalid');
        }

        return isValid;
    }

    // CSS para validação
    const validationStyle = document.createElement('style');
    validationStyle.textContent = `
        .form-group input.valid,
        .form-group select.valid,
        .form-group textarea.valid {
            border-color: #28a745;
            box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.1);
        }
        
        .form-group input.invalid,
        .form-group select.invalid,
        .form-group textarea.invalid {
            border-color: #dc3545;
            box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
        }
    `;
    document.head.appendChild(validationStyle);
}

// === SMOOTH SCROLLING ===
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Botões CTA
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .contact-btn, .mobile-contact-btn');
    
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const contactSection = document.querySelector('#contato');
            if (contactSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = contactSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// === EFEITOS PARALLAX ===
function initParallaxEffects() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const backgroundPattern = document.querySelector('.background-pattern');
        
        if (backgroundPattern) {
            const speed = 0.3;
            const yPos = -(scrolled * speed);
            backgroundPattern.style.transform = `translateY(${yPos}px)`;
        }
        
        // Parallax nas floating cards
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach((card, index) => {
            const speed = 0.1 + (index * 0.02);
            const yPos = scrolled * speed;
            card.style.transform += ` translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
}

// === OTIMIZAÇÕES DE PERFORMANCE ===
function initPerformanceOptimizations() {
    // Lazy loading para imagens
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

    // Otimização para dispositivos touch
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.classList.add('touch-device');
        
        // Remover hover effects em dispositivos touch
        const style = document.createElement('style');
        style.textContent = `
            .touch-device .service-card:hover,
            .touch-device .tech-item:hover,
            .touch-device .floating-card:hover {
                transform: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Prevenção de zoom em inputs no iOS
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                document.querySelector('meta[name=viewport]').setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1');
            });
            
            input.addEventListener('blur', function() {
                document.querySelector('meta[name=viewport]').setAttribute('content', 'width=device-width, initial-scale=1');
            });
        });
    }

    // Debounce para resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Recalcular posições se necessário
            console.log('Window resized');
        }, 250);
    });
}

// === EASTER EGGS E INTERAÇÕES ESPECIAIS ===
document.addEventListener('DOMContentLoaded', function() {
    // Comando secreto
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            activateEasterEgg();
            konamiCode = [];
        }
    });
    
    function activateEasterEgg() {
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'spin 2s ease-in-out';
            }, index * 100);
        });
        
        // Adicionar CSS para spin
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                from { transform: rotate(0deg) scale(1); }
                50% { transform: rotate(180deg) scale(1.2); }
                to { transform: rotate(360deg) scale(1); }
            }
        `;
        document.head.appendChild(style);
        
        console.log('🎉 Easter egg ativado! K.A.D.A. Systems é incrível!');
    }

    // Cursor personalizado em elementos interativos
    const interactiveElements = document.querySelectorAll(`
        .service-card, .floating-card, .tech-item, .btn-service, 
        .btn-primary, .btn-secondary, .contact-btn
    `);
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            document.body.style.cursor = 'pointer';
        });
        
        element.addEventListener('mouseleave', function() {
            document.body.style.cursor = '';
        });
    });
});

// === ANALYTICS E TRACKING (SIMULADO) ===
function trackEvent(category, action, label) {
    console.log(`Analytics: ${category} - ${action} - ${label}`);
    // Aqui seria integrado com Google Analytics ou similar
}

// Tracking de interações
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-service')) {
        trackEvent('Services', 'Click', 'Service Button');
    }
    
    if (e.target.classList.contains('tech-item')) {
        trackEvent('Technologies', 'Click', e.target.querySelector('span').textContent);
    }
    
    if (e.target.classList.contains('floating-card')) {
        trackEvent('Hero', 'Click', 'Floating Card');
    }
});

// === ACESSIBILIDADE ===
document.addEventListener('DOMContentLoaded', function() {
    // Navegação por teclado
    const focusableElements = document.querySelectorAll(`
        a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])
    `);
    
    focusableElements.forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                if (this.tagName === 'BUTTON' || this.tagName === 'A') {
                    this.click();
                }
            }
        });
    });

    // Indicadores de foco melhorados
    const style = document.createElement('style');
    style.textContent = `
        *:focus {
            outline: 2px solid var(--accent-color);
            outline-offset: 2px;
        }
        
        .service-card:focus,
        .tech-item:focus,
        .floating-card:focus {
            outline: 3px solid var(--accent-color);
            outline-offset: 4px;
        }
    `;
    document.head.appendChild(style);
});

console.log('🚀 K.A.D.A. Systems - Página de Serviços carregada com sucesso!');
console.log('💡 Dica: Tente o código Konami para uma surpresa!');
