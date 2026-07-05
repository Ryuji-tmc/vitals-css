/*!
 * vitals.js — vitals.css用の最小限の補助スクリプト(任意・依存ゼロ)
 * CSSだけで完結しない「数値カウント」「表示検知」「並び替え」だけをJSで担当する。
 */
(function (global) {
  'use strict';

  function animateCounter(el, { to, from = 0, duration = 1200, format = (n) => Math.round(n).toLocaleString() } = {}) {
    const start = performance.now();
    el.classList.add('is-updating');
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = from + (to - from) * eased;
      el.textContent = format(value);
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = format(to);
        setTimeout(() => el.classList.remove('is-updating'), 600);
      }
    }
    requestAnimationFrame(tick);
  }

  function setGauge(el, pct) {
    el.style.setProperty('--vt-pct', String(Math.max(0, Math.min(100, pct))));
  }

  function drawSparkline(pathEl) {
    const len = pathEl.getTotalLength();
    pathEl.style.setProperty('--vt-len', String(len));
  }

  function initStagger(root = document) {
    const targets = root.querySelectorAll('[data-vt-stagger]');
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const container = entry.target;
          [...container.children].forEach((child, i) => child.style.setProperty('--i', i));
          container.classList.add('is-visible');
          io.unobserve(container);
        }
      }
    }, { threshold: 0.2 });
    targets.forEach((t) => io.observe(t));
  }

  function pulseHeatCell(el) {
    el.classList.remove('is-updated');
    void el.offsetWidth;
    el.classList.add('is-updated');
  }

  // FLIP法でのランキング並び替え(要素の再挿入は呼び出し側が行う)
  function flipReorder(rows, applyNewOrder) {
    const first = new Map(rows.map((r) => [r, r.getBoundingClientRect()]));
    applyNewOrder();
    rows.forEach((r) => {
      const before = first.get(r);
      const after = r.getBoundingClientRect();
      const dy = before.top - after.top;
      if (dy) {
        r.style.transition = 'none';
        r.style.transform = `translateY(${dy}px)`;
        requestAnimationFrame(() => {
          r.style.transition = '';
          r.style.transform = '';
        });
      }
    });
  }

  global.Vitals = { animateCounter, setGauge, drawSparkline, initStagger, pulseHeatCell, flipReorder };
})(window);
