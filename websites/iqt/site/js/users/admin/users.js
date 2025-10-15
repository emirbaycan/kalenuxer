// Users Management JavaScript

class UsersManager extends AdminCommon {
    constructor() {
        super(); // Call AdminCommon constructor
        this.currentPage = 1;
        this.totalPages = 1;
        this.currentFilters = {};
        this.currentUserId = null;
        this.isEditMode = false;
        this.refreshInterval = null;
        
        this.init();
    }

    init() {
        this.initializeUsersPage();
        this.setupEventListeners();
        this.loadUserStats();
        this.loadUsers();
        
        // Auto-refresh every 30 seconds
        this.refreshInterval = setInterval(() => {
            this.loadUserStats();
            this.loadUsers();
        }, 30000);
    }

    initializeUsersPage() {
        // Set default date filters (last 30 days)
        const today = new Date();
        const thirtyDaysAgo = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
        
        const dateTo = document.getElementById('date-to');
        const dateFrom = document.getElementById('date-from');
        
        if (dateTo) dateTo.value = today.toISOString().split('T')[0];
        if (dateFrom) dateFrom.value = thirtyDaysAgo.toISOString().split('T')[0];
    }

    setupEventListeners() {
        // Filter controls
        const applyFilters = document.getElementById('apply-filters');
        if (applyFilters) {
            applyFilters.addEventListener('click', () => this.applyFilters());
        }

        const clearFilters = document.getElementById('clear-filters');
        if (clearFilters) {
            clearFilters.addEventListener('click', () => this.clearFilters());
        }
        
        // Table controls
        const refreshBtn = document.getElementById('refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.loadUserStats();
                this.loadUsers();
            });
        }

        const exportBtn = document.getElementById('export-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportUsers());
        }

        const addUserBtn = document.getElementById('add-user-btn');
        if (addUserBtn) {
            addUserBtn.addEventListener('click', () => this.showAddUserModal());
        }
        
        // Pagination
        const prevPage = document.getElementById('prev-page');
        if (prevPage) {
            prevPage.addEventListener('click', () => this.changePage(this.currentPage - 1));
        }

        const nextPage = document.getElementById('next-page');
        if (nextPage) {
            nextPage.addEventListener('click', () => this.changePage(this.currentPage + 1));
        }
        
        // Modal controls
        document.querySelectorAll('.modal .close, .modal-close').forEach(el => {
            el.addEventListener('click', () => this.closeModals());
        });
        
        // User form controls
        const editUserBtn = document.getElementById('edit-user-btn');
        if (editUserBtn) {
            editUserBtn.addEventListener('click', () => this.showEditUserModal());
        }

        const suspendUserBtn = document.getElementById('suspend-user-btn');
        if (suspendUserBtn) {
            suspendUserBtn.addEventListener('click', () => this.suspendUser());
        }

        const saveUserBtn = document.getElementById('save-user-btn');
        if (saveUserBtn) {
            saveUserBtn.addEventListener('click', () => this.saveUser());
        }
        
        // Close modals when clicking outside
        window.addEventListener('click', (event) => {
            if (event.target.classList.contains('modal')) {
                this.closeModals();
            }
        });

        // Logout
        const logoutBtnHeader = document.getElementById('logout-btn-header');
        if (logoutBtnHeader) {
            logoutBtnHeader.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }

        // Header action buttons
        const notificationBtn = document.querySelectorAll('.header-action-btn')[0];
        if (notificationBtn) {
            notificationBtn.addEventListener('click', () => {
                this.showInfo('Notifications feature coming soon!');
            });
        }

        const messagesBtn = document.querySelectorAll('.header-action-btn')[1];
        if (messagesBtn) {
            messagesBtn.addEventListener('click', () => {
                window.location.href = '/users/admin/messages';
            });
        }

        const settingsBtn = document.querySelectorAll('.header-action-btn')[2];
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                this.showInfo('Quick settings coming soon!');
            });
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            const profileDropdown = document.querySelector('.profile-dropdown');
            const adminProfile = document.querySelector('.admin-profile');
            
            if (profileDropdown && !adminProfile.contains(e.target)) {
                profileDropdown.classList.remove('show');
            }
        });
    }

    async loadUserStats() {
        try {
            const response = await this.apiCall('/admin/users/stats');
            const stats = response.data || response;
            
            document.getElementById('total-users').textContent = stats.total_users || 0;
            document.getElementById('active-users').textContent = stats.active_users || 0;
            document.getElementById('new-users').textContent = stats.new_users || 0;
            document.getElementById('premium-users').textContent = stats.premium_users || 0;
        } catch (error) {
            console.error('Error loading user stats:', error);
        }
    }

    async loadUsers(page = 1) {
        try {
            this.showLoading();
            
            const params = new URLSearchParams({
                page: page,
                per_page: 20,
                ...this.currentFilters
            });

            const responseData = await this.apiCall(`/admin/users?${params}`);
            const data = responseData.data || responseData;
            
            this.renderUsers(data.users || data || []);
            this.updatePagination(data);
            this.currentPage = page;
        } catch (error) {
            console.error('Error loading users:', error);
            document.getElementById('users-tbody').innerHTML = 
                '<tr><td colspan="7" style="text-align: center; color: red;">Error loading users</td></tr>';
        } finally {
            this.hideLoading();
        }
    }

    renderUsers(users) {
        const tbody = document.getElementById('users-tbody');
        
        if (!users || users.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">No users found</td></tr>';
            return;
        }

        tbody.innerHTML = users.map(user => `
            <tr>
                <td>
                    <div class="user-info">
                        <div class="user-avatar">${this.getInitials(user.name || user.username)}</div>
                        <div>
                            <strong>${user.name || 'Unknown'}</strong>
                            <br><small>@${user.username || 'unknown'}</small>
                        </div>
                    </div>
                </td>
                <td>${user.email || 'N/A'}</td>
                <td>
                    <span class="user-type-badge user-type-${user.user_type}">${this.formatUserType(user.user_type)}</span>
                </td>
                <td>
                    <span class="status-badge status-${user.status}">${user.status || 'unknown'}</span>
                </td>
                <td>
                    <div>
                        ${user.last_login ? this.formatDate(user.last_login) : 'Never'}
                        ${user.last_login ? `<br><small>${this.formatTime(user.last_login)}</small>` : ''}
                    </div>
                </td>
                <td>
                    <div>
                        ${this.formatDate(user.created_at)}
                        <br><small>${this.formatTime(user.created_at)}</small>
                    </div>
                </td>
                <td>
                    <button class="action-btn view" onclick="usersManager.viewUserDetails('${user.id}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="action-btn edit" onclick="usersManager.editUser('${user.id}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    ${user.status !== 'suspended' ? `
                        <button class="action-btn delete" onclick="usersManager.suspendUserById('${user.id}')">
                            <i class="fas fa-ban"></i> Suspend
                        </button>
                    ` : `
                        <button class="action-btn edit" onclick="usersManager.activateUser('${user.id}')">
                            <i class="fas fa-check"></i> Activate
                        </button>
                    `}
                </td>
            </tr>
        `).join('');
    }

    updatePagination(data) {
        const paginationInfo = document.getElementById('pagination-info');
        const pageNumbers = document.getElementById('page-numbers');
        const prevBtn = document.getElementById('prev-page');
        const nextBtn = document.getElementById('next-page');
        
        const start = ((data.current_page - 1) * data.per_page) + 1;
        const end = Math.min(data.current_page * data.per_page, data.total);
        
        if (paginationInfo) {
            paginationInfo.textContent = `Showing ${start} - ${end} of ${data.total} users`;
        }
        
        this.totalPages = Math.ceil(data.total / data.per_page);
        
        // Update navigation buttons
        if (prevBtn) prevBtn.disabled = data.current_page <= 1;
        if (nextBtn) nextBtn.disabled = data.current_page >= this.totalPages;
        
        // Generate page numbers
        if (pageNumbers) {
            pageNumbers.innerHTML = '';
            const maxVisiblePages = 5;
            let startPage = Math.max(1, data.current_page - Math.floor(maxVisiblePages / 2));
            let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);
            
            if (endPage - startPage < maxVisiblePages - 1) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }
            
            for (let i = startPage; i <= endPage; i++) {
                const pageBtn = document.createElement('button');
                pageBtn.className = `page-number ${i === data.current_page ? 'active' : ''}`;
                pageBtn.textContent = i;
                pageBtn.onclick = () => this.changePage(i);
                pageNumbers.appendChild(pageBtn);
            }
        }
    }

    changePage(page) {
        if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
            this.loadUsers(page);
        }
    }

    applyFilters() {
        this.currentFilters = {
            status: document.getElementById('status-filter')?.value,
            user_type: document.getElementById('type-filter')?.value,
            search: document.getElementById('search-filter')?.value,
            date_from: document.getElementById('date-from')?.value,
            date_to: document.getElementById('date-to')?.value
        };
        
        // Remove empty filters
        Object.keys(this.currentFilters).forEach(key => {
            if (!this.currentFilters[key]) {
                delete this.currentFilters[key];
            }
        });
        
        this.currentPage = 1;
        this.loadUsers();
    }

    clearFilters() {
        const statusFilter = document.getElementById('status-filter');
        const typeFilter = document.getElementById('type-filter');
        const searchFilter = document.getElementById('search-filter');
        const dateFrom = document.getElementById('date-from');
        const dateTo = document.getElementById('date-to');
        
        if (statusFilter) statusFilter.value = '';
        if (typeFilter) typeFilter.value = '';
        if (searchFilter) searchFilter.value = '';
        if (dateFrom) dateFrom.value = '';
        if (dateTo) dateTo.value = '';
        
        this.currentFilters = {};
        this.currentPage = 1;
        this.loadUsers();
    }

    async viewUserDetails(userId) {
        this.currentUserId = userId;
        
        try {
            const user = await this.apiCall(`/admin/users/${userId}`);
            this.populateUserDetails(user);
            
            const modal = document.getElementById('user-modal');
            if (modal) {
                modal.style.display = 'block';
            }
        } catch (error) {
            console.error('Error loading user details:', error);
            this.showError('Error loading user details: ' + error.message);
        }
    }

    populateUserDetails(user) {
        document.getElementById('detail-user-id').textContent = user.id || 'N/A';
        document.getElementById('detail-name').textContent = user.name || 'N/A';
        document.getElementById('detail-username').textContent = user.username || 'N/A';
        document.getElementById('detail-email').textContent = user.email || 'N/A';
        document.getElementById('detail-phone').textContent = user.phone || 'N/A';
        
        document.getElementById('detail-status').innerHTML = `<span class="status-badge status-${user.status}">${user.status}</span>`;
        document.getElementById('detail-user-type').innerHTML = `<span class="user-type-badge user-type-${user.user_type}">${this.formatUserType(user.user_type)}</span>`;
        document.getElementById('detail-email-verified').textContent = user.email_verified ? 'Yes' : 'No';
        document.getElementById('detail-last-login').textContent = user.last_login ? this.formatDateTime(user.last_login) : 'Never';
        
        document.getElementById('detail-registered').textContent = this.formatDateTime(user.created_at);
        document.getElementById('detail-updated').textContent = this.formatDateTime(user.updated_at);
        
        document.getElementById('detail-tests-taken').textContent = user.tests_taken || 0;
        document.getElementById('detail-avg-score').textContent = user.average_score ? `${user.average_score}/200` : 'N/A';
        document.getElementById('detail-best-score').textContent = user.best_score ? `${user.best_score}/200` : 'N/A';
        
        // Show/hide suspend button based on status
        const suspendBtn = document.getElementById('suspend-user-btn');
        if (suspendBtn) {
            suspendBtn.style.display = user.status !== 'suspended' ? 'inline-flex' : 'none';
        }
    }

    showAddUserModal() {
        this.isEditMode = false;
        this.currentUserId = null;
        
        document.getElementById('form-modal-title').textContent = 'Add New User';
        
        const form = document.getElementById('user-form');
        if (form) form.reset();
        
        const passwordField = document.getElementById('form-password');
        if (passwordField) passwordField.required = true;
        
        const modal = document.getElementById('user-form-modal');
        if (modal) modal.style.display = 'block';
    }

    showEditUserModal() {
        if (!this.currentUserId) return;
        
        this.isEditMode = true;
        document.getElementById('form-modal-title').textContent = 'Edit User';
        
        const passwordField = document.getElementById('form-password');
        if (passwordField) passwordField.required = false;
        
        // Populate form with current user data
        this.populateUserForm();
        
        const modal = document.getElementById('user-form-modal');
        if (modal) modal.style.display = 'block';
    }

    async populateUserForm() {
        try {
            const user = await this.apiCall(`/admin/users/${this.currentUserId}`);
            
            document.getElementById('form-name').value = user.name || '';
            document.getElementById('form-username').value = user.username || '';
            document.getElementById('form-email').value = user.email || '';
            document.getElementById('form-phone').value = user.phone || '';
            document.getElementById('form-user-type').value = user.user_type || '';
            document.getElementById('form-status').value = user.status || '';
        } catch (error) {
            console.error('Error loading user data:', error);
            this.showError('Error loading user data: ' + error.message);
        }
    }

    async saveUser() {
        const form = document.getElementById('user-form');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        const userData = {
            name: document.getElementById('form-name').value,
            username: document.getElementById('form-username').value,
            email: document.getElementById('form-email').value,
            phone: document.getElementById('form-phone').value,
            user_type: document.getElementById('form-user-type').value,
            status: document.getElementById('form-status').value
        };
        
        const password = document.getElementById('form-password').value;
        if (password) {
            userData.password = password;
        }
        
        try {
            this.showLoading();
            
            const url = this.isEditMode ? `/admin/users/${this.currentUserId}` : '/admin/users';
            const method = this.isEditMode ? 'PUT' : 'POST';
            
            await this.apiCall(url, {
                method: method,
                body: JSON.stringify(userData)
            });

            this.showSuccess(this.isEditMode ? 'User updated successfully' : 'User created successfully');
            this.closeModals();
            this.loadUsers(this.currentPage);
            this.loadUserStats();
        } catch (error) {
            console.error('Error saving user:', error);
            this.showError('Error saving user: ' + error.message);
        } finally {
            this.hideLoading();
        }
    }

    async suspendUser(userId = null) {
        const targetUserId = userId || this.currentUserId;
        if (!targetUserId) return;
        
        if (!confirm('Are you sure you want to suspend this user?')) {
            return;
        }
        
        try {
            await this.apiCall(`/admin/users/${targetUserId}/suspend`, {
                method: 'POST'
            });

            this.showSuccess('User suspended successfully');
            this.closeModals();
            this.loadUsers(this.currentPage);
            this.loadUserStats();
        } catch (error) {
            console.error('Error suspending user:', error);
            this.showError('Error suspending user: ' + error.message);
        }
    }

    // Separate method for inline onclick handlers
    async suspendUserById(userId) {
        await this.suspendUser(userId);
    }

    async activateUser(userId) {
        if (!confirm('Are you sure you want to activate this user?')) {
            return;
        }
        
        try {
            await this.apiCall(`/admin/users/${userId}/activate`, {
                method: 'POST'
            });

            this.showSuccess('User activated successfully');
            this.loadUsers(this.currentPage);
            this.loadUserStats();
        } catch (error) {
            console.error('Error activating user:', error);
            this.showError('Error activating user: ' + error.message);
        }
    }

    editUser(userId) {
        this.currentUserId = userId;
        this.showEditUserModal();
    }

    exportUsers() {
        const params = new URLSearchParams({
            export: 'csv',
            ...this.currentFilters
        });
        
        window.open(`/api/v1/admin/users/export?${params}`, '_blank');
    }

    closeModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
        
        // Clear form data
        const form = document.getElementById('user-form');
        if (form) form.reset();
        
        this.currentUserId = null;
        this.isEditMode = false;
    }

    // Utility functions
    getInitials(name) {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }

    formatUserType(type) {
        const types = {
            'admin': 'Admin',
            'premium': 'Premium',
            'basic': 'Basic',
            'free': 'Free'
        };
        return types[type] || type;
    }

    // Override logout to clear refresh interval
    logout() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }
        super.logout();
    }

    // Methods formatDate, formatTime, formatDateTime, apiCall, getToken, 
    // showLoading, hideLoading, showSuccess, showError, showInfo
    // are inherited from AdminCommon class
}

// Initialize users manager when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.usersManager = new UsersManager();
});