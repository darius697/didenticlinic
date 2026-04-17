// ── LANGUAGE ──
let currentLang = 'ro';

function setLang(lang) {
  currentLang = lang;
  document.body.classList.toggle('lang-ru', lang === 'ru');
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.trim().toLowerCase() === lang);
  });
  checkOpen();
}

// ── NAVBAR SCROLL ──
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
});

// ── MOBILE MENU ──
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

document.addEventListener('click', e => {
  if (!e.target.closest('#mobileMenu') && !e.target.closest('#hamburger')) {
    document.getElementById('mobileMenu').classList.remove('open');
  }
});

// ── SCROLL REVEAL ──
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

// Hero reveal imediat
document.querySelectorAll('.hero .reveal').forEach(el => {
  setTimeout(() => el.classList.add('visible'), 300);
});

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ── OPEN/CLOSED CHECKER ──
function checkOpen() {
  const d = new Date();
  const day = d.getDay();       // 0=dum, 1=lun ... 6=sâm
  const hour = d.getHours();
  const min = d.getMinutes();
  const time = hour + min / 60;

  let isOpen = false;
  if (day >= 1 && day <= 5 && time >= 9 && time < 17) isOpen = true;
  if (day === 6 && time >= 11 && time < 15) isOpen = true;

  const el = document.getElementById('checker');
  if (!el) return;

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
setInterval(checkOpen, 60000);

// ── FORM SUBMIT ──
document.getElementById('appointment-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const formMessage = document.getElementById('form-message');

  // Dezactivează butonul în timpul trimiterii
  submitBtn.disabled = true;
  submitBtn.style.opacity = '0.7';

  const data = new FormData(form);

  try {
    await fetch('https://api.postcatch.io/submit/67766a7c-bb1c-4318-a142-8bf494b20c9e', {
      method: 'POST',
      body: data
    });

    // Reset form
    form.reset();

    // Afișează mesajul de succes
    formMessage.style.display = 'block';
    setTimeout(() => {
      formMessage.style.opacity = '1';
    }, 10);

    // Ascunde mesajul după 5 secunde
    setTimeout(() => {
      formMessage.style.opacity = '0';
      setTimeout(() => { formMessage.style.display = 'none'; }, 400);
    }, 5000);

  } catch (err) {
    alert(currentLang === 'ru' ? 'Ошибка при отправке. Попробуйте снова.' : 'Eroare la trimitere. Încercați din nou.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.style.opacity = '';
  }
});