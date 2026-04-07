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

// Banner Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.carousel-container');
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  
  let currentSlide = 0;
  let autoplayInterval;
  
  function showSlide(n) {
    // Remover clase active de todos los slides y dots
    slides.forEach(slide => slide.classList.remove('carousel-slide-active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Agregar clase active al slide y dot actual
    slides[n].classList.add('carousel-slide-active');
    dots[n].classList.add('active');
    
    currentSlide = n;
  }
  
  function nextSlide() {
    showSlide((currentSlide + 1) % slides.length);
  }
  
  function prevSlide() {
    showSlide((currentSlide - 1 + slides.length) % slides.length);
  }
  
  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 6000);
  }
  
  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }
  
  // Event listeners para botones
  if (nextBtn) nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoplay();
  });
  
  if (prevBtn) prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoplay();
  });
  
  // Event listeners para dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      resetAutoplay();
    });
  });
  
  // Iniciar autoplay
  showSlide(0);
  startAutoplay();
  
  // Pausar autoplay al pasar el mouse
  carousel.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
  carousel.addEventListener('mouseleave', startAutoplay);
});

// WhatsApp Integration
document.addEventListener('DOMContentLoaded', function() {
  const agendarForm = document.getElementById('agendarForm');
  
  if (agendarForm) {
    agendarForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nombre = document.getElementById('nombre').value;
      const email = document.getElementById('email').value;
      const telefono = document.getElementById('telefono').value;
      const clinica = document.getElementById('clinica').value;
      const mensaje = document.getElementById('mensaje').value;
      
      // Crear mensaje para WhatsApp
      const whatsappMessage = `Hola Dr. Batarce, me gustaría agendar una cita.
      
Nombre: ${nombre}
Email: ${email}
Teléfono: ${telefono}
Clínica de preferencia: ${clinica}
Mensaje: ${mensaje}`;
      
      // Número de WhatsApp
      const whatsappNumber = '56962110977';
      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      // Abrir WhatsApp
      window.open(whatsappUrl, '_blank');
      
      // Mostrar confirmación
      alert('Se abrirá WhatsApp para completar tu cita. ¡Gracias!');
      
      // Resetear formulario
      agendarForm.reset();
      
      // Cerrar modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('agendarModal'));
      if (modal) modal.hide();
    });
  }
});
