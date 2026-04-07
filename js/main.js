"use strict";

// Comparison Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
  const sliders = document.querySelectorAll('.comparison-slider');
  
  sliders.forEach(slider => {
    const handle = slider.querySelector('.comparison-handle');
    const afterImg = slider.querySelector('.comparison-img-after');
    let isActive = false;

    function updateSlider(e) {
      const rect = slider.getBoundingClientRect();
      let x = e.clientX - rect.left;

      // Para touch events
      if (e.touches) {
        x = e.touches[0].clientX - rect.left;
      }

      // Limitar x entre 0 y el ancho del slider
      x = Math.max(0, Math.min(x, rect.width));

      const percentage = (x / rect.width) * 100;

      // Mover el handle (que contiene la línea)
      handle.style.left = percentage + '%';
      // Actualizar el clip de la imagen "después"
      afterImg.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    }

    function startDrag(e) {
      e.preventDefault();
      isActive = true;
      slider.classList.add('is-dragging');
      updateSlider(e);
    }

    function stopDrag() {
      isActive = false;
      slider.classList.remove('is-dragging');
    }

    function moveDrag(e) {
      if (!isActive) return;
      e.preventDefault();
      updateSlider(e);
    }

    // Mouse events
    slider.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', moveDrag);
    document.addEventListener('mouseup', stopDrag);

    // Touch events
    slider.addEventListener('touchstart', startDrag, { passive: false });
    document.addEventListener('touchmove', moveDrag, { passive: false });
    document.addEventListener('touchend', stopDrag);

    // Prevenir selección de texto
    slider.addEventListener('selectstart', (e) => e.preventDefault());
  });
});
