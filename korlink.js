// KorLink Interactive Website JavaScript

// Smooth scroll for navigation links
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

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-section').forEach(section => {
    observer.observe(section);
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = scrollTop;
});

// CTA Button click handlers
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent;
        console.log('User clicked:', buttonText);
        
        // Add ripple effect
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        ripple.style.left = (x - 10) + 'px';
        ripple.style.top = (y - 10) + 'px';
        
        ripple.animate([
            { transform: 'scale(1)', opacity: 1 },
            { transform: 'scale(4)', opacity: 0 }
        ], {
            duration: 600,
            easing: 'ease-out'
        });
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Service card hover effect with data
const serviceCards = document.querySelectorAll('.service-card');
const serviceData = [
    { title: 'Web Development', description: 'Build stunning websites' },
    { title: 'Mobile Solutions', description: 'Create mobile apps' },
    { title: 'UI/UX Design', description: 'Design beautiful interfaces' },
    { title: 'Security', description: 'Enterprise-grade security' },
    { title: 'Analytics', description: 'Get powerful insights' },
    { title: 'Performance', description: 'Lightning-fast speed' }
];

serviceCards.forEach((card, index) => {
    card.addEventListener('mouseenter', function() {
        this.style.background = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
        this.style.color = 'white';
        const headings = this.querySelectorAll('h3, p');
        headings.forEach(h => h.style.color = 'white');
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.background = 'white';
        this.style.color = 'inherit';
        const h3 = this.querySelector('h3');
        const p = this.querySelector('p');
        if (h3) h3.style.color = '#6366f1';
        if (p) p.style.color = '#6b7280';
    });
});

// Pricing card selection
const pricingCards = document.querySelectorAll('.pricing-card');
pricingCards.forEach(card => {
    const button = card.querySelector('.cta-button');
    if (button) {
        button.addEventListener('click', function() {
            const plan = card.querySelector('h3').textContent;
            showNotification(`You selected: ${plan} plan`);
        });
    }
});

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
        z-index: 999;
        animation: slideIn 0.5s ease;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.animate([
            { opacity: 1, transform: 'translateX(0)' },
            { opacity: 0, transform: 'translateX(400px)' }
        ], {
            duration: 500,
            easing: 'ease-out'
        });
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Testimonial autoplay
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');

function rotateTestimonials() {
    testimonialCards.forEach(card => {
        card.style.opacity = '0.5';
        card.style.transform = 'scale(0.95)';
    });
    
    testimonialCards[currentTestimonial].style.opacity = '1';
    testimonialCards[currentTestimonial].style.transform = 'scale(1)';
    
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
}

// Initialize
rotateTestimonials();
setInterval(rotateTestimonials, 5000);

// Form validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    console.log('%cWelcome to KorLink!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
});

// Performance monitoring
window.addEventListener('load', () => {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time:', pageLoadTime + 'ms');
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        showNotification('Search feature coming soon! 🔍');
    }
});

// Add some fun to the console
console.log('%cKorLink - Digital Solutions Platform', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%cDeveloped by: Lawal Abdulrazaq', 'color: #8b5cf6; font-size: 12px;');
console.log('%cVersion 1.0 - 2026', 'color: #gray; font-size: 10px;');