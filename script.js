// AI Roadmap Website - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupAnimations();
    setupScrollEffects();
    setupTooltips();
    setupProgressTracking();
}

// Navigation functionality
function setupNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const contentSections = document.querySelectorAll('.content-section');

    navTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all tabs and sections
            navTabs.forEach(t => t.classList.remove('active'));
            contentSections.forEach(s => s.classList.remove('active'));

            // Add active class to clicked tab and corresponding section
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');

            // Add smooth transition effect
            document.getElementById(targetTab).style.opacity = '0';
            setTimeout(() => {
                document.getElementById(targetTab).style.opacity = '1';
            }, 50);

            // Track navigation for analytics
            trackNavigation(targetTab);
        });
    });
}

// Animation setup
function setupAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                // Add staggered animation for cards
                if (entry.target.classList.contains('resource-card') ||
                    entry.target.classList.contains('tool-card') ||
                    entry.target.classList.contains('skill-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.roadmap-level, .resource-card, .tool-card, .skill-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// Scroll effects
function setupScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Parallax effect for header
        if (header) {
            const scrolled = scrollTop * 0.5;
            header.style.transform = `translateY(${scrolled}px)`;
        }

        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    });
}

// Tooltip functionality
function setupTooltips() {
    const toolCards = document.querySelectorAll('.tool-card, .resource-card');

    toolCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Progress tracking
function setupProgressTracking() {
    const roadmapLevels = document.querySelectorAll('.roadmap-level');

    roadmapLevels.forEach((level, index) => {
        level.addEventListener('click', function () {
            // Add visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            // Show level details with animation
            showLevelDetails(this, index);
        });
    });
}

// Show level details with smooth animation
function showLevelDetails(level, index) {
    const skillCards = level.querySelectorAll('.skill-card');

    skillCards.forEach((card, cardIndex) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-20px)';

        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
            card.style.transition = 'all 0.3s ease-out';
        }, cardIndex * 100);
    });
}

// Navigation tracking
function trackNavigation(tabName) {
    console.log(`Navigated to: ${tabName}`);
    // Here you could add analytics tracking
    // Example: gtag('event', 'navigation', { 'tab_name': tabName });
}

// Smooth scrolling for internal links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function (e) {
        const activeTab = document.querySelector('.nav-tab.active');
        const tabs = document.querySelectorAll('.nav-tab');
        const currentIndex = Array.from(tabs).indexOf(activeTab);

        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            tabs[currentIndex - 1].click();
        } else if (e.key === 'ArrowRight' && currentIndex < tabs.length - 1) {
            tabs[currentIndex + 1].click();
        }
    });
}

// Loading animation
function showLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'loading-overlay';
    loader.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Loading AI Roadmap...</p>
        </div>
    `;

    document.body.appendChild(loader);

    // Remove loader after content is loaded
    setTimeout(() => {
        loader.remove();
    }, 1000);
}

// Add loading animation styles
const loadingStyles = `
    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    }
    
    .loading-spinner {
        text-align: center;
        color: white;
    }
    
    .spinner {
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top: 3px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

// Inject loading styles
const styleSheet = document.createElement('style');
styleSheet.textContent = loadingStyles;
document.head.appendChild(styleSheet);

// Initialize loading animation
showLoadingAnimation();

// Enhanced hover effects for roadmap levels
function enhanceRoadmapInteractions() {
    const roadmapLevels = document.querySelectorAll('.roadmap-level');

    roadmapLevels.forEach(level => {
        level.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';

            // Animate skill cards
            const skillCards = this.querySelectorAll('.skill-card');
            skillCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.transform = 'translateX(10px)';
                    card.style.background = '#f0f4f8';
                }, index * 100);
            });
        });

        level.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';

            // Reset skill cards
            const skillCards = this.querySelectorAll('.skill-card');
            skillCards.forEach(card => {
                card.style.transform = 'translateX(0)';
                card.style.background = '#f7fafc';
            });
        });
    });
}

// Call enhanced interactions
enhanceRoadmapInteractions();

// Add click effects to resource and tool cards
function addClickEffects() {
    const cards = document.querySelectorAll('.resource-card, .tool-card');

    cards.forEach(card => {
        card.addEventListener('click', function (e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add ripple animation
const rippleStyles = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

const rippleStyleSheet = document.createElement('style');
rippleStyleSheet.textContent = rippleStyles;
document.head.appendChild(rippleStyleSheet);

// Initialize click effects
addClickEffects();

// Performance optimization
function optimizePerformance() {
    // Lazy load images if any are added later
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize performance optimizations
optimizePerformance();

// Add theme toggle functionality (bonus feature)
function addThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: rgba(255, 255, 255, 0.9);
        color: #333;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        z-index: 1000;
    `;

    document.body.appendChild(themeToggle);

    themeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-theme');
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });
}

// Initialize theme toggle
addThemeToggle();

// Add dark theme styles
const darkThemeStyles = `
    .dark-theme {
        background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
        color: #e2e8f0;
    }
    
    .dark-theme .header-content,
    .dark-theme .roadmap-container,
    .dark-theme .resources-container,
    .dark-theme .tools-container {
        background: rgba(45, 55, 72, 0.95);
        color: #e2e8f0;
    }
    
    .dark-theme .roadmap-level,
    .dark-theme .resource-card,
    .dark-theme .tool-card {
        background: #2d3748;
        color: #e2e8f0;
    }
    
    .dark-theme .skill-card {
        background: #4a5568;
        color: #e2e8f0;
    }
`;

const darkThemeStyleSheet = document.createElement('style');
darkThemeStyleSheet.textContent = darkThemeStyles;
document.head.appendChild(darkThemeStyleSheet);

console.log('AI Roadmap Website initialized successfully! 🚀');
