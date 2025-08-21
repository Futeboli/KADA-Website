// JavaScript integrado - K.A.D.A. Systems com funcionalidades da Ubistart e Tab Menu

// Efeito de scroll no header (adaptado para o novo header)
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

// Funcionalidade do Tab Menu - NOVA IMPLEMENTAÇÃO OTIMIZADA
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Função para ativar uma aba específica
    function activateTab(targetTab) {
        // Remove active de todos os botões
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.style.color = 'rgba(224, 224, 224, 0.7)';
            btn.style.borderBottom = '2px solid transparent';
        });
        
        // Remove active de todos os conteúdos
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Ativa o botão clicado
        targetTab.classList.add('active');
        targetTab.style.color = '#fff';
        targetTab.style.borderBottom = '2px solid var(--accent-color)';
        
        // Ativa o conteúdo correspondente
        const targetId = targetTab.getAttribute('data-tab');
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    }
    
    // Event listeners para os botões das abas
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Só executa se a aba não estiver já ativa
            if (!this.classList.contains('active')) {
                activateTab(this);
            }
        });
        
        // Adiciona suporte para navegação por teclado (acessibilidade)
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (!this.classList.contains('active')) {
                    activateTab(this);
                }
            }
        });
        
        // Torna os botões focáveis para acessibilidade
        button.setAttribute('tabindex', '0');
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-selected', button.classList.contains('active') ? 'true' : 'false');
    });
    
    // Configura os conteúdos para acessibilidade
    tabContents.forEach(content => {
        content.setAttribute('role', 'tabpanel');
        content.setAttribute('aria-hidden', content.classList.contains('active') ? 'false' : 'true');
    });
    
    // Inicialização: garante que a primeira aba esteja ativa
    if (tabButtons.length > 0 && !document.querySelector('.tab-button.active')) {
        activateTab(tabButtons[0]);
    }
});

// Efeito de fundo interativo (seguindo o mouse) - Mantido do original
document.addEventListener('DOMContentLoaded', function() {
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = (e.clientX / window.innerWidth) * 100;
        mouseY = (e.clientY / window.innerHeight) * 100;
        
        // Aplicar efeito sutil no padrão de fundo
        const backgroundPattern = document.querySelector('.background-pattern');
        if (backgroundPattern) {
            backgroundPattern.style.transform = `translate(${mouseX * 0.02}px, ${mouseY * 0.02}px)`;
        }
    });
});

// Carrossel infinito - Mantido do original
document.addEventListener('DOMContentLoaded', function() {
    const sliderInfinite = document.querySelector('.slider-infinite');
    
    if (sliderInfinite) {
        // Pausar animação ao hover
        sliderInfinite.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        sliderInfinite.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }
});

// Carrossel de Imagens (Projetos) - Mantido do original
document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide-item');
    const navDots = document.querySelectorAll('.nav-dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        navDots.forEach(dot => dot.classList.remove('active'));
        
        if (navDots[index]) {
            navDots[index].classList.add('active');
        }
        
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

    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopSlideshow();
            startSlideshow();
        });
    });

    if (slides.length > 0) {
        startSlideshow();
        
        const carrosselImagens = document.querySelector('.carrossel-imagens');
        if (carrosselImagens) {
            carrosselImagens.addEventListener('mouseenter', stopSlideshow);
            carrosselImagens.addEventListener('mouseleave', startSlideshow);
        }
    }
});

// Carrossel de Depoimentos - Mantido do original
document.addEventListener('DOMContentLoaded', function() {
    const depoimentoCards = document.querySelectorAll('.item-card');
    const depoimentoDots = document.querySelectorAll('.dots-container .dot');
    let currentDepoimento = 0;
    let depoimentoInterval;

    function showDepoimento(index) {
        depoimentoCards.forEach(card => {
            card.classList.remove('ativo', 'saindo');
        });
        depoimentoDots.forEach(dot => dot.classList.remove('active'));

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

    depoimentoDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (index !== currentDepoimento) {
                if (depoimentoCards[currentDepoimento]) {
                    depoimentoCards[currentDepoimento].classList.add('saindo');
                }
                
                setTimeout(() => {
                    showDepoimento(index);
                }, 300);
                
                stopDepoimentoSlideshow();
                startDepoimentoSlideshow();
            }
        });
    });

    if (depoimentoCards.length > 0) {
        startDepoimentoSlideshow();
        
        const depoimentosSection = document.querySelector('.depoimentos');
        if (depoimentosSection) {
            depoimentosSection.addEventListener('mouseenter', stopDepoimentoSlideshow);
            depoimentosSection.addEventListener('mouseleave', startDepoimentoSlideshow);
        }
    }
});

