// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initBackToTop();
    initTimelineAnimations();
    initStatCounters();
    initSmoothScrolling();
    initParallax();
    initGallery();
    initAyudhaPujaAnimations();
    initSpecialEventAnimations();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Hamburger menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animate hamburger bars
            const spans = hamburger.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });

    // Navbar background on scroll - Updated for Royal Blue theme
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(30, 58, 138, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(30, 58, 138, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });

    // Active nav link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Back to top button functionality - FIXED to scroll to absolute top
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        // Fixed click handler to scroll to absolute top
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Use scrollTo with absolute position 0
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            
            // Also use window.scrollTo as backup
            window.scrollTo(0, 0);
        });

        // Also handle keyboard events for accessibility
        backToTopBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
                window.scrollTo(0, 0);
            }
        });
    }
}

// Timeline animations - Updated for Royal Blue + Maroon theme
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add staggered animation delay
                const index = Array.from(timelineItems).indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.2}s`;
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    // Interactive timeline markers - Updated for new theme
    const timelineMarkers = document.querySelectorAll('.timeline-marker');
    timelineMarkers.forEach((marker, index) => {
        marker.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(-50%) scale(1.2) rotate(360deg)';
            this.style.background = 'linear-gradient(135deg, #1E3A8A 0%, #7F1D1D 50%, #F59E0B 100%)';
        });
        
        marker.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(-50%) scale(1)';
            this.style.background = 'linear-gradient(135deg, #1E3A8A 0%, #7F1D1D 50%, #F59E0B 100%)';
        });
    });
}

// Scroll animations for cards and elements
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.overview-card, .attraction-card, .info-card, .gallery-item, .ayudha-card, .event-card');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Set initial state for elements
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.6s ease';
        element.style.transitionDelay = `${index * 0.1}s`;
        scrollObserver.observe(element);
    });
}

// Animated counters for statistics - Updated for new stats
function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                const target = entry.target;
                const targetValue = target.getAttribute('data-target');
                
                if (targetValue === '416') {
                    animateCounter(target, 0, 416, 2000, 'edition');
                } else if (targetValue === '3000') {
                    animateCounter(target, 0, 3000, 2000, false);
                } else if (targetValue === '97') {
                    animateCounter(target, 0, 97, 2000, true);
                }
                
                hasAnimated = true;
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });
}

// Counter animation function - Updated for edition format
function animateCounter(element, start, end, duration, format = false) {
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(start + (end - start) * easeOutCubic);
        
        if (format === 'edition') {
            element.textContent = currentValue + 'th';
        } else if (format === true) {
            element.textContent = currentValue + 'K+';
        } else {
            element.textContent = currentValue.toLocaleString();
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            // Ensure final value is correct
            if (format === 'edition') {
                element.textContent = end + 'th';
            } else if (format === true) {
                element.textContent = end + 'K+';
            } else {
                element.textContent = end.toLocaleString();
            }
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Parallax effect for hero section - Updated for new theme
function initParallax() {
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroBackground.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Floating animation for hero stats
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        item.style.animation = `float 3s ease-in-out infinite alternate`;
    });
}

// Gallery functionality
function initGallery() {
    const galleryImages = document.querySelectorAll('.gallery-item img');
    
    galleryImages.forEach(img => {
        // Add loading effect
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        // Set up proper loading
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
            
            img.addEventListener('error', function() {
                console.warn('Failed to load image:', this.src);
                this.style.opacity = '0.7';
                this.alt = 'Image temporarily unavailable';
                // Add a placeholder background with new theme colors
                this.style.background = 'linear-gradient(135deg, #1E3A8A 0%, #F59E0B 100%)';
            });
        }
    });

    // Gallery item hover effects
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.gallery-overlay');
            if (overlay) {
                overlay.style.transform = 'translateY(0)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.gallery-overlay');
            if (overlay) {
                overlay.style.transform = 'translateY(100%)';
            }
        });
    });
}

// Ayudha Puja section animations - Updated for Royal Blue + Maroon theme
function initAyudhaPujaAnimations() {
    const ayudhaPujaSection = document.querySelector('.ayudha-puja-section');
    const ayudhaCards = document.querySelectorAll('.ayudha-card');
    
    if (ayudhaPujaSection) {
        // Observer for the main Ayudha Puja section
        const ayudhaObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.opacity = '1';
                    
                    // Animate cards with staggered effect
                    ayudhaCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.transform = 'translateY(0)';
                            card.style.opacity = '1';
                        }, index * 150);
                    });
                }
            });
        }, { threshold: 0.2 });
        
        // Set initial state
        ayudhaPujaSection.style.transform = 'translateY(50px)';
        ayudhaPujaSection.style.opacity = '0';
        ayudhaPujaSection.style.transition = 'all 0.8s ease';
        
        ayudhaCards.forEach(card => {
            card.style.transform = 'translateY(30px)';
            card.style.opacity = '0';
            card.style.transition = 'all 0.6s ease';
        });
        
        ayudhaObserver.observe(ayudhaPujaSection);
    }

    // Interactive hover effects for ceremony items - Updated colors
    const ceremonyItems = document.querySelectorAll('.ceremony-item');
    ceremonyItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.02)';
            this.style.background = 'rgba(245, 158, 11, 0.2)';
            this.style.borderLeftColor = '#F59E0B';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
            this.style.background = 'rgba(255, 255, 255, 0.7)';
            this.style.borderLeftColor = '#F59E0B';
        });
    });

    // Sacred timing highlight animation
    const timingDetails = document.querySelector('.timing-details');
    if (timingDetails) {
        const timingObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'heritageGlow 2s ease-in-out infinite';
                }
            });
        }, { threshold: 0.5 });
        
        timingObserver.observe(timingDetails);
    }
}

// Special events animations
function initSpecialEventAnimations() {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach((card, index) => {
        card.style.transform = 'translateY(30px)';
        card.style.opacity = '0';
        card.style.transition = 'all 0.6s ease';
        
        const cardObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.opacity = '1';
                    }, index * 200);
                }
            });
        }, { threshold: 0.1 });
        
        cardObserver.observe(card);
    });
}

// Interactive hover effects for attraction cards - Updated for Royal Blue + Maroon theme
document.addEventListener('DOMContentLoaded', function() {
    const attractionCards = document.querySelectorAll('.attraction-card');
    
    attractionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            
            // Add glow effect with Royal Blue + Golden colors
            if (this.classList.contains('featured')) {
                this.style.boxShadow = '0 25px 60px rgba(245, 158, 11, 0.4), 0 0 40px rgba(30, 58, 138, 0.3)';
            } else {
                this.style.boxShadow = '0 20px 50px rgba(245, 158, 11, 0.3)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px) scale(1)';
            this.style.boxShadow = '';
        });
    });
});

// Enhanced interactive effects for visitor info cards - Updated colors
document.addEventListener('DOMContentLoaded', function() {
    const statRows = document.querySelectorAll('.stat-row');
    
    statRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            const value = this.querySelector('.stat-value');
            if (value) {
                value.style.transform = 'scale(1.1)';
                value.style.color = '#F59E0B'; // Rich Gold
            }
            this.style.background = 'rgba(245, 158, 11, 0.2)';
        });
        
        row.addEventListener('mouseleave', function() {
            const value = this.querySelector('.stat-value');
            if (value) {
                value.style.transform = 'scale(1)';
                value.style.color = '#1E3A8A'; // Deep Royal Blue
            }
            this.style.background = 'rgba(245, 158, 11, 0.1)';
        });
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
});

// Interactive timeline events - Updated colors
document.addEventListener('DOMContentLoaded', function() {
    const timelineEvents = document.querySelectorAll('.event');
    
    timelineEvents.forEach(event => {
        event.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.02)';
            this.style.background = 'rgba(245, 158, 11, 0.25)';
            this.style.borderLeftColor = '#F59E0B';
        });
        
        event.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(5px) scale(1)';
            this.style.background = 'rgba(245, 158, 11, 0.1)';
            this.style.borderLeftColor = '#F59E0B';
        });
    });
});

// Heritage celebration scroll effects
function initHeritageAnimations() {
    // Add special emphasis to heritage elements
    const heritageElements = document.querySelectorAll('.heritage-experience, .cultural-programs');
    
    heritageElements.forEach(element => {
        const heritageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 1s ease-out forwards';
                }
            });
        }, { threshold: 0.3 });
        
        heritageObserver.observe(element);
    });
}

// Cultural significance animations - Updated for new theme
function initCulturalAnimations() {
    const culturalItems = document.querySelectorAll('.public-rituals li, .weapons-list li');
    
    culturalItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.4s ease';
        
        const itemObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.5 });
        
        itemObserver.observe(item);
    });
}

// Initialize heritage and cultural animations
document.addEventListener('DOMContentLoaded', function() {
    initHeritageAnimations();
    initCulturalAnimations();
});

// Dynamic CSS animations - Updated for Royal Blue + Golden + Maroon theme
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% { transform: translateY(0px); }
        100% { transform: translateY(-10px); }
    }
    
    @keyframes heritageGlow {
        0% { transform: scale(1); box-shadow: 0 0 5px rgba(245, 158, 11, 0.3); }
        50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(245, 158, 11, 0.6), 0 0 30px rgba(30, 58, 138, 0.4), 0 0 40px rgba(127, 29, 29, 0.3); }
        100% { transform: scale(1); box-shadow: 0 0 5px rgba(245, 158, 11, 0.3); }
    }
    
    @keyframes culturalGlow {
        0% { box-shadow: 0 0 5px rgba(245, 158, 11, 0.3); }
        50% { box-shadow: 0 0 20px rgba(245, 158, 11, 0.6), 0 0 30px rgba(30, 58, 138, 0.4), 0 0 40px rgba(127, 29, 29, 0.3); }
        100% { box-shadow: 0 0 5px rgba(245, 158, 11, 0.3); }
    }
    
    @keyframes royalShimmer {
        0% { background-position: -200px 0; }
        100% { background-position: 200px 0; }
    }
    
    .pulse {
        animation: heritageGlow 2s infinite;
    }
    
    .heritage-glow {
        animation: culturalGlow 3s ease-in-out infinite;
    }
    
    .royal-shimmer {
        background: linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.4), transparent);
        background-size: 200px 100%;
        animation: royalShimmer 2s infinite;
    }
`;
document.head.appendChild(style);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Custom scroll handling if needed
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Loading screen
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger initial animations with Royal Blue + Maroon theme
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-dates');
        heroElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.3}s`;
            element.classList.add('fade-in-up');
        });
    }, 500);
});

// Special sacred timing highlight - Updated for Royal Blue + Maroon theme
function highlightSacredTiming() {
    const sacredElements = document.querySelectorAll('.date-primary, .timing-details');
    
    sacredElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.classList.add('heritage-glow');
            if (this.classList.contains('date-primary')) {
                this.style.background = 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)';
                this.style.color = '#1E293B';
            }
        });
        
        element.addEventListener('mouseleave', function() {
            this.classList.remove('heritage-glow');
            if (this.classList.contains('date-primary')) {
                this.style.background = '#F59E0B';
                this.style.color = '#1E293B';
            }
        });
    });
}

// Initialize sacred timing effects
document.addEventListener('DOMContentLoaded', highlightSacredTiming);

// Console welcome message - Updated for Royal Blue + Golden + Maroon theme
console.log(`
🔵 Welcome to Mysuru Dasara 2025! 🟡
✨ Karnataka's Royal Heritage Festival ✨
👑 NEW ROYAL BLUE + GOLDEN + MAROON THEME 👑
📅 September 22 - October 2, 2025 | 416th Consecutive Celebration

