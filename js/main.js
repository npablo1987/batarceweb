"use strict";

// Dark Mode Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;
  
  // Check for saved theme preference or default to 'light'
  const currentTheme = localStorage.getItem('theme') || 'light';
  htmlElement.setAttribute('data-theme', currentTheme);
  
  // Toggle theme function
  function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }
  
  // Add click event listener to toggle button
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
});

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
