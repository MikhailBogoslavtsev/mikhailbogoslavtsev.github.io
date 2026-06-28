(() => {
  'use strict';

  const root = document.documentElement;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- Contact form ---------------- */
  const form = document.getElementById('contact-form');
  const successCard = document.getElementById('form-success');
  const status = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  // Timing honeypot: ignore submissions that arrive implausibly fast (bots).
  const renderedAt = Date.now();
  const MIN_FILL_MS = 3000;

  const setStatus = (text, kind) => {
    if (!status) return;
    status.textContent = text;
    status.classList.remove('is-success', 'is-error');
    if (kind) status.classList.add(`is-${kind}`);
  };

  const setLoading = (loading) => {
    if (!submitBtn) return;
    submitBtn.disabled = loading;
    submitBtn.classList.toggle('is-loading', loading);
    const label = submitBtn.querySelector('.btn-label');
    if (label) label.textContent = loading ? 'Sending…' : 'Send';
  };

  const showSuccess = () => {
    if (form) form.hidden = true;
    if (successCard) {
      successCard.hidden = false;
      successCard.setAttribute('tabindex', '-1');
      successCard.focus({ preventScroll: true });
    }
  };

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      setStatus('', null);

      const hp = form.elements.namedItem('botcheck');
      if (hp && hp.checked) { showSuccess(); return; }
      if (Date.now() - renderedAt < MIN_FILL_MS) {
        setStatus('Please take a moment to review your message before sending.', 'error');
        return;
      }
      if (!form.checkValidity()) {
        form.reportValidity();
        setStatus('Please fill in the required fields.', 'error');
        return;
      }

      setLoading(true);
      const payload = Object.fromEntries(new FormData(form).entries());

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload),
        });
        const json = await res.json().catch(() => ({}));
        if (res.ok && json.success) {
          showSuccess();
        } else {
          const reason = json && json.message ? json.message : 'Something went wrong on our end.';
          setStatus(`Couldn’t send: ${reason} Please try again in a moment.`, 'error');
        }
      } catch (err) {
        setStatus('Network error — check your connection and try again.', 'error');
      } finally {
        setLoading(false);
      }
    });
  }

  /* ---------------- Scroll reveals (progressive enhancement) ---------------- */
  // index.html adds `.anim-ready` to <html> only when motion is allowed, which
  // pre-hides reveal targets. If we bail here, reveal everything so nothing sticks.
  const revealEls = document.querySelectorAll('[data-reveal], [data-hero]');

  if (prefersReduced || !('IntersectionObserver' in window)) {
    root.classList.remove('anim-ready');
    return;
  }

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        obs.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });

  revealEls.forEach((el) => io.observe(el));
})();
