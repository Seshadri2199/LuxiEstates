/* =========================================
   LUMORA ESTATES — MAIN JAVASCRIPT
   ========================================= */

// ---- STICKY HEADER ----
const header = document.getElementById('header');
const handleScroll = () => {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};
window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll(); // run on load

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  nav.classList.toggle('open');
  document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
});

// Close nav when a link is clicked
nav?.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Close nav on outside click
document.addEventListener('click', (e) => {
  if (nav?.classList.contains('open') && !nav.contains(e.target) && !hamburger.contains(e.target)) {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ---- SCROLL REVEAL (fade-up) ----
const fadeEls = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

fadeEls.forEach(el => observer.observe(el));

// ---- COUNTER ANIMATION ----
const counters = document.querySelectorAll('.stat-card__num');

const animateCounter = (el) => {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;

  const update = () => {
    current += step;
    if (current < target) {
      el.textContent = Math.floor(current);
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  };
  requestAnimationFrame(update);
};

if (counters.length > 0) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));
}

// ---- SEARCH HANDLER ----
function handleSearch(e) {
  e.preventDefault();
  window.location.href = 'listings.html';
}

// ---- PILL TOGGLE (generic) ----
document.querySelectorAll('.filter-pills').forEach(group => {
  group.querySelectorAll('.pill').forEach(pill => {
    pill.addEventListener('click', () => {
      group.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });
});
