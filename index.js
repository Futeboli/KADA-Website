// let itens = document.querySelectorAll(".item");
// let index = 0;

// setInterval(() => {
//   itens.forEach(item => item.classList.remove("ativo"));
//   index = (index + 1) % itens.length;
//   itens[index].classList.add("ativo");
// }, 4000);

// document

// Carrossel de Depoimentos
let itens = document.querySelectorAll(".depoimentos .item");
let index = 0;

function showNextTestimonial() {
    itens.forEach(item => item.classList.remove("ativo"));
    index = (index + 1) % itens.length;
    itens[index].classList.add("ativo");
}
// Inicia o carrossel após 2 segundos
setTimeout(() => {
    itens[0].classList.add("ativo");
    setInterval(showNextTestimonial, 5000);
}, 2000);


// Header Fixo com Efeito de Sombra
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// Fundo Interativo (Gradiente que segue o mouse)
const interactiveBg = document.createElement('div');
interactiveBg.classList.add('interactive-bg');
document.body.appendChild(interactiveBg);

document.addEventListener('mousemove', (e) => {
    interactiveBg.style.background = `radial-gradient(circle at ${e.clientX}px ${e.clientY}px, rgba(138, 43, 226, 0.2) 0%, rgba(138, 43, 226, 0) 50%)`;
});

// Carrossel de Imagens
const slider = document.querySelector('.slider-container');
const slides = document.querySelectorAll('.slide-item');
const navDots = document.querySelectorAll('.nav-dot');
let currentSlide = 0;

function updateSlider() {
  const offset = -currentSlide * 100;
  slider.style.transform = `translateX(${offset}%)`;

  navDots.forEach(dot => dot.classList.remove('active'));
  navDots[currentSlide].classList.add('active');
}

navDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index;
    updateSlider();
  });
});

setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlider();
}, 6000);