/* ============================================================
   PORTFOLIO – Premium Single-Page JavaScript
   Modern ES6+ · No external libraries
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ----------------------------------------------------------
     1. NAVBAR
  ---------------------------------------------------------- */

  // Hamburger toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');
  const nav       = document.querySelector('nav');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close mobile menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // Scroll effect – slightly darker bg after 100 px
  const handleNavScroll = () => {
    if (!nav) return;
    if (window.scrollY > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // run once on load

  // Active link highlighting via IntersectionObserver
  const sections     = document.querySelectorAll('section[id]');
  const navLinkItems = document.querySelectorAll('.nav-links a');

  if (sections.length && navLinkItems.length) {
    const activeLinkObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinkItems.forEach(link => {
              link.classList.toggle(
                'active',
                link.getAttribute('href') === `#${id}`
              );
            });
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
    );

    sections.forEach(section => activeLinkObserver.observe(section));
  }

  /* ----------------------------------------------------------
     2. SMOOTH SCROLL
  ---------------------------------------------------------- */

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Dedicated "Learn More About Me" & "Get In Touch" buttons
  const learnMoreBtn = document.querySelector('.learn-more-btn, [data-scroll-to="about"]');
  const getInTouchBtn = document.querySelector('.get-in-touch-btn, [data-scroll-to="contact"]');

  if (learnMoreBtn) {
    learnMoreBtn.addEventListener('click', e => {
      e.preventDefault();
      const about = document.querySelector('#about');
      if (about) about.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (getInTouchBtn) {
    getInTouchBtn.addEventListener('click', e => {
      e.preventDefault();
      const contact = document.querySelector('#contact');
      if (contact) contact.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ----------------------------------------------------------
     3. SCROLL ANIMATIONS (Intersection Observer)
  ---------------------------------------------------------- */

  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if (animatedElements.length) {
    const scrollAnimObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    animatedElements.forEach(el => scrollAnimObserver.observe(el));
  }

  /* ----------------------------------------------------------
     4. SKILL BAR ANIMATION
  ---------------------------------------------------------- */

  const skillBars = document.querySelectorAll('.skill-progress');

  if (skillBars.length) {
    const skillObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const bar     = entry.target;
            const percent = bar.dataset.progress;
            if (percent) {
              bar.style.width = `${percent}%`;
            }
            observer.unobserve(bar);
          }
        });
      },
      { threshold: 0.15 }
    );

    skillBars.forEach(bar => skillObserver.observe(bar));
  }

  /* ----------------------------------------------------------
     5. STAT COUNTER ANIMATION
  ---------------------------------------------------------- */

  const statNumbers = document.querySelectorAll('.stat-number');

  if (statNumbers.length) {
    const animateCounter = (el) => {
      const target   = parseInt(el.dataset.target, 10) || 0;
      const duration = 2000; // 2 seconds
      const startTime = performance.now();

      const step = (currentTime) => {
        const elapsed  = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // ease-out cubic for smooth deceleration
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);

        el.textContent = `${current}+`;

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    };

    const statObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    statNumbers.forEach(el => statObserver.observe(el));
  }

  /* ----------------------------------------------------------
     6. TYPING EFFECT
  ---------------------------------------------------------- */

  const typingTextEl = document.querySelector('.typing-text');

  if (typingTextEl) {
    const titles       = ['Data Scientist', 'Machine Learning Researcher'];
    let titleIndex     = 0;
    let charIndex      = 0;
    let isDeleting     = false;
    const typeSpeed    = 100;
    const deleteSpeed  = 60;
    const pauseEnd     = 1800; // pause after fully typed
    const pauseStart   = 400; // pause before typing next

    const type = () => {
      const current = titles[titleIndex];

      if (!isDeleting) {
        typingTextEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === current.length) {
          isDeleting = true;
          setTimeout(type, pauseEnd);
          return;
        }
        setTimeout(type, typeSpeed);
      } else {
        typingTextEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          titleIndex = (titleIndex + 1) % titles.length;
          setTimeout(type, pauseStart);
          return;
        }
        setTimeout(type, deleteSpeed);
      }
    };

    setTimeout(type, 1000); // small initial delay
  }

  /* ----------------------------------------------------------
     7. CERTIFICATE LIGHTBOX
  ---------------------------------------------------------- */

  const certCards      = document.querySelectorAll('.cert-card');
  const lightbox       = document.querySelector('.lightbox-overlay') ||
                         createLightbox();
  const lightboxImg    = lightbox.querySelector('.lightbox-content img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const lightboxClose  = lightbox.querySelector('.lightbox-close');

  function createLightbox() {
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = `
      <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
      <div class="lightbox-content">
        <img src="" alt="Certificate">
      </div>
      <p class="lightbox-caption"></p>
    `;
    document.body.appendChild(overlay);
    return overlay;
  }

  const openLightbox = (imgSrc, title) => {
    if (lightboxImg)    lightboxImg.src          = imgSrc;
    if (lightboxImg)    lightboxImg.alt          = title || 'Certificate';
    if (lightboxCaption) lightboxCaption.textContent = title || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    if (lightboxImg) lightboxImg.src = '';
  };

  certCards.forEach(card => {
    card.addEventListener('click', () => {
      const img   = card.querySelector('img');
      const title = card.querySelector('.cert-title, h3, h4')?.textContent ||
                    card.getAttribute('data-title') || '';
      const src   = img ? img.src : (card.dataset.image || '');
      if (src) openLightbox(src, title);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  /* ----------------------------------------------------------
     8. CONTACT FORM
  ---------------------------------------------------------- */

  const contactForm = document.querySelector('#contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      // Basic validation — check required fields
      const requiredFields = contactForm.querySelectorAll('[required]');
      let valid = true;

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      });

      if (!valid) {
        showFormMessage('Please fill in all required fields.', 'error');
        return;
      }

      // Collect fields
      const name    = contactForm.querySelector('[name="name"]')?.value.trim()    || '';
      const email   = contactForm.querySelector('[name="email"]')?.value.trim()   || '';
      const subject = contactForm.querySelector('[name="subject"]')?.value.trim() || 'Portfolio Contact';
      const message = contactForm.querySelector('[name="message"]')?.value.trim() || '';

      // Construct mailto link
      const mailBody    = `Name: ${name}\nEmail: ${email}\n\n${message}`;
      const mailtoLink  = `mailto:madihajeelani41@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;
      window.open(mailtoLink, '_blank');

      showFormMessage('Message prepared! Your email client should open shortly.', 'success');
      contactForm.reset();
    });
  }

  function showFormMessage(text, type = 'success') {
    let msgEl = document.querySelector('.form-message');
    if (!msgEl) {
      msgEl = document.createElement('div');
      msgEl.className = 'form-message';
      contactForm?.parentNode?.insertBefore(msgEl, contactForm.nextSibling);
    }
    msgEl.textContent = text;
    msgEl.className   = `form-message ${type}`;
    msgEl.style.display = 'block';

    setTimeout(() => {
      msgEl.style.display = 'none';
    }, 4000);
  }

  /* ----------------------------------------------------------
     9. SCROLL TO TOP BUTTON
  ---------------------------------------------------------- */

  const scrollTopBtn = document.querySelector('.scroll-top');

  if (scrollTopBtn) {
    const toggleScrollTopBtn = () => {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', toggleScrollTopBtn, { passive: true });
    toggleScrollTopBtn();

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ----------------------------------------------------------
     10. PARALLAX EFFECT (subtle)
  ---------------------------------------------------------- */

  const landingSection = document.querySelector('.landing, #landing, #home, .hero');

  if (landingSection) {
    const parallaxElements = landingSection.querySelectorAll(
      '.parallax-bg, .landing-bg, .bg-shapes, .shape'
    );

    if (parallaxElements.length) {
      window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        parallaxElements.forEach((el, i) => {
          const speed = 0.3 + i * 0.1; // varied speeds for depth
          el.style.transform = `translateY(${scrolled * speed}px)`;
        });
      }, { passive: true });
    }
  }

  /* ----------------------------------------------------------
     11. PAGE LOADER
  ---------------------------------------------------------- */

  const pageLoader = document.querySelector('.page-loader');

  if (pageLoader) {
    setTimeout(() => {
      pageLoader.style.opacity = '0';
      pageLoader.style.transition = 'opacity 0.5s ease';

      pageLoader.addEventListener('transitionend', () => {
        pageLoader.remove();
      }, { once: true });

      // Safety net in case transitionend doesn't fire
      setTimeout(() => {
        if (document.body.contains(pageLoader)) {
          pageLoader.remove();
        }
      }, 600);
    }, 500);
  }

  /* ----------------------------------------------------------
     12. PARTICLES BACKGROUND (landing)
  ---------------------------------------------------------- */

  const particlesContainer = document.querySelector('.particles-container');

  if (particlesContainer) {
    const PARTICLE_COUNT = 50;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';

      // Random size between 2 – 6 px
      const size = Math.random() * 4 + 2;
      particle.style.width  = `${size}px`;
      particle.style.height = `${size}px`;

      // Random position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top  = `${Math.random() * 100}%`;

      // Random opacity
      particle.style.opacity = (Math.random() * 0.6 + 0.2).toFixed(2);

      // Random animation duration between 4 – 12 s
      const duration = Math.random() * 8 + 4;
      particle.style.animationDuration = `${duration}s`;

      // Random animation delay so they don't all start together
      const delay = Math.random() * 5;
      particle.style.animationDelay = `${delay}s`;

      fragment.appendChild(particle);
    }

    particlesContainer.appendChild(fragment);
  }

  /* ----------------------------------------------------------
     UTILITY: Debounce (used internally if needed)
  ---------------------------------------------------------- */

  // eslint-disable-next-line no-unused-vars
  function debounce(fn, wait = 100) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), wait);
    };
  }

});
