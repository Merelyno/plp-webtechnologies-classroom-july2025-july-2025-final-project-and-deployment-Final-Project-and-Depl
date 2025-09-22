/* Interactivity and form validation */

/* NAV TOGGLE for small screens */
function initNavToggle(buttonId, navId) {
  const btn = document.getElementById(buttonId);
  const nav = document.getElementById(navId) || document.querySelector('.main-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    // on small screens we show/hide the nav by toggling inline style
    if (window.innerWidth < 700) {
      nav.style.display = expanded ? 'none' : 'flex';
      nav.style.flexDirection = 'column';
    }
  });
}

/* Initialize toggles (buttons exist with different ids across pages) */
initNavToggle('navToggle', 'mainNav');
initNavToggle('navToggle2', 'mainNav2');
initNavToggle('navToggle3', 'mainNav3');

/* Form Validation for contact page */
const form = document.getElementById('contactForm');
if (form) {
  const feedback = document.getElementById('formFeedback');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    feedback.textContent = '';
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (name.length < 2) {
      feedback.textContent = 'Please enter your name (at least 2 characters).';
      feedback.style.color = 'crimson';
      return;
    }
    
    // email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      feedback.textContent = 'Please enter a valid email address.';
      feedback.style.color = 'crimson';
      return;
    }
    if (message.length < 10) {
      feedback.textContent = 'Message must be at least 10 characters.';
      feedback.style.color = 'crimson';
      return;
    }
    
    feedback.style.color = 'green';
    feedback.textContent = 'Thank you — your message was sent!';
    form.reset();
  });
}

/* accessibility */
(function addKeyboardClass() {
  let usingKeyboard = false;
  window.addEventListener('keydown', () => usingKeyboard = true);
  window.addEventListener('mousedown', () => usingKeyboard = false);
  document.addEventListener('focusin', (e) => {
    if (usingKeyboard && e.target.matches('a, button, input, textarea')) {
      e.target.classList.add('keyboard-focus');
    }
  });
  document.addEventListener('focusout', (e) => {
    if (e.target.classList) e.target.classList.remove('keyboard-focus');
  });
})();
