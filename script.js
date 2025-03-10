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
  // Check if carousel exists before initializing
  const carousel = document.querySelector('.video-carousel');
  if (!carousel) return;
  
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
      if (iframe) {
        const src = iframe.src;
        iframe.src = src;
      }
    });
    
    // Update indicators
    const indicatorDots = indicators.querySelectorAll('.carousel-indicator');
    indicatorDots.forEach((dot, index) => {
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

  // Create and set up navigation buttons if they don't exist
  let prevButton = carousel.querySelector('#prevVideo');
  let nextButton = carousel.querySelector('#nextVideo');
  
  if (!prevButton) {
    prevButton = document.createElement('button');
    prevButton.id = 'prevVideo';
    prevButton.className = 'carousel-nav-button prev';
    prevButton.innerHTML = '<i class="ri-arrow-right-s-line"></i>';
    carousel.appendChild(prevButton);
  }
  
  if (!nextButton) {
    nextButton = document.createElement('button');
    nextButton.id = 'nextVideo';
    nextButton.className = 'carousel-nav-button next';
    nextButton.innerHTML = '<i class="ri-arrow-left-s-line"></i>';
    carousel.appendChild(nextButton);
  }
  
  prevButton.addEventListener('click', prevSlide);
  nextButton.addEventListener('click', nextSlide);

  // Initialize first slide
  updateSlides();

  // Auto-advance slides every 10 seconds
  setInterval(nextSlide, 10000);
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', initVideoCarousel);

document.addEventListener('DOMContentLoaded', function() {
  // Initialize GSAP animations
  gsapInit();
  
  // Mobile menu functionality
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      if(!mobileMenu.classList.contains('hidden')) {
        gsap.to(mobileMenu, {height: 'auto', duration: 0.3, ease: 'power2.out'});
        mobileMenuButton.innerHTML = '<i class="ri-close-line ri-2x"></i>';
      } else {
        gsap.to(mobileMenu, {height: 0, duration: 0.3, ease: 'power2.in'});
        mobileMenuButton.innerHTML = '<i class="ri-menu-line ri-2x"></i>';
      }
    });
  }

  // Close mobile menu when clicking on links
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.innerHTML = '<i class="ri-menu-line ri-2x"></i>';
      });
    });
  }

  // Initialize video carousel with better transitions
  initEnhancedVideoCarousel();
  
  // Animate product cards on hover with better effects
  initProductCards();
  
  // Add animated gradient background
  const body = document.body;
  body.classList.add('animated-gradient');
  
  // Add parallax effect to sections
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      const sectionTop = section.offsetTop;
      const distance = sectionTop - scrollPosition;
      
      if (section.querySelector('.bg-parallax')) {
        section.querySelector('.bg-parallax').style.transform = `translateY(${distance * 0.1}px)`;
      }
    });
  });
  
  // Add hover effects to all cards and buttons
  const cards = document.querySelectorAll('.product-card, .service-card, .testimonial-card, .video-showcase');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -10,
        boxShadow: '0 20px 25px rgba(0, 0, 0, 0.2)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
        duration: 0.3,
        ease: 'power2.in'
      });
    });
  });
  
  // Add smooth reveal animations as sections come into view
  gsap.registerPlugin(ScrollTrigger);
  
  gsap.utils.toArray('section').forEach(section => {
    gsap.from(section.querySelectorAll('h2, h3, p, .grid > div'), {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 50%',
        toggleActions: 'play none none none'
      }
    });
  });
  
  // Add animated text typing effect to main header
  const heroTitle = document.querySelector('#home h1');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    for (let i = 0; i < text.length; i++) {
      setTimeout(() => {
        heroTitle.textContent += text[i];
      }, 100 * i);
    }
  }
});

