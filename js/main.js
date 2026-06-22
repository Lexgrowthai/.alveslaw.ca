/* ─── NAVBAR SCROLL ─────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
const floatCta = document.getElementById('floatCta');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  floatCta.classList.toggle('hidden', window.scrollY < 400);
}, { passive: true });

/* ─── MOBILE MENU ────────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ─── COUNTER ANIMATION ──────────────────────────────────────── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current);
    if (current >= target) clearInterval(timer);
  }, 16);
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat__num').forEach(animateCounter);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

const statsSection = document.querySelector('.intro__stats');
if (statsSection) observer.observe(statsSection);

/* ─── SCROLL REVEAL ──────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(
  '.practice-card, .attorney-card, .testimonial-card, .award-badge, .side-card, .why__item'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

/* ─── FORM SUBMIT ────────────────────────────────────────────── */
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('[type=submit]');
  btn.textContent = 'Request Sent!';
  btn.disabled = true;
  btn.style.background = '#2d6a4f';
  setTimeout(() => {
    btn.textContent = 'Request Free Consultation';
    btn.disabled = false;
    btn.style.background = '';
    e.target.reset();
  }, 4000);
});

/* ─── HERO PARTICLE DOTS ─────────────────────────────────────── */
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const particleEl = document.getElementById('particles');
if (particleEl) {
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';
  particleEl.appendChild(canvas);

  const dots = Array.from({ length: 40 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.5 + 0.5,
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3,
  }));

  function draw() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach(d => {
      d.x = (d.x + d.dx + canvas.width)  % canvas.width;
      d.y = (d.y + d.dy + canvas.height) % canvas.height;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(201,162,39,0.25)';
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}
