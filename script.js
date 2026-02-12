// ============================================
// IRHAM PORTFOLIO — INTERACTIONS
// ============================================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const cursorGlow = document.getElementById('cursorGlow');

// ============================================
// CURSOR GLOW (desktop only)
// ============================================
if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
        cursorGlow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });
}

// ============================================
// NAVBAR SCROLL
// ============================================
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ============================================
// MOBILE MENU
// ============================================
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.pageYOffset - offset,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// INTERSECTION OBSERVER — REVEAL ON SCROLL
// ============================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll(
        '.about-layout, .section-intro, .win-card, .year-marker, .project-row, .learning-banner, .contact-item'
    );
    items.forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${(i % 5) * 0.06}s`;
        revealObserver.observe(el);
    });
});

// ============================================
// COUNTER ANIMATION
// ============================================
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.metric-value').forEach(counter => {
                const target = parseInt(counter.dataset.count);
                const duration = 1200;
                const start = performance.now();

                function tick(now) {
                    const progress = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
                    counter.textContent = Math.round(eased * target);
                    if (progress < 1) requestAnimationFrame(tick);
                }

                requestAnimationFrame(tick);
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const metrics = document.querySelector('.hero-metrics');
if (metrics) counterObserver.observe(metrics);

// ============================================
// ACTIVE NAV HIGHLIGHT
// ============================================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const y = window.pageYOffset + 120;
    sections.forEach(sec => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
            link.classList.toggle('active', y >= top && y < top + height);
        }
    });
});

// ============================================
// SCROLL TO TOP
// ============================================
const scrollBtn = document.createElement('button');
scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
scrollBtn.setAttribute('aria-label', 'Scroll to top');
Object.assign(scrollBtn.style, {
    position: 'fixed',
    bottom: '28px',
    right: '28px',
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    background: '#27272a',
    color: '#a1a1aa',
    border: '1px solid rgba(255,255,255,0.08)',
    cursor: 'pointer',
    opacity: '0',
    visibility: 'hidden',
    transform: 'translateY(16px)',
    transition: 'all 0.3s ease',
    zIndex: '99',
    fontSize: '0.85rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});
document.body.appendChild(scrollBtn);

window.addEventListener('scroll', () => {
    const show = window.scrollY > 600;
    scrollBtn.style.opacity = show ? '1' : '0';
    scrollBtn.style.visibility = show ? 'visible' : 'hidden';
    scrollBtn.style.transform = show ? 'translateY(0)' : 'translateY(16px)';
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

scrollBtn.addEventListener('mouseenter', () => {
    scrollBtn.style.background = '#3f3f46';
    scrollBtn.style.color = '#fafafa';
    scrollBtn.style.borderColor = 'rgba(255,255,255,0.15)';
});

scrollBtn.addEventListener('mouseleave', () => {
    scrollBtn.style.background = '#27272a';
    scrollBtn.style.color = '#a1a1aa';
    scrollBtn.style.borderColor = 'rgba(255,255,255,0.08)';
});