// GSAP animations initialization
function gsapInit() {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);
  
  // Hero section parallax effect
  gsap.to("#home", {
    backgroundPositionY: "50%",
    ease: "none",
    scrollTrigger: {
      trigger: "#home",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });
  
  // Animate section headings
  gsap.utils.toArray('section h2').forEach(heading => {
    gsap.from(heading, {
      scrollTrigger: {
        trigger: heading,
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    });
  });
  
  // Animate stats in about section
  gsap.utils.toArray('.about-section-content .text-4xl').forEach((stat, i) => {
    gsap.from(stat, {
      scrollTrigger: {
        trigger: stat,
        start: "top 85%"
      },
      textContent: 0,
      duration: 2,
      ease: "power2.out",
      snap: { textContent: 1 },
      stagger: 0.3,
      delay: i * 0.2
    });
  });
  
  // Services icons animation
  gsap.utils.toArray('#services .ri-3x').forEach((icon, i) => {
    gsap.from(icon, {
      scrollTrigger: {
        trigger: icon,
        start: "top 85%"
      },
      scale: 0,
      rotation: -180,
      opacity: 0,
      duration: 0.6,
      ease: "back.out(1.7)",
      delay: i * 0.1
    });
  });
  
  // Hero button animation
  const heroButton = document.querySelector('#hero-button');
  if (heroButton) {
    gsap.to(heroButton, {
      scale: 1.05,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "power1.inOut"
    });
  }
  
  // Animate testimonials
  gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%"
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.2)",
      delay: i * 0.2
    });
  });
  
  // Contact form field animations
  gsap.utils.toArray('#contact form input, #contact form textarea').forEach((field, i) => {
    gsap.from(field, {
      scrollTrigger: {
        trigger: field,
        start: "top 95%"
      },
      x: i % 2 === 0 ? -30 : 30,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      delay: i * 0.1
    });
  });
  
  // Footer logo animation
  const footerLogo = document.querySelector('footer img');
  if (footerLogo) {
    gsap.to(footerLogo, {
      scrollTrigger: {
        trigger: footerLogo,
        start: "top bottom"
      },
      rotation: 360,
      duration: 3,
      ease: "elastic.out(1, 0.3)"
    });
  }
}

// Enhanced product cards interaction
function initProductCards() {
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate rotation values based on mouse position
      const rotateY = ((x - rect.width / 2) / rect.width) * 10;
      const rotateX = ((y - rect.height / 2) / rect.height) * -10;
      
      // Apply 3D effect
      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        duration: 0.3,
        ease: 'power2.out'
      });
      
      // Update light reflection effect
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
    
    card.addEventListener('mouseleave', () => {
      // Reset card position smoothly
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'elastic.out(1,0.5)'
      });
    });
  });
}

