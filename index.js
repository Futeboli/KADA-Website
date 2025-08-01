
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
