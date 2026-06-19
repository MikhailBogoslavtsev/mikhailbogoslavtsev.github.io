(() => {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');
  const message = document.getElementById('message');
  const charCount = document.getElementById('char-count');
  const yearEl = document.getElementById('year');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Time-of-render — used to reject sub-3s submissions (bots).
  const renderedAt = Date.now();
  const MIN_FILL_MS = 3000;

  if (message && charCount) {
    const updateCount = () => { charCount.textContent = String(message.value.length); };
    message.addEventListener('input', updateCount);
    updateCount();
  }

  const setStatus = (text, kind) => {
    if (!status) return;
    status.textContent = text;
    status.classList.remove('is-success', 'is-error');
    if (kind === 'success') status.classList.add('is-success');
    if (kind === 'error') status.classList.add('is-error');
  };

  const setLoading = (loading) => {
    if (!submitBtn) return;
    submitBtn.disabled = loading;
    submitBtn.classList.toggle('is-loading', loading);
    const label = submitBtn.querySelector('.btn-label');
    if (label) label.textContent = loading ? 'Sending…' : 'Send request';
  };

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      setStatus('', null);

      // Honeypot — if filled, silently "succeed" to avoid telling bots they were caught.
      const hp = form.elements.namedItem('botcheck');
      if (hp && hp.checked) {
        setStatus('Thanks — your message has been sent.', 'success');
        form.reset();
        return;
      }

      // Time check — humans take more than 3s to read + fill the form.
      if (Date.now() - renderedAt < MIN_FILL_MS) {
        setStatus('Please take a moment to review your message before sending.', 'error');
        return;
      }

      // Native HTML5 validation
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
          setStatus('Thanks — your request is on its way. I’ll be in touch soon.', 'success');
          form.reset();
          if (charCount) charCount.textContent = '0';
        } else {
          const reason = json && json.message ? json.message : 'Something went wrong on our end.';
          setStatus(`Couldn’t send: ${reason} Try again in a moment, or email me directly.`, 'error');
        }
      } catch (err) {
        setStatus('Network error — check your connection and try again.', 'error');
      } finally {
        setLoading(false);
      }
    });
  }

  // Calm scroll-reveal — respects reduced-motion and degrades gracefully.
  const revealEls = document.querySelectorAll('[data-reveal]');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach((el) => io.observe(el));
  }
})();
