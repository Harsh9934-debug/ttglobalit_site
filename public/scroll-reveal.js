/* ── Scroll Reveal Engine ── */
(function () {
  'use strict';

  /* ─────────────── Scroll Reveal Observer ─────────────── */
  var revealClasses = [
    '.scroll-reveal',
    '.scroll-reveal-left',
    '.scroll-reveal-right',
    '.scroll-reveal-scale'
  ];

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.02,
      rootMargin: '0px 0px 50px 0px'
    }
  );

  function initReveal() {
    var selector = revealClasses.join(',');
    document.querySelectorAll(selector).forEach(function (el) {
      // If element is already in the viewport or partially visible on load, reveal immediately!
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('visible');
      } else {
        observer.observe(el);
      }
    });
  }

  // Auto-apply scroll-reveal to major sections if not manually tagged
  function autoTag() {
    var sections = document.querySelectorAll(
      'main > section, body > section, [class*="py-16"], [class*="py-20"], [class*="py-24"]'
    );
    sections.forEach(function (section, i) {
      if (
        section.classList.contains('scroll-reveal') ||
        section.classList.contains('scroll-reveal-left') ||
        section.classList.contains('scroll-reveal-right') ||
        section.classList.contains('scroll-reveal-scale') ||
        section.classList.contains('visible') ||
        section.tagName === 'NAV' ||
        section.tagName === 'HEADER' ||
        section.id === 'about' ||
        i === 0
      ) {
        return;
      }
      section.classList.add('scroll-reveal');
      var delay = (i % 3) + 1;
      section.classList.add('scroll-delay-' + delay);
    });
  }

  /* ─────────────── Initialize ─────────────── */
  function boot() {
    autoTag();
    initReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
