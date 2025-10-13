/**
 * Common Admin Panel Utilities and Functions
 * Shared across all admin pages for consistency
 */

// ===========================
// API Configuration
// ===========================
const API_BASE = '/api/v1';

/**
 * Get authentication headers for API requests
 * @returns {Object} Headers object with Authorization and Content-Type
 */
const getAuthHeaders = () => {
    const token = localStorage.getItem('admin_token') || sessionStorage.getItem('admin_token');
    return {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    };
};

// ===========================
// Loading Overlay Management
// ===========================

/**
 * Show the loading overlay
 */
function showLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'flex';
    }
}

/**
 * Hide the loading overlay
 */
function hideLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
    }
}

// ===========================
// Notification System
// ===========================

/**
 * Show a notification message
 * @param {string} message - The message to display
 * @param {string} type - Type of notification: 'success', 'error', 'warning', 'info'
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const iconMap = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    
    const colorMap = {
        'success': '#10b981',
        'error': '#ef4444',
        'warning': '#f59e0b',
        'info': '#3b82f6'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${iconMap[type] || 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">&times;</button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colorMap[type] || colorMap.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        min-width: 300px;
        max-width: 500px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ===========================
// Utility Functions
// ===========================

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount || 0);
}

/**
 * Format date
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

/**
 * Format time
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted time string
 */
function formatTime(dateString) {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Format date and time
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date and time string
 */
function formatDateTime(dateString) {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Escape HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped HTML string
 */
function escapeHtml(text) {
    if (!text) return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.toString().replace(/[&<>"']/g, m => map[m]);
}

/**
 * Generate URL-friendly slug from text
 * @param {string} text - Text to convert to slug
 * @returns {string} Slug string
 */
function generateSlug(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .substring(0, 100);
}

/**
 * Debounce function for search/input delays
 * @param {Function} func - Function to debounce
 * @param {number} wait - Milliseconds to wait
 * @returns {Function} Debounced function
 */
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

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showNotification('Copied to clipboard!', 'success');
    } catch (err) {
        console.error('Failed to copy:', err);
        showNotification('Failed to copy to clipboard', 'error');
    }
}

// ===========================
// Modal Management
// ===========================

/**
 * Close all modals
 */
function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

/**
 * Close specific modal by ID
 * @param {string} modalId - ID of the modal to close
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

/**
 * Open specific modal by ID
 * @param {string} modalId - ID of the modal to open
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

// ===========================
// Export Functions
// ===========================

/**
 * Export data to JSON file
 * @param {Array|Object} data - Data to export
 * @param {string} filename - Name of the file
 */
function exportToJSON(data, filename) {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showNotification('Export completed successfully!', 'success');
}

/**
 * Export data to CSV file
 * @param {Array} data - Array of objects to export
 * @param {string} filename - Name of the file
 */
function exportToCSV(data, filename) {
    if (!data || data.length === 0) {
        showNotification('No data to export', 'warning');
        return;
    }
    
    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(row => 
            headers.map(header => {
                const value = row[header];
                return typeof value === 'string' && value.includes(',') 
                    ? `"${value}"` 
                    : value;
            }).join(',')
        )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    showNotification('Export completed successfully!', 'success');
}

// ===========================
// Authentication & Security
// ===========================

/**
 * Check if user is authenticated
 * @returns {boolean} True if authenticated
 */
function isAuthenticated() {
    const token = localStorage.getItem('admin_token') || sessionStorage.getItem('admin_token');
    return !!token;
}

/**
 * Logout user and redirect to login page
 */
function logout() {
    if (confirm('Are you sure you want to sign out?')) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_refresh_token');
        sessionStorage.removeItem('admin_token');
        sessionStorage.removeItem('admin_refresh_token');
        window.location.href = '/admin/login';
    }
}

// ===========================
// Event Listeners Setup
// ===========================

/**
 * Initialize common admin functionality
 */
function initializeCommonAdminFeatures() {
    // Close modals on outside click
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
    
    // Setup logout button
    const logoutBtnHeader = document.getElementById('logout-btn-header');
    if (logoutBtnHeader) {
        logoutBtnHeader.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
    
    // Setup header action buttons
    setupHeaderActionButtons();
    
    // Hide loading overlay on page load
    window.addEventListener('load', hideLoading);
    
    // Check authentication
    if (!isAuthenticated() && !window.location.pathname.includes('/login')) {
        window.location.href = '/admin/login';
    }
}

/**
 * Setup header action buttons (notifications, messages, settings)
 */
function setupHeaderActionButtons() {
    const actionButtons = document.querySelectorAll('.header-action-btn');
    
    if (actionButtons.length >= 1) {
        // Notifications button
        actionButtons[0]?.addEventListener('click', function() {
            showNotification('Notifications feature coming soon!', 'info');
        });
    }
    
    if (actionButtons.length >= 2) {
        // Messages button
        actionButtons[1]?.addEventListener('click', function() {
            window.location.href = '/users/admin/messages';
        });
    }
    
    if (actionButtons.length >= 3) {
        // Settings button
        actionButtons[2]?.addEventListener('click', function() {
            showNotification('Quick settings coming soon!', 'info');
        });
    }
}

// ===========================
// Pagination Helpers
// ===========================

/**
 * Render pagination controls
 * @param {Object} paginationData - Pagination data from API
 * @param {Function} onPageChange - Callback when page changes
 */
function renderPagination(paginationData, onPageChange) {
    const { current_page, total_pages, total, per_page } = paginationData;
    
    // Update info text
    const infoElement = document.querySelector('.pagination-info, #pagination-info');
    if (infoElement) {
        const start = ((current_page - 1) * per_page) + 1;
        const end = Math.min(current_page * per_page, total);
        infoElement.textContent = `Showing ${start} - ${end} of ${total} items`;
    }
    
    // Update prev/next buttons
    const prevBtn = document.querySelector('#prev-page, #prev-btn');
    const nextBtn = document.querySelector('#next-page, #next-btn');
    
    if (prevBtn) prevBtn.disabled = current_page <= 1;
    if (nextBtn) nextBtn.disabled = current_page >= total_pages;
    
    // Generate page numbers
    const pageNumbersContainer = document.querySelector('#page-numbers, .page-numbers');
    if (pageNumbersContainer) {
        pageNumbersContainer.innerHTML = '';
        
        const maxVisible = 5;
        let startPage = Math.max(1, current_page - Math.floor(maxVisible / 2));
        let endPage = Math.min(total_pages, startPage + maxVisible - 1);
        
        if (endPage - startPage < maxVisible - 1) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `page-number ${i === current_page ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.onclick = () => onPageChange(i);
            pageNumbersContainer.appendChild(pageBtn);
        }
    }
}

// ===========================
// Initialize on DOM Load
// ===========================

// Auto-initialize common features when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCommonAdminFeatures);
} else {
    initializeCommonAdminFeatures();
}

// Add CSS for animations if not already present
if (!document.getElementById('admin-common-styles')) {
    const style = document.createElement('style');
    style.id = 'admin-common-styles';
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            min-width: 300px;
            max-width: 500px;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            margin-left: 1rem;
            opacity: 0.8;
            transition: opacity 0.2s;
        }
        
        .notification-close:hover {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
}
