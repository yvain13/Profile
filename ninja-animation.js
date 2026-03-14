document.addEventListener('DOMContentLoaded', function () {

    /* ── Sticky nav shadow on scroll ───────────────────────── */
    const topnav = document.getElementById('topnav');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 10) {
            topnav.classList.add('scrolled');
        } else {
            topnav.classList.remove('scrolled');
        }
    }, { passive: true });

    /* ── Hamburger menu toggle ───────────────────────────────── */
    const hamburger = document.getElementById('hamburger');
    const topnavLinks = document.getElementById('topnav-links');

    if (hamburger && topnavLinks) {
        hamburger.addEventListener('click', function () {
            const isOpen = topnavLinks.classList.toggle('open');
            hamburger.classList.toggle('open', isOpen);
            hamburger.setAttribute('aria-expanded', String(isOpen));
        });

        // Close menu when any nav link is clicked
        topnavLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function () {
                topnavLinks.classList.remove('open');
                hamburger.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!topnavLinks.contains(e.target) && !hamburger.contains(e.target)) {
                topnavLinks.classList.remove('open');
                hamburger.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* ── Smooth scroll for all internal anchor links ─────────── */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            const navH = parseInt(getComputedStyle(document.documentElement)
                .getPropertyValue('--nav-h')) || 64;
            const top = target.getBoundingClientRect().top + window.scrollY - navH;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    /* ── Scroll-reveal (reveal + reveal-stagger) ─────────────── */
    const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
    if (revealEls.length) {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(el => obs.observe(el));
    }

    /* ── Ninja click sparkle ─────────────────────────────────── */
    document.querySelectorAll('.ninja').forEach(ninja => {
        ninja.style.cursor = 'pointer';
        ninja.addEventListener('click', function () {
            this.style.transition = 'filter 0.15s, transform 0.15s';
            this.style.filter = 'sepia(0%) saturate(2) brightness(1.2) drop-shadow(0 0 8px #c4895a)';
            this.style.transform = 'scale(1.35)';
            setTimeout(() => {
                this.style.filter = '';
                this.style.transform = '';
            }, 500);
        });
    });

});
