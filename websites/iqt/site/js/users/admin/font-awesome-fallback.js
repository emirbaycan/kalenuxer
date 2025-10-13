/**
 * Font Awesome Loading Detection and Fallback System
 * Ensures Font Awesome icons load properly or provides emoji fallbacks
 */

(function() {
    let fontAwesomeLoaded = false;
    let loadAttempt = 0;
    const maxAttempts = 3;
    
    /**
     * Check if Font Awesome CSS is loaded
     */
    function checkFontAwesome() {
        try {
            const testElement = document.createElement('i');
            testElement.className = 'fas fa-home';
            testElement.style.position = 'absolute';
            testElement.style.left = '-9999px';
            document.body.appendChild(testElement);
            
            const computedStyle = window.getComputedStyle(testElement);
            const fontFamily = computedStyle.getPropertyValue('font-family');
            
            document.body.removeChild(testElement);
            
            // Check if Font Awesome font is loaded
            if (fontFamily && (
                fontFamily.includes('Font Awesome') || 
                fontFamily.includes('FontAwesome') ||
                computedStyle.content !== 'none'
            )) {
                fontAwesomeLoaded = true;
                console.log('✅ Font Awesome loaded successfully');
                return true;
            }
            
            return false;
        } catch (e) {
            console.error('❌ Font Awesome check failed:', e);
            return false;
        }
    }
    
    /**
     * Load Font Awesome from fallback CDN
     */
    function loadFontAwesomeFallback() {
        if (loadAttempt >= maxAttempts) {
            console.warn('⚠️ Font Awesome failed to load after', maxAttempts, 'attempts. Using emoji fallbacks.');
            activateEmojiFallbacks();
            return;
        }
        
        loadAttempt++;
        console.log('🔄 Loading Font Awesome fallback attempt', loadAttempt);
        
        // Try loading from different CDNs
        const fallbackCDNs = [
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
            'https://maxcdn.bootstrapcdn.com/font-awesome/6.5.1/css/all.min.css',
            'https://use.fontawesome.com/releases/v6.5.1/css/all.css'
        ];
        
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = fallbackCDNs[loadAttempt - 1];
        link.crossOrigin = 'anonymous';
        
        link.onload = function() {
            setTimeout(() => {
                if (checkFontAwesome()) {
                    fontAwesomeLoaded = true;
                } else if (loadAttempt < maxAttempts) {
                    loadFontAwesomeFallback();
                } else {
                    activateEmojiFallbacks();
                }
            }, 100);
        };
        
        link.onerror = function() {
            console.error('❌ Font Awesome CDN', loadAttempt, 'failed');
            if (loadAttempt < maxAttempts) {
                loadFontAwesomeFallback();
            } else {
                activateEmojiFallbacks();
            }
        };
        
        document.head.appendChild(link);
    }
    
    /**
     * Activate emoji fallbacks for icons
     */
    function activateEmojiFallbacks() {
        console.log('🔧 Activating emoji fallbacks for icons');
        
        // Add fallback CSS
        const fallbackCSS = `
            <style id="font-awesome-emoji-fallback">
            .fas, .fa, .far, .fab { 
                font-family: sans-serif !important; 
                font-style: normal !important;
            }
            
            /* Common Admin Icons */
            .fa-chart-line:before { content: "📈" !important; }
            .fa-chart-area:before { content: "📊" !important; }
            .fa-chart-bar:before { content: "📊" !important; }
            .fa-chart-pie:before { content: "🥧" !important; }
            .fa-dollar-sign:before { content: "💰" !important; }
            .fa-credit-card:before { content: "💳" !important; }
            .fa-money-bill-wave:before { content: "💵" !important; }
            .fa-edit:before { content: "✏️" !important; }
            .fa-file-alt:before { content: "📄" !important; }
            .fa-newspaper:before { content: "📰" !important; }
            .fa-clock:before { content: "🕐" !important; }
            .fa-bell:before { content: "🔔" !important; }
            .fa-envelope:before { content: "✉️" !important; }
            .fa-cog:before, .fa-cogs:before { content: "⚙️" !important; }
            .fa-user:before { content: "👤" !important; }
            .fa-user-circle:before { content: "👤" !important; }
            .fa-user-plus:before { content: "👥" !important; }
            .fa-users:before { content: "👥" !important; }
            .fa-brain:before { content: "🧠" !important; }
            .fa-folder:before { content: "📁" !important; }
            .fa-folder-open:before { content: "📂" !important; }
            .fa-folder-plus:before { content: "📁" !important; }
            .fa-tags:before, .fa-tag:before { content: "🏷️" !important; }
            .fa-home:before { content: "🏠" !important; }
            .fa-dashboard:before, .fa-tachometer-alt:before { content: "📊" !important; }
            .fa-server:before { content: "🖥️" !important; }
            .fa-database:before { content: "💾" !important; }
            
            /* Action Icons */
            .fa-plus:before, .fa-plus-circle:before { content: "➕" !important; }
            .fa-minus:before { content: "➖" !important; }
            .fa-times:before, .fa-times-circle:before { content: "❌" !important; }
            .fa-check:before, .fa-check-circle:before { content: "✅" !important; }
            .fa-trash:before { content: "🗑️" !important; }
            .fa-save:before { content: "💾" !important; }
            .fa-download:before { content: "⬇️" !important; }
            .fa-upload:before { content: "⬆️" !important; }
            .fa-search:before { content: "🔍" !important; }
            .fa-filter:before { content: "🔽" !important; }
            .fa-sync-alt:before, .fa-refresh:before { content: "🔄" !important; }
            .fa-undo:before { content: "↩️" !important; }
            .fa-redo:before { content: "↪️" !important; }
            
            /* Navigation Icons */
            .fa-arrow-up:before { content: "⬆️" !important; }
            .fa-arrow-down:before { content: "⬇️" !important; }
            .fa-arrow-left:before { content: "⬅️" !important; }
            .fa-arrow-right:before { content: "➡️" !important; }
            .fa-chevron-left:before { content: "◀" !important; }
            .fa-chevron-right:before { content: "▶" !important; }
            .fa-chevron-up:before { content: "▲" !important; }
            .fa-chevron-down:before { content: "▼" !important; }
            
            /* Status Icons */
            .fa-eye:before { content: "👁️" !important; }
            .fa-eye-slash:before { content: "🚫" !important; }
            .fa-lock:before { content: "🔒" !important; }
            .fa-unlock:before { content: "🔓" !important; }
            .fa-info-circle:before { content: "ℹ️" !important; }
            .fa-exclamation-circle:before { content: "⚠️" !important; }
            .fa-exclamation-triangle:before { content: "⚠️" !important; }
            .fa-question-circle:before { content: "❓" !important; }
            
            /* Misc Icons */
            .fa-spinner:before { content: "⏳" !important; }
            .fa-history:before { content: "🕐" !important; }
            .fa-calendar:before { content: "📅" !important; }
            .fa-link:before { content: "🔗" !important; }
            .fa-image:before { content: "🖼️" !important; }
            .fa-video:before { content: "🎥" !important; }
            .fa-palette:before { content: "🎨" !important; }
            .fa-sitemap:before { content: "🗺️" !important; }
            .fa-list:before { content: "📋" !important; }
            .fa-table:before { content: "📋" !important; }
            .fa-power-off:before, .fa-sign-out-alt:before { content: "🔌" !important; }
            
            /* Spin animation for spinner */
            .fa-spin {
                animation: fa-spin 2s linear infinite !important;
            }
            
            @keyframes fa-spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            </style>
        `;
        
        // Only add if not already added
        if (!document.getElementById('font-awesome-emoji-fallback')) {
            document.head.insertAdjacentHTML('beforeend', fallbackCSS);
        }
    }
    
    /**
     * Initialize Font Awesome loading check
     */
    function initializeFontAwesome() {
        // Initial check after short delay
        setTimeout(() => {
            if (!checkFontAwesome()) {
                console.warn('⚠️ Font Awesome not detected, loading fallback...');
                loadFontAwesomeFallback();
            }
        }, 500);
        
        // Final fallback check after 3 seconds
        setTimeout(() => {
            if (!fontAwesomeLoaded) {
                console.warn('⚠️ Font Awesome still not loaded, activating emoji fallbacks');
                activateEmojiFallbacks();
            }
        }, 3000);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeFontAwesome);
    } else {
        initializeFontAwesome();
    }
})();
