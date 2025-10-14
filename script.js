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

// Enhanced Theme Toggle with Perfect Functionality
function addThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: none;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        font-size: 1.4rem;
        cursor: pointer;
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(10px);
        border: 2px solid rgba(255, 255, 255, 0.2);
    `;

    document.body.appendChild(themeToggle);

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener('click', function (event) {
        const isDark = document.body.classList.contains('dark-theme');

        // FORCE IMMEDIATE THEME CHANGE - REAL TIME
        if (isDark) {
            // Switch to LIGHT mode
            document.body.classList.remove('dark-theme');
            this.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');

            // Force update all elements immediately
            updateAllElementsToLight();
            console.log('🌞 Switched to LIGHT mode - REAL TIME');
        } else {
            // Switch to DARK mode
            document.body.classList.add('dark-theme');
            this.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');

            // Force update all elements immediately
            updateAllElementsToDark();
            console.log('🌙 Switched to DARK mode - REAL TIME');
        }

        // Add rotation animation
        const icon = this.querySelector('i');
        icon.style.transform = 'rotate(360deg) scale(1.2)';
        setTimeout(() => {
            icon.style.transform = 'rotate(0deg) scale(1)';
        }, 300);

        // Add ripple effect
        createRipple(this, event);
    });

    // Function to force update all elements to LIGHT mode
    function updateAllElementsToLight() {
        // Update all text elements
        const allTextElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, li, div, a');
        allTextElements.forEach(element => {
            if (element.closest('.header-content, .roadmap-container, .resources-container, .tools-container, .concepts-container, .platform-container')) {
                element.style.color = '#0f172a';
            }
        });

        // Update containers
        const containers = document.querySelectorAll('.header-content, .roadmap-container, .resources-container, .tools-container, .concepts-container, .platform-container');
        containers.forEach(container => {
            container.style.background = 'rgba(255, 255, 255, 0.95)';
            container.style.color = '#0f172a';
        });

        // Update cards
        const cards = document.querySelectorAll('.roadmap-level, .extended-resource-card, .tool-card, .concept-card, .skill-card');
        cards.forEach(card => {
            card.style.background = '#ffffff';
            card.style.color = '#0f172a';
        });

        // Update body
        document.body.style.background = 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)';
        document.body.style.color = '#0f172a';
    }

    // Function to force update all elements to DARK mode
    function updateAllElementsToDark() {
        // Update all text elements
        const allTextElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, li, div, a');
        allTextElements.forEach(element => {
            if (element.closest('.header-content, .roadmap-container, .resources-container, .tools-container, .concepts-container, .platform-container')) {
                element.style.color = '#f8fafc';
            }
        });

        // Update containers
        const containers = document.querySelectorAll('.header-content, .roadmap-container, .resources-container, .tools-container, .concepts-container, .platform-container');
        containers.forEach(container => {
            container.style.background = 'rgba(15, 23, 42, 0.9)';
            container.style.color = '#f8fafc';
        });

        // Update cards
        const cards = document.querySelectorAll('.roadmap-level, .extended-resource-card, .tool-card, .concept-card, .skill-card');
        cards.forEach(card => {
            card.style.background = '#1e293b';
            card.style.color = '#f8fafc';
        });

        // Update body
        document.body.style.background = 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)';
        document.body.style.color = '#f8fafc';
    }

    // Hover effects
    themeToggle.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.4)';
    });

    themeToggle.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
    });
}

// Enhanced Ripple Effect
function createRipple(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

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

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Initialize enhanced theme toggle
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

// Enhanced features for comprehensive platform
function setupComprehensiveFeatures() {
    setupSearchFunctionality();
    setupProgressTracking();
    setupResourceFiltering();
    setupInteractiveElements();
    setupPremiumAnimations();
    setupParallaxEffects();
    setupParticleSystem();
    setupAdvancedHoverEffects();
}

// Search functionality
function setupSearchFunctionality() {
    // Add search functionality to resources
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search resources...';
    searchInput.className = 'search-input';
    searchInput.style.cssText = `
        width: 100%;
        max-width: 400px;
        padding: 12px 20px;
        border: 2px solid #e2e8f0;
        border-radius: 25px;
        font-size: 1rem;
        margin: 20px auto;
        display: block;
        background: white;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    `;

    // Insert search input into resources section
    const resourcesSection = document.getElementById('resources');
    if (resourcesSection) {
        resourcesSection.insertBefore(searchInput, resourcesSection.firstChild);
    }

    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        const resourceCards = document.querySelectorAll('.extended-resource-card, .resource-card');

        resourceCards.forEach(card => {
            const title = card.querySelector('h4').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();

            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.opacity = '1';
            } else {
                card.style.opacity = '0.3';
            }
        });
    });
}

// Progress tracking
function setupProgressTracking() {
    // Add progress indicators to roadmap levels
    const roadmapLevels = document.querySelectorAll('.roadmap-level');

    roadmapLevels.forEach((level, index) => {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.style.cssText = `
            width: 100%;
            height: 4px;
            background: #e2e8f0;
            border-radius: 2px;
            margin: 15px 0;
            overflow: hidden;
        `;

        const progressFill = document.createElement('div');
        progressFill.className = 'progress-fill';
        progressFill.style.cssText = `
            height: 100%;
            background: linear-gradient(90deg, #667eea, #764ba2);
            width: 0%;
            transition: width 0.3s ease;
        `;

        progressBar.appendChild(progressFill);
        level.appendChild(progressBar);

        // Simulate progress based on level
        const progress = (index + 1) * 25;
        setTimeout(() => {
            progressFill.style.width = progress + '%';
        }, 500 + (index * 200));
    });
}

// Resource filtering
function setupResourceFiltering() {
    // Add filter buttons for resources
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-container';
    filterContainer.style.cssText = `
        display: flex;
        justify-content: center;
        gap: 10px;
        margin: 20px 0;
        flex-wrap: wrap;
    `;

    const filters = ['All', 'Free', 'Paid', 'Book', 'Course'];
    filters.forEach(filter => {
        const button = document.createElement('button');
        button.textContent = filter;
        button.className = 'filter-btn';
        button.style.cssText = `
            padding: 8px 16px;
            border: 2px solid #e2e8f0;
            background: white;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
        `;

        if (filter === 'All') {
            button.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
            button.style.color = 'white';
            button.style.borderColor = 'transparent';
        }

        button.addEventListener('click', function () {
            // Remove active class from all buttons
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.style.background = 'white';
                btn.style.color = '#4a5568';
                btn.style.borderColor = '#e2e8f0';
            });

            // Add active class to clicked button
            this.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
            this.style.color = 'white';
            this.style.borderColor = 'transparent';

            // Filter resources
            const resourceCards = document.querySelectorAll('.extended-resource-card');
            resourceCards.forEach(card => {
                if (filter === 'All') {
                    card.style.display = 'block';
                } else {
                    const badge = card.querySelector('.resource-badge');
                    if (badge && badge.textContent.toLowerCase().includes(filter.toLowerCase())) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });

        filterContainer.appendChild(button);
    });

    // Insert filter container into resources section
    const resourcesSection = document.getElementById('resources');
    if (resourcesSection) {
        const firstChild = resourcesSection.querySelector('.resources-container');
        if (firstChild) {
            firstChild.insertBefore(filterContainer, firstChild.firstChild);
        }
    }
}

// Interactive elements
function setupInteractiveElements() {
    // Add hover effects to concept cards
    const conceptCards = document.querySelectorAll('.concept-card');
    conceptCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });

    // Add click effects to explanation cards
    const explanationCards = document.querySelectorAll('.explanation-card');
    explanationCards.forEach(card => {
        card.addEventListener('click', function () {
            this.style.background = '#667eea';
            this.style.color = 'white';
            this.style.transform = 'scale(1.05)';

            setTimeout(() => {
                this.style.background = '#f7fafc';
                this.style.color = '#4a5568';
                this.style.transform = 'scale(1)';
            }, 300);
        });
    });
}

// Initialize comprehensive features
setupComprehensiveFeatures();

// Premium Animations
function setupPremiumAnimations() {
    // Staggered animation for cards
    const cards = document.querySelectorAll('.extended-resource-card, .tool-card, .concept-card, .skill-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, index * 100);
    });

    // Floating animation for icons
    const icons = document.querySelectorAll('.level-icon, .tool-icon');
    icons.forEach(icon => {
        icon.style.animation = 'float 3s ease-in-out infinite';
    });

    // Add floating animation
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(floatStyle);
}

// Parallax Effects
function setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.header-content, .roadmap-level, .concept-card');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.1;
            element.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

// Particle System
function setupParticleSystem() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
    `;

    document.body.appendChild(particleContainer);

    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
    `;

    container.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
            createParticle(container);
        }
    }, (Math.random() * 10 + 10) * 1000);
}

// Add particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Advanced Hover Effects
function setupAdvancedHoverEffects() {
    // Magnetic hover effect for cards
    const cards = document.querySelectorAll('.extended-resource-card, .tool-card, .concept-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            card.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translate(0, 0) scale(1)';
        });
    });

    // Ripple effect for buttons
    const buttons = document.querySelectorAll('.nav-tab, .tool-link, .filter-btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
}

function createRipple(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
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

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Enhanced scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';

                // Add stagger effect for child elements
                const children = entry.target.querySelectorAll('.extended-resource-card, .tool-card, .concept-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0) scale(1)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.roadmap-level, .resource-category-extended, .tool-category, .concept-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px) scale(0.95)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
}

// Initialize scroll animations
setupScrollAnimations();

// Enhanced theme toggle with smooth transitions
function enhanceThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            document.body.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            document.body.classList.toggle('dark-theme');

            // Add transition effect
            const icon = this.querySelector('i');
            icon.style.transform = 'rotate(360deg) scale(1.2)';
            setTimeout(() => {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }, 300);
        });
    }
}

// Initialize enhanced theme toggle
enhanceThemeToggle();

// Performance optimization
function optimizePerformance() {
    // Lazy load images
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

    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Scroll-based animations here
        }, 16);
    });
}

// Initialize performance optimizations
optimizePerformance();

// Additional Premium Enhancements
function addPremiumEnhancements() {
    // Add smooth page transitions
    document.body.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';

    // Add loading animation
    window.addEventListener('load', function () {
        document.body.style.opacity = '0';
        document.body.style.transform = 'scale(0.95)';
        setTimeout(() => {
            document.body.style.opacity = '1';
            document.body.style.transform = 'scale(1)';
        }, 100);
    });

    // Add scroll-based animations
    let ticking = false;
    function updateScrollAnimations() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;

        // Parallax effect for header
        const header = document.querySelector('.header');
        if (header) {
            header.style.transform = `translateY(${rate}px)`;
        }

        // Fade in elements on scroll
        const elements = document.querySelectorAll('.roadmap-level, .concept-card, .tool-card');
        elements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0) scale(1)';
            }
        });

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollAnimations);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    // Add keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function () {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Initialize premium enhancements
addPremiumEnhancements();

// Add keyboard navigation styles
const keyboardStyles = document.createElement('style');
keyboardStyles.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid #667eea !important;
        outline-offset: 2px !important;
    }
    
    .keyboard-navigation .nav-tab:focus,
    .keyboard-navigation .tool-link:focus,
    .keyboard-navigation .filter-btn:focus {
        transform: translateY(-3px) !important;
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4) !important;
    }
`;
document.head.appendChild(keyboardStyles);

// Enhanced Real-Time Theme Switching
function debugDarkMode() {
    console.log('🌙 Dark Mode Debug Info:');
    console.log('Current theme:', localStorage.getItem('theme') || 'light');
    console.log('Body has dark-theme class:', document.body.classList.contains('dark-theme'));
    console.log('Theme toggle exists:', document.querySelector('.theme-toggle') !== null);
}

// Call debug function
debugDarkMode();

// Real-time theme switching system
function setupRealTimeThemeSwitching() {
    // Add CSS transition for smooth theme changes
    const style = document.createElement('style');
    style.textContent = `
        * {
            transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
        }
        
        .theme-toggle {
            transition: all 0.3s ease !important;
        }
    `;
    document.head.appendChild(style);

    // Force immediate theme application on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        // Apply dark theme styles immediately
        setTimeout(() => {
            updateAllElementsToDark();
        }, 100);
    } else {
        document.body.classList.remove('dark-theme');
        // Apply light theme styles immediately
        setTimeout(() => {
            updateAllElementsToLight();
        }, 100);
    }
}

