(() => {
  'use strict';

  const overlay = document.getElementById('modal-overlay');
  const modal = document.getElementById('signup-modal');
  const openButton = document.getElementById('open-modal');
  const closeButton = document.getElementById('close-modal');
  const form = document.getElementById('signup-form');
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('email-error');
  const formStatus = document.getElementById('form-status');
  const toast = document.getElementById('toast');
  const STORAGE_KEY = 'northstar-newsletter-modal-dismissed';
  let previousFocus = null;
  let toastTimer = null;

  document.getElementById('year').textContent = new Date().getFullYear();

  function hasDismissedModal() {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  }

  function rememberDismissal() {
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // The modal still works if browser storage is unavailable.
    }
  }

  function openModal({ automatic = false } = {}) {
    if (!automatic) previousFocus = document.activeElement;
    overlay.hidden = false;
    document.body.classList.add('modal-open');
    window.requestAnimationFrame(() => {
      modal.focus();
      if (!automatic) emailInput.focus();
    });
  }

  function closeModal({ remember = true } = {}) {
    overlay.hidden = true;
    document.body.classList.remove('modal-open');
    if (remember) rememberDismissal();
    if (previousFocus && typeof previousFocus.focus === 'function') {
      previousFocus.focus();
    } else {
      openButton.focus();
    }
  }

  function showToast(message) {
    toast.textContent = message;
    toast.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => { toast.hidden = true; }, 4200);
  }

  function isValidEmail(email) {
    // A practical client-side check; the server should validate again in production.
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  }

  closeButton.addEventListener('click', () => closeModal());
  openButton.addEventListener('click', () => openModal());

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (event) => {
    if (overlay.hidden) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
      return;
    }
    // Small focus trap so keyboard users stay inside the dialog.
    if (event.key === 'Tab') {
      const focusable = [...modal.querySelectorAll('button, input, a[href], [tabindex]:not([tabindex="-1"])')]
        .filter((element) => !element.disabled && element.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  emailInput.addEventListener('input', () => {
    emailError.textContent = '';
    emailInput.removeAttribute('aria-invalid');
    formStatus.textContent = '';
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = emailInput.value.trim();

    if (!email) {
      emailError.textContent = 'Please enter your email address.';
      emailInput.setAttribute('aria-invalid', 'true');
      emailInput.focus();
      return;
    }
    if (!isValidEmail(email)) {
      emailError.textContent = 'Please enter a valid email, like you@example.com.';
      emailInput.setAttribute('aria-invalid', 'true');
      emailInput.focus();
      return;
    }

    emailInput.removeAttribute('aria-invalid');
    emailError.textContent = '';
    formStatus.textContent = 'Thanks! Your email passed validation.';
    // Demo only: connect this point to a newsletter provider/API to actually subscribe.
    rememberDismissal();
    window.setTimeout(() => {
      closeModal({ remember: true });
      showToast('Thanks for your interest! Connect a mailing-list service to finish subscribing.');
    }, 900);
  });

  // Delayed first appearance. A dismissal suppresses automatic reappearance for this tab session.
  if (!hasDismissedModal()) {
    window.setTimeout(() => {
      if (!hasDismissedModal() && overlay.hidden) openModal({ automatic: true });
    }, 4000);
  }
})();
