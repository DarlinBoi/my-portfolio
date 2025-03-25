// Portfolio Items
const portfolioItems = [
    {
        id: 'ecommerce',
        title: 'The Waker: Dr BeeCee Ugboh',
        category: 'Web Design',
        description: 'Life Coach website built using HTML and CSS',
        image: 'img/website.webp'
    },
    {
        id: 'avarhh',
        title: 'Avarhh Exchange Currency Service',
        category: 'Graphic Design',
        description: 'Currency exchange brand identity with focus on West and Central African currencies (Naira, Cedis, CFA)',
        image: 'img/Avarhh.webp'
    },
    {
        id: 'flc',
        title: 'First Love Church',
        category: 'Web Design',
        description: 'A modern, responsive website built with React, TypeScript, and Tailwind CSS',
        image: 'img/flc-website.webp',
        link: 'https://firstlovecenter.com/'
    },
    {
        id: 'grillhouse',
        title: 'Grill House Ghana',
        category: 'Web Design',
        description: 'A modern React restaurant site. Built with React, TypeScript, Tailwind CSS, and Framer Motion.',
        image: 'img/grill-house.webp',
        link: 'https://grillhousegh.com/'
    },
    {
        id: 'beecee',
        title: 'BeeCee Skincare Brochure',
        category: 'Graphic Design',
        description: 'Elegant product brochure design showcasing luxury skincare line with sophisticated layout and premium visual aesthetics',
        image: 'img/Body.webp',
        detailImage: 'img/Inner.webp'
    },
    {
        id: 'remerciements',
        title: 'Lionel & Tatiana Wedding Thank You Card',
        category: 'Graphic Design',
        description: 'Elegant wedding thank you card design with gold geometric accents and eucalyptus elements',
        image: 'img/Remerciements.webp'
    },
    {
        id: 'goal',
        title: 'Goal Setting Design',
        category: 'Graphic Design',
        description: 'Flyer design for goal setting workshop',
        image: 'img/Goal Setting.webp'
    },
    {
        id: 'exotic',
        title: 'Exotic Shawarma',
        category: 'Graphic Design',
        description: 'Restaurant branding and menu design',
        image: 'img/Exotic Sharwarma.webp'
    },
    {
        id: 'nouvelle',
        title: 'Nouvelle Collection',
        category: 'Graphic Design',
        description: 'Fashion brand identity and packaging',
        image: 'img/Nouvelle 2.webp'
    }
];

// Keyboard navigation improvements for portfolio filters
function enhanceFilterButtonsAccessibility() {
    const filterButtons = document.querySelectorAll('.portfolio-filter-button');
    
    // Add keydown events for keyboard users
    filterButtons.forEach((btn, index) => {
        btn.setAttribute('tabindex', '0');
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-selected', btn.classList.contains('active') ? 'true' : 'false');
        
        btn.addEventListener('keydown', (e) => {
            // Enter or Space to activate button
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
            
            // Left arrow to navigate to previous filter
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevIndex = (index - 1 + filterButtons.length) % filterButtons.length;
                filterButtons[prevIndex].focus();
            }
            
            // Right arrow to navigate to next filter
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                const nextIndex = (index + 1) % filterButtons.length;
                filterButtons[nextIndex].focus();
            }
        });
    });
}

// Enhance lightbox accessibility
function enhanceLightboxAccessibility(lightbox) {
    if (!lightbox) return;
    
    // Make close button explicitly accessible
    const closeButton = lightbox.querySelector('.lightbox-close');
    closeButton.setAttribute('aria-label', 'Close lightbox');
    
    // Add aria attributes to navigation buttons
    const prevButton = lightbox.querySelector('.prev');
    const nextButton = lightbox.querySelector('.next');
    
    if (prevButton) prevButton.setAttribute('aria-label', 'Previous project');
    if (nextButton) nextButton.setAttribute('aria-label', 'Next project');
    
    // Trap focus within lightbox when open
    const focusableElements = lightbox.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    // Set initial focus on close button
    firstElement.focus();
    
    // Trap focus in the lightbox
    lightbox.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
}

// Make portfolio items keyboard accessible
function enhancePortfolioItemsAccessibility() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        // Make items focusable
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        const title = item.querySelector('.project-title');
        item.setAttribute('aria-label', `View project: ${title ? title.textContent : 'Portfolio project'}`);
        
        // Add keyboard event listener
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.click();
            }
        });
    });
}

