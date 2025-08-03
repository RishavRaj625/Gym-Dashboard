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
                        galleryItem.setAttribute('data-id', 'item-' + Date.now() + '-' + Math.random());
                        galleryItem.innerHTML = `
                            <img src="${e.target.result}" alt="Gallery Image" style="width: 100%; height: 100%; object-fit: cover; border-radius: 15px;">
                            <div class="gallery-overlay">
                                <button class="remove-btn" onclick="removeGalleryItem(this)">×</button>
                                <button class="delete-btn" onclick="deleteGalleryItem(this)" title="Delete Image">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polyline points="3,6 5,6 21,6"/>
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                        <line x1="10" y1="11" x2="10" y2="17"/>
                                        <line x1="14" y1="11" x2="14" y2="17"/>
                                    </svg>
                                </button>
                            </div>
                        `;
                        
                        galleryGrid.appendChild(galleryItem);
                        
                        // Update gallery item styling based on current theme
                        updateGalleryItemStyle(galleryItem);
                    };
                    
                    reader.readAsDataURL(file);
                }
            });
            
            // Reset input value to allow uploading the same file again
            photoInput.value = '';
        });
    }
}

// Function to remove gallery item
function removeGalleryItem(button) {
    const galleryItem = button.closest('.gallery-item');
    if (galleryItem) {
        galleryItem.remove();
    }
}

// Function to delete gallery item with confirmation
function deleteGalleryItem(button) {
    const galleryItem = button.closest('.gallery-item');
    if (galleryItem) {
        // Add confirmation dialog
        const confirmDelete = confirm('Are you sure you want to delete this image?');
        if (confirmDelete) {
            galleryItem.remove();
        }
    }
}

// Function to update add photo button styling based on theme
function updateAddPhotoButtonStyle() {
    const addPhotoBtn = document.getElementById('add-photo-btn');
    if (!addPhotoBtn) return;
    
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    if (isDarkMode) {
        addPhotoBtn.style.backgroundColor = '#2c2c2c';
        addPhotoBtn.style.color = '#ffffff';
        addPhotoBtn.style.border = '2px dashed #555';
    } else {
        addPhotoBtn.style.backgroundColor = '#f8f9fa';
        addPhotoBtn.style.color = '#333';
        addPhotoBtn.style.border = '2px dashed #ddd';
    }
}

// Function to update gallery item styling based on theme
function updateGalleryItemStyle(galleryItem) {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const overlay = galleryItem.querySelector('.gallery-overlay');
    const removeBtn = galleryItem.querySelector('.remove-btn');
    const deleteBtn = galleryItem.querySelector('.delete-btn');
    
    if (overlay) {
        overlay.style.background = isDarkMode ? 
            'rgba(0, 0, 0, 0.8)' : 
            'rgba(255, 255, 255, 0.8)';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.gap = '10px';
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.3s ease';
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.borderRadius = '15px';
    }
    
    // Show overlay on hover
    galleryItem.addEventListener('mouseenter', function() {
        if (overlay) overlay.style.opacity = '1';
    });
    
    galleryItem.addEventListener('mouseleave', function() {
        if (overlay) overlay.style.opacity = '0';
    });
    
    if (removeBtn) {
        removeBtn.style.backgroundColor = isDarkMode ? '#ff4444' : '#ff6b6b';
        removeBtn.style.color = '#ffffff';
        removeBtn.style.border = 'none';
        removeBtn.style.borderRadius = '50%';
        removeBtn.style.width = '30px';
        removeBtn.style.height = '30px';
        removeBtn.style.fontSize = '18px';
        removeBtn.style.cursor = 'pointer';
        removeBtn.style.display = 'flex';
        removeBtn.style.alignItems = 'center';
        removeBtn.style.justifyContent = 'center';
        removeBtn.style.transition = 'all 0.3s ease';
    }
    
    if (deleteBtn) {
        deleteBtn.style.backgroundColor = isDarkMode ? '#dc3545' : '#e74c3c';
        deleteBtn.style.color = '#ffffff';
        deleteBtn.style.border = 'none';
        deleteBtn.style.borderRadius = '8px';
        deleteBtn.style.width = '40px';
        deleteBtn.style.height = '30px';
        deleteBtn.style.cursor = 'pointer';
        deleteBtn.style.display = 'flex';
        deleteBtn.style.alignItems = 'center';
        deleteBtn.style.justifyContent = 'center';
        deleteBtn.style.transition = 'all 0.3s ease';
        
        // Add hover effects
        deleteBtn.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#c82333';
            this.style.transform = 'scale(1.1)';
        });
        
        deleteBtn.addEventListener('mouseleave', function() {
            this.style.backgroundColor = isDarkMode ? '#dc3545' : '#e74c3c';
            this.style.transform = 'scale(1)';
        });
    }
}

// Function to update all gallery items when theme changes
function updateAllGalleryItems() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        updateGalleryItemStyle(item);
    });
    updateAddPhotoButtonStyle();
}

