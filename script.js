// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'light' mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

// Update icon based on current theme
function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (html.getAttribute('data-theme') === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

updateThemeIcon();

// Toggle theme
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const nav = document.getElementById('nav');

mobileMenuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = mobileMenuToggle.querySelectorAll('span');
    if (nav.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scroll with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
const animateElements = document.querySelectorAll('.feature-card, .service-card, .stat-item, .contact-item-large');
animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollPosition = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// WhatsApp button interaction
const whatsappButton = document.querySelector('.whatsapp-float');
if (whatsappButton) {
    whatsappButton.addEventListener('mouseenter', () => {
        whatsappButton.style.transform = 'scale(1.1)';
    });
    
    whatsappButton.addEventListener('mouseleave', () => {
        whatsappButton.style.transform = 'scale(1)';
    });
}

// Add loading animation completion
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Prevent body scroll when mobile menu is open
nav.addEventListener('transitionend', () => {
    if (nav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// Log page load for analytics (can be extended)
console.log('InteriorGlanz website loaded successfully');

// Contact Form Validation and Handling
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

// Set minimum date to today
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Reset previous errors
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
        });
        
        let isValid = true;
        
        // Validate Name
        const name = document.getElementById('name');
        if (!name.value.trim()) {
            showError('name', 'Bitte geben Sie Ihren Namen ein.');
            isValid = false;
        }
        
        // Validate Email
        const email = document.getElementById('email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            showError('email', 'Bitte geben Sie Ihre E-Mail-Adresse ein.');
            isValid = false;
        } else if (!emailPattern.test(email.value)) {
            showError('email', 'Bitte geben Sie eine gültige E-Mail-Adresse ein.');
            isValid = false;
        }
        
        // Validate Privacy Checkbox
        const privacy = document.getElementById('privacy');
        if (!privacy.checked) {
            showError('privacy', 'Bitte akzeptieren Sie die Datenschutzerklärung.');
            isValid = false;
        }
        
        if (isValid) {
            // Here you would normally send the form data to a server
            // For now, we'll just show a success message
            
            // Simulate form submission
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Optional: Reset form after successful submission
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'flex';
                formSuccess.style.display = 'none';
            }, 5000);
        }
    });
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group') || field.parentElement;
    const errorMessage = document.getElementById(fieldId + 'Error');
    
    formGroup.classList.add('error');
    if (errorMessage) {
        errorMessage.textContent = message;
    }
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faq => {
            faq.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});
