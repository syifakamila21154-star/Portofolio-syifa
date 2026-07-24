/* ─────────────────────────────────────
   script.js — Portfolio Syifa Kamila
─────────────────────────────────────── */

/* ── Hero entrance ─────────────────── */
window.addEventListener('load', () => {
    spawnParticles();
    startTyping();
    initScrollReveal();
    initSkillBars();
    initNavHighlight();
});

/* ── Floating particles ────────────── */
function spawnParticles() {
    const wrap = document.getElementById('particles');
    const colors = [
        'rgba(108,142,255,.18)',
        'rgba(168,85,247,.15)',
        'rgba(6,214,160,.12)',
    ];
    for (let i = 0; i < 40; i++) {
        const el = document.createElement('div');
        el.className = 'particle';
        const s = Math.random() * 5 + 2;
        Object.assign(el.style, {
            width:             s + 'px',
            height:            s + 'px',
            left:              (Math.random() * 100) + '%',
            animationDuration: (Math.random() * 22 + 10) + 's',
            animationDelay:    (Math.random() * 18) + 's',
            background:        colors[Math.floor(Math.random() * colors.length)],
            opacity:           (Math.random() * .40 + .06)
        });
        wrap.appendChild(el);
    }
}

/* ── Typing animation ──────────────── */
const roles = [
    'Web Developer 💻',
    'UI/UX Enthusiast 🎨',
    'PHP Developer ⚙️',
    'Creative Coder ✨',
];
let roleIdx = 0, charIdx = 0, isDeleting = false;

function startTyping() {
    const el = document.getElementById('typed-text');
    if (!el) return;
    tick();

    function tick() {
        const current = roles[roleIdx];
        if (isDeleting) {
            charIdx--;
        } else {
            charIdx++;
        }
        el.textContent = current.slice(0, charIdx);

        let delay = isDeleting ? 55 : 95;
        if (!isDeleting && charIdx === current.length) {
            delay = 1800;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            delay = 350;
        }
        setTimeout(tick, delay);
    }
}

/* ── Scroll-aware navbar ───────────── */
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        nav.style.background = 'rgba(6,13,31,.97)';
        nav.style.boxShadow  = '0 8px 40px rgba(0,0,0,.45)';
    } else {
        nav.style.background = 'rgba(6,13,31,.75)';
        nav.style.boxShadow  = '0 4px 32px rgba(0,0,0,.30)';
    }
    updateNavHighlight();
});

/* ── Active nav highlight on scroll ── */
function initNavHighlight() { updateNavHighlight(); }

function updateNavHighlight() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const links    = document.querySelectorAll('.navbar-custom .nav-link');
    let current    = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    links.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + current
            ? 'var(--light)'
            : '';
    });
}

/* ── Scroll Reveal ─────────────────── */
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ── Skill Bar Animations ──────────── */
function initSkillBars() {
    const bars = document.querySelectorAll('.skill-bar-fill');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const pct = entry.target.getAttribute('data-pct');
                entry.target.style.width = pct + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    bars.forEach(bar => observer.observe(bar));
}

/* ── 3-D card mouse-tilt ───────────── */
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width  - .5;
            const y = (e.clientY - r.top)  / r.height - .5;
            card.style.transform = `translateY(-12px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
});

/* ── Contact Form Handler ──────────── */
function handleHireForm(e) {
    e.preventDefault();
    const btn  = document.getElementById('hireSubmitBtn');
    const name = document.getElementById('hireName').value;
    const email= document.getElementById('hireEmail').value;
    const type = document.getElementById('hireType').value;
    const budget = document.getElementById('hireBudget').value;
    const msg  = document.getElementById('hireDesc').value;

    const subject = "Hire Inquiry from " + name;
    const body = "Name: " + name + "\nEmail: " + email + "\nProject Type: " + type + "\nBudget: " + budget + "\n\nMessage:\n" + msg;

    const mailtoLink = `mailto:syifakamila2154@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    btn.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Sent! Opening Mail...';
    btn.style.background = 'linear-gradient(135deg, #06D6A0, #059669)';

    setTimeout(() => {
        window.location.href = mailtoLink;
        setTimeout(() => {
            btn.innerHTML = '<i class="bi bi-send-fill me-2"></i>Send Project Inquiry';
            btn.style.background = '';
            document.getElementById('hireForm').reset();
            
            // Close modal using bootstrap API
            const modalEl = document.getElementById('hireMeModal');
            const modal = bootstrap.Modal.getInstance(modalEl);
            if (modal) modal.hide();
        }, 2000);
    }, 600);
}

/* ── Smooth scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // close mobile menu if open
            const collapse = document.getElementById('navMenu');
            if (collapse && collapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(collapse);
                if (bsCollapse) bsCollapse.hide();
            }
        }
    });
});
