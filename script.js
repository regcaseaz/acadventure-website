document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.carousel');
  const images = carousel.querySelectorAll('.carousel-img');
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');
  const indicators = carousel.querySelectorAll('.carousel-indicator');
  let current = 0;
  let autoPlayInterval;
  let touchStartX = 0;
  let touchEndX = 0;
  const SLIDE_INTERVAL = 5000; // 5 seconds

  function showImage(index) {
    images.forEach(img => img.classList.remove('active'));
    indicators.forEach(ind => ind.classList.remove('active'));
    images[index].classList.add('active');
    indicators[index].classList.add('active');
  }

  function nextImage() {
    current = (current + 1) % images.length;
    showImage(current);
  }

  function prevImage() {
    current = (current - 1 + images.length) % images.length;
    showImage(current);
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayInterval = setInterval(nextImage, SLIDE_INTERVAL);
  }

  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
    }
  }

  // Event Listeners
  prevBtn.addEventListener('click', () => {
    prevImage();
    startAutoPlay();
  });

  nextBtn.addEventListener('click', () => {
    nextImage();
    startAutoPlay();
  });

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      current = index;
      showImage(current);
      startAutoPlay();
    });
  });

  // Touch events for mobile
  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoPlay();
  });

  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startAutoPlay();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
  }

  // Pause auto-play when hovering over carousel
  carousel.addEventListener('mouseenter', stopAutoPlay);
  carousel.addEventListener('mouseleave', startAutoPlay);

  // Initialize
  showImage(current);
  startAutoPlay();

  // Navigation active state handling
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a');

  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 200; // Offset for better accuracy

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // Update active state on scroll
  window.addEventListener('scroll', updateActiveNavLink);
  
  // Update active state on page load
  updateActiveNavLink();

  // Smooth scroll for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}); 