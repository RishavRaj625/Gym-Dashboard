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
    initGalleryUpload();
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
            if (navMenu && navToggle) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

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

// Theme toggle functionality - FIXED: Removed localStorage
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Set default theme
    body.setAttribute('data-theme', 'light');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            body.setAttribute('data-theme', newTheme);
            
            // Update theme toggle icon
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            }
            
            // Update add photo button visibility
            updateAddPhotoButtonStyle();
        });
    }
}

// Helper function to get current theme
function getCurrentTheme() {
    return document.body.getAttribute('data-theme') || 'light';
}

// Helper function to update add photo button style based on theme
function updateAddPhotoButtonStyle() {
    const addPhotoBtn = document.getElementById('add-photo-btn');
    if (addPhotoBtn) {
        const currentTheme = getCurrentTheme();
        
        if (currentTheme === 'dark') {
            addPhotoBtn.style.backgroundColor = '#374151';
            addPhotoBtn.style.color = '#ffffff';
            addPhotoBtn.style.border = '2px solid #4f46e5';
        } else {
            addPhotoBtn.style.backgroundColor = '#ffffff';
            addPhotoBtn.style.color = '#374151';
            addPhotoBtn.style.border = '2px solid #e5e7eb';
        }
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

    // Add scroll-reveal class to relevant elements
    const elementsToAnimate = document.querySelectorAll(
        '.membership-card, .trainer-card, .gallery-item, .testimonial-card, .faq-item, .about-text, .bmi-form, .contact-form'
    );
    
    elementsToAnimate.forEach(element => {
        element.classList.add('scroll-reveal');
        observer.observe(element);
    });
}

// BMI Calculator - FIXED: Improved real-time calculation
function initBMICalculator() {
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const calculateBtn = document.getElementById('calculate-bmi');
    const bmiValue = document.getElementById('bmi-value');
    const bmiCategory = document.getElementById('bmi-category');
    const bmiRanges = document.querySelectorAll('.bmi-range');

    if (!heightInput || !weightInput || !bmiValue || !bmiCategory) {
        return;
    }

    // Auto-calculate on input change
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
            bmiValue.style.transform = 'scale(1.1)';
            setTimeout(() => {
                bmiValue.style.transform = 'scale(1)';
            }, 200);
        } else {
            bmiValue.textContent = '-';
            bmiCategory.textContent = 'Enter your details to calculate';
            bmiCategory.className = 'bmi-category';
            bmiRanges.forEach(range => range.classList.remove('active'));
        }
    }

    // Add event listeners for real-time calculation
    heightInput.addEventListener('input', calculateBMI);
    weightInput.addEventListener('input', calculateBMI);
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateBMI);
    }
}

// Testimonial slider - FIXED: Corrected button IDs and navigation
function initTestimonialSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    let currentTestimonial = 0;
    let slideInterval;

    if (testimonialCards.length === 0) {
        return;
    }

    // Show first testimonial
    testimonialCards[0].classList.add('active');

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

    // Manual navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            changeTestimonial(-1);
            resetAutoSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            changeTestimonial(1);
            resetAutoSlide();
        });
    }

    // Auto-slide functionality
    function startAutoSlide() {
        slideInterval = setInterval(() => {
            changeTestimonial(1);
        }, 5000);
    }

    function resetAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }

    startAutoSlide();

    // Pause auto-slide on hover
    const testimonialSection = document.querySelector('.testimonials');
    if (testimonialSection) {
        testimonialSection.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        testimonialSection.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }
}

// FAQ Accordion - FIXED: Better icon handling
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const faqAnswer = faqItem.querySelector('.faq-answer');
            const icon = this.querySelector('i');
            
            // Toggle current FAQ item
            const isActive = faqAnswer.classList.contains('active');
            
            // Close all FAQ items
            faqQuestions.forEach(otherQuestion => {
                const otherItem = otherQuestion.parentElement;
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherIcon = otherQuestion.querySelector('i');
                
                otherAnswer.classList.remove('active');
                if (otherIcon) {
                    otherIcon.classList.remove('fa-chevron-up');
                    otherIcon.classList.add('fa-chevron-down');
                }
            });
            
            // If it wasn't active, open it
            if (!isActive) {
                faqAnswer.classList.add('active');
                if (icon) {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                }
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
                showNotification('Please fill in all required fields', 'error');
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
            const email = emailInput.value.trim();
            
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

// Gallery upload functionality - FIXED: Implemented image upload with theme-aware styling
function initGalleryUpload() {
    const addPhotoBtn = document.getElementById('add-photo-btn');
    const photoInput = document.getElementById('photo-input');
    const galleryGrid = document.getElementById('gallery-grid');

    if (addPhotoBtn && photoInput && galleryGrid) {
        // Set initial button styling based on current theme
        updateAddPhotoButtonStyle();
        
        addPhotoBtn.addEventListener('click', function() {
            photoInput.click();
        });

        photoInput.addEventListener('change', function(e) {
            const files = e.target.files;
            
            Array.from(files).forEach(file => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        const galleryItem = document.createElement('div');
                        galleryItem.className = 'gallery-item';
                        galleryItem.innerHTML = `
                            <img src="${e.target.result}" alt="Gallery Image" style="width: 100%; height: 100%; object-fit: cover; border-radius: 15px;">
                            <div class="gallery-overlay">
                                <button class="remove-btn" onclick="removeGalleryItem(this)">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        `;
                        
                        galleryGrid.appendChild(galleryItem);
                        
                        // Add fade-in animation
                        setTimeout(() => {
                            galleryItem.classList.add('fade-in');
                        }, 100);
                    };
                    
                    reader.readAsDataURL(file);
                }
            });
            
            // Reset file input
            photoInput.value = '';
        });
    }
}

