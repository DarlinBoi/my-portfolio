// Portfolio Items
const portfolioItems = [
    {
        title: 'Modern E-commerce Platform',
        category: 'Web Design',
        description: 'Full-stack development with React and Node.js',
        image: 'img/website.png'
    },
    {
        title: 'Avarhh Brand Identity',
        category: 'Brand Design',
        description: 'Complete brand identity and visual guidelines',
        image: 'img/avarhh.jpg'
    },
    {
        title: 'Remerciements Campaign',
        category: 'Graphic Design',
        description: 'Visual design and marketing materials',
        image: 'img/Remerciements.jpg'
    },
    {
        title: 'Nouvelle Collection',
        category: 'Brand Design',
        description: 'Fashion brand identity and packaging',
        image: 'img/Nouvelle 2.jpg'
    },
    {
        title: 'Exotic Shawarma',
        category: 'Brand Design',
        description: 'Restaurant branding and menu design',
        image: 'img/Exotic Sharwarma.jpg'
    },
    {
        title: 'Goal Setting App',
        category: 'UI/UX Design',
        description: 'Mobile app interface and user experience',
        image: 'img/Goal Setting.jpg'
    }
];

// Populate portfolio grid
function loadPortfolio() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    portfolioItems.forEach((item, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'col-lg-4 col-md-6 portfolio-item';
        portfolioItem.setAttribute('data-category', item.category.toLowerCase());
        
        portfolioItem.innerHTML = `
            <div class="card">
                <img src="${item.image}" class="card-img-top" alt="${item.title}">
            <div class="portfolio-info">
                    <h3 class="project-title">${item.title}</h3>
                    <p class="project-description">${item.description}</p>
                <span class="category">${item.category}</span>
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
            <button class="lightbox-nav prev">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button class="lightbox-nav next">
                <i class="fas fa-chevron-right"></i>
            </button>
            <div class="lightbox-image-container">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="lightbox-text">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <span class="category">${item.category}</span>
            </div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    document.querySelector('.navbar').style.display = 'none';

    // Add click event to image for fullscreen view on mobile/tablet
    const lightboxImage = lightbox.querySelector('.lightbox-image-container img');
    lightboxImage.addEventListener('click', () => {
        if (window.innerWidth <= 991) {
            openFullscreenViewer(currentIndex);
        }
    });
    
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
        
        // Add fade-out class
        imgContainer.classList.add('fade-out');
        textContainer.classList.add('fade-out');
        
        setTimeout(() => {
            imgContainer.innerHTML = `<img src="${item.image}" alt="${item.title}">`;
            textContainer.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <span class="category">${item.category}</span>
            `;
            
            // Remove fade-out class and add fade-in class
            imgContainer.classList.remove('fade-out');
            textContainer.classList.remove('fade-out');
            imgContainer.classList.add('fade-in');
            textContainer.classList.add('fade-in');
            
            // Remove fade-in class after animation
            setTimeout(() => {
                imgContainer.classList.remove('fade-in');
                textContainer.classList.remove('fade-in');
            }, 300);
        }, 300);
    }

    // Event Listeners
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.prev').addEventListener('click', showPrevImage);
    lightbox.querySelector('.next').addEventListener('click', showNextImage);
    
    // Close lightbox when clicking outside
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyPress);
    
    function handleKeyPress(e) {
        switch(e.key) {
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
            case 'Escape':
                closeLightbox();
                break;
        }
    }
    
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

