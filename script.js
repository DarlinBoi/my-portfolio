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
    
    portfolioItems.forEach(item => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.setAttribute('data-category', item.category.toLowerCase());
        
        portfolioItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="portfolio-info">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <span class="category">${item.category}</span>
            </div>
        `;
        
        portfolioGrid.appendChild(portfolioItem);
    });
}

// Lightbox functionality
function openLightbox(imageSrc, title) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="close-lightbox">&times;</button>
            <img src="${imageSrc}" alt="${title}">
            <h3>${title}</h3>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    // Close lightbox when clicking outside or on close button
    lightbox.addEventListener('click', (e) => {
        if (e.target.className === 'lightbox' || e.target.className === 'close-lightbox') {
            document.body.removeChild(lightbox);
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.querySelector('.lightbox')) {
            document.body.removeChild(lightbox);
            document.body.style.overflow = 'auto';
        }
    });
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
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
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
});

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

// Scroll to top functionality
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="btn-text">Sending...</span><span class="btn-icon"><i class="fas fa-spinner fa-spin"></i></span>';

            try {
                // Send notification email to you
                const mainEmailData = {
                    from_name: form.querySelector('#name').value,
                    from_email: form.querySelector('#email').value,
                    subject: form.querySelector('#subject').value,
                    message: form.querySelector('#message').value
                };
                
                console.log('Sending main notification with:', mainEmailData);
                await emailjs.send('service_zps8h0i', 'template_8ht37op', mainEmailData);
                console.log('Main notification sent successfully');
                
                alert('Message sent successfully!');
                form.reset();
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to send message. Please try again.');
            }

            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span class="btn-text">Send Message</span><span class="btn-icon"><i class="fas fa-paper-plane"></i></span>';
        });
    }
}); 