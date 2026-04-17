// ===========================
// PRELOADER
// ===========================
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  setTimeout(() => pre.classList.add('hidden'), 600);
});

// ===========================
// NAVBAR SCROLL
// ===========================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
});

// ===========================
// HAMBURGER MENU
// ===========================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===========================
// SMOOTH ACTIVE NAV
// ===========================
const sections = document.querySelectorAll('section[id]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => observer.observe(s));

// ===========================
// AOS — Animate on Scroll
// ===========================
const aosObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('animated');
      aosObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('[data-aos]').forEach(el => aosObserver.observe(el));

// ===========================
// COUNTER ANIMATION
// ===========================
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = +el.dataset.target;
    let count = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      count = Math.min(count + step, target);
      el.textContent = count;
      if (count >= target) clearInterval(timer);
    }, 25);
  });
}
const heroObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) { animateCounters(); heroObserver.disconnect(); }
}, { threshold: 0.5 });
const heroSection = document.getElementById('hero');
if (heroSection) heroObserver.observe(heroSection);

// ===========================
// SKILL BARS ANIMATION
// ===========================
const skillsObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    document.querySelectorAll('.skill-fill').forEach(el => {
      el.style.width = el.dataset.w + '%';
    });
    skillsObserver.disconnect();
  }
}, { threshold: 0.3 });
const skillsSection = document.getElementById('skills');
if (skillsSection) skillsObserver.observe(skillsSection);

// ===========================
// PORTFOLIO FILTER
// ===========================
const filterBtns = document.querySelectorAll('.filter-btn');
const portoItems = document.querySelectorAll('.porto-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    portoItems.forEach(item => {
      const show = filter === 'all' || item.dataset.cat === filter;
      item.classList.toggle('hidden', !show);
    });
  });
});

// ===========================
// LIGHTBOX
// ===========================
let currentImages = [];
let currentIndex = 0;

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

portoItems.forEach((item, i) => {
  const img = item.querySelector('img');
  if (!img) return;
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    currentImages = Array.from(portoItems).filter(p => !p.classList.contains('hidden')).map(p => p.querySelector('img')?.src).filter(Boolean);
    currentIndex = currentImages.indexOf(img.src);
    lightboxImg.src = img.src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}
function lightboxNav(dir, e) {
  e.stopPropagation();
  currentIndex = (currentIndex + dir + currentImages.length) % currentImages.length;
  lightboxImg.src = currentImages[currentIndex];
}
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lightboxNav(-1, e);
  if (e.key === 'ArrowRight') lightboxNav(1, e);
});

// ===========================
// CONTACT FORM — Kirim ke WhatsApp
// ===========================
function sendToWhatsApp(event) {
  event.preventDefault();

  const name    = document.getElementById('contact-name').value.trim();
  const phone   = document.getElementById('contact-phone').value.trim();
  const message = document.getElementById('contact-message').value.trim();

  const text = encodeURIComponent(
    `Halo, saya *${name}*\nNo WA: ${phone}\nPesan: ${message}`
  );

  window.open(`https://wa.me/6282131672002?text=${text}`, '_blank');
}