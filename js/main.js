// Mitraja Foundation - shared site behaviour

// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }));
}

// Scroll-in animations, handled by AOS (see data-aos attributes in the HTML)
if (window.AOS) {
  AOS.init({ duration: 650, easing: 'ease-out-cubic', once: true, offset: 60 });
}

// Animated counters
const counters = document.querySelectorAll('[data-count]');
if (counters.length) {
  const animate = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const dur = 1200; const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.floor(p * target) + (p === 1 ? suffix : '');
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window) {
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { animate(e.target); io2.unobserve(e.target); } });
    }, { threshold: 0.5 });
    counters.forEach(c => io2.observe(c));
  } else {
    counters.forEach(animate);
  }
}

// Back to top
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 500);
  });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Active nav link highlighting based on current path
(function highlightNav() {
  const path = location.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a[href]').forEach(a => {
    const href = a.getAttribute('href').replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/';
    if (href === path || (href !== '/' && path.endsWith(href))) a.classList.add('active');
  });
})();

// Lightbox: click any real photo (gallery grids, photo tiles, activity
// cards, standalone .img-zoomable images) to view it full-screen, step
// through the rest of its group with arrows/keys, and click to zoom to
// full resolution. Uses click delegation so it also picks up images the
// live activity feed (js/activities.js) injects after this script runs.
(function lightbox() {
  const CLICKABLE = '.photo-gallery img, .photo-block.has-photo img, .activity-cover img, .ba-panel img, .img-zoomable';

  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML =
    '<button class="lb-close" aria-label="Close">&times;</button>' +
    '<button class="lb-prev" aria-label="Previous image">&#8249;</button>' +
    '<div class="lb-stage"><img class="lb-img" alt=""></div>' +
    '<button class="lb-next" aria-label="Next image">&#8250;</button>' +
    '<div class="lb-counter"></div>' +
    '<div class="lb-hint">Click image to zoom &middot; Esc to close</div>';
  document.body.appendChild(lb);

  const stage = lb.querySelector('.lb-stage');
  const lbImg = lb.querySelector('.lb-img');
  const counter = lb.querySelector('.lb-counter');
  const btnPrev = lb.querySelector('.lb-prev');
  const btnNext = lb.querySelector('.lb-next');

  let group = [];
  let index = 0;

  function groupFor(img) {
    const container = img.closest('.photo-gallery, .card-grid, .approach-list') || img.closest('section') || document.body;
    return Array.from(container.querySelectorAll(CLICKABLE));
  }

  function render() {
    const img = group[index];
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt || '';
    lbImg.classList.remove('zoomed');
    stage.scrollTop = 0; stage.scrollLeft = 0;
    const multi = group.length > 1;
    counter.textContent = multi ? (index + 1) + ' / ' + group.length : '';
    btnPrev.style.display = multi ? 'flex' : 'none';
    btnNext.style.display = multi ? 'flex' : 'none';
  }
  function open(img) {
    group = groupFor(img);
    index = group.indexOf(img);
    if (index < 0) { group = [img]; index = 0; }
    render();
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
  function prev() { index = (index - 1 + group.length) % group.length; render(); }
  function next() { index = (index + 1) % group.length; render(); }

  document.addEventListener('click', (e) => {
    const img = e.target.closest(CLICKABLE);
    if (img) open(img);
  });
  lb.querySelector('.lb-close').addEventListener('click', close);
  btnPrev.addEventListener('click', prev);
  btnNext.addEventListener('click', next);
  stage.addEventListener('click', (e) => { if (e.target === stage) close(); });
  lbImg.addEventListener('click', (e) => {
    e.stopPropagation();
    lbImg.classList.toggle('zoomed');
  });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') prev();
    else if (e.key === 'ArrowRight') next();
  });
})();
