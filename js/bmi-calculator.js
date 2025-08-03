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