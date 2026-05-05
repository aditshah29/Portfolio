// ── Navbar scroll effect ──────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Mobile hamburger menu ─────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu when a link is tapped
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ── Scroll-triggered fade-in for cards & sections ─────────────────
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.card, .about-strip-inner, .section-title').forEach((el, i) => {
  el.classList.add('fade-in-up');
  el.style.transitionDelay = `${i * 0.08}s`;
  observer.observe(el);
});

// ── Smooth active nav link highlight on scroll ────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.style.color = '#c8f064';
          }
        });
      }
    });
  },
  { rootMargin: '-40% 0px -50% 0px' }
);

sections.forEach(section => sectionObserver.observe(section));

// ── Skill pills staggered entrance ───────────────────────────────
const skillPills = document.querySelectorAll('.skill-pill');
const pillObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      skillPills.forEach((pill, i) => {
        pill.style.opacity = '0';
        pill.style.transform = 'translateY(20px)';
        pill.style.transition = `opacity 0.4s ease ${i * 0.07}s, transform 0.4s ease ${i * 0.07}s`;
        requestAnimationFrame(() => {
          pill.style.opacity = '1';
          pill.style.transform = 'translateY(0)';
        });
      });
      pillObserver.disconnect();
    }
  },
  { threshold: 0.3 }
);
if (skillPills.length) pillObserver.observe(skillPills[0].closest('section') || document.body);

// ── Cursor trail on hero (subtle dot) ────────────────────────────
const hero = document.querySelector('.hero');
if (hero) {
  let dot = null;
  hero.addEventListener('mousemove', (e) => {
    if (!dot) {
      dot = document.createElement('div');
      Object.assign(dot.style, {
        position: 'fixed',
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: '#c8f064',
        pointerEvents: 'none',
        opacity: '0.5',
        zIndex: '9999',
        transition: 'transform 0.1s, opacity 0.3s',
      });
      document.body.appendChild(dot);
    }
    dot.style.left = `${e.clientX - 3}px`;
    dot.style.top = `${e.clientY - 3}px`;
  });
  hero.addEventListener('mouseleave', () => {
    if (dot) dot.style.opacity = '0';
  });
  hero.addEventListener('mouseenter', () => {
    if (dot) dot.style.opacity = '0.5';
  });
}
