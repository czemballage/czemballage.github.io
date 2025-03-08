// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach((elem) => {
  observer.observe(elem);
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 0) {
    header.classList.remove('scroll-up');
    return;
  }
  
  if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
    header.classList.remove('scroll-up');
    header.classList.add('scroll-down');
  } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
    header.classList.remove('scroll-down');
    header.classList.add('scroll-up');
  }
  lastScroll = currentScroll;
});

// Product hover effect
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

// Enhanced Video Carousel
function initVideoCarousel() {
  const carousel = document.querySelector('.video-carousel');
  const slides = carousel.querySelectorAll('.video-slide');
  let currentIndex = 0;

  // Create indicators
  const indicators = document.createElement('div');
  indicators.className = 'carousel-indicators';
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = `carousel-indicator ${index === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => goToSlide(index));
    indicators.appendChild(dot);
  });
  carousel.appendChild(indicators);

  function updateSlides() {
    slides.forEach((slide, index) => {
      slide.classList.remove('active', 'prev');
      if (index === currentIndex) {
        slide.classList.add('active');
      } else if (index < currentIndex) {
        slide.classList.add('prev');
      }
      
      // Reset video when switching slides
      const iframe = slide.querySelector('iframe');
      const src = iframe.src;
      iframe.src = src;
    });
    
    // Update indicators
    indicators.querySelectorAll('.carousel-indicator').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlides();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlides();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlides();
  }

  // Create and set up navigation buttons
  const prevButton = carousel.querySelector('#prevVideo');
  const nextButton = carousel.querySelector('#nextVideo');
  
  prevButton.className = 'carousel-nav-button prev';
  nextButton.className = 'carousel-nav-button next';
  
  prevButton.addEventListener('click', prevSlide);
  nextButton.addEventListener('click', nextSlide);

  // Initialize first slide
  updateSlides();

  // Auto-advance slides every 10 seconds
  setInterval(nextSlide, 10000);
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', initVideoCarousel);