// Add screen reader announcements for dynamic content
function announceToScreenReader(message) {
    const announcer = document.getElementById('sr-announcer') || (() => {
        const el = document.createElement('div');
        el.id = 'sr-announcer';
        el.className = 'sr-only';
        el.setAttribute('aria-live', 'polite');
        el.setAttribute('aria-atomic', 'true');
        document.body.appendChild(el);
        return el;
    })();
    
    announcer.textContent = message;
}

// Populate portfolio grid
function loadPortfolio() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    portfolioItems.forEach((item, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'col-lg-4 col-md-6 col-sm-12 portfolio-item';
        portfolioItem.setAttribute('data-category', item.category.toLowerCase());
        
        portfolioItem.innerHTML = `
            <div class="card h-100">
                <img src="${item.image}" class="card-img-top" alt="${item.title}">
                <div class="portfolio-info">
                    <h3 class="project-title" data-i18n="work.projects.${item.id}.title">${item.title}</h3>
                    <p class="project-description" data-i18n="work.projects.${item.id}.description">${item.description}</p>
                    <span class="category" data-i18n="work.projects.${item.id}.category">${item.category}</span>
                </div>
            </div>
        `;
        
        portfolioGrid.appendChild(portfolioItem);

        // Add click event for lightbox
        portfolioItem.addEventListener('click', () => openLightbox(index));
    });
}

// Lightbox functionality
function openLightbox(currentIndex) {
    const item = portfolioItems[currentIndex];
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">
                <i class="fas fa-times"></i>
            </button>
            <button class="lightbox-nav prev desktop-only">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button class="lightbox-nav next desktop-only">
                <i class="fas fa-chevron-right"></i>
            </button>
            <div class="lightbox-image-container">
                <img src="${item.image}" alt="${i18next.t(`work.projects.${item.id}.title`)}">
            </div>
            <div class="lightbox-text">
                <h3 data-i18n="work.projects.${item.id}.title">${i18next.t(`work.projects.${item.id}.title`)}</h3>
                <p data-i18n="work.projects.${item.id}.description">${i18next.t(`work.projects.${item.id}.description`)}</p>
                <span class="category" data-i18n="work.projects.${item.id}.category">${i18next.t(`work.projects.${item.id}.category`)}</span>
                ${item.link ? `<a href="${item.link}" class="project-link" target="_blank" rel="noopener noreferrer">Visit Website <i class="fas fa-external-link-alt"></i></a>` : ''}
            </div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    document.querySelector('.navbar').style.display = 'none';
    
    // Navigation functions
    function showNextImage() {
        currentIndex = (currentIndex + 1) % portfolioItems.length;
        updateLightboxContent();
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + portfolioItems.length) % portfolioItems.length;
        updateLightboxContent();
    }

    function updateLightboxContent() {
        const item = portfolioItems[currentIndex];
        const imgContainer = lightbox.querySelector('.lightbox-image-container');
        const textContainer = lightbox.querySelector('.lightbox-text');
        
        imgContainer.classList.add('fade-out');
        textContainer.classList.add('fade-out');
        
        setTimeout(() => {
            // Use detailImage in lightbox if available, otherwise use regular image
            const displayImage = item.detailImage || item.image;
            imgContainer.innerHTML = `<img src="${displayImage}" alt="${i18next.t(`work.projects.${item.id}.title`)}">`;
            textContainer.innerHTML = `
                <h3 data-i18n="work.projects.${item.id}.title">${i18next.t(`work.projects.${item.id}.title`)}</h3>
                <p data-i18n="work.projects.${item.id}.description">${i18next.t(`work.projects.${item.id}.description`)}</p>
                <span class="category" data-i18n="work.projects.${item.id}.category">${i18next.t(`work.projects.${item.id}.category`)}</span>
                ${item.link ? `<a href="${item.link}" class="project-link" target="_blank" rel="noopener noreferrer">Visit Website <i class="fas fa-external-link-alt"></i></a>` : ''}
            `;
            
            imgContainer.classList.remove('fade-out');
            textContainer.classList.remove('fade-out');
            imgContainer.classList.add('fade-in');
            textContainer.classList.add('fade-in');
            
            setTimeout(() => {
                imgContainer.classList.remove('fade-in');
                textContainer.classList.remove('fade-in');
            }, 300);
        }, 300);
    }

    // Close lightbox when clicking outside
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Event Listeners for navigation
    const prevButton = lightbox.querySelector('.prev');
    const nextButton = lightbox.querySelector('.next');
    if (prevButton) prevButton.addEventListener('click', showPrevImage);
    if (nextButton) nextButton.addEventListener('click', showNextImage);

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyPress);
    
    function handleKeyPress(e) {
        switch(e.key) {
            case 'ArrowLeft':
                if (window.innerWidth > 768) showPrevImage();
                break;
            case 'ArrowRight':
                if (window.innerWidth > 768) showNextImage();
                break;
            case 'Escape':
                closeLightbox();
                break;
        }
    }

    // Add event listener for close button
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    
    function closeLightbox() {
        document.body.style.overflow = '';
        document.querySelector('.navbar').style.display = '';
        lightbox.classList.add('fade-out');
        setTimeout(() => {
            document.body.removeChild(lightbox);
            document.removeEventListener('keydown', handleKeyPress);
        }, 300);
    }
}

