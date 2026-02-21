/* =====================================================
   ASHISH RANJAN PORTFOLIO — JAVASCRIPT
   ===================================================== */

'use strict';

/* ─── CANVAS PARTICLE BACKGROUND ─── */
(function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles;
  const COUNT = 80;
  const COLORS = ['rgba(99,179,237,', 'rgba(159,122,234,', 'rgba(79,209,197,'];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.25,
      dy: (Math.random() - 0.5) * 0.25,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.4 + 0.1,
    }));
  }

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(99,179,237,${0.06 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    drawLines();
    for (const p of particles) {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > W) p.dx *= -1;
      if (p.y < 0 || p.y > H) p.dy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.fill();
    }
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => { resize(); createParticles(); });
  resize();
  createParticles();
  animate();
})();

/* ─── NAVBAR ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ─── HAMBURGER ─── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  const spans = hamburger.querySelectorAll('span');
  spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
}

/* ─── ACTIVE NAV HIGHLIGHT ─── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(s => sectionObserver.observe(s));

/* ─── SCROLL REVEAL ─── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ─── TYPEWRITER ─── */
(function initTypewriter() {
  const el    = document.getElementById('typewriter');
  const phrases = [
    'Building distributed AI systems at scale',
    'RAG pipelines · Vector search · LLM platforms',
    'Agent orchestration with CrewAI & Google ADK',
    'High-throughput microservices on Azure & GCP',
    'Hackett Innovation Award 2025 winner 🏆',
  ];
  let phraseIdx = 0;
  let charIdx   = 0;
  let deleting  = false;
  let textNode;

  // cursor element
  const cursor = el.querySelector('.cursor');

  function tick() {
    const phrase = phrases[phraseIdx];
    if (!textNode) {
      textNode = document.createTextNode('');
      el.insertBefore(textNode, cursor);
    }

    if (!deleting) {
      charIdx++;
      textNode.nodeValue = phrase.slice(0, charIdx);
      if (charIdx === phrase.length) {
        deleting = true;
        setTimeout(tick, 2200);
        return;
      }
      setTimeout(tick, 55);
    } else {
      charIdx--;
      textNode.nodeValue = phrase.slice(0, charIdx);
      if (charIdx === 0) {
        deleting  = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, 28);
    }
  }

  setTimeout(tick, 1200);
})();

/* ─── SKILL BADGE RIPPLE ─── */
document.querySelectorAll('.skill-badge').forEach(badge => {
  badge.addEventListener('click', (e) => {
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position:absolute;
      border-radius:50%;
      background:rgba(99,179,237,0.35);
      transform:scale(0);
      animation:rippleAnim 0.55s linear;
      pointer-events:none;
      width:60px;height:60px;
      left:${e.offsetX - 30}px;
      top:${e.offsetY - 30}px;
    `;
    badge.style.position = 'relative';
    badge.style.overflow = 'hidden';
    badge.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
});

// inject ripple keyframes
const style = document.createElement('style');
style.textContent = `
@keyframes rippleAnim {
  to { transform: scale(3.5); opacity: 0; }
}
`;
document.head.appendChild(style);

/* ─── SMOOTH SCROLL ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ─── STAT COUNTER ANIMATION ─── */
function animateCounter(el, end, suffix) {
  let start    = 0;
  const step   = end / 40;
  const isFloat = String(end).includes('.');

  const timer = setInterval(() => {
    start += step;
    if (start >= end) {
      start = end;
      clearInterval(timer);
    }
    el.textContent = isFloat ? start.toFixed(2) + suffix : Math.floor(start) + suffix;
  }, 35);
}

const statNumbers = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el  = e.target;
      const raw = el.textContent.trim();
      const num = parseFloat(raw);
      const suffix = raw.replace(num, '').replace(/[0-9.]/g, '');
      el.textContent = '0' + suffix;
      animateCounter(el, num, suffix);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(n => statObserver.observe(n));

/* ─── MOUSE PARALLAX ON HERO GLOW ─── */
const heroBg = document.querySelector('.hero-glow');
if (heroBg) {
  document.addEventListener('mousemove', (e) => {
    const xPercent = (e.clientX / window.innerWidth  - 0.5) * 20;
    const yPercent = (e.clientY / window.innerHeight - 0.5) * 20;
    heroBg.style.transform = `translateX(calc(-50% + ${xPercent}px)) translateY(${yPercent}px)`;
  });
}

/* ─── TIMELINE CARD CLICK — EXPAND TOGGLE ─── */
document.querySelectorAll('.job-card').forEach(card => {
  const projects = card.querySelector('.job-projects');
  if (!projects) return;

  // show first project, hide rest on mobile
  function updateVisibility() {
    if (window.innerWidth <= 768) {
      const items = projects.querySelectorAll('.job-project');
      items.forEach((item, i) => {
        if (i > 0 && !card.classList.contains('expanded')) {
          item.style.display = 'none';
        } else {
          item.style.display = '';
        }
      });
    } else {
      projects.querySelectorAll('.job-project').forEach(i => i.style.display = '');
    }
  }

  card.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      card.classList.toggle('expanded');
      updateVisibility();
    }
  });

  window.addEventListener('resize', updateVisibility);
});
