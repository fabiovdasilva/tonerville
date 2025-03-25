/* Navbar: adicionar classe "scrolled" ao rolar */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

/* Smooth Scroll melhorado */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    const headerHeight = header.offsetHeight;
    
    window.scrollTo({
      top: target.offsetTop - headerHeight,
      behavior: 'smooth'
    });

    // Fecha menu mobile se aberto
    if (mobileNav?.style.display === 'block') {
      mobileNav.style.display = 'none';
      menuToggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

/* Animação com IntersectionObserver otimizada */
const animateOnScroll = (selector, animationClass = 'animate') => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(animationClass);
      } else {
        entry.target.classList.remove(animationClass); // Reset para reanimar
      }
    });
  }, { 
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll(selector).forEach(el => observer.observe(el));
};

// Aplicar a elementos
['.service-card', '.testimonial-card', '.product-demo img'].forEach(selector => {
  animateOnScroll(selector);
});

/* Contador animado melhorado */
const counters = document.querySelectorAll('.counter h3');
let animationPlayed = false;

const resetCounters = () => {
  counters.forEach(counter => {
    counter.textContent = '0';
  });
};

const animateCounters = () => {
  counters.forEach(counter => {
    const target = +counter.dataset.target;
    const duration = 2000; // 2 segundos
    const startTime = Date.now();
    
    const updateCount = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      counter.textContent = Math.floor(progress * target);
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        counter.textContent = target;
      }
    };
    
    requestAnimationFrame(updateCount);
  });
};

const counterSection = document.getElementById('numeros');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      resetCounters();
      animateCounters();
    } else {
      resetCounters();
    }
  });
}, { 
  threshold: 0.5,
  rootMargin: '100px' 
});

counterObserver.observe(counterSection);

// Reset ao recarregar
window.addEventListener('beforeunload', resetCounters);


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

document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const header = document.querySelector('header');

  // Animação do menu
  menuToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    this.classList.toggle('active');
    mobileNav.classList.toggle('active');
    
    // Ajuste da posição considerando header scrolled
    const headerHeight = header.offsetHeight;
    mobileNav.style.top = headerHeight + 'px';
  });

  // Fechar ao clicar fora
  document.addEventListener('click', function(e) {
    if (!menuToggle.contains(e.target) && !mobileNav.contains(e.target)) {
      menuToggle.classList.remove('active');
      mobileNav.classList.remove('active');
    }
  });

  // Fechar ao rolar
  window.addEventListener('scroll', function() {
    menuToggle.classList.remove('active');
    mobileNav.classList.remove('active');
  });

  // Ajustar posição do menu quando header muda tamanho
  window.addEventListener('resize', function() {
    const headerHeight = header.offsetHeight;
    mobileNav.style.top = headerHeight + 'px';
  });
});


let carouselInterval = null;
let currentService = 0;
let isAutoPlaying = false;
let observer;
let openService = null;
let pauseTimeout = null;
const PAUSE_DURATION = 30000;
const CAROUSEL_INTERVAL = 5000;
const section = document.querySelector('#servicos');

function toggleService(serviceNumber) {
  const service = document.querySelector(`.service-item:nth-child(${serviceNumber})`);
  const content = service.querySelector('.service-content');
  const imageContainer = document.querySelector('.service-image-container');
  const imageUrl = content.dataset.image;

  // Não fecha se já é o único aberto
  if (content.style.maxHeight && isOnlyServiceOpen(serviceNumber)) return;

  stopCarousel();
  section.classList.remove('auto-play-active');

  // Fecha apenas se não for o último aberto
  if (!content.style.maxHeight) {
    closeOtherServices(serviceNumber);
  }

  content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px";
  service.querySelector('.toggle-icon').textContent = content.style.maxHeight ? '▲' : '▼';
  
  if (content.style.maxHeight) {
    imageContainer.style.backgroundImage = `url('${imageUrl}')`;
    imageContainer.classList.add('active');
    openService = service;
  } 

  if (pauseTimeout) clearTimeout(pauseTimeout);
  pauseTimeout = setTimeout(startCarousel, PAUSE_DURATION);
}

function isOnlyServiceOpen(serviceNumber) {
  const openCount = document.querySelectorAll('.service-content[style*="max-height"]').length;
  return openCount === 1 && document.querySelector(`.service-item:nth-child(${serviceNumber}) .service-content[style*="max-height"]`);
}

function closeOtherServices(serviceToKeep) {
  document.querySelectorAll('.service-item').forEach((service, index) => {
    if (index + 1 !== serviceToKeep) {
      const content = service.querySelector('.service-content');
      content.style.maxHeight = null;
      service.querySelector('.toggle-icon').textContent = '▼';
    }
  });
}

function initServiceCarousel() {
  const services = document.querySelectorAll('.service-item');
  
  // Garante que o primeiro está aberto inicialmente
  if (!document.querySelector('.service-content[style*="max-height"]')) {
    toggleService(1);
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCarousel();
        currentService = 0;
      } else {
        stopCarousel();
        resetServices();
        clearTimeout(pauseTimeout);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(section);

  services.forEach((service, index) => {
    service.addEventListener('click', () => {
      if (isAutoPlaying) {
        stopCarousel();
        section.classList.remove('auto-play-active');
      }
      currentService = index;
    });
  });
}

function startCarousel() {
  const services = document.querySelectorAll('.service-item');
  
  section.classList.add('auto-play-active');
  isAutoPlaying = true;
  
  carouselInterval = setInterval(() => {
    closeAllServices();
    
    services[currentService].querySelector('.service-header').click();
    
    currentService = (currentService + 1) % services.length;
  }, CAROUSEL_INTERVAL);
}

function stopCarousel() {
  clearInterval(carouselInterval);
  isAutoPlaying = false;
}

function resetServices() {
  currentService = 0;
  closeOtherServices(1); // Mantém o primeiro aberto
  setTimeout(() => {
    section.classList.remove('auto-play-active');
  }, 1000);
}

function closeAllServices() {
  document.querySelectorAll('.service-content').forEach(content => {
    content.style.maxHeight = null;
  });
  document.querySelectorAll('.toggle-icon').forEach(icon => {
    icon.textContent = '▼';
  });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  initServiceCarousel();
});

// Inicialização garantindo pelo menos um aberto
document.addEventListener('DOMContentLoaded', () => {
  if (!document.querySelector('.service-content[style*="max-height"]')) {
    toggleService(1);
  }
  initServiceCarousel();
});