// Mobile Navigation
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadPortfolio();
    
    // Add filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category').includes(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Form handling
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const subjectError = document.getElementById('subject-error');
    const messageError = document.getElementById('message-error');
    const formStatus = document.getElementById('form-status');

    // Validate form with accessibility in mind
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;
        
        // Reset error messages
        nameError.textContent = '';
        emailError.textContent = '';
        subjectError.textContent = '';
        messageError.textContent = '';
        
        // Validate name
        if (!nameInput.value.trim()) {
            nameError.textContent = 'Please enter your name';
            nameInput.setAttribute('aria-invalid', 'true');
            valid = false;
        } else {
            nameInput.setAttribute('aria-invalid', 'false');
        }
        
        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.setAttribute('aria-invalid', 'true');
            valid = false;
        } else {
            emailInput.setAttribute('aria-invalid', 'false');
        }
        
        // Validate subject
        if (!subjectInput.value.trim()) {
            subjectError.textContent = 'Please enter a subject';
            subjectInput.setAttribute('aria-invalid', 'true');
            valid = false;
        } else {
            subjectInput.setAttribute('aria-invalid', 'false');
        }
        
        // Validate message
        if (!messageInput.value.trim()) {
            messageError.textContent = 'Please enter your message';
            messageInput.setAttribute('aria-invalid', 'true');
            valid = false;
        } else {
            messageInput.setAttribute('aria-invalid', 'false');
        }
        
        // If form is valid, submit it
        if (valid) {
            formStatus.textContent = 'Sending your message...';
            
            // Use EmailJS to send email with correct service and template IDs
            const mainEmailData = {
                from_name: nameInput.value,
                from_email: emailInput.value,
                subject: subjectInput.value,
                message: messageInput.value
            };
            
            emailjs.send('service_zps8h0i', 'template_8ht37op', mainEmailData)
                .then(() => {
                    // Success message
                    formStatus.textContent = 'Your message has been sent successfully!';
                    
                    // Show custom notification in current language
                    const notification = document.getElementById('notification');
                    const notificationTitle = notification.querySelector('h4');
                    const notificationMessage = notification.querySelector('p');
                    
                    notificationTitle.textContent = i18next.t('contact.notification.success');
                    notificationMessage.textContent = i18next.t('contact.notification.message');
                    
                    notification.classList.add('show');
                    contactForm.reset();
                    
                    // Reset focus for screen readers
                    formStatus.focus();
                    
                    // Hide notification after 5 seconds
                    setTimeout(() => {
                        notification.classList.remove('show');
                        formStatus.textContent = '';
                    }, 5000);
                })
                .catch((error) => {
                    // Error message
                    formStatus.textContent = i18next.t('contact.notification.error', 'Failed to send message. Please try again.');
                    console.error('EmailJS Error:', error);
                });
        } else {
            // Set focus to the first field with an error
            if (nameError.textContent) {
                nameInput.focus();
            } else if (emailError.textContent) {
                emailInput.focus();
            } else if (subjectError.textContent) {
                subjectInput.focus();
            } else if (messageError.textContent) {
                messageInput.focus();
            }
        }
    });

    // Add input event listeners to clear error messages as the user types
    nameInput.addEventListener('input', () => {
        if (nameInput.value.trim()) {
            nameError.textContent = '';
            nameInput.setAttribute('aria-invalid', 'false');
        }
    });

    emailInput.addEventListener('input', () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() && emailPattern.test(emailInput.value.trim())) {
            emailError.textContent = '';
            emailInput.setAttribute('aria-invalid', 'false');
        }
    });

    subjectInput.addEventListener('input', () => {
        if (subjectInput.value.trim()) {
            subjectError.textContent = '';
            subjectInput.setAttribute('aria-invalid', 'false');
        }
    });

    messageInput.addEventListener('input', () => {
        if (messageInput.value.trim()) {
            messageError.textContent = '';
            messageInput.setAttribute('aria-invalid', 'false');
        }
    });

    // Scroll to top functionality
    initScrollToTop();

    // Active navigation link on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight/3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Close mobile menu when clicking a link
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });

    // Custom Cursor
    initCustomCursor();

    // Lazy Loading
    initLazyLoading();

    // Add accessibility enhancements
    enhanceFilterButtonsAccessibility();
    enhancePortfolioItemsAccessibility();
    
    // Modify the openLightbox function to include accessibility
    const originalOpenLightbox = window.openLightbox;
    window.openLightbox = function(currentIndex) {
        const result = originalOpenLightbox(currentIndex);
        enhanceLightboxAccessibility(document.querySelector('.lightbox'));
        return result;
    };
});

