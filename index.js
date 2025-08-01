
document.addEventListener("DOMContentLoaded", () => {
  const carrosseis = document.querySelectorAll('.carrossel-imagens');

  carrosseis.forEach(carrossel => {
    const slider = carrossel.querySelector('.slider-container');
    const dots = carrossel.querySelectorAll('.nav-dot');
    let index = 0;

    const updateSlider = () => {
      slider.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach(dot => dot.classList.remove('active'));
      if (dots[index]) dots[index].classList.add('active');
    };

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        index = i;
        updateSlider();
      });
    });

    updateSlider();
  });
});

// Seleciona elementos
const depoimentos = document.querySelectorAll('.item-card');
const depoimentosDots = document.querySelectorAll('.dot');
let depoIndex = 0;

// Mostra dois depoimentos por vez
function mostrarDoisDepoimentos() {
  const total = depoimentos.length;

  // Remove todas as classes
  depoimentos.forEach(item => item.classList.remove('ativo'));
  depoimentosDots.forEach(dot => dot.classList.remove('active'));

  // Calcula os dois índices ativos
  const primeiro = depoIndex;
  const segundo = (depoIndex + 1) % total;

  // Ativa os dois depoimentos visíveis
  depoimentos[primeiro].classList.add('ativo');
  depoimentos[segundo].classList.add('ativo');

  // Ativa o dot correspondente ao primeiro
  if (depoimentosDots[primeiro]) {
    depoimentosDots[primeiro].classList.add('active');
  }
}

// Avança com looping infinito
function avancarDepoimento() {
  depoIndex = (depoIndex + 1) % depoimentos.length;
  mostrarDoisDepoimentos();
}

// Inicializa carrossel
mostrarDoisDepoimentos();

// ⏱️ Avança automaticamente a cada 6 segundos
setInterval(avancarDepoimento, 6000);

const carrossel = document.getElementById('carrossel');
const btnLeft = document.querySelector('.btn-nav.left');
const btnRight = document.querySelector('.btn-nav.right');

btnLeft.addEventListener('click', () => {
  carrossel.scrollBy({
    left: -300,
    behavior: 'smooth'
  });
});

btnRight.addEventListener('click', () => {
  carrossel.scrollBy({
    left: 300,
    behavior: 'smooth'
  });
});