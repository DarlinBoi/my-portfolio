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
    let lastScrollTop = 0;
    const scrollToTopBtn = document.getElementById('scrollToTop');

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const isAtBottom = (windowHeight + Math.round(scrollTop)) >= documentHeight - 10; // 10px threshold

        if (isAtBottom) {
            scrollToTopBtn.classList.remove('visible');
        } else if (scrollTop > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }

        lastScrollTop = scrollTop;
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

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