// Notification close function
function closeNotification() {
    document.getElementById('notification').classList.remove('show');
}

// Keep only the enhanced version
const contactForm = document.getElementById('contact-form');
const showNotification = (message, type) => {
    const feedback = document.createElement('div');
    feedback.className = `form-feedback ${type}`;
    feedback.textContent = message;
};

// Add your new email logic here

// Get all navigation links
const navLinks = document.querySelectorAll('.nav-links a');

// Add click event listener to each link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Close the mobile menu
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

function updateActiveSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight/3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', updateActiveSection);

// Call it once on load
document.addEventListener('DOMContentLoaded', updateActiveSection);

document.addEventListener('DOMContentLoaded', () => {
    const contactBtn = document.querySelector('.contact-btn');
    const contactDropdown = document.querySelector('.contact-dropdown');
    let isOpen = false;

    contactBtn.addEventListener('click', (e) => {
        e.preventDefault();
        isOpen = !isOpen;
        
        if (isOpen) {
            contactDropdown.style.opacity = '1';
            contactDropdown.style.visibility = 'visible';
            contactDropdown.style.transform = 'translateY(0)';
        } else {
            contactDropdown.style.opacity = '0';
            contactDropdown.style.visibility = 'hidden';
            contactDropdown.style.transform = 'translateY(-10px)';
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!contactBtn.contains(e.target) && !contactDropdown.contains(e.target)) {
            isOpen = false;
            contactDropdown.style.opacity = '0';
            contactDropdown.style.visibility = 'hidden';
            contactDropdown.style.transform = 'translateY(-10px)';
        }
    });
});

// Scroll Reveal
const revealElements = document.querySelectorAll('.reveal');

function checkReveal() {
    const triggerBottom = window.innerHeight * 0.8;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < triggerBottom) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', checkReveal);
// Initial check for elements in view
document.addEventListener('DOMContentLoaded', checkReveal);

// Custom Cursor
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const body = document.body;

    // Check if device supports hover
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (hasHover) {
        body.classList.add('custom-cursor-active');
    } else {
        return; // Exit if device doesn't support hover
    }

    // Cursor Movement
    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });
    });

    // Click Animation
    document.addEventListener('mousedown', () => {
        cursor.classList.add('clicking');
        cursorDot.classList.add('clicking');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('clicking');
        cursorDot.classList.remove('clicking');
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
    });

    // Add data-cursor attributes to elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea');
    interactiveElements.forEach(el => {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.setAttribute('data-cursor', 'text');
        } else {
            el.setAttribute('data-cursor', 'pointer');
        }
    });
}

// Lazy Loading Implementation
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('lazy-loading');
                
                // Create a temporary image to preload
                const tempImage = new Image();
                tempImage.src = img.src;
                
                tempImage.onload = () => {
                    img.classList.remove('lazy-loading');
                    img.classList.add('lazy-loaded');
                    observer.unobserve(img);
                };
            }
        });
    }, {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
        // Add initial classes for animation
        img.classList.add('lazy-image');
    });

    // Handle background images
    const lazyBackgrounds = document.querySelectorAll('.lazy-background');
    const bgObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const url = element.getAttribute('data-background');
                
                if (url) {
                    element.classList.add('lazy-loading');
                    
                    // Preload the background image
                    const tempImage = new Image();
                    tempImage.src = url;
                    
                    tempImage.onload = () => {
                        element.style.backgroundImage = `url(${url})`;
                        element.classList.remove('lazy-loading');
                        element.classList.add('lazy-loaded');
                        observer.unobserve(element);
                    };
                }
            }
        });
    }, {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    });

    lazyBackgrounds.forEach(bg => {
        bgObserver.observe(bg);
        // Add initial classes for animation
        bg.classList.add('lazy-element');
    });
}

