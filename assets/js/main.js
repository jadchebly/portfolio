/* Jad Chebly — portfolio behaviour.
   Three small things: a sticky-header border, scroll reveals, project filtering. */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Header gets a border once the page has scrolled --------------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var setStuck = function () {
      header.classList.toggle('is-stuck', window.scrollY > 8);
    };
    setStuck();
    window.addEventListener('scroll', setStuck, { passive: true });
  }

  /* --- Reveal elements as they enter the viewport -------------------- */
  var revealables = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        // Stagger siblings so a grid ripples in rather than snapping.
        var delay = Number(el.dataset.revealDelay || 0);
        el.style.transitionDelay = delay + 'ms';
        el.classList.add('is-in');
        observer.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    revealables.forEach(function (el, i) {
      if (!el.dataset.revealDelay) {
        var group = el.closest('.grid');
        if (group) {
          var siblings = Array.prototype.slice.call(group.children);
          el.dataset.revealDelay = String(Math.min(siblings.indexOf(el), 8) * 55);
        }
      }
      observer.observe(el);
    });
  }

  /* --- Project filtering -------------------------------------------- */
  var filterBar = document.querySelector('[data-filters]');
  if (filterBar) {
    var cards = Array.prototype.slice.call(document.querySelectorAll('[data-tags]'));
    var count = document.querySelector('[data-count]');

    var apply = function (value) {
      var shown = 0;
      cards.forEach(function (card) {
        var match = value === 'all' || card.dataset.tags.split(' ').indexOf(value) !== -1;
        card.hidden = !match;
        if (match) shown++;
      });
      if (count) {
        count.textContent = shown + (shown === 1 ? ' project' : ' projects');
      }
    };

    filterBar.addEventListener('click', function (event) {
      var button = event.target.closest('.filter');
      if (!button) return;
      filterBar.querySelectorAll('.filter').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b === button));
      });
      apply(button.dataset.filter);
    });

    apply('all');
  }
})();
