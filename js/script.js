/**
 * Duy Le - Personal Portfolio Interactivity
 * Implementation of responsive menu, theme switching, project filtering, and accessible carousel.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initThemeToggle();
  initProjectFilter();
  initContactForm();
  initCarousel();
});

/**
 * Mobile Navigation Toggle (Hamburger Menu)
 */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.getElementById('primary-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  const toggleMenu = () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('open');
    document.body.classList.toggle('nav-open');
  };

  toggleBtn.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && 
        !navMenu.contains(e.target) && 
        !toggleBtn.contains(e.target)) {
      toggleMenu();
    }
  });
}

/**
 * Dark/Light Mode Theme Toggle (Extra 1)
 */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  if (!themeToggleBtn) return;

  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggleBtn.setAttribute('aria-label', 'Toggle light theme');
    themeToggleBtn.setAttribute('title', 'Toggle light theme');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggleBtn.setAttribute('aria-label', 'Toggle dark theme');
    themeToggleBtn.setAttribute('title', 'Toggle dark theme');
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    let newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    const newLabel = newTheme === 'dark' ? 'Toggle light theme' : 'Toggle dark theme';
    themeToggleBtn.setAttribute('aria-label', newLabel);
    themeToggleBtn.setAttribute('title', newLabel);
  });
}

/**
 * Accessible Image Carousel (Extra 2)
 * Features next/prev, indicators, keyboard control, and a play/pause autoplay switch (default: paused)
 */
function initCarousel() {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  const items = carousel.querySelectorAll('.carousel-item');
  const prevBtn = carousel.querySelector('.carousel-control.prev');
  const nextBtn = carousel.querySelector('.carousel-control.next');
  const playPauseBtn = carousel.querySelector('.carousel-play-pause');
  const indicators = carousel.querySelectorAll('.indicator');
  
  let currentIndex = 0;
  let autoplayInterval = null;
  let isPlaying = false; // Default: PAUSED (Auto start is turned off per rubric suggestion)

  function showSlide(index) {
    // Reset range bounds
    if (index >= items.length) currentIndex = 0;
    else if (index < 0) currentIndex = items.length - 1;
    else currentIndex = index;

    // Toggle active slide
    items.forEach((item, i) => {
      if (i === currentIndex) {
        item.classList.add('active');
        item.setAttribute('aria-hidden', 'false');
      } else {
        item.classList.remove('active');
        item.setAttribute('aria-hidden', 'true');
      }
    });

    // Toggle active indicator
    indicators.forEach((indicator, i) => {
      if (i === currentIndex) {
        indicator.classList.add('active');
        indicator.setAttribute('aria-current', 'true');
      } else {
        indicator.classList.remove('active');
        indicator.removeAttribute('aria-current');
      }
    });
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  // Next / Prev button listeners
  nextBtn.addEventListener('click', () => {
    nextSlide();
    if (isPlaying) resetAutoplay();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    if (isPlaying) resetAutoplay();
  });

  // Indicator dot buttons click listener
  indicators.forEach((indicator, i) => {
    indicator.addEventListener('click', () => {
      showSlide(i);
      if (isPlaying) resetAutoplay();
    });
  });

  // Keyboard navigation when focused inside carousel
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      nextSlide();
      if (isPlaying) resetAutoplay();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
      if (isPlaying) resetAutoplay();
    }
  });

  // Autoplay management
  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000); // changes slides every 5 seconds
    playPauseBtn.textContent = 'Pause Autoplay';
    playPauseBtn.setAttribute('aria-label', 'Pause Autoplay');
    isPlaying = true;
    console.log('Carousel Autoplay Started.');
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
    playPauseBtn.textContent = 'Play Autoplay';
    playPauseBtn.setAttribute('aria-label', 'Play Autoplay');
    isPlaying = false;
    console.log('Carousel Autoplay Paused.');
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(nextSlide, 5000);
  }

  playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });

  // Initialize display
  showSlide(currentIndex);
  
  // Set play/pause button state initially (default: stopped)
  playPauseBtn.textContent = 'Play Autoplay';
  playPauseBtn.setAttribute('aria-label', 'Play Autoplay');
}

/**
 * Project Category Filter (Extra 4)
 */
function initProjectFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || cardCategory === filterValue) {
          card.classList.remove('hide');
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease';
            card.style.opacity = '1';
          }, 50);
        } else {
          card.classList.add('hide');
        }
      });
    });
  });
}

/**
 * Form Interactive Validation (UX Enhancements)
 */
function initContactForm() {
  const form = document.getElementById('contact-form');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
      alert('Please fill out all required fields.');
      return;
    }

    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Message Sent! ✓';
    submitBtn.disabled = true;
    submitBtn.style.backgroundColor = '#10b981';
    
    form.reset();

    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.style.backgroundColor = '';
    }, 4000);
  });
}
