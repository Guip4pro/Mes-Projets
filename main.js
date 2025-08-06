// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Terminal typing effect
const terminalLines = document.querySelectorAll('.terminal-line');
terminalLines.forEach((line, index) => {
    line.style.opacity = '0';
    setTimeout(() => {
        line.style.opacity = '1';
        line.style.animation = 'fadeIn 0.5s ease-in';
    }, index * 500);
});

document.addEventListener('DOMContentLoaded', () => {
    // Formulaire
    const form = document.querySelector('.contact-form');
    const inputs = document.querySelectorAll(".contact-form input[maxlength], .contact-form textarea[maxlength]");

    // Initialise les compteurs de caractères
    const countersMap = new Map();

    inputs.forEach(input => {
        const max = input.getAttribute("maxlength");
        const counter = input.parentElement.querySelector("p[id='char-count']");
        if (counter) {
            const updateCount = () => {
                const remaining = max - input.value.length;
                counter.textContent = `Caractères restants : ${remaining}`;
            };
            input.addEventListener("input", updateCount);
            updateCount(); // Initialisation

            // Sauvegarde la fonction pour réutilisation après reset
            countersMap.set(input, updateCount);
        }
    });

    // Gestion de la soumission du formulaire
    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        console.log('🟢 submit event fired');

        const formData = new FormData(form);
        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            console.log('Fetch response:', response);

            if (response.ok) {
                console.log('✅ Envoi réussi');
                form.reset();

                // Forcer la mise à jour des compteurs après reset
                countersMap.forEach((updateCount, input) => updateCount());

                // Affichage du popup
                const popup = document.getElementById('popup-message');
                popup.classList.add('popup-visible');

                setTimeout(() => {
                    popup.classList.remove('popup-visible');
                }, 3000);
            } else {
                console.error('❌ Envoi échoué, status:', response.status);
                alert("Une erreur s'est produite. Statut : " + response.status);
            }
        } catch (err) {
            console.error('🚨 Erreur fetch():', err);
            alert("Erreur réseau : vérifie la console");
        }
    });
});


// Dynamic circuit lines
function createCircuitLine() {
    const line = document.createElement('div');
    line.className = 'circuit-line';
    line.style.top = Math.random() * 100 + '%';
    line.style.animationDelay = Math.random() * 4 + 's';
    document.querySelector('.bg-animation').appendChild(line);
    
    setTimeout(() => {
        line.remove();
    }, 4000);
}

setInterval(createCircuitLine, 2000);

// Active navigation link
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Glitch effect on logo hover
const logo = document.querySelector('.logo');
logo.addEventListener('mouseenter', function() {
    this.style.animation = 'glitch 0.3s ease-in-out';
    setTimeout(() => {
        this.style.animation = '';
    }, 300);
});

// Add glitch keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes glitch {
        0% { transform: translateX(0); }
        20% { transform: translateX(-2px) skew(-2deg); }
        40% { transform: translateX(2px) skew(2deg); }
        60% { transform: translateX(-1px) skew(1deg); }
        80% { transform: translateX(1px) skew(-1deg); }
        100% { transform: translateX(0); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .nav-links a.active {
        color: var(--accent-cyan);
        text-shadow: 0 0 10px var(--accent-cyan);
    }
    
    .nav-links a.active::before {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Particle effect on CTA button click
document.querySelector('.cta-button').addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: var(--accent-cyan);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;
        
        this.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 6;
        const velocity = 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${vx}px, ${vy}px) scale(0)`, opacity: 0 }
        ], {
            duration: 600,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => particle.remove();
    }
});

// Matrix rain effect (subtle background)
function createMatrixRain() {
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    for (let i = 0; i < 3; i++) {
        const drop = document.createElement('div');
        drop.textContent = chars[Math.floor(Math.random() * chars.length)];
        drop.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}vw;
            top: -20px;
            color: var(--accent-green);
            font-family: 'JetBrains Mono', monospace;
            font-size: 14px;
            opacity: 0.3;
            pointer-events: none;
            z-index: -1;
        `;
        
        document.body.appendChild(drop);
        
        drop.animate([
            { transform: 'translateY(-20px)', opacity: 0.3 },
            { transform: 'translateY(100vh)', opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'linear'
        }).onfinish = () => drop.remove();
    }
}

setInterval(createMatrixRain, 500);

// Console easter egg
console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║    █████╗ ██╗     ███████╗██╗  ██╗     ██████╗██╗   ██╗    ║
║   ██╔══██╗██║     ██╔════╝╚██╗██╔╝    ██╔════╝╚██╗ ██╔╝    ║
║   ███████║██║     █████╗   ╚███╔╝     ██║      ╚████╔╝     ║
║   ██╔══██║██║     ██╔══╝   ██╔██╗     ██║       ╚██╔╝      ║
║   ██║  ██║███████╗███████╗██╔╝ ██╗    ╚██████╗   ██║       ║
║   ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝     ╚═════╝   ╚═╝       ║
║                                                              ║
║   Salut, curieux développeur ! 👨‍💻                           ║
║   Tu regardes dans la console ? J'aime ça !                 ║
║   N'hésite pas à me contacter si tu veux discuter code !    ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
    `);
console.log('%cSi tu vois ceci, on devrait probablement se parler ! 🚀', 
            'color: #00d9ff; font-size: 16px; font-weight: bold;');