// Enhanced gallery functionality with additional features
function initEnhancedGallery() {
    initGalleryUpload();
    
    // Add drag and drop functionality
    const galleryGrid = document.getElementById('gallery-grid');
    if (galleryGrid) {
        galleryGrid.addEventListener('dragover', handleDragOver);
        galleryGrid.addEventListener('drop', handleDrop);
    }
    
    // Add fullscreen view functionality
    document.addEventListener('click', function(e) {
        if (e.target.matches('.gallery-item img')) {
            openFullscreenView(e.target);
        }
    });
}

// Drag and drop handlers
function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('drag-over');
    
    const files = e.dataTransfer.files;
    processFiles(files);
}

// Process dropped files
function processFiles(files) {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;
    
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.setAttribute('data-id', 'item-' + Date.now() + '-' + Math.random());
                galleryItem.innerHTML = `
                    <img src="${e.target.result}" alt="Gallery Image" style="width: 100%; height: 100%; object-fit: cover; border-radius: 15px; cursor: pointer;">
                    <div class="gallery-overlay">
                        <button class="remove-btn" onclick="removeGalleryItem(this)">×</button>
                        <button class="delete-btn" onclick="deleteGalleryItem(this)" title="Delete Image">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3,6 5,6 21,6"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                <line x1="10" y1="11" x2="10" y2="17"/>
                                <line x1="14" y1="11" x2="14" y2="17"/>
                            </svg>
                        </button>
                    </div>
                `;
                
                galleryGrid.appendChild(galleryItem);
                updateGalleryItemStyle(galleryItem);
            };
            
            reader.readAsDataURL(file);
        }
    });
}

// Fullscreen view functionality with delete option
function openFullscreenView(img) {
    const galleryItem = img.closest('.gallery-item');
    const modal = document.createElement('div');
    modal.className = 'fullscreen-modal';
    modal.innerHTML = `
        <div class="fullscreen-content">
            <div class="fullscreen-controls">
                <button class="control-btn delete-btn" onclick="deleteImageFromFullscreen(this)">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3,6 5,6 21,6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        <line x1="10" y1="11" x2="10" y2="17"/>
                        <line x1="14" y1="11" x2="14" y2="17"/>
                    </svg>
                    Delete
                </button>
                <button class="control-btn close-btn" onclick="closeFullscreenView()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                    Close
                </button>
            </div>
            <div class="image-container">
                <img src="${img.src}" alt="Fullscreen Image" class="fullscreen-image">
            </div>
        </div>
    `;
    
    // Store reference to original gallery item
    modal.setAttribute('data-gallery-item', galleryItem ? galleryItem.getAttribute('data-id') || 'temp' : 'temp');
    
    // Style the modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        flex-direction: column;
    `;
    
    const content = modal.querySelector('.fullscreen-content');
    content.style.cssText = `
        position: relative;
        width: 90%;
        height: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
    `;
    
    const controls = modal.querySelector('.fullscreen-controls');
    controls.style.cssText = `
        display: flex;
        gap: 15px;
        margin-bottom: 20px;
        padding: 10px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        backdrop-filter: blur(10px);
    `;
    
    const imageContainer = modal.querySelector('.image-container');
    imageContainer.style.cssText = `
        position: relative;
        max-width: 100%;
        max-height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    const fullscreenImg = modal.querySelector('.fullscreen-image');
    fullscreenImg.style.cssText = `
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        border-radius: 10px;
    `;
    
    // Style control buttons
    const controlBtns = modal.querySelectorAll('.control-btn');
    controlBtns.forEach(btn => {
        btn.style.cssText = `
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 10px 15px;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            border-radius: 8px;
            color: white;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.3s ease;
        `;
        
        btn.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255, 255, 255, 0.3)';
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 255, 255, 0.2)';
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Special styling for delete button
    const deleteBtn = modal.querySelector('.delete-btn');
    deleteBtn.style.background = 'rgba(255, 68, 68, 0.8)';
    deleteBtn.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(255, 68, 68, 1)';
    });
    deleteBtn.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(255, 68, 68, 0.8)';
    });
    
    document.body.appendChild(modal);
    
    // Close on ESC key
    const escHandler = function(e) {
        if (e.key === 'Escape') {
            closeFullscreenView();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
    
    // Close on click outside image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeFullscreenView();
        }
    });
}

function closeFullscreenView() {
    const modal = document.querySelector('.fullscreen-modal');
    if (modal) {
        modal.remove();
    }
}

// Delete image from fullscreen view
function deleteImageFromFullscreen(button) {
    const modal = button.closest('.fullscreen-modal');
    const galleryItemId = modal.getAttribute('data-gallery-item');
    
    // Show confirmation dialog
    const confirmDelete = confirm('Are you sure you want to delete this image?');
    if (!confirmDelete) return;
    
    // Find and remove the gallery item
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        const modalImg = modal.querySelector('.fullscreen-image');
        if (img && modalImg && img.src === modalImg.src) {
            item.remove();
        }
    });
    
    // Close the modal
    closeFullscreenView();
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initEnhancedGallery();
});

// Call this function when theme changes
function onThemeChange() {
    updateAllGalleryItems();
}