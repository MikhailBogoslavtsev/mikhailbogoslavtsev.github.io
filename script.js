(() => {
  'use strict';

  const root = document.documentElement;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined';
  const ST = window.ScrollTrigger;
  const animate = hasGSAP && !prefersReduced;

  // Failsafe: if we flagged the page for motion but GSAP didn't load (or motion is off),
  // drop the pre-hide class so nothing is ever stuck invisible.
  if (!animate) root.classList.remove('anim-ready');

  /* ---------------- Contact form (always runs, no deps) ---------------- */
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');
  const message = document.getElementById('message');
  const charCount = document.getElementById('char-count');
  const yearEl = document.getElementById('year');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

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
    if (kind) status.classList.add(`is-${kind}`);
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

      const hp = form.elements.namedItem('botcheck');
      if (hp && hp.checked) { setStatus('Thanks — your message has been sent.', 'success'); form.reset(); return; }
      if (Date.now() - renderedAt < MIN_FILL_MS) { setStatus('Please take a moment to review your message before sending.', 'error'); return; }
      if (!form.checkValidity()) { form.reportValidity(); setStatus('Please fill in the required fields.', 'error'); return; }

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

  /* ---------------- Motion (only when GSAP present & motion allowed) ---------------- */
  if (!animate) return;

  const gsap = window.gsap;
  if (ST) gsap.registerPlugin(ST);

  // Smooth scroll (Lenis) wired into GSAP's ticker + ScrollTrigger.
  let lenis = null;
  if (typeof window.Lenis !== 'undefined') {
    lenis = new window.Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
    lenis.on('scroll', () => { if (ST) ST.update(); });
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Make in-page anchor links use Lenis for a smooth glide.
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id.length > 1) {
          const target = document.querySelector(id);
          if (target) { e.preventDefault(); lenis.scrollTo(target, { offset: -74 }); }
        }
      });
    });
  }

  // Hero intro timeline (kinetic words + staggered supporting elements).
  const heroWords = gsap.utils.toArray('.hero-title .w > span');
  const heroBits = gsap.utils.toArray('[data-hero]');
  const introTL = gsap.timeline({ defaults: { ease: 'power3.out' } });
  if (heroWords.length) {
    introTL.from(heroWords, { yPercent: 110, duration: 0.9, stagger: 0.06 });
  }
  if (heroBits.length) {
    introTL.to(heroBits, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, '-=0.5')
           .from(heroBits, { y: 16, duration: 0.7, stagger: 0.08 }, '<');
  }

  // Scroll reveals for the rest of the page.
  if (ST) {
    gsap.utils.toArray('[data-reveal]').forEach((el) => {
      gsap.fromTo(el, { opacity: 0, y: 26 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
      });
    });

    // Subtle portrait parallax.
    const portrait = document.querySelector('[data-parallax]');
    if (portrait) {
      gsap.to(portrait, {
        yPercent: -8, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });
    }

    // Pinned horizontal work gallery (desktop, fine pointer, wide enough).
    const workPin = document.querySelector('.work-pin');
    const track = document.querySelector('.work-track');
    const canHorizontal = window.matchMedia('(min-width: 881px) and (pointer: fine)').matches;

    if (workPin && track && canHorizontal) {
      workPin.classList.add('is-horizontal');
      const amount = () => Math.max(0, track.scrollWidth - window.innerWidth + 56);
      gsap.to(track, {
        x: () => -amount(),
        ease: 'none',
        scrollTrigger: {
          trigger: workPin,
          start: 'top top',
          end: () => '+=' + amount(),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }

    // Recalculate once webfonts settle (Fraunces changes element widths).
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => ST.refresh());
    }
    window.addEventListener('load', () => ST.refresh());
  }

})();
