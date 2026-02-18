/* ═══════════════════════════════════════════════
   SPLASH → REVEAL
═══════════════════════════════════════════════ */
setTimeout(() => {
  document.getElementById('splash').classList.add('out');
  document.getElementById('nav').classList.add('show');
  document.querySelectorAll('#hero .r, #hero .rx').forEach((el, i) =>
    setTimeout(() => el.classList.add('on'), i * 120)
  );
}, 2400);

/* ═══════════════════════════════════════════════
   HAMBURGER MENU
═══════════════════════════════════════════════ */
const ham  = document.getElementById('ham');
const mmenu = document.getElementById('mmenu');
ham.addEventListener('click', () => {
  ham.classList.toggle('open');
  mmenu.classList.toggle('open');
});
function cm() {
  ham.classList.remove('open');
  mmenu.classList.remove('open');
}

/* ═══════════════════════════════════════════════
   SCROLL REVEAL (.fade elements)
═══════════════════════════════════════════════ */
const fadeObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade').forEach(el => fadeObs.observe(el));

/* ═══════════════════════════════════════════════
   ACTIVE NAV LINK ON SCROLL
═══════════════════════════════════════════════ */
const sections = ['hero','skills','projects','awards','about','contact'];
const navLinks  = document.querySelectorAll('.n-links a');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 140;
  sections.forEach(id => {
    const sec = document.getElementById(id);
    if (!sec) return;
    if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
      navLinks.forEach(a => a.classList.remove('act'));
      const match = document.querySelector(`.n-links a[href="#${id}"]`);
      if (match) match.classList.add('act');
    }
  });
}, { passive: true });

/* ═══════════════════════════════════════════════
   ARSENAL — SIDEBAR CATEGORY TABS
═══════════════════════════════════════════════ */
const catBtns  = document.querySelectorAll('.cat-btn');
const skPanels = document.querySelectorAll('.sk-panel');

// Activate first button by default
if (catBtns.length) {
  catBtns[0].classList.add('active');
  const firstId = catBtns[0].dataset.cat;
  const firstPanel = document.getElementById('sk-' + firstId);
  if (firstPanel) firstPanel.classList.add('active');
}

catBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // deactivate all
    catBtns.forEach(b => b.classList.remove('active'));
    skPanels.forEach(p => p.classList.remove('active'));
    // activate clicked
    btn.classList.add('active');
    const target = document.getElementById('sk-' + btn.dataset.cat);
    if (target) target.classList.add('active');
  });
});

/* ═══════════════════════════════════════════════
   PROJECT TABS
═══════════════════════════════════════════════ */
document.querySelectorAll('.ptab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.ptab').forEach(t => t.classList.remove('act'));
    document.querySelectorAll('.proj-panel').forEach(p => p.classList.remove('act'));
    tab.classList.add('act');
    const panel = document.getElementById('tab-' + tab.dataset.tab);
    if (panel) {
      panel.classList.add('act');
      // trigger fade-in on newly visible cards
      panel.querySelectorAll('.fade').forEach(el => {
        void el.offsetWidth; // reflow
        el.classList.add('vis');
      });
    }
  });
});

/* ═══════════════════════════════════════════════
   ACCORDION (About section)
═══════════════════════════════════════════════ */
document.querySelectorAll('[data-acc] .acc-header').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('[data-acc]').classList.toggle('open');
  });
});

/* ═══════════════════════════════════════════════
   HERO PHOTO UPLOAD
═══════════════════════════════════════════════ */
document.getElementById('photo-input').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const preview = document.getElementById('photo-preview');
    preview.src = ev.target.result;
    preview.style.display = 'block';
    document.querySelector('.photo-ph').style.display = 'none';
  };
  reader.readAsDataURL(file);
});

/* ═══════════════════════════════════════════════
   PROJECT IMAGE UPLOAD
═══════════════════════════════════════════════ */
function imgUp(container) {
  const input = container.querySelector('.proj-img-input');
  if (!input) return;
  input.onchange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const img = container.querySelector('img');
      img.src = ev.target.result;
      img.style.display = 'block';
      const ph = container.querySelector('.proj-img-ph');
      if (ph) ph.style.display = 'none';
    };
    reader.readAsDataURL(file);
  };
  input.click();
}