// Smooth scrolling para links internos - Adaptado para o novo header
document.addEventListener('DOMContentLoaded', function() {
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
});

// Funcionalidade do botão CTA (nova funcionalidade da Ubistart)
document.addEventListener('DOMContentLoaded', function() {
    const ctaButton = document.querySelector('.cta-button');
    const contactBtn = document.querySelector('.contact-btn');
    
    function scrollToContact() {
        const contactSection = document.querySelector('#contato');
        if (contactSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = contactSection.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    if (ctaButton) {
        ctaButton.addEventListener('click', scrollToContact);
    }
    
    if (contactBtn) {
        contactBtn.addEventListener('click', scrollToContact);
    }
});

// Formulário de contato - Mantido do original
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

// Animações de entrada para elementos (nova funcionalidade)
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Elementos para animar
    const animatedElements = document.querySelectorAll('.servicos .card, .card-depoimento, .info-box');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        observer.observe(element);
    });
});

// Efeito parallax suave para o padrão de fundo
document.addEventListener('DOMContentLoaded', function() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const backgroundPattern = document.querySelector('.background-pattern');
        
        if (backgroundPattern) {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            backgroundPattern.style.transform = `translateY(${yPos}px)`;
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
});

// Otimizações para dispositivos touch - Mantido do original
document.addEventListener('DOMContentLoaded', function() {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.classList.add('touch-device');
    }
    
    // Melhorar performance em dispositivos móveis
    let ticking = false;
    
    function updateOnScroll() {
        if (!ticking) {
            requestAnimationFrame(function() {
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateOnScroll, { passive: true });
});

// Lazy loading para imagens - Mantido do original
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

// Prevenção de zoom em inputs em iOS - Mantido do original
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

// Funcionalidade do seletor de idioma (nova funcionalidade da Ubistart)
document.addEventListener('DOMContentLoaded', function() {
    const languageSelector = document.querySelector('.language-selector');
    
    if (languageSelector) {
        languageSelector.addEventListener('click', function() {
            // Aqui você pode implementar a funcionalidade de troca de idioma
            console.log('Seletor de idioma clicado');
            // Por exemplo, abrir um dropdown com opções de idioma
        });
    }
});

// Efeitos de hover aprimorados para cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.servicos .card, .card-depoimento, .info-box');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Inicialização completa
document.addEventListener('DOMContentLoaded', function() {
    console.log('K.A.D.A. Systems - Site carregado com funcionalidades da Ubistart e Tab Menu integrados!');
    
    // Verificar se todos os elementos necessários estão presentes
    const requiredElements = [
        '.header',
        '.background-pattern',
        '.hero-title',
        '.info-box',
        '.tab-button',
        '.tab-content'
    ];
    
    requiredElements.forEach(selector => {
        const element = document.querySelector(selector);
        if (!element) {
            console.warn(`Elemento não encontrado: ${selector}`);
        }
    });
    
    // Verificar funcionalidade das abas
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length > 0 && tabContents.length > 0) {
        console.log(`✓ ${tabButtons.length} botões de aba e ${tabContents.length} conteúdos encontrados e configurados`);
    } else {
        console.warn('⚠ Elementos do tab menu não encontrados');
    }
});

const buttons = document.querySelectorAll('.tab-button');
  const contents = document.querySelectorAll('.tab-content');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      // remove 'active' de todos
      buttons.forEach(btn => btn.classList.remove('active'));
      contents.forEach(content => content.classList.remove('active'));

      // adiciona 'active' no botão clicado
      button.classList.add('active');
      document.getElementById(button.dataset.tab).classList.add('active');
    });
  });
