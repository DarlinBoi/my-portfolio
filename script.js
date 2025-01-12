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
        portfolioItem.innerHTML = `
            <div class="portfolio-image">
                <img src="${item.image}" alt="${item.title}">
                <div class="portfolio-overlay">
                    <div class="overlay-content">
                        <span class="project-category">${item.category}</span>
                        <h3 class="project-title">${item.title}</h3>
                        <p class="project-description">${item.description}</p>
                        <div class="project-links">
                            <button class="project-link view-image"><i class="fas fa-search-plus"></i></button>
                            <a href="#" class="project-link"><i class="fas fa-link"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add click handler for image viewing
        portfolioItem.querySelector('.view-image').addEventListener('click', () => {
            openLightbox(item.image, item.title);
        });
        
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
    
    // Typewriter effect
    const text = "Hello, I'm Seyi Lawrence";
    const typewriterElement = document.querySelector('.typewriter-text');
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            typewriterElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Clear any existing text and start the typewriter
    if (typewriterElement) {
        typewriterElement.textContent = '';
        typeWriter();
    }
});

// Keep only the enhanced version
const contactForm = document.getElementById('contact-form');
const showNotification = (message, type) => {
    const feedback = document.createElement('div');
    feedback.className = `form-feedback ${type}`;
    feedback.textContent = message;
    // ... rest of the enhanced form code
};

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