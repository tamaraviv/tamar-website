/**
 * Main JavaScript file for Exercise 1
 * Handles mobile menu transitions and the interactive greeting alert.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements for mobile menu
  const menuToggleBtn = document.getElementById('menu-toggle-btn');
  const menuCloseBtn = document.getElementById('menu-close-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // Open mobile menu
  function openMenu() {
    if (!mobileNav) return;
    mobileNav.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    if (menuToggleBtn) {
      menuToggleBtn.setAttribute('aria-expanded', 'true');
    }
    // Prevent background scrolling when menu is open
    document.body.style.overflow = 'hidden';
  }

  // Close mobile menu
  function closeMenu() {
    if (!mobileNav) return;
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    if (menuToggleBtn) {
      menuToggleBtn.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  }

  if (menuToggleBtn) {
    menuToggleBtn.addEventListener('click', openMenu);
  }

  if (menuCloseBtn) {
    menuCloseBtn.addEventListener('click', closeMenu);
  }

  // Close menu when a link inside mobile nav is clicked
  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileNav?.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // ---------------------------------------------------------------------------
  // Say Hello Greeting Alert
  // ---------------------------------------------------------------------------
  const greetButton = document.getElementById('greet-button');
  const nameInput = document.getElementById('name-input');
  const greetForm = document.getElementById('greet-form');

  function handleGreeting() {
    if (!nameInput) return;
    const name = nameInput.value.trim();
    if (name) {
      alert(`שלום, ${name}`);
    } else {
      alert('שלום!');
    }
  }

  if (greetButton) {
    greetButton.addEventListener('click', handleGreeting);
  }

  if (nameInput) {
    nameInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleGreeting();
      }
    });
  }

  if (greetForm) {
    greetForm.addEventListener('submit', (event) => {
      event.preventDefault();
      handleGreeting();
    });
  }
});
