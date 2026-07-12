/**
 * Duy Le - Personal Portfolio Interactivity
 * Implementation of responsive menu, theme switching, and project filtering.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initThemeToggle();
  initProjectFilter();
  initContactForm();
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
    document.body.classList.toggle('nav-open'); // prevents background scroll when menu is open
  };

  toggleBtn.addEventListener('click', toggleMenu);

  // Close menu when a navigation link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  // Close menu if clicking outside of the navigation
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
 * Supports system preferences fallback and persists choice in localStorage
 */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  if (!themeToggleBtn) return;

  // Retrieve saved theme preference, or fall back to system dark-mode preference
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

  // Toggle button event handler
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    let newTheme = 'light';

    if (currentTheme === 'light') {
      newTheme = 'dark';
    }

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update accessibility label
    const newLabel = newTheme === 'dark' ? 'Toggle light theme' : 'Toggle dark theme';
    themeToggleBtn.setAttribute('aria-label', newLabel);
    themeToggleBtn.setAttribute('title', newLabel);
    
    console.log(`Theme toggled to: ${newTheme}`);
  });
}

/**
 * Project Category Filter (Extra 2)
 * Dynamically filters project cards based on custom data-category tags
 */
function initProjectFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons and add to the clicked one
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');
      console.log(`Filtering projects by category: ${filterValue}`);

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || cardCategory === filterValue) {
          card.classList.remove('hide');
          // Trigger a micro-animation fade-in for visible items
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

    // Simple validation feedback (in addition to HTML5 native constraints)
    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
      alert('Please fill out all required fields.');
      return;
    }

    // Success feedback demo
    console.log('Form submission received:', {
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value
    });

    // Provide immediate visually and audibly accessible confirmation
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Message Sent! ✓';
    submitBtn.disabled = true;
    submitBtn.style.backgroundColor = '#10b981'; // Green accent
    
    // Clear the form
    form.reset();

    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.style.backgroundColor = ''; // Restore default
    }, 4000);
  });
}
