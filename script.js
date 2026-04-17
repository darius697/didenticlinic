let currentLang = 'ro';
  function setLang(lang) {
    currentLang = lang;
    document.body.classList.toggle('lang-ru', lang === 'ru');
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.textContent.trim().toLowerCase() === lang);
    });
    checkOpen(); // ← add this
  }

  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
  });

  function toggleMenu() {
    document.getElementById('mobileMenu').classList.toggle('open');
  }

  document.addEventListener('click', e => {
    if (!e.target.closest('#mobileMenu') && !e.target.closest('#hamburger')) {
      document.getElementById('mobileMenu').classList.remove('open');
    }
  });

  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => observer.observe(el));

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  function handleFormSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = currentLang === 'ro' ? 'Cerere trimisă!' : 'Заявка отправлена!';
    btn.style.background = '#3a7d44';
    setTimeout(() => { btn.innerHTML = originalHTML; btn.style.background = ''; e.target.reset(); }, 3000);
  }

  document.querySelectorAll('.hero .reveal').forEach(el => {
    setTimeout(() => el.classList.add('visible'), 300);
  });

  function checkOpen() {
  const d = new Date();
  const day = d.getDay();      
  const hour = d.getHours();
  const min = d.getMinutes();
  const time = hour + min / 60;

  let isOpen = false;
  if (day >= 1 && day <= 5 && time >= 9 && time < 17) isOpen = true;
  if (day === 6 && time >= 11 && time < 15) isOpen = true;

  const el = document.getElementById("checker");
  if (isOpen) {
    el.innerHTML = currentLang === 'ru'
      ? '<span style="color:#3a7d44;font-weight:600;">● Открыто сейчас</span>'
      : '<span style="color:#3a7d44;font-weight:600;">● Deschis acum</span>';
  } else {
    el.innerHTML = currentLang === 'ru'
      ? '<span style="color:#c0392b;font-weight:600;">● Закрыто</span>'
      : '<span style="color:#c0392b;font-weight:600;">● Închis acum</span>';
  }
}
checkOpen();
setInterval(checkOpen, 60000); // refresh every minute