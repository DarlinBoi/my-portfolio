// Portfolio Items
const portfolioItems = [
    {
        title: 'Project 1',
        category: 'Web Design',
        image: 'img/website.png'
    },
    {
        title: 'Project 2',
        category: 'Graphic Design',
        image: 'img/avarhh.jpg'
    },
    {
        title: 'Project 3',
        category: 'Graphic Design',
        image: 'img/Remerciements.jpg'
    },
    {
        title: 'Project 4',
        category: 'Graphic Design',
        image: 'img/Nouvelle 2.jpg'
    },
    {
        title: 'Project 5',
        category: 'Graphic Design',
        image: 'img/Exotic Sharwarma.jpg'
    },
    {
        title: 'Project 6',
        category: 'Graphic Design',
        image: 'img/Goal Setting.jpg'
    },
    // Add more projects as needed
];

// Populate portfolio grid
function loadPortfolio() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    portfolioItems.forEach(item => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" onerror="this.onerror=null; console.log('Image failed to load:', this.src);">
            <div class="portfolio-info">
                <h3>${item.title}</h3>
                <p>${item.category}</p>
            </div>
        `;
        
        // Add click event for lightbox
        portfolioItem.addEventListener('click', () => {
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
            <span class="close-lightbox">&times;</span>
            <img src="${imageSrc}" alt="${title}">
            <h3>${title}</h3>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
    
    // Close lightbox when clicking outside or on close button
    lightbox.addEventListener('click', (e) => {
        if (e.target.className === 'lightbox' || e.target.className === 'close-lightbox') {
            document.body.removeChild(lightbox);
            document.body.style.overflow = 'auto'; // Restore scrolling
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
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
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

// Form submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Message sent successfully!');
    contactForm.reset();
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadPortfolio();
    const text = "Hello, I'm Seyi Lawrence"; // Replace with your name
    const typewriterElement = document.querySelector('.typewriter-text');
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            typewriterElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100); // Adjust speed here (lower number = faster)
        }
    }
    
    // Start the typewriter effect
    typeWriter();
}); 