// Scroll to top functionality
function initScrollToTop() {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);

    function handleScroll() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
        );

        // Show button when scrolled down more than 300px
        if (scrollPosition > 300) {
            // Hide button when at the bottom of the page
            if (scrollPosition + windowHeight >= documentHeight - 50) {
                scrollTopBtn.classList.remove('visible');
            } else {
                scrollTopBtn.classList.add('visible');
            }
        } else {
            // Hide button when near the top
            scrollTopBtn.classList.remove('visible');
        }
    }

    function scrollToTop(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Add event listeners with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    scrollTopBtn.addEventListener('click', scrollToTop);
    
    // Initial check for scroll position
    handleScroll();
}

// Initialize i18next
i18next
    .use(i18nextHttpBackend)
    .use(i18nextBrowserLanguageDetector)
    .init({
        fallbackLng: 'en',
        debug: true,
        backend: {
            loadPath: 'translations/{{lng}}.json',
        },
        detection: {
            order: ['querystring', 'cookie', 'localStorage', 'navigator'],
            caches: ['localStorage', 'cookie'],
        },
    })
    .then(function(t) {
        updateContent();
        updateLanguageButton();
    });

// Function to update all content with translations
function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = i18next.t(key);
    });
    
    // Handle title attributes for tooltips
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
        const key = element.getAttribute('data-i18n-title');
        element.setAttribute('title', i18next.t(key));
    });

    // Update dynamic content
    const heroIntro = document.querySelector('.hero-intro');
    heroIntro.innerHTML = `
        <span data-i18n="hero.greeting">${i18next.t('hero.greeting')}</span>
        <span class="wave-emoji">👋</span>
    `;

    document.querySelector('.hero-title').innerHTML = `
        <span class="curved-underline">
            ${i18next.t('hero.title.part1')}
            <svg width="160" height="30" class="curve" viewBox="0 0 160 30">
                <path d="M10 20 Q80 10 150 20" stroke="#A7D8F3" stroke-width="2" fill="none"/>
            </svg>
        </span>
        ${i18next.t('hero.title.part2')}<br>${i18next.t('hero.title.part3')}<br>${i18next.t('hero.title.part4')}
    `;
    
    const heroSubtitle = document.querySelector('.hero-subtitle');
    heroSubtitle.innerHTML = `
        <p>${i18next.t('hero.subtitle.part1')}</p>
    `;

    // Update portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        const title = item.querySelector('.project-title');
        const description = item.querySelector('.project-description');
        const category = item.querySelector('.category');
        
        if (title && title.dataset.i18n) {
            title.textContent = i18next.t(title.dataset.i18n);
        }
        if (description && description.dataset.i18n) {
            description.textContent = i18next.t(description.dataset.i18n);
        }
        if (category && category.dataset.i18n) {
            category.textContent = i18next.t(category.dataset.i18n);
        }
    });

    // Update section titles and badges
    document.querySelectorAll('.section-badge').forEach(badge => {
        if (badge.dataset.i18n) {
            badge.textContent = i18next.t(badge.dataset.i18n);
        }
    });

    document.querySelectorAll('.section-title').forEach(title => {
        if (title.dataset.i18n) {
            title.textContent = i18next.t(title.dataset.i18n);
        }
    });

    document.querySelectorAll('.section-subtitle').forEach(subtitle => {
        if (subtitle.dataset.i18n) {
            subtitle.textContent = i18next.t(subtitle.dataset.i18n);
        }
    });

    document.querySelector('.connect-button').textContent = i18next.t('hero.cta');
}

// Function to update the language toggle button
function updateLanguageButton() {
    const currentLang = i18next.language;
    document.querySelector('.current-lang').textContent = currentLang.toUpperCase();
}

// Language toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const toggleMobile = document.getElementById('languageToggleMobile');
    const toggleDesktop = document.getElementById('languageToggleDesktop');
    
    function updateLanguageButtons() {
        const currentLang = i18next.language;
        document.querySelectorAll('.current-lang').forEach(span => {
            span.textContent = currentLang.toUpperCase();
        });
    }

    function handleLanguageToggle() {
        const currentLang = i18next.language;
        const newLang = currentLang === 'en' ? 'fr' : 'en';
        
        i18next.changeLanguage(newLang, (err, t) => {
            if (err) return console.error('Error changing language:', err);
            updateContent();
            updateLanguageButtons();
        });
    }

    if (toggleMobile) toggleMobile.addEventListener('click', handleLanguageToggle);
    if (toggleDesktop) toggleDesktop.addEventListener('click', handleLanguageToggle);
}); 