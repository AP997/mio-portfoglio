 // CURSOR
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX - 6 + 'px';
    cursor.style.top = mouseY - 6 + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX - 18 + 'px';
    ring.style.top = ringY - 18 + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(2)';
      ring.style.transform = 'scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      ring.style.transform = 'scale(1)';
    });
  });

  // PROGRESS BAR
  const progressBar = document.getElementById('progress-bar');
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = pct + '%';
  });

  // SCROLL OBSERVER
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(entry.target.dataset.delay || 0));
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.skill-card, .project-card').forEach(el => observer.observe(el));

  // SCROLL DOTS
  const sections = ['home', 'skills', 'about', 'projects', 'contact'];
  const dots = document.querySelectorAll('.scroll-dot');

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      document.getElementById(dot.dataset.section)?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        dots.forEach(d => d.classList.remove('active'));
        const activeDot = document.querySelector(`.scroll-dot[data-section="${id}"]`);
        if (activeDot) activeDot.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) sectionObserver.observe(el);
  });

  // PARTICLES
  const particlesContainer = document.getElementById('particles');
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.width = Math.random() * 2 + 1 + 'px';
    p.style.height = p.style.width;
    p.style.animationDuration = (Math.random() * 15 + 10) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    particlesContainer.appendChild(p);
  }

  // TYPING EFFECT for hero subtitle
  const subtitle = document.querySelector('.hero-subtitle');
  if (subtitle) {
    const text = subtitle.innerHTML;
    // subtle pulse animation on the gold name
    const name = document.querySelector('.hero-name span');
    if (name) {
      setInterval(() => {
        name.style.textShadow = '0 0 30px rgba(201,168,76,0.4)';
        setTimeout(() => name.style.textShadow = 'none', 1000);
      }, 3000);
    }
  }