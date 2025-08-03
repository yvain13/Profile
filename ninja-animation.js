// Ninja Animation Enhancement Script
document.addEventListener('DOMContentLoaded', function() {
    // Add parallax effect to the ninja scene
    const ninjaScene = document.querySelector('.ninja-scene');
    const mountains = document.querySelector('.mountains');
    const castle = document.querySelector('.castle');
    const trees = document.querySelector('.trees');
    const river = document.querySelector('.river');
    const ninjas = document.querySelectorAll('.ninja');

    // Parallax scrolling effect
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        const rate2 = scrolled * -0.3;
        const rate3 = scrolled * -0.1;

        if (mountains) {
            mountains.style.transform = `translateY(${rate}px)`;
        }
        if (castle) {
            castle.style.transform = `translateX(-50%) translateY(${rate2}px)`;
        }
        if (trees) {
            trees.style.transform = `translateY(${rate3}px)`;
        }
    });

    // Add click interaction to ninjas
    ninjas.forEach((ninja, index) => {
        ninja.addEventListener('click', function() {
            // Add a temporary glow effect
            ninja.style.filter = 'drop-shadow(0 0 10px #00ffff)';
            ninja.style.transform = 'scale(1.2)';
            
            setTimeout(() => {
                ninja.style.filter = '';
                ninja.style.transform = '';
            }, 500);
        });
    });

    // Add floating particles effect
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 6;
            left: ${Math.random() * 100}%;
            top: 100%;
            animation: floatUp ${5 + Math.random() * 5}s linear infinite;
        `;
        
        ninjaScene.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 10000);
    }

    // Create particles periodically
    setInterval(createParticle, 2000);

    // Add CSS for floating particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                opacity: 0;
                transform: translateY(0) translateX(0);
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                opacity: 0;
                transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            }
        }
        
        .floating-particle {
            animation-timing-function: ease-out;
        }
    `;
    document.head.appendChild(style);

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add intersection observer for section animations
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Add hover effect to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-8px)';
        });
    });

    // Add typing effect to the subtitle
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        subtitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                subtitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }
});
