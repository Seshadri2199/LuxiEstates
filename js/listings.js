/* =========================================
   LISTINGS PAGE JAVASCRIPT
   ========================================= */

// ---- FILTER BY CATEGORY ----
const filterBtns = document.querySelectorAll('.filter-btn');
const propCards = document.querySelectorAll('.prop-card');
const propCountEl = document.getElementById('prop-count');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    let visible = 0;

    propCards.forEach(card => {
      const cat = card.getAttribute('data-category');
      if (filter === 'all' || cat === filter) {
        card.style.display = '';
        // Trigger reflow for smooth re-appearance
        card.style.animation = 'none';
        void card.offsetWidth;
        card.style.animation = '';
        visible++;
      } else {
        card.style.display = 'none';
      }
    });

    if (propCountEl) propCountEl.textContent = visible;
  });
});