// Global functions for theme switching
window.updateAllElementsToLight = function () {
    // Update all text elements
    const allTextElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, li, div, a');
    allTextElements.forEach(element => {
        if (element.closest('.header-content, .roadmap-container, .resources-container, .tools-container, .concepts-container, .platform-container')) {
            element.style.color = '#0f172a';
        }
    });

    // Update containers
    const containers = document.querySelectorAll('.header-content, .roadmap-container, .resources-container, .tools-container, .concepts-container, .platform-container');
    containers.forEach(container => {
        container.style.background = 'rgba(255, 255, 255, 0.95)';
        container.style.color = '#0f172a';
    });

    // Update cards
    const cards = document.querySelectorAll('.roadmap-level, .extended-resource-card, .tool-card, .concept-card, .skill-card');
    cards.forEach(card => {
        card.style.background = '#ffffff';
        card.style.color = '#0f172a';
    });

    // Update body
    document.body.style.background = 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)';
    document.body.style.color = '#0f172a';
};

window.updateAllElementsToDark = function () {
    // Update all text elements
    const allTextElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, li, div, a');
    allTextElements.forEach(element => {
        if (element.closest('.header-content, .roadmap-container, .resources-container, .tools-container, .concepts-container, .platform-container')) {
            element.style.color = '#f8fafc';
        }
    });

    // Update containers
    const containers = document.querySelectorAll('.header-content, .roadmap-container, .resources-container, .tools-container, .concepts-container, .platform-container');
    containers.forEach(container => {
        container.style.background = 'rgba(15, 23, 42, 0.9)';
        container.style.color = '#f8fafc';
    });

    // Update cards
    const cards = document.querySelectorAll('.roadmap-level, .extended-resource-card, .tool-card, .concept-card, .skill-card');
    cards.forEach(card => {
        card.style.background = '#1e293b';
        card.style.color = '#f8fafc';
    });

    // Update body
    document.body.style.background = 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)';
    document.body.style.color = '#f8fafc';
};

// Initialize real-time theme switching
setupRealTimeThemeSwitching();

console.log('LearnAI Premium Platform with MAXIMUM VISIBILITY & EXPANDED COLOR PALETTE initialized successfully! 🚀✨');
