document.addEventListener('DOMContentLoaded', function () {

  // ===== Preloader =====
  var preloader = document.querySelector('.preloader');
  if (preloader) {
    window.addEventListener('load', function () {
      setTimeout(function () {
        preloader.classList.add('hidden');
      }, 400);
    });
    // Fallback in case load already fired
    setTimeout(function () {
      preloader.classList.add('hidden');
    }, 1500);
  }

  // ===== Sticky Header Scroll Effect =====
  var header = document.querySelector('header');
  var lastScroll = 0;

  window.addEventListener('scroll', function () {
    var currentScroll = window.pageYOffset;
    if (currentScroll > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // ===== Mobile Navigation =====
  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('open');
    });
  }

  document.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('active');
      hamburger.classList.remove('open');
    });
  });

  // ===== Active Nav Link =====
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // ===== Scroll Reveal =====
  var revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');

  function checkReveal() {
    var windowHeight = window.innerHeight;
    revealElements.forEach(function (el) {
      var top = el.getBoundingClientRect().top;
      var trigger = windowHeight * 0.88;
      if (top < trigger) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkReveal);
  window.addEventListener('resize', checkReveal);
  // Initial check
  setTimeout(checkReveal, 100);

  // ===== Animated Counters =====
  var counters = document.querySelectorAll('[data-count]');
  var countersAnimated = {};

  function animateCounter(el) {
    var id = el.getAttribute('data-count');
    if (countersAnimated[id]) return;

    var target = el.getAttribute('data-count');
    var isNumber = !isNaN(parseInt(target));

    if (!isNumber) {
      el.textContent = target;
      countersAnimated[id] = true;
      return;
    }

    var end = parseInt(target);
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var duration = 1800;
    var startTime = null;
    countersAnimated[id] = true;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * end);
      el.textContent = prefix + current + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = prefix + end + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  function checkCounters() {
    counters.forEach(function (el) {
      var top = el.getBoundingClientRect().top;
      if (top < window.innerHeight * 0.9) {
        animateCounter(el);
      }
    });
  }

  window.addEventListener('scroll', checkCounters);
  setTimeout(checkCounters, 200);

  // ===== Back to Top Button =====
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== Smooth Scroll for Anchor Links =====
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== Contact Form =====
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var btn = form.querySelector('button[type="submit"]');
      var originalText = btn.innerHTML;
      btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> Sending...';
      btn.style.opacity = '0.7';
      btn.disabled = true;

      setTimeout(function () {
        btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg> Sent Successfully!';
        btn.style.opacity = '1';
        btn.style.background = '#059669';
        btn.style.borderColor = '#059669';

        setTimeout(function () {
          btn.innerHTML = originalText;
          btn.style.background = '';
          btn.style.borderColor = '';
          btn.disabled = false;
          form.reset();
        }, 2500);
      }, 1200);
    });
  }

  // ===== Tilt Effect on Service Cards =====
  if (window.innerWidth > 768) {
    document.querySelectorAll('.service-card, .value-card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var rotateX = (y - centerY) / 25;
        var rotateY = (centerX - x) / 25;
        card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-8px)';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

});