// Enhanced video carousel with better transitions
function initEnhancedVideoCarousel() {
  // Check if carousel exists before initializing
  const carousel = document.querySelector('.video-carousel');
  if (!carousel) return;
  
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
      slide.classList.remove('active', 'prev', 'next');
      
      if (index === currentIndex) {
        slide.classList.add('active');
        gsap.to(slide, {opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', clearProps: 'transform'});
      } else if (index < currentIndex) {
        slide.classList.add('prev');
        gsap.set(slide, {opacity: 0, x: '-100%'});
      } else {
        slide.classList.add('next');
        gsap.set(slide, {opacity: 0, x: '100%'});
      }
      
      // Reset video when switching slides
      const iframe = slide.querySelector('iframe');
      if (iframe) {
        const src = iframe.src;
        iframe.src = src;
      }
    });
    
    // Update indicators with animation
    const indicatorDots = indicators.querySelectorAll('.carousel-indicator');
    indicatorDots.forEach((dot, index) => {
      if (index === currentIndex) {
        gsap.to(dot, {scale: 1.2, background: 'var(--primary-color)', duration: 0.3});
      } else {
        gsap.to(dot, {scale: 1, background: 'rgba(255,255,255,0.5)', duration: 0.3});
      }
    });
  }
  
  function goToSlide(index) {
    if (index === currentIndex) return;
    
    // Determine direction for animation
    const direction = index > currentIndex ? 'next' : 'prev';
    const outgoing = slides[currentIndex];
    const incoming = slides[index];
    
    // Set initial position based on direction
    if (direction === 'next') {
      gsap.set(incoming, {x: '100%', opacity: 0});
    } else {
      gsap.set(incoming, {x: '-100%', opacity: 0});
    }
    
    // Animate outgoing slide
    gsap.to(outgoing, {
      x: direction === 'next' ? '-100%' : '100%',
      opacity: 0,
      duration: 0.7,
      ease: 'power2.inOut'
    });
    
    // Animate incoming slide
    gsap.to(incoming, {
      x: 0,
      opacity: 1,
      duration: 0.7,
      ease: 'power2.inOut'
    });
    
    currentIndex = index;
    updateSlides();
  }
  
  function nextSlide() {
    goToSlide((currentIndex + 1) % slides.length);
  }
  
  function prevSlide() {
    goToSlide((currentIndex - 1 + slides.length) % slides.length);
  }
  
  // Create and set up navigation buttons
  let prevButton = carousel.querySelector('.carousel-nav-button.prev');
  let nextButton = carousel.querySelector('.carousel-nav-button.next');
  
  if (!prevButton) {
    prevButton = document.createElement('button');
    prevButton.className = 'carousel-nav-button prev';
    prevButton.innerHTML = '<i class="ri-arrow-right-s-line"></i>';
    carousel.appendChild(prevButton);
  }
  
  if (!nextButton) {
    nextButton = document.createElement('button');
    nextButton.className = 'carousel-nav-button next';
    nextButton.innerHTML = '<i class="ri-arrow-left-s-line"></i>';
    carousel.appendChild(nextButton);
  }
  
  // Add hover animations to buttons
  [prevButton, nextButton].forEach(button => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, {scale: 1.1, duration: 0.2});
    });
    button.addEventListener('mouseleave', () => {
      gsap.to(button, {scale: 1, duration: 0.2});
    });
  });
  
  prevButton.addEventListener('click', prevSlide);
  nextButton.addEventListener('click', nextSlide);
  
  // Initialize first slide
  updateSlides();
  
  // Auto-advance slides with a smoother transition
  let autoplayInterval = setInterval(nextSlide, 8000);
  
  // Pause autoplay on user interaction
  carousel.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
  carousel.addEventListener('mouseleave', () => {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(nextSlide, 8000);
  });
  
  // Handle touch events for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  carousel.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, {passive: true});
  
  carousel.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, {passive: true});
  
  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      nextSlide();
    } else if (touchEndX > touchStartX + 50) {
      prevSlide();
    }
  }
}

// Enhanced scroll animations with GSAP
function initEnhancedScrollAnimations() {
  gsap.utils.toArray('.fade-in').forEach(elem => {
    gsap.from(elem, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: elem,
        start: "top 80%",
        end: "top 20%",
        toggleActions: "play none none reverse"
      }
    });
  });

  // Parallax effect for hero section
  gsap.to("#home", {
    backgroundPosition: "50% 30%",
    ease: "none",
    scrollTrigger: {
      trigger: "#home",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  // Enhanced header animations
  const header = document.querySelector('header');
  ScrollTrigger.create({
    start: "top -100",
    end: 99999,
    onUpdate: (self) => {
      const scrolled = self.getVelocity() < 0;
      if (scrolled) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
      } else {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
      }
    }
  });

  // Product cards animation
  gsap.utils.toArray('.product-card').forEach((card, i) => {
    gsap.from(card, {
      y: 100,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%"
      }
    });
  });
}

// Enhanced video showcase interactions
function initEnhancedVideoShowcase() {
  const showcases = document.querySelectorAll('.video-showcase');
  
  showcases.forEach(showcase => {
    const content = showcase.querySelector('.content');
    
    showcase.addEventListener('mouseenter', () => {
      gsap.to(content, {
        y: -10,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    showcase.addEventListener('mouseleave', () => {
      gsap.to(content, {
        y: 0,
        duration: 0.3,
        ease: "power2.in"
      });
    });
  });
}

// Enhanced form validations and animations
function initEnhancedForms() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        gsap.to(input, {
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      input.addEventListener('blur', () => {
        gsap.to(input, {
          scale: 1,
          duration: 0.3,
          ease: "power2.in"
        });
      });
    });
    
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Validate form
      let isValid = true;
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          gsap.to(input, {
            x: [-10, 10, -10, 10, 0],
            duration: 0.5,
            ease: "power2.inOut"
          });
        }
      });
      
      if (isValid) {
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'تم إرسال الرسالة بنجاح!';
        form.appendChild(successMessage);
        
        gsap.fromTo(successMessage, 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 }
        );
        
        setTimeout(() => {
          gsap.to(successMessage, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            onComplete: () => successMessage.remove()
          });
        }, 3000);
        
        form.reset();
      }
    });
  });
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', () => {
  initEnhancedScrollAnimations();
  initEnhancedVideoShowcase();
  initEnhancedForms();
});

