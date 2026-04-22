/* =========================================
   CONTACT PAGE JAVASCRIPT
   ========================================= */

function handleContactForm(e) {
  e.preventDefault();

  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const btn = form.querySelector('.form-submit');

  // Basic validation feedback
  const required = form.querySelectorAll('[required]');
  let valid = true;
  required.forEach(field => {
    if (!field.value.trim()) {
      field.style.borderColor = '#e53e3e';
      valid = false;
    } else {
      field.style.borderColor = '';
    }
  });

  if (!valid) return;

  // Simulate submission
  btn.textContent = 'Sending...';
  btn.disabled = true;

  setTimeout(() => {
    form.style.display = 'none';
    success.classList.add('visible');
  }, 1200);
}

// Clear error border on input
document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(el => {
  el.addEventListener('input', () => {
    el.style.borderColor = '';
  });
});
