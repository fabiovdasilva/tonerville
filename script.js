/* Navbar: adicionar classe "scrolled" ao rolar */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

/* Toggle do Menu Mobile */
document.querySelector('.menu-toggle').addEventListener('click', function() {
  document.querySelector('.mobile-nav').classList.toggle('active');
});

/* Smooth Scroll */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
    if (mobileNav.style.display === 'block') {
      mobileNav.style.display = 'none';
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

/* Animação com IntersectionObserver para elementos */
const animateOnScroll = (selector) => {
  const elements = document.querySelectorAll(selector);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  elements.forEach(el => observer.observe(el));
};
animateOnScroll('.service-card');
animateOnScroll('.testimonial-card');
animateOnScroll('.product-demo img');

 // Animação dos cards de benefícios em cascata
 const benefitCards = document.querySelectorAll('.benefit-card');
 const animateBenefits = () => {
   benefitCards.forEach((card, index) => {
     setTimeout(() => {
       card.classList.add('visible');
     }, index * 300);
   });
 };
 const benefitsSection = document.querySelector('.eco-benefits');
 const benefitsObserver = new IntersectionObserver((entries, observer) => {
   entries.forEach(entry => {
     if (entry.isIntersecting) {
       animateBenefits();
       observer.unobserve(entry.target);
     }
   });
 }, { threshold: 0.5 });
 benefitsObserver.observe(benefitsSection);

/* Contador animado */
const counters = document.querySelectorAll('.counter h3');
const animateCounters = () => {
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / 200;
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 10);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
};
const counterSection = document.getElementById('numeros');
const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counterObserver.observe(counterSection);

/* Swiper para Marcas Parceiras */
var swiperPartners = new Swiper('.swiper-partners', {
  centeredSlides: true,
  spaceBetween: 10,
  slidesPerView: 4,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    320: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 4 }
  }
});

 // Calculadora de Economia: 35% de economia
 document.getElementById('eco-btn-calc').addEventListener('click', () => {
    const pages = +document.getElementById('eco-pages').value;
    const resultEl = document.getElementById('eco-calc-result');
    
    if (!pages) {
      resultEl.innerText = "Informe a quantidade de páginas.";
      return;
    }
    
    const costCurrent = 0.30;
    const costOutsourced = costCurrent * 0.65; // 35% de economia
    const savingPerPage = costCurrent - costOutsourced;
    const totalSaving = pages * savingPerPage;
    
    resultEl.innerText = `Estimativa: R$ ${totalSaving.toFixed(2)} por mês.`;
  });

/* Envio do formulário (simulação) */
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  this.reset();
  alert('Mensagem enviada com sucesso! Retornaremos em até 24h.');
});

/*carrossel 3D com Swiper*/
var swiperTestimonials = new Swiper('.swiper-testimonials', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  loop: true,
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: false,
  },
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

// Fechar menu ao clicar fora
document.addEventListener('click', function(event) {
  const mobileNav = document.querySelector('.mobile-nav');
  const menuToggle = document.querySelector('.menu-toggle');
  
  if (!event.target.closest('.mobile-nav') && 
      !event.target.closest('.menu-toggle') &&
      mobileNav.classList.contains('active')) {
    mobileNav.classList.remove('active');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});