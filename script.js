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


// Variáveis globais necessárias
let openService = null;

// Função principal para abrir/fechar serviços
function toggleService(serviceNumber) {
  const service = document.querySelector(`.service-item:nth-child(${serviceNumber})`);
  const content = service.querySelector('.service-content');
  const imageContainer = document.querySelector('.service-image-container');
  const imageUrl = content.dataset.image;

  // Não permite fechar o último serviço aberto
  if (content.style.maxHeight && isOnlyServiceOpen(serviceNumber)) return;

  // Fecha outros serviços se estiver abrindo um novo
  if (!content.style.maxHeight) {
    closeOtherServices(serviceNumber);
  }

  // Alterna estado do serviço clicado
  content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px";
  service.querySelector('.toggle-icon').textContent = content.style.maxHeight ? '▲' : '▼';

  // Atualiza imagem e estado
  if (content.style.maxHeight) {
    imageContainer.style.backgroundImage = `url('${imageUrl}')`;
    imageContainer.classList.add('active');
    openService = service;
  } else {
    // Se fechado, abre o próximo serviço automaticamente
    const nextService = serviceNumber % 3 + 1;
    toggleService(nextService);
  }
}

// Verifica se é o único serviço aberto
function isOnlyServiceOpen(serviceNumber) {
  const openCount = document.querySelectorAll('.service-content[style*="max-height"]').length;
  return openCount === 1 && document.querySelector(`.service-item:nth-child(${serviceNumber}) .service-content[style*="max-height"]`);
}

// Fecha outros serviços mantendo pelo menos um aberto
function closeOtherServices(serviceToKeep) {
  document.querySelectorAll('.service-item').forEach((service, index) => {
    if (index + 1 !== serviceToKeep) {
      const content = service.querySelector('.service-content');
      content.style.maxHeight = null;
      service.querySelector('.toggle-icon').textContent = '▼';
    }
  });
}

// Inicialização - Garante que o primeiro serviço está aberto
document.addEventListener('DOMContentLoaded', () => {
  if (!document.querySelector('.service-content[style*="max-height"]')) {
    toggleService(1);
  }
});

// Controle do menu mobile (mantido caso exista em outras partes do código)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
      const mobileNav = document.querySelector('.mobile-nav');
      const menuToggle = document.querySelector('.menu-toggle');
      if (mobileNav && mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    }
  });
});