// Preload all essential images for smoother experience
function preloadImages() {
  const imagesToPreload = document.querySelectorAll('img[data-src]');
  imagesToPreload.forEach(img => {
    const src = img.getAttribute('data-src');
    if (src) {
      const image = new Image();
      image.src = src;
      image.onload = () => {
        img.src = src;
        img.removeAttribute('data-src');
        gsap.to(img, {opacity: 1, duration: 0.5});
      };
    }
  });
}

// Call preload function
document.addEventListener('DOMContentLoaded', preloadImages);

// Form submission with animation and validation
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate form
    let valid = true;
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        valid = false;
        gsap.to(field, {
          borderColor: 'red',
          x: [0, -5, 5, -5, 5, 0],
          duration: 0.4
        });
      } else {
        gsap.to(field, {borderColor: 'var(--primary-color)'});
      }
    });
    
    if (valid) {
      // Show success animation
      const successMessage = document.createElement('div');
      successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 opacity-0';
      successMessage.textContent = 'تم إرسال رسالتك بنجاح!';
      document.body.appendChild(successMessage);
      
      gsap.to(successMessage, {
        opacity: 1, 
        y: 20, 
        duration: 0.5,
        onComplete: () => {
          setTimeout(() => {
            gsap.to(successMessage, {
              opacity: 0, 
              y: -20, 
              duration: 0.5,
              onComplete: () => successMessage.remove()
            });
          }, 3000);
        }
      });
      
      form.reset();
    }
  });
});

// Add interactive background effect
document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;
  
  document.documentElement.style.setProperty('--mouse-x', `${mouseX * 100}%`);
  document.documentElement.style.setProperty('--mouse-y', `${mouseY * 100}%`);
});

// Enhanced section animations
function initSectionAnimations() {
  gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1
      },
      opacity: 0.5,
      scale: 0.95,
      filter: 'blur(10px)',
      duration: 1
    });
  });
}

// Initialize enhanced animations
document.addEventListener('DOMContentLoaded', () => {
  initSectionAnimations();
  
  // Add parallax effect to sections
  gsap.utils.toArray('section').forEach(section => {
    const bg = section.querySelector('.bg');
    if (bg) {
      gsap.to(bg, {
        scrollTrigger: {
          trigger: section,
          scrub: true
        },
        y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed,
        ease: 'none'
      });
    }
  });
});

// Enhanced section reveal animations
function initEnhancedSectionAnimations() {
  gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1
      },
      y: 50,
      opacity: 0.5,
      duration: 1,
      ease: 'power2.out'
    });
  });
}

// Enhanced card animations
function initEnhancedCardAnimations() {
  gsap.utils.toArray('.product-card, .service-card, .testimonial-card').forEach(card => {
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        end: 'top 60%',
        scrub: 1
      },
      y: -20,
      duration: 1,
      ease: 'power2.out'
    });
  });
}

// Add smooth page transitions
function initPageTransitions() {
  gsap.to('body', {
    opacity: 1,
    duration: 0.5,
    ease: 'power2.out'
  });
}

// Initialize new animations
document.addEventListener('DOMContentLoaded', () => {
  initEnhancedSectionAnimations();
  initEnhancedCardAnimations();
  initPageTransitions();
  
  // Add hover animations for interactive elements
  gsap.utils.toArray('a, button').forEach(elem => {
    elem.addEventListener('mouseenter', () => {
      gsap.to(elem, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    elem.addEventListener('mouseleave', () => {
      gsap.to(elem, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.in'
      });
    });
  });
});