🐘 Jamboo Savari | 🚁 3000 Drone Show | 💡 97K+ Palace Lights
⚔️ Ayudha Puja | 🎪 Cultural Programs | 🏛️ Heritage Experience
👑 Royal Traditions | 🎨 Folk Arts | 📿 Spiritual Celebrations

🔵 ROYAL BLUE COLORS (Heritage & Royalty):
• Deep Royal Blue: #1E3A8A (Navigation, Headers)
• Rich Royal Blue: #1D4ED8 (Section Backgrounds)
• Navy Blue: #1E293B (Dark Elements, Footer)

🟫 MAROON COLORS (Traditional & Cultural):
• Deep Maroon: #7F1D1D (Section Backgrounds, Elements)
• Rich Maroon: #991B1B (Card Backgrounds, Borders)
• Dark Maroon: #5F1D1D (Footer Elements, Accents)

🟡 GOLDEN COLORS (Royal Accents):
• Rich Gold: #F59E0B (Primary Buttons, Highlights)
• Light Gold: #FCD34D (Secondary Text on Dark)
• Deep Gold: #D97706 (Secondary Buttons, Accents)

💜 Perfect text readability with 7:1+ contrast ratios
✨ Mysuru Dasara background themes throughout

🕉️ Experience the sacred Ayudha Puja ceremony on October 1st
🌸 Witness 400+ years of unbroken royal heritage
🎯 Celebrating Karnataka's Heritage and Harmony

