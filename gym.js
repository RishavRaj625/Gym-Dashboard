// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize all app functionality
function initializeApp() {
    initNavigation();
    initThemeToggle();
    initScrollAnimations();
    initBMICalculator();
    initTestimonialSlider();
    initFAQAccordion();
    initContactForm();
    initNewsletterForm();
    initGalleryFilters();
    initScheduleInteractions();
    initCounters();
    initSmoothScrolling();
    initLoadingStates();
    initScrollToTop();
    initMobileOptimizations();
}

// Navigation functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update theme toggle icon
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            }
        });
    }
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all elements with scroll-reveal class
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    scrollElements.forEach(element => {
        observer.observe(element);
    });

    // Add scroll-reveal class to relevant elements
    const elementsToAnimate = document.querySelectorAll(
        '.membership-card, .trainer-card, .gallery-item, .testimonial-card, .faq-item, .about-text, .bmi-form, .contact-form'
    );
    
    elementsToAnimate.forEach(element => {
        element.classList.add('scroll-reveal');
        observer.observe(element);
    });
}

// BMI Calculator
function initBMICalculator() {
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const calculateBtn = document.getElementById('calculate-bmi');
    const bmiValue = document.getElementById('bmi-value');
    const bmiCategory = document.getElementById('bmi-category');
    const bmiRanges = document.querySelectorAll('.bmi-range');

    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateBMI);
    }

    if (heightInput && weightInput) {
        heightInput.addEventListener('input', calculateBMI);
        weightInput.addEventListener('input', calculateBMI);
    }

    function calculateBMI() {
        const height = parseFloat(heightInput.value);
        const weight = parseFloat(weightInput.value);

        if (height && weight && height > 0 && weight > 0) {
            const heightInMeters = height / 100;
            const bmi = weight / (heightInMeters * heightInMeters);
            
            bmiValue.textContent = bmi.toFixed(1);
            
            // Determine category
            let category, categoryClass;
            if (bmi < 18.5) {
                category = 'Underweight';
                categoryClass = 'underweight';
            } else if (bmi < 25) {
                category = 'Normal Weight';
                categoryClass = 'normal';
            } else if (bmi < 30) {
                category = 'Overweight';
                categoryClass = 'overweight';
            } else {
                category = 'Obese';
                categoryClass = 'obese';
            }
            
            bmiCategory.textContent = category;
            bmiCategory.className = `bmi-category ${categoryClass}`;
            
            // Highlight corresponding range
            bmiRanges.forEach(range => {
                range.classList.remove('active');
                if (range.classList.contains(categoryClass)) {
                    range.classList.add('active');
                }
            });
            
            // Animate the result
            bmiValue.classList.add('pulse');
            setTimeout(() => {
                bmiValue.classList.remove('pulse');
            }, 2000);
        }
    }
}

// Testimonial slider
function initTestimonialSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    let currentTestimonial = 0;

    if (testimonialCards.length > 0) {
        // Show first testimonial
        testimonialCards[0].classList.add('active');

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                changeTestimonial(-1);
            });

            nextBtn.addEventListener('click', () => {
                changeTestimonial(1);
            });
        }

        // Auto-slide testimonials
        setInterval(() => {
            changeTestimonial(1);
        }, 5000);
    }

    function changeTestimonial(direction) {
        testimonialCards[currentTestimonial].classList.remove('active');
        
        currentTestimonial += direction;
        
        if (currentTestimonial >= testimonialCards.length) {
            currentTestimonial = 0;
        } else if (currentTestimonial < 0) {
            currentTestimonial = testimonialCards.length - 1;
        }
        
        testimonialCards[currentTestimonial].classList.add('active');
    }
}

// FAQ Accordion
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const faqAnswer = faqItem.querySelector('.faq-answer');
            const icon = this.querySelector('i');
            
            // Close other FAQ items
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    const otherItem = otherQuestion.parentElement;
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherQuestion.querySelector('i');
                    
                    otherAnswer.classList.remove('active');
                    if (otherIcon) {
                        otherIcon.classList.remove('fa-minus');
                        otherIcon.classList.add('fa-plus');
                    }
                }
            });
            
            // Toggle current FAQ item
            faqAnswer.classList.toggle('active');
            if (icon) {
                icon.classList.toggle('fa-plus');
                icon.classList.toggle('fa-minus');
            }
        });
    });
}

// Contact form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Newsletter form
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate subscription
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Successfully subscribed to our newsletter!', 'success');
                emailInput.value = '';
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Gallery filters
function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.add('fade-in');
                    }, 100);
                } else {
                    item.style.display = 'none';
                    item.classList.remove('fade-in');
                }
            });
        });
    });
}

// Schedule interactions
function initScheduleInteractions() {
    const classItems = document.querySelectorAll('.class-item');
    
    classItems.forEach(item => {
        item.addEventListener('click', function() {
            const className = this.textContent.trim();
            if (className && className !== '') {
                showClassDetails(className);
            }
        });
    });
}

// Animated counters
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 20);
}

// Smooth scrolling
function initSmoothScrolling() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Loading states
function initLoadingStates() {
    const loadingElements = document.querySelectorAll('.loading');
    
    loadingElements.forEach(element => {
        setTimeout(() => {
            element.classList.remove('loading');
        }, Math.random() * 1000 + 500);
    });
}

// Scroll to top button
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollToTopBtn.style.display = 'block';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        });
        
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Mobile optimizations
function initMobileOptimizations() {
    // Prevent zoom on input focus (iOS)
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (window.innerWidth < 768) {
                document.querySelector('meta[name="viewport"]').setAttribute(
                    'content', 
                    'width=device-width, initial-scale=1, maximum-scale=1'
                );
            }
        });
        
        input.addEventListener('blur', function() {
            if (window.innerWidth < 768) {
                document.querySelector('meta[name="viewport"]').setAttribute(
                    'content', 
                    'width=device-width, initial-scale=1'
                );
            }
        });
    });
    
    // Touch-friendly hover effects
    if ('ontouchstart' in window) {
        const hoverElements = document.querySelectorAll('.glass-card, .membership-card, .trainer-card');
        hoverElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 150);
            });
        });
    }
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    `;
    
    // Set background color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#6366f1',
        warning: '#f59e0b'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

function showClassDetails(className) {
    const modal = document.createElement('div');
    modal.className = 'class-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${className}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p><strong>Duration:</strong> 45 minutes</p>
                <p><strong>Instructor:</strong> Professional Trainer</p>
                <p><strong>Level:</strong> All levels welcome</p>
                <p><strong>Description:</strong> Join us for an energizing ${className} session designed to challenge and motivate you.</p>
                <button class="btn btn-primary">Book Now</button>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: var(--bg-secondary);
        padding: 2rem;
        border-radius: 20px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 100);
    
    // Close modal handlers
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.8)';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

// Performance optimizations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    // Add any scroll-dependent functionality here
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// Lazy loading images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('loading');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

// Service Worker registration (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}