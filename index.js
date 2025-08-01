
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

// --- Carrossel de Depoimentos em pares sincronizados ---
const depoimentosCarrossel = document.querySelector('#depoimentos .carrossel');
const depoimentos = depoimentosCarrossel.querySelectorAll('.item-card');
const depoimentosDots = document.querySelectorAll('#depoimentos .dot');
let depoIndex = 0;

function mostrarDoisDepoimentos() {
  // Limpa todos
  depoimentos.forEach(item => item.classList.remove('ativo'));

  // Ativa dois: atual e próximo
  const total = depoimentos.length;
  const primeiro = depoIndex % total;
  const segundo = (depoIndex + 1) % total;

  depoimentos[primeiro].classList.add('ativo');
  depoimentos[segundo].classList.add('ativo');

  // Atualiza os dots
  depoimentosDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === primeiro);
  });
}

// Clique nos dots
depoimentosDots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    depoIndex = i;
    mostrarDoisDepoimentos();
  });
});

// Auto-rotação a cada 4 segundos
setInterval(() => {
  depoIndex = (depoIndex + 2) % depoimentos.length;
  mostrarDoisDepoimentos();
}, 6000); // ← Aqui está o tempo de delay

mostrarDoisDepoimentos();