🚀 All Royal Blue + Golden + Maroon features loaded and ready!
`);

// Add special effect for Ayudha Puja date - Updated for new theme
document.addEventListener('DOMContentLoaded', function() {
    const ayudhaPujaDate = document.querySelector('.date-primary');
    if (ayudhaPujaDate) {
        setInterval(() => {
            ayudhaPujaDate.style.animation = 'heritageGlow 1.5s ease-in-out';
            setTimeout(() => {
                ayudhaPujaDate.style.animation = '';
            }, 1500);
        }, 10000); // Pulse every 10 seconds
    }
});

// Royal theme color cycling for special elements
function initRoyalColorEffects() {
    const specialElements = document.querySelectorAll('.hero-title, .section-header h2');
    
    specialElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #1E3A8A 0%, #F59E0B 50%, #7F1D1D 100%)';
            this.style.backgroundClip = 'text';
            this.style.webkitBackgroundClip = 'text';
            this.style.backgroundSize = '200% 200%';
            this.style.animation = 'royalShimmer 2s ease-in-out infinite';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.background = '';
            this.style.backgroundClip = '';
            this.style.webkitBackgroundClip = '';
            this.style.animation = '';
        });
    });
}

// Initialize royal color effects
document.addEventListener('DOMContentLoaded', initRoyalColorEffects);

// Enhanced accessibility for Royal Blue + Maroon theme
document.addEventListener('DOMContentLoaded', function() {
    // Ensure all interactive elements have proper focus states
    const interactiveElements = document.querySelectorAll('button, a, .timeline-marker, .attraction-card, .info-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #F59E0B';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
});

// Mysuru Dasara cultural pattern animations
function initMysuraDasaraEffects() {
    // Add floating animation to cards with traditional patterns
    const patternElements = document.querySelectorAll('.overview-card, .attraction-card, .ayudha-card');
    
    patternElements.forEach((element, index) => {
        element.addEventListener('mouseenter', function() {
            // Add heritage glow effect
            this.style.boxShadow = `
                0 0 20px rgba(245, 158, 11, 0.3),
                0 0 40px rgba(30, 58, 138, 0.2),
                0 0 60px rgba(127, 29, 29, 0.1)
            `;
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
            this.style.transform = 'translateY(-10px) scale(1)';
        });
    });
}

// Initialize Mysuru Dasara cultural effects
document.addEventListener('DOMContentLoaded', initMysuraDasaraEffects);

// Royal Blue + Maroon theme announcement
setTimeout(() => {
    console.log(`
    🎨 ROYAL BLUE + GOLDEN + MAROON THEME ACTIVE 🎨
    
    🔵 ROYAL BLUE COLORS (Heritage & Royalty):
    • Deep Royal Blue: #1E3A8A (Navigation, Headers, Primary Text)
    • Rich Royal Blue: #1D4ED8 (Section Backgrounds, Cards)
    • Bright Royal Blue: #2563EB (Interactive Elements, Buttons)
    • Navy Blue: #1E293B (Dark Elements, Footer, Text)
    
    🟫 MAROON COLORS (Traditional & Cultural):
    • Deep Maroon: #7F1D1D (Section Backgrounds, Special Elements)
    • Rich Maroon: #991B1B (Card Backgrounds, Borders)
    • Dark Maroon: #5F1D1D (Footer Elements, Dark Accents)
    
    🟡 GOLDEN COLORS (Royal Accents):
    • Rich Gold: #F59E0B (Primary Buttons, Highlights)
    • Deep Gold: #D97706 (Secondary Buttons, Accents)
    • Light Gold: #FCD34D (Secondary Text on Dark Backgrounds)
    • Pale Gold: #FEF3C7 (Lightest Backgrounds)
    
    🎨 MYSURU DASARA BACKGROUND THEMES:
    • Palace silhouette patterns in light royal blue
    • Traditional Indian geometric patterns in faded gold
    • Temple architecture motifs and heritage scrollwork
    • Karnataka art motifs (peacock feathers, lotus patterns)
    • Festival decorations (flowers, diyas, rangoli patterns)
    
    📖 TEXT READABILITY - 7:1+ CONTRAST RATIOS:
    • White text (#FFFFFF) on Royal Blue/Maroon backgrounds
    • Light Gold text (#FCD34D) for secondary text on dark
    • Navy Blue text (#1E293B) on light backgrounds
    • Deep Royal Blue (#1E3A8A) for headers on light backgrounds
    
    👑 Royal Heritage Theme with Cultural Authenticity! 👑
    `);
}, 3000);

// Special Mysuru Dasara heritage interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add cultural pattern overlay effects
    const sections = document.querySelectorAll('.overview, .attractions, .special-events, .visitor-info');
    
    sections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            // Enhance background patterns on hover
            this.style.backgroundSize = '120% 120%';
            this.style.transition = 'background-size 3s ease';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.backgroundSize = '100% 100%';
        });
    });
});