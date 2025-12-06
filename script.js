/* ------------- NIEVE (más lenta y suave) ------------- */
(function makeSnow() {
  const container = document.querySelector('.snow');
  if (!container) return;

  const num = 70; // un poco menos de copos para que se vea más calmado
  for (let i = 0; i < num; i++) {
    const s = document.createElement('span');
    const size = Math.random() * 8 + 4;
    s.style.width = s.style.height = size + 'px';
    s.style.left = (Math.random() * 100) + '%';
    s.style.opacity = (Math.random() * 0.6 + 0.4).toFixed(2);

    // antes: 4s–10s -> ahora: 10s–20s para que caiga mucho más despacio
    s.style.animationDuration = (Math.random() * 10 + 10) + 's';
    // delay un poco más amplio para que no caigan todas tan seguidas
    s.style.animationDelay = (Math.random() * 8) + 's';

    s.style.transform = 'translateY(-20vh) rotate(' + (Math.random() * 360) + 'deg)';
    container.appendChild(s);
  }
})();

/* ------------- FAQ toggle ------------- */
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const a = q.nextElementSibling;
    if (!a) return;
    a.style.display = a.style.display === 'block' ? 'none' : 'block';
  });
});

/* ------------- IntersectionObserver para animar elementos al entrar ------------- */
(function animateOnView() {
  const opts = { root: null, rootMargin: '0px', threshold: 0.12 };
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, opts);

  // Observa todos los elementos relevantes
  document.querySelectorAll(
    '.appear, .info-box, .testimonial-card, .price-box, ' +
    '#problema, #beneficios, #vista-previa, .premium-box, .special-gift, .sobre-mi-contenido'
  ).forEach(el => {
    io.observe(el);
  });
})();

/* ------------- pequeño parallax del hero para dinamismo ------------- */
(function heroParallax() {
  const hero = document.querySelector('header .hero');
  if (!hero) return;
  window.addEventListener('scroll', () => {
    const sc = window.scrollY;
    hero.style.transform = 'translateY(' + Math.min(sc * 0.06, 24) + 'px)';
  }, { passive: true });
})();

/* ------------- SMOOTH SCROLL for header CTA ------------- */
(function smoothScrollCTA() {
  const btn = document.getElementById('header-cta');
  if (!btn) return;
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.pageYOffset - 20; // small offset
    window.scrollTo({ top, behavior: 'smooth' });
  });
})();

/* ------------- CARRUSEL TESTIMONIOS ------------- */
(function carousel() {
  const track = document.getElementById('carouselTrack');
  if (!track) return;

  const slides = Array.from(track.children);
  const dotsContainer = document.getElementById('carouselDots');
  const dots = Array.from(dotsContainer.children);
  let index = 0;
  let autoplayInterval = null;

  const slideTo = (i) => {
    index = (i + slides.length) % slides.length;
    const x = -index * 100;
    track.style.transform = `translateX(${x}%)`;
    dots.forEach(d => d.classList.remove('active'));
    dots[index].classList.add('active');
  };

  // Dots click
  dots.forEach((d, i) =>
    d.addEventListener('click', () => { slideTo(i); resetAutoplay(); })
  );

  // Autoplay (un poquito más lento para sensación más calmada)
  const startAutoplay = () => {
    stopAutoplay();
    autoplayInterval = setInterval(() => {
      slideTo(index + 1);
    }, 6000); // antes 4500ms
  };

  const stopAutoplay = () => {
    if (autoplayInterval) clearInterval(autoplayInterval);
  };

  const resetAutoplay = () => {
    stopAutoplay();
    startAutoplay();
  };

  // Swipe on touch devices
  (function addTouch() {
    let startX = 0;
    let delta = 0;
    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });
    track.addEventListener('touchmove', (e) => {
      delta = e.touches[0].clientX - startX;
    });
    track.addEventListener('touchend', () => {
      if (delta > 40) slideTo(index - 1);
      else if (delta < -40) slideTo(index + 1);
      delta = 0;
      resetAutoplay();
    });
  })();

  // init
  slideTo(0);
  startAutoplay();

  // pause on hover
  track.addEventListener('mouseover', stopAutoplay);
  track.addEventListener('mouseleave', startAutoplay);
})();


