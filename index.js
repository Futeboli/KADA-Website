
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

const depoimentosCarrossel = document.querySelector('#depoimentos .carrossel');
const depoimentos = depoimentosCarrossel.querySelectorAll('.item-card');
const depoimentosDots = document.querySelectorAll('#depoimentos .dot');
let depoIndex = 0;

function mostrarDoisDepoimentos() {
  // Desativa todos
  depoimentos.forEach(item => {
    item.classList.remove('ativo');
  });

  // Ativa dois depoimentos: atual e o próximo
  const total = depoimentos.length;

  // Corrige caso tenha número ímpar e evite repetir o último duas vezes
  const primeiro = depoIndex % total;
  const segundo = (primeiro + 1) % total;

  depoimentos[primeiro].classList.add('ativo');
  depoimentos[segundo].classList.add('ativo');

  // Atualiza os dots (mostra onde começou o par)
  depoimentosDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === primeiro);
  });
}

// Clique nos dots para navegar manualmente
depoimentosDots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    depoIndex = i;
    mostrarDoisDepoimentos();
  });
});

// Auto-rotação a cada 6 segundos
setInterval(() => {
  depoIndex = (depoIndex + 2) % depoimentos.length;
  mostrarDoisDepoimentos();
}, 6000);

mostrarDoisDepoimentos();