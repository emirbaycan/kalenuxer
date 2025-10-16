// Payment Management JavaScript

class PaymentManager extends AdminCommon {
    constructor() {
        super(); // Call AdminCommon constructor
        this.currentPage = 1;
        this.perPage = 20;
        this.filters = {};
        this.selectedPayment = null;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadStats();
        this.loadPayments();
    }

    setupEventListeners() {
        // Filter controls
        document.getElementById('apply-filters').addEventListener('click', () => {
            this.applyFilters();
        });

        document.getElementById('clear-filters').addEventListener('click', () => {
            this.clearFilters();
        });

        // Table actions
        document.getElementById('refresh-btn').addEventListener('click', () => {
            this.loadPayments();
            this.loadStats();
        });

        document.getElementById('export-btn').addEventListener('click', () => {
            this.exportPayments();
        });

        // Pagination
        document.getElementById('prev-page').addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.loadPayments();
            }
        });

        document.getElementById('next-page').addEventListener('click', () => {
            this.currentPage++;
            this.loadPayments();
        });

        // Modals
        this.setupModalListeners();

        // Logout
        document.getElementById('logout-btn').addEventListener('click', (e) => {
            e.preventDefault();
            this.logout();
        });
    }

    setupModalListeners() {
        // Payment detail modal
        const paymentModal = document.getElementById('payment-modal');
        const paymentModalCloses = paymentModal.querySelectorAll('.close, .modal-close');
        
        paymentModalCloses.forEach(btn => {
            btn.addEventListener('click', () => {
                paymentModal.style.display = 'none';
            });
        });

        // Refund modal
        const refundModal = document.getElementById('refund-modal');
        const refundModalCloses = refundModal.querySelectorAll('.close, .modal-close');
        
        refundModalCloses.forEach(btn => {
            btn.addEventListener('click', () => {
                refundModal.style.display = 'none';
            });
        });

        // Refund button
        document.getElementById('refund-btn').addEventListener('click', () => {
            if (this.selectedPayment) {
                this.openRefundModal();
            }
        });

        // Confirm refund
        document.getElementById('confirm-refund').addEventListener('click', () => {
            this.processRefund();
        });

        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === paymentModal) {
                paymentModal.style.display = 'none';
            }
            if (e.target === refundModal) {
                refundModal.style.display = 'none';
            }
        });
    }

    async loadStats() {
        try {
            this.showLoading();
            const response = await this.apiCall('/admin/analytics');
            const data = response.data;

            document.getElementById('total-revenue').textContent = this.formatCurrency(data.total_revenue?.amount || 0);
            document.getElementById('total-payments').textContent = data.total_payments?.count || 0;
            document.getElementById('successful-payments').textContent = data.total_payments?.successful || 0;
            document.getElementById('failed-payments').textContent = data.total_payments?.failed || 0;
        } catch (error) {
            console.error('Failed to load stats:', error);
            this.showError('Failed to load statistics');
        } finally {
            this.hideLoading();
        }
    }

    async loadPayments() {
        try {
            this.showLoading();
            
            const params = new URLSearchParams({
                page: this.currentPage,
                per_page: this.perPage,
                ...this.filters
            });

            const response = await this.apiCall(`/admin/payments?${params}`);
            this.renderPayments(response.data, response.meta);
        } catch (error) {
            console.error('Failed to load payments:', error);
            this.showError('Failed to load payments');
        } finally {
            this.hideLoading();
        }
    }

    renderPayments(payments, meta) {
        const tbody = document.getElementById('payments-tbody');
        tbody.innerHTML = '';

        if (payments.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="8" style="text-align: center; padding: 2rem; color: #6b7280;">
                        No payments found
                    </td>
                </tr>
            `;
            return;
        }

        payments.forEach(payment => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>#${payment.id}</td>
                <td>${this.extractCustomerEmail(payment) || 'Guest'}</td>
                <td><span class="plan-badge plan-${payment.plan_id?.replace('iq_test_', '') || 'unknown'}">${this.formatPlanName(payment.plan_id)}</span></td>
                <td>${this.formatCurrency(payment.amount)}</td>
                <td><span class="status-badge status-${payment.status}">${payment.status}</span></td>
                <td>${this.formatPaymentMethod(payment.payment_method)}</td>
                <td>${this.formatDate(payment.created_at)}</td>
                <td>
                    <button class="action-btn" onclick="paymentManager.viewPayment(${payment.id})" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    ${payment.status === 'succeeded' ? `
                        <button class="action-btn" onclick="paymentManager.refundPayment(${payment.id})" title="Refund">
                            <i class="fas fa-undo"></i>
                        </button>
                    ` : ''}
                </td>
            `;
            tbody.appendChild(row);
        });

        this.updatePagination(meta);
    }

    extractCustomerEmail(payment) {
        // Try to extract email from metadata or other fields
        if (payment.metadata && payment.metadata.customer_email) {
            return payment.metadata.customer_email;
        }
        if (payment.user && payment.user.email) {
            return payment.user.email;
        }
        return null;
    }

    formatPlanName(planId) {
        const planNames = {
            'iq_test_basic': 'Basic',
            'iq_test_premium': 'Premium',
            'iq_test_enterprise': 'Enterprise'
        };
        return planNames[planId] || 'Unknown';
    }

    formatPaymentMethod(method) {
        const methods = {
            'stripe': 'Stripe',
            'paypal': 'PayPal'
        };
        return methods[method] || method || 'Unknown';
    }

    // Override formatCurrency to handle cents
    formatCurrency(amount) {
        return super.formatCurrency(amount / 100); // Convert cents to dollars
    }

    updatePagination(meta) {
        const paginationInfo = document.getElementById('pagination-info');
        const start = ((meta.page - 1) * meta.per_page) + 1;
        const end = Math.min(start + meta.per_page - 1, meta.total);
        
        paginationInfo.textContent = `Showing ${start} - ${end} of ${meta.total} payments`;

        // Update pagination buttons
        document.getElementById('prev-page').disabled = meta.page <= 1;
        document.getElementById('next-page').disabled = !meta.has_next;

        // Generate page numbers
        this.generatePageNumbers(meta);
    }

    generatePageNumbers(meta) {
        const pageNumbers = document.getElementById('page-numbers');
        pageNumbers.innerHTML = '';

        const maxVisible = 5;
        let startPage = Math.max(1, meta.page - Math.floor(maxVisible / 2));
        let endPage = Math.min(meta.total_pages, startPage + maxVisible - 1);

        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `page-number ${i === meta.page ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => {
                this.currentPage = i;
                this.loadPayments();
            });
            pageNumbers.appendChild(pageBtn);
        }
    }

    async viewPayment(paymentId) {
        try {
            this.showLoading();
            const response = await this.apiCall(`/admin/payments/${paymentId}`);
            this.selectedPayment = response.data;
            this.showPaymentDetails(response.data);
        } catch (error) {
            console.error('Failed to load payment details:', error);
            this.showError('Failed to load payment details');
        } finally {
            this.hideLoading();
        }
    }

    showPaymentDetails(payment) {
        const detailsContainer = document.getElementById('payment-details');
        detailsContainer.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div>
                    <h4>Payment Information</h4>
                    <p><strong>ID:</strong> #${payment.id}</p>
                    <p><strong>Amount:</strong> ${this.formatCurrency(payment.amount)}</p>
                    <p><strong>Currency:</strong> ${payment.currency.toUpperCase()}</p>
                    <p><strong>Status:</strong> <span class="status-badge status-${payment.status}">${payment.status}</span></p>
                    <p><strong>Plan:</strong> <span class="plan-badge plan-${payment.plan_id?.replace('iq_test_', '') || 'unknown'}">${this.formatPlanName(payment.plan_id)}</span></p>
                    <p><strong>Payment Method:</strong> ${this.formatPaymentMethod(payment.payment_method)}</p>
                </div>
                <div>
                    <h4>Customer Information</h4>
                    <p><strong>Email:</strong> ${this.extractCustomerEmail(payment) || 'Not provided'}</p>
                    <p><strong>User ID:</strong> ${payment.user_id || 'Guest'}</p>
                    <p><strong>Created:</strong> ${this.formatDate(payment.created_at)}</p>
                    <p><strong>Updated:</strong> ${this.formatDate(payment.updated_at)}</p>
                </div>
            </div>
            ${payment.description ? `
                <div style="margin-top: 1rem;">
                    <h4>Description</h4>
                    <p>${payment.description}</p>
                </div>
            ` : ''}
            ${payment.stripe_payment_id ? `
                <div style="margin-top: 1rem;">
                    <h4>Provider Information</h4>
                    <p><strong>Stripe Payment ID:</strong> ${payment.stripe_payment_id}</p>
                </div>
            ` : ''}
        `;

        // Show/hide refund button based on payment status
        const refundBtn = document.getElementById('refund-btn');
        refundBtn.style.display = payment.status === 'succeeded' ? 'flex' : 'none';

        document.getElementById('payment-modal').style.display = 'block';
    }

    refundPayment(paymentId) {
        this.viewPayment(paymentId).then(() => {
            if (this.selectedPayment && this.selectedPayment.status === 'succeeded') {
                this.openRefundModal();
            }
        });
    }

    openRefundModal() {
        document.getElementById('payment-modal').style.display = 'none';
        
        // Pre-fill refund amount with full payment amount
        const refundAmountInput = document.getElementById('refund-amount');
        refundAmountInput.value = (this.selectedPayment.amount / 100).toFixed(2);
        refundAmountInput.max = (this.selectedPayment.amount / 100).toFixed(2);
        
        document.getElementById('refund-modal').style.display = 'block';
    }

    async processRefund() {
        const amount = document.getElementById('refund-amount').value;
        const reason = document.getElementById('refund-reason').value;

        if (!reason.trim()) {
            this.showError('Please provide a reason for the refund');
            return;
        }

        try {
            this.showLoading();
            
            const requestData = {
                reason: reason.trim()
            };

            // Only include amount if it's different from full amount
            if (amount && parseFloat(amount) !== (this.selectedPayment.amount / 100)) {
                requestData.amount = Math.round(parseFloat(amount) * 100); // Convert to cents
            }

            await this.apiCall(`/admin/payments/${this.selectedPayment.id}/refund`, {
                method: 'POST',
                body: JSON.stringify(requestData)
            });

            document.getElementById('refund-modal').style.display = 'none';
            this.showSuccess('Refund processed successfully');
            this.loadPayments(); // Refresh the list
            this.loadStats(); // Refresh stats
        } catch (error) {
            console.error('Failed to process refund:', error);
            this.showError('Failed to process refund');
        } finally {
            this.hideLoading();
        }
    }

    applyFilters() {
        this.filters = {};
        
        const statusFilter = document.getElementById('status-filter').value;
        const planFilter = document.getElementById('plan-filter').value;
        const dateFrom = document.getElementById('date-from').value;
        const dateTo = document.getElementById('date-to').value;

        if (statusFilter) this.filters.status = statusFilter;
        if (planFilter) this.filters.plan_id = planFilter;
        if (dateFrom) this.filters.date_from = dateFrom;
        if (dateTo) this.filters.date_to = dateTo;

        this.currentPage = 1;
        this.loadPayments();
    }

    clearFilters() {
        document.getElementById('status-filter').value = '';
        document.getElementById('plan-filter').value = '';
        document.getElementById('date-from').value = '';
        document.getElementById('date-to').value = '';
        
        this.filters = {};
        this.currentPage = 1;
        this.loadPayments();
    }

    async exportPayments() {
        try {
            this.showLoading();
            const params = new URLSearchParams({
                export: 'csv',
                ...this.filters
            });

        const response = await fetch(`${this.apiBase}/admin/payments/export?${params}`, {
            headers: this.getAuthHeaders()
        });
        
        if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `payments-${new Date().toISOString().split('T')[0]}.csv`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
                this.showSuccess('Payments exported successfully');
            } else {
                throw new Error('Export failed');
            }
        } catch (error) {
            console.error('Failed to export payments:', error);
            this.showError('Failed to export payments');
        } finally {
            this.hideLoading();
        }
    }

    // All other utility methods (apiCall, getToken, logout, showLoading, hideLoading, showSuccess, showError)
    // are inherited from AdminCommon class
}

// Initialize payment manager when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.paymentManager = new PaymentManager();
});