// Remove gallery item function
function removeGalleryItem(button) {
    const galleryItem = button.closest('.gallery-item');
    if (galleryItem) {
        galleryItem.style.opacity = '0';
        galleryItem.style.transform = 'scale(0.8)';
        setTimeout(() => {
            galleryItem.remove();
        }, 300);
    }
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
    const statItems = document.querySelectorAll('.stat-item h3');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const text = counter.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                const suffix = text.replace(/\d/g, '');
                
                if (number) {
                    animateCounter(counter, number, suffix);
                    observer.unobserve(counter);
                }
            }
        });
    }, observerOptions);
    
    statItems.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element, target, suffix) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current) + suffix;
        
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        }
    }, 40);
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
    // Create scroll to top button if it doesn't exist
    let scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (!scrollToTopBtn) {
        scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.id = 'scroll-to-top';
        scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--primary-color);
            color: white;
            border: none;
            display: none;
            cursor: pointer;
            z-index: 1000;
            transition: all 0.3s ease;
        `;
        document.body.appendChild(scrollToTopBtn);
    }
    
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

// Mobile optimizations
function initMobileOptimizations() {
    // Touch-friendly hover effects
    if ('ontouchstart' in window) {
        const hoverElements = document.querySelectorAll('.membership-card, .trainer-card, .gallery-item');
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
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// FIXED: showClassDetails function with theme-aware modal styling
function showClassDetails(className) {
    const currentTheme = getCurrentTheme();
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
                <button class="btn btn-primary modal-book-btn">Book Now</button>
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
    
    // Theme-aware modal content styling
    if (currentTheme === 'dark') {
        modalContent.style.cssText = `
            background: #1f2937;
            color: #ffffff;
            padding: 2rem;
            border-radius: 20px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            transform: scale(0.8);
            transition: transform 0.3s ease;
            border: 1px solid #374151;
        `;
    } else {
        modalContent.style.cssText = `
            background: #ffffff;
            color: #1f2937;
            padding: 2rem;
            border-radius: 20px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            transform: scale(0.8);
            transition: transform 0.3s ease;
            border: 1px solid #e5e7eb;
        `;
    }
    
    // Style the close button
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: 15px;
        right: 20px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: ${currentTheme === 'dark' ? '#ffffff' : '#1f2937'};
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.3s ease;
    `;
    
    // Style the modal header
    const modalHeader = modal.querySelector('.modal-header');
    modalHeader.style.cssText = `
        position: relative;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid ${currentTheme === 'dark' ? '#374151' : '#e5e7eb'};
    `;
    
    // Style the modal body
    const modalBody = modal.querySelector('.modal-body');
    modalBody.style.cssText = `
        line-height: 1.6;
    `;
    
    // Style paragraphs in modal body
    const modalParagraphs = modal.querySelectorAll('.modal-body p');
    modalParagraphs.forEach(p => {
        p.style.cssText = `
            margin-bottom: 1rem;
            color: ${currentTheme === 'dark' ? '#e5e7eb' : '#374151'};
        `;
    });
    
    // Style the book button
    const bookBtn = modal.querySelector('.modal-book-btn');
    bookBtn.style.cssText = `
        background: #4f46e5;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 10px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-top: 1rem;
        font-size: 16px;
    `;
    
    // Add hover effects
    closeBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = currentTheme === 'dark' ? '#374151' : '#f3f4f6';
    });
    
    closeBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'transparent';
    });
    
    bookBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#4338ca';
        this.style.transform = 'translateY(-2px)';
    });
    
    bookBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#4f46e5';
        this.style.transform = 'translateY(0)';
    });
    
    // Add book button functionality
    bookBtn.addEventListener('click', function() {
        closeModal();
        showNotification(`Successfully booked ${className} class!`, 'success');
    });
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 100);
    
    // Close modal handlers
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal on Escape key
    function handleEscape(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    }
    
    document.addEventListener('keydown', handleEscape);
    
    function closeModal() {
        document.removeEventListener('keydown', handleEscape);
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.8)';
        setTimeout(() => {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
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
    if (images.length === 0) return;
    
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