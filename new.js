(() => {
  const body = document.body;
  const progress = document.querySelector('.scroll-progress');
  const header = document.querySelector('[data-header]');
  const parallaxItems = [...document.querySelectorAll('[data-parallax]')];
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const updateScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 18);
  };
  updateScroll();
  window.addEventListener('scroll', updateScroll, { passive: true });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(item => revealObserver.observe(item));

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  menuButton?.addEventListener('click', () => {
    const open = menuButton.classList.toggle('is-open');
    nav.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menuButton?.classList.remove('is-open');
    nav.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));

  const tabs = [...document.querySelectorAll('.skill-tab')];
  const clouds = [...document.querySelectorAll('.skill-cloud')];
  tabs.forEach(tab => tab.addEventListener('click', () => {
    const track = tab.dataset.track;
    tabs.forEach(item => {
      const active = item === tab;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
    });
    clouds.forEach(cloud => cloud.classList.toggle('is-hidden', cloud.dataset.cloud !== track));
  }));
  document.querySelectorAll('.skill-chip').forEach(chip => {
    chip.addEventListener('mouseenter', () => chip.classList.add('is-hot'));
    chip.addEventListener('mouseleave', () => chip.classList.remove('is-hot'));
    chip.addEventListener('focus', () => chip.classList.add('is-hot'));
    chip.addEventListener('blur', () => chip.classList.remove('is-hot'));
  });

  if (!prefersReduced && window.matchMedia('(pointer: fine)').matches) {
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    if (!dot || !ring) return;
    body.classList.add('has-cursor');
    window.addEventListener('pointermove', event => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    }, { passive: true });
    const cursorFrame = () => {
      ringX += (mouseX - ringX) * .16;
      ringY += (mouseY - ringY) * .16;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(cursorFrame);
    };
    cursorFrame();
    document.querySelectorAll('a, button, .tilt-card').forEach(item => {
      item.addEventListener('mouseenter', () => body.classList.add('cursor-hover'));
      item.addEventListener('mouseleave', () => body.classList.remove('cursor-hover'));
    });

    document.querySelectorAll('.magnetic').forEach(item => {
      item.addEventListener('pointermove', event => {
        const rect = item.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * .13;
        const y = (event.clientY - rect.top - rect.height / 2) * .13;
        item.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
      item.addEventListener('pointerleave', () => { item.style.transform = ''; });
    });
  }

  if (!prefersReduced && window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.tilt-card').forEach(card => {
      const strength = Number(card.dataset.tilt || 7);
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        card.style.transform = `perspective(900px) rotateX(${y * -strength}deg) rotateY(${x * strength}deg) translateZ(5px)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
  }

  if (!prefersReduced && parallaxItems.length) {
    let ticking = false;
    const updateParallax = () => {
      const viewport = window.innerHeight;
      parallaxItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        const distance = (rect.top + rect.height / 2 - viewport / 2) * Number(item.dataset.parallax || .1);
        item.style.transform = `translate3d(0, ${distance * -.12}px, 0)`;
      });
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(updateParallax); ticking = true; }
    }, { passive: true });
    updateParallax();
  }
})();
