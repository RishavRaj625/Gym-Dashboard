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