// Add new fullscreen viewer functionality
function openFullscreenViewer(startIndex) {
    let currentIndex = startIndex;
    const viewer = document.createElement('div');
    viewer.className = 'fullscreen-viewer';
    
    // Create image wrapper for swipe functionality
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'fullscreen-image-wrapper';
    
    // Add all images
    portfolioItems.forEach((item, index) => {
        const slide = document.createElement('div');
        slide.className = 'fullscreen-slide';
        slide.innerHTML = `<img src="${item.image}" alt="${item.title}" class="fullscreen-image">`;
        
        // Add double click handler for zoom
        const img = slide.querySelector('.fullscreen-image');
        slide.addEventListener('dblclick', (e) => {
            const slideEl = e.target.closest('.fullscreen-slide');
            if (slideEl.classList.contains('zoomed')) {
                slideEl.classList.remove('zoomed');
                imageWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
            } else {
                slideEl.classList.add('zoomed');
                // Center zoom on double click position
                const rect = img.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const transformOrigin = `${(x / rect.width) * 100}% ${(y / rect.height) * 100}%`;
                img.style.transformOrigin = transformOrigin;
            }
        });
        
        imageWrapper.appendChild(slide);
    });
    
    viewer.innerHTML = `
        <div class="fullscreen-counter">
            ${startIndex + 1} of ${portfolioItems.length}
        </div>
        <button class="fullscreen-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    const container = document.createElement('div');
    container.className = 'fullscreen-image-container';
    container.appendChild(imageWrapper);
    viewer.appendChild(container);
    
    document.body.appendChild(viewer);
    setTimeout(() => viewer.classList.add('active'), 0);
    
    // Set initial position
    updateSlidePosition(currentIndex);
    
    // Touch handling variables
    let touchStartX = 0;
    let touchEndX = 0;
    let initialTransform = 0;
    
    function updateSlidePosition(index, animate = true) {
        const currentSlide = imageWrapper.children[currentIndex];
        if (currentSlide.classList.contains('zoomed')) {
            currentSlide.classList.remove('zoomed');
        }
        
        if (animate) {
            imageWrapper.style.transition = 'transform 0.3s ease-out';
        } else {
            imageWrapper.style.transition = 'none';
        }
        imageWrapper.style.transform = `translateX(-${index * 100}%)`;
        viewer.querySelector('.fullscreen-counter').textContent = 
            `${index + 1} of ${portfolioItems.length}`;
    }
    
    function handleSwipe(diffX) {
        const currentSlide = imageWrapper.children[currentIndex];
        if (currentSlide.classList.contains('zoomed')) {
            return; // Don't swipe while zoomed
        }
        
        const threshold = window.innerWidth * 0.2; // 20% of screen width
        if (Math.abs(diffX) > threshold) {
            if (diffX > 0 && currentIndex > 0) {
                currentIndex--;
            } else if (diffX < 0 && currentIndex < portfolioItems.length - 1) {
                currentIndex++;
            }
        }
        updateSlidePosition(currentIndex);
    }
    
    container.addEventListener('touchstart', (e) => {
        const currentSlide = imageWrapper.children[currentIndex];
        if (currentSlide.classList.contains('zoomed')) {
            return; // Don't handle touch events while zoomed
        }
        touchStartX = e.touches[0].clientX;
        initialTransform = -currentIndex * 100;
        imageWrapper.style.transition = 'none';
    }, { passive: true });
    
    container.addEventListener('touchmove', (e) => {
        const currentSlide = imageWrapper.children[currentIndex];
        if (currentSlide.classList.contains('zoomed')) {
            return; // Don't handle touch events while zoomed
        }
        touchEndX = e.touches[0].clientX;
        const diffX = touchEndX - touchStartX;
        const percentMoved = (diffX / window.innerWidth) * 100;
        const newTransform = initialTransform + percentMoved;
        
        // Limit the transform to prevent overscrolling
        if (
            (currentIndex === 0 && diffX > 0) || 
            (currentIndex === portfolioItems.length - 1 && diffX < 0)
        ) {
            return;
        }
        
        imageWrapper.style.transform = `translateX(${newTransform}%)`;
    }, { passive: true });
    
    container.addEventListener('touchend', () => {
        const currentSlide = imageWrapper.children[currentIndex];
        if (currentSlide.classList.contains('zoomed')) {
            return; // Don't handle touch events while zoomed
        }
        const diffX = touchEndX - touchStartX;
        handleSwipe(diffX);
    });
    
    function closeViewer() {
        viewer.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(viewer);
        }, 300);
    }
    
    // Close button handler
    viewer.querySelector('.fullscreen-close').addEventListener('click', closeViewer);
    
    // Handle back button
    const handleBackButton = (e) => {
        closeViewer();
        window.removeEventListener('popstate', handleBackButton);
    };
    
    // Push state when opening viewer
    history.pushState({ viewer: true }, '');
    window.addEventListener('popstate', handleBackButton);
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
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="btn-text">Sending...</span><span class="btn-icon"><i class="fas fa-spinner fa-spin"></i></span>';

            try {
                const mainEmailData = {
                    from_name: form.querySelector('#name').value,
                    from_email: form.querySelector('#email').value,
                    subject: form.querySelector('#subject').value,
                    message: form.querySelector('#message').value
                };
                
                await emailjs.send('service_zps8h0i', 'template_8ht37op', mainEmailData);
                
                // Show custom notification
                const notification = document.getElementById('notification');
                notification.classList.add('show');
                
                // Hide notification after 5 seconds
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 5000);
                
                form.reset();
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to send message. Please try again.');
            }

            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span class="btn-text">Send Message</span><span class="btn-icon"><i class="fas fa-paper-plane"></i></span>';
        });
    }

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