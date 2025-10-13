# IQT - Intelligent Quotient Testing Platform

![IQT Logo](https://via.placeholder.com/400x100/2563eb/ffffff?text=IQT+Platform)

A comprehensive, multilingual IQ testing platform built with **Go**, **PostgreSQL**, and the **Kalenux Template System**. The platform provides scientifically-backed cognitive assessments with detailed reporting, multi-provider payment processing (Stripe, PayPal, Iyzico), and a robust content management system.

## 🌟 Project Overview

**IQT (iqtester.com)** is a full-stack web application that offers professional IQ testing services with multiple test types, real-time analytics, secure payment processing, and comprehensive result reports. The platform supports multiple languages (Turkish, English, Arabic) and provides both public and administrative interfaces with guest checkout capabilities.

### Key Features

- 🧠 **Multiple IQ Test Types**: Practice, Quick, Timed, and Comprehensive assessments
- 🌐 **Multilingual Support**: Turkish, English, and Arabic with RTL support
- 💳 **Multi-Provider Payments**: Stripe, PayPal, and Iyzico (Turkey) integration
- 👤 **Guest Checkout**: No user registration required for test taking
- 📊 **Detailed Analytics**: Comprehensive scoring across four cognitive domains
- 📝 **Blog System**: Content management with dynamic template processing
- 🔐 **Secure Architecture**: JWT authentication, role-based access (admin-only)
- 📧 **Email System**: Automated test results delivery and notifications
- 🎨 **Modern UI**: Responsive design with Kalenux custom template system
- 🐳 **Docker Ready**: Complete containerization with automated deployment
- 🔧 **CI/CD Pipeline**: GitHub Actions with automated testing and deployment

## 🏗️ Project Architecture

<!-- Deployment Status: All nginx configuration issues resolved ✅ -->

```
iqt/
├── 🔧 Configuration & Documentation
│   ├── settings.json              # Kalenux build configuration
│   ├── README.md                  # Main project documentation
│   ├── BLOG_IMPLEMENTATION.md     # Blog system documentation
│   ├── BLOG_TEMPLATE_SYSTEM.md    # Template system guide
│   └── IYZICO_INTEGRATION.md      # Payment integration docs
│
├── 📊 Data & Templates
│   ├── datas/                     # Template data and configurations
│   │   ├── html/                  # Template variables (en.json, ar.json, tr.json)
│   │   ├── css/                   # CSS variable definitions
│   │   ├── js/                    # JavaScript configurations
│   │   ├── api/                   # API configuration data
│   │   ├── php/                   # Legacy PHP configurations
│   │   └── test-questions.json    # IQ test question bank (395 questions)
│   │
├── 🌐 Frontend (site/)
│   ├── html/                      # Kalenux template files
│   ├── css/                       # Stylesheet system
│   │   ├── general/               # Global styles
│   │   ├── main/                  # Main site styles
│   │   ├── lib/                   # Kalenux UI library
│   │   └── users/                 # User panel styles
│   ├── js/                        # JavaScript modules
│   ├── assets/                    # Images and static assets
│   ├── font/                      # Custom fonts
│   ├── icons/                     # Icon assets
│   ├── vendor/                    # Third-party libraries
│   └── payment/                   # Payment processing pages
│
├── ⚙️ Backend API (api/)
│   ├── cmd/server/                # Application entry point
│   ├── config/                    # Configuration management
│   │   ├── config.go              # Main configuration
│   │   └── iyzico.go              # Iyzico payment config
│   ├── database/                  # Database setup and migrations
│   │   ├── init.sql               # Initial database schema
│   │   ├── blog_seed.sql          # Blog data seeding
│   │   └── database.go            # Database connection
│   ├── handlers/                  # HTTP request handlers
│   │   ├── auth.go                # Authentication endpoints
│   │   ├── payment.go             # Payment processing
│   │   ├── iyzico.go              # Iyzico integration
│   │   ├── blog.go                # Blog management
│   │   ├── test.go                # IQ test submission
│   │   ├── admin.go               # Admin panel endpoints
│   │   └── template.go            # Template processing
│   ├── services/                  # Business logic layer
│   │   ├── auth.go                # Authentication service
│   │   ├── payment.go             # Payment processing
│   │   ├── iyzico.go              # Iyzico SDK integration
│   │   ├── blog.go                # Blog service
│   │   ├── test.go                # IQ test evaluation
│   │   ├── report.go              # Report generation
│   │   ├── email.go               # Email service
│   │   └── template.go            # Template processing
│   ├── models/                    # Database models (GORM)
│   │   ├── models.go              # Core models
│   │   └── blog_detail_models.go  # Blog-specific models
│   ├── middleware/                # HTTP middleware
│   │   └── middleware.go          # Auth, CORS, rate limiting
│   ├── templates/                 # Go HTML templates
│   │   └── template_manager.go    # Template management
│   ├── scripts/                   # Deployment and utility scripts
│   │   ├── deploy-ubuntu.sh       # Ubuntu deployment
│   │   ├── deploy-docker.sh       # Docker deployment
│   │   ├── ssl-certificate-manager.sh # SSL management
│   │   └── health-check.sh        # System monitoring
│   └── _manual_tests/             # Manual testing utilities
│       ├── main-tests/            # Core functionality tests
│       └── routes-tests/          # API route tests
│
└── 📦 Storage & Temporary
    └── store/
        ├── temp/                  # Temporary files
        └── times/                 # Timing data
```

## 🚀 Technology Stack

### Backend
- **Language**: Go 1.24.5
- **Framework**: Gin HTTP framework
- **Database**: PostgreSQL 15+ with GORM ORM
- **Authentication**: JWT tokens (admin-only operations)
- **Payment**: Stripe, PayPal, and Iyzico APIs
- **Email**: SMTP with GoMail
- **Caching**: Redis for session management
- **Containerization**: Docker with automated deployment

### Frontend
- **Template Engine**: Kalenux Custom System + Go Templates
- **Styling**: Custom CSS framework with multi-language support
- **JavaScript**: Vanilla JS with modular architecture
- **Build System**: Kalenux Compiler (Rust-based)
- **Assets**: Optimized images, fonts, and icons
- **Multilingual**: Variable-based translation system

### Infrastructure & DevOps
- **Deployment**: Docker containers with docker-compose
- **CI/CD**: GitHub Actions with automated testing
- **Reverse Proxy**: Nginx configuration
- **SSL**: Automated certificate management
- **Monitoring**: Health checks and system monitoring scripts
- **Database**: PostgreSQL with automated backups

## 📁 Detailed Directory Structure

### `/api/` - Backend Application

```
api/
├── cmd/server/              # Application entry point (main.go)
├── config/                  # Configuration management
│   ├── config.go           # Main configuration loader
│   └── iyzico.go           # Iyzico payment configuration
├── database/               # Database setup and migrations
│   ├── init.sql           # Initial database schema with sample data
│   ├── blog_seed.sql      # Blog system data seeding
│   └── database.go        # Database connection and setup
├── handlers/               # HTTP request handlers
│   ├── auth.go            # Authentication endpoints (admin-only)
│   ├── payment.go         # Payment processing (Stripe, PayPal)
│   ├── iyzico.go          # Iyzico payment integration (Turkey)
│   ├── blog.go            # Blog management (public + admin)
│   ├── test.go            # IQ test submission and results
│   ├── admin.go           # Admin panel endpoints
│   └── template.go        # Kalenux template processing
├── middleware/             # HTTP middleware
│   └── middleware.go      # Auth, CORS, rate limiting, security
├── models/                 # Database models (GORM)
│   ├── models.go          # Core models (User, Payment, TestResult)
│   └── blog_detail_models.go # Blog-specific models
├── services/              # Business logic layer
│   ├── auth.go            # Authentication and JWT services
│   ├── payment.go         # Multi-provider payment processing
│   ├── iyzico.go          # Iyzico SDK integration
│   ├── iyzico_mock.go     # Iyzico testing utilities
│   ├── blog.go            # Blog management services
│   ├── test.go            # IQ test evaluation engine
│   ├── report.go          # Test report generation
│   ├── email.go           # Email service
│   ├── email_templates.go # Email template management
│   ├── mailer.go          # Email delivery service
│   └── template.go        # Template processing service
├── templates/             # Go HTML templates
│   └── template_manager.go # Template management system
├── scripts/               # Deployment and utility scripts
│   ├── deploy-ubuntu.sh   # Ubuntu server deployment
│   ├── deploy-docker.sh   # Docker deployment
│   ├── deploy-ssl-fix.sh  # SSL certificate fixes
│   ├── ssl-certificate-manager.sh # SSL automation
│   ├── ssl-renew.sh       # SSL renewal automation
│   ├── health-check.sh    # System health monitoring
│   ├── setup.sh           # Initial setup script
│   └── verify-deployment.sh # Deployment verification
├── _manual_tests/         # Manual testing utilities
│   ├── main-tests/        # Core functionality tests
│   │   ├── simple_server.go # Test server
│   │   ├── test_api.go    # API testing utilities
│   │   ├── test_email.go  # Email testing
│   │   └── test_components.go # Component testing
│   └── routes-tests/      # API route testing
├── docker-compose.yml     # Multi-container orchestration
├── Dockerfile            # Container configuration
├── nginx.conf            # Reverse proxy configuration
└── go.mod/go.sum         # Go dependency management
```
### `/site/` - Frontend Application

```
site/
├── html/                      # Kalenux template files
│   ├── main/                  # Main site templates
│   └── users/                 # User panel templates
├── css/                       # Comprehensive styling system
│   ├── general/               # Global styles and variables
│   ├── main/                  # Main site styles
│   │   └── pages/             # Page-specific styles
│   ├── lib/                   # Kalenux UI component library
│   │   └── kalenux/           # Core UI components
│   └── users/                 # User panel styles
├── js/                        # JavaScript modules
│   ├── main/                  # Main site JavaScript
│   │   ├── pages/             # Page-specific scripts
│   │   └── general/           # Shared functionality
│   └── lib/                   # JavaScript libraries
├── assets/                    # Static assets
├── font/                      # Custom fonts
├── icons/                     # Icon assets
├── img/                       # Images
├── svgs/                      # SVG graphics
├── vendor/                    # Third-party libraries
├── payment/                   # Payment processing pages
├── templates/                 # Template components
├── static_templates/          # Static template files
├── database/                  # Database setup files
│   ├── kalenuxer_setup_begin.sql
│   ├── kalenuxer_setup_info.sql
│   └── data_reset.sql
├── ar/                        # Arabic language files
│   ├── articles/              # Arabic articles
│   └── templates/             # Arabic templates
├── en/                        # English language files
│   ├── articles/              # English articles
│   └── templates/             # English templates
├── tr/                        # Turkish language files
├── payment-iyzico.html        # Iyzico payment page
├── test-results.html          # Test results display
└── BLOG_MARKDOWN_GUIDE.md     # Blog content guide
```

### `/datas/` - Configuration Data

```
datas/
├── html/                      # Template variables by language
│   ├── en.json                # English template variables
│   ├── en_clean.json          # Clean English variables
│   ├── ar.json                # Arabic template variables
│   ├── tr.json                # Turkish template variables
│   └── general.json           # Shared template variables
├── css/                       # CSS variable definitions per language
│   ├── en.json                # English CSS variables
│   ├── ar.json                # Arabic CSS variables (RTL support)
│   ├── tr.json                # Turkish CSS variables
│   ├── ch.json                # Chinese CSS variables
│   ├── de.json                # German CSS variables
│   ├── ru.json                # Russian CSS variables
│   └── general.json           # Global CSS variables
├── js/                        # JavaScript configurations by language
│   ├── en.json                # English JS config
│   ├── ar.json                # Arabic JS config
│   ├── tr.json                # Turkish JS config
│   └── general.json           # Global JS configuration
├── php/                       # Legacy PHP configurations
│   └── general.json           # PHP general config
├── api/                       # API configuration data
│   └── general.json           # API general settings
├── test-questions.json        # IQ test question database (395 questions)
├── html.json                  # HTML processing config
├── options.json               # Build options configuration
└── templates.json             # Template system configuration
```

## 🔧 Core Systems

### 1. Kalenux Template System

The **Kalenux Template System** is a custom templating engine that provides:

- **Variable Substitution**: `{variable_name}` syntax
- **Multilingual Support**: Language-specific variable files
- **Component System**: Reusable template components
- **Build Process**: Compiles templates for production

**Example Template Usage:**
```html
<!-- home.kalenux.html -->
<h1>{page_title}</h1>
<p>{welcome_message}</p>
<button>{start_test_button}</button>
```

**Variable Definition (en.json):**
```json
{
  "home": {
    "page_title": "Professional IQ Testing",
    "welcome_message": "Discover your cognitive abilities",
    "start_test_button": "Start Test"
  }
}
```

### 2. IQ Testing Engine

The platform provides multiple test types with 395+ questions across four cognitive domains:

#### **Test Types:**
- **Practice Test**: Unlimited attempts, learning mode with explanations
- **Quick Test**: 15-minute rapid assessment
- **Timed Test**: Comprehensive evaluation with per-question time limits
- **Full Assessment**: Complete cognitive evaluation across all domains

#### **Cognitive Domains (from test-questions.json):**
- **Logical Reasoning**: Pattern recognition, sequential thinking, analogies
- **Spatial Intelligence**: Visual-spatial problem solving, 3D reasoning, mental rotation
- **Verbal Comprehension**: Language skills, vocabulary, reading comprehension  
- **Working Memory**: Short-term memory, processing speed, mental manipulation

#### **Scoring System:**
- Real-time answer processing with domain-specific scoring
- Percentile calculations based on demographic data
- Detailed performance analytics and cognitive profiling
- Strength and weakness identification
- Personalized recommendations based on results

#### **Test Flow:**
```
User Selection → Test Configuration → Question Presentation → 
Answer Collection → Score Calculation → Result Generation → 
Payment Processing → Report Delivery → Email Notification
```

### 3. Payment System

Integrated payment processing with multiple providers for global reach:

#### **Supported Providers:**
- **Stripe**: Credit/debit cards, digital wallets (global)
- **PayPal**: PayPal accounts and cards (global)
- **Iyzico**: Turkish payment provider with local banking integration

#### **Payment Flow:**
```
Test Completion → Payment Requirement → Provider Selection → 
Payment Processing → Webhook Verification → Result Unlock → 
Report Generation → Email Delivery
```

#### **Security Features:**
- PCI DSS compliance across all providers
- Webhook signature verification for all payment events
- Secure payment intent creation with client secrets
- Automatic refund handling and dispute management
- Guest checkout with secure session management
- Encrypted sensitive data storage

#### **Iyzico Integration (Turkey-specific):**
- Full Turkish banking integration
- Local currency support (TRY)
- Installment payment options
- 3D Secure authentication
- Turkish regulatory compliance

### 4. Blog System

Modern content management with both Kalenux and Go templates:

#### **Features:**
- Dynamic content rendering with template processing
- Multi-language article generation
- SEO optimization with meta tags and structured data
- Category and tag management
- Author profiles and article relationships
- Related article suggestions
- Reading time calculations
- View tracking and analytics

#### **Template Conversion System:**
The system supports both Kalenux and Go templates with automatic conversion:

```html
<!-- Kalenux Template (source) -->
<h1>{article_title}</h1>
<p>{article_excerpt}</p>
<div class="meta">{article_author} - {article_date}</div>

<!-- Go Template (compiled) -->
<h1>{{.ArticleTitle}}</h1>
<p>{{.ArticleExcerpt}}</p>
<div class="meta">{{.ArticleAuthor}} - {{.ArticleDate}}</div>
```

#### **Blog Management:**
- Admin-only content creation and editing
- Draft/published status management
- Slug generation and management
- Multi-language content support
- Automated article generation from templates
- Blog seeding with sample content

### 5. User Management

Comprehensive user system with role-based access:

#### **User Roles:**
- **Admin**: Full system access, blog management, payment oversight
- **Guest**: Test taking without registration (session-based)
- **No User Registration Required**: Guests can take tests using email and session ID

#### **Features:**
- JWT authentication for admin operations only
- Session-based management for guest test takers
- Secure password hashing with bcrypt (admin accounts)
- API key management for external integrations
- Test history tracking by email for guests
- Admin dashboard with comprehensive analytics

#### **Security:**
- Role-based access control (RBAC) for admin functions
- Guest checkout eliminates user data collection concerns
- Session timeout and security headers
- Rate limiting per IP and endpoint
- Input validation and sanitization

## 🗄️ Database Schema

### Core Models

#### **User Model**
```go
type User struct {
    ID        uint      `json:"id"`
    Email     string    `json:"email"`
    Name      string    `json:"name"`
    Password  string    `json:"-"`
    Role      string    `json:"role"`
    Active    bool      `json:"active"`
    CreatedAt time.Time `json:"created_at"`
    UpdatedAt time.Time `json:"updated_at"`
}
```

#### **TestResult Model**
```go
type TestResult struct {
    ID            uint      `json:"id"`
    UserID        *uint     `json:"user_id"`
    SessionID     string    `json:"session_id"`
    Email         string    `json:"email"`
    TestType      string    `json:"test_type"`
    Language      string    `json:"language"`
    OverallScore  int       `json:"overall_score"`
    Percentile    int       `json:"percentile"`
    Accuracy      float64   `json:"accuracy"`
    DomainScores  string    `json:"domain_scores"`
    PaymentStatus string    `json:"payment_status"`
    CreatedAt     time.Time `json:"created_at"`
}
```

#### **BlogPost Model**
```go
type BlogPost struct {
    ID            uint      `json:"id"`
    Title         string    `json:"title"`
    Slug          string    `json:"slug"`
    Content       string    `json:"content"`
    Category      string    `json:"category"`
    Tags          string    `json:"tags"`
    Views         int64     `json:"views"`
    ReadingTime   int       `json:"reading_time"`
    AuthorID      uint      `json:"author_id"`
    PublishedAt   *time.Time `json:"published_at"`
    CreatedAt     time.Time `json:"created_at"`
}
```

## 🚀 Getting Started

### Prerequisites

- **Go 1.24.5+**
- **PostgreSQL 15+**
- **Redis 6+** (optional, for caching)
- **Docker & Docker Compose** (recommended for deployment)
- **Node.js 16+** (for asset compilation, if needed)

### Installation

1. **Clone the Repository**
```bash
git clone https://github.com/emirbaycan/whats-your-iq.git
cd whats-your-iq
```

2. **Backend Setup**
```bash
cd api
cp .env.example .env
# Edit .env with your database and API credentials
```

3. **Database Setup**
```bash
# Create PostgreSQL database
createdb iqt_platform

# Run initial setup (creates tables and sample data)
psql -d iqt_platform -f database/init.sql
```

4. **Install Go Dependencies**
```bash
cd api
go mod download
go mod tidy
```

5. **Environment Configuration**

6. **Production Deployment**
```bash
# For production deployment on Ubuntu servers:
# See DEPLOYMENT_SIMPLE.md for the complete one-script deployment process

cd api
cp .env.example .env.production
# Edit .env.production with your production settings
chmod +x scripts/deploy-ubuntu.sh
./scripts/deploy-ubuntu.sh
```
```bash
# Configure your .env file with:
# Database connection details
# Payment provider API keys (Stripe, PayPal, Iyzico)
# SMTP email settings
# JWT secret key
```

6. **Build & Run**
```bash
# Development mode
go run cmd/server/main.go

# Or using Docker
docker-compose up -d
```

### Docker Deployment (Recommended)

```bash
# Build and start all services
cd api
docker-compose up -d

# View logs
docker-compose logs -f api

# Stop services
docker-compose down
```

## 🔧 Configuration

### Environment Variables

```bash
# Server Configuration
PORT=8080
ENV=development
HOST=localhost

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=iqt_platform
DB_USER=your_user
DB_PASSWORD=your_password
DB_SSLMODE=disable

# Redis Configuration (optional)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRATION=24h

# Stripe Payment Provider
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# PayPal Payment Provider
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_MODE=sandbox

# Iyzico Payment Provider (Turkey)
IYZICO_API_KEY=sandbox-your_api_key_here
IYZICO_SECRET_KEY=sandbox-your_secret_key_here
IYZICO_SANDBOX=true
IYZICO_BASE_URL=https://sandbox-api.iyzipay.com

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
FROM_EMAIL=noreply@iqtester.com
FROM_NAME=IQ Tester Platform

# Security Settings
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW=1h
BCRYPT_COST=12

# Application Settings
APP_DOMAIN=localhost:8080
CORS_ORIGINS=http://localhost:3000,http://localhost:8080
```

### Kalenux Configuration

The `settings.json` file controls the build system and deployment:

```json
{
  "type": "rust_kalenuxer",
  "domain": "iqtester.com",
  "languages": ["tr", "en", "ar"],
  "systems": ["release", "test"],
  "version": 2099,
  "users": ["customer", "admin"],
  "versionizers": [
    {"base": "css", "type": "css"},
    {"base": "js", "type": "js"},
    {"base": "img", "type": "png"},
    {"base": "img", "type": "jpeg"},
    {"base": "img", "type": "webp"}
  ],
  "infos": {
    "ftp": {
      "host": "emirbaycan.com.tr",
      "dirs": {
        "release": {"dir": "/var/www/nuxbrain/release"},
        "test": {"dir": "/var/www/nuxbrain/test"}
      }
    }
  }
}
```

## 📊 API Documentation

### Health & Status Endpoints

```
GET    /health                     # API health check with database status
GET    /api/v1/templates/status    # Template processing status
GET    /api/v1/public/plans        # Available payment plans
GET    /api/v1/public/currencies   # Supported currencies
```

### IQ Test Endpoints (No Authentication Required)

```
POST   /api/v1/tests/submit        # Submit completed IQ test
GET    /api/v1/tests/result/:session_id   # Get test results by session
GET    /api/v1/tests/results/:test_result_id # Get detailed test results
POST   /api/v1/tests/report        # Generate detailed report after payment
GET    /api/v1/tests/reports/:unique_url   # View generated report
```

### Payment Processing Endpoints (No Authentication Required)

```
POST   /api/v1/payments/create     # Create payment intent (Stripe/PayPal)
POST   /api/v1/payments/iyzico     # Create Iyzico payment (Turkey)
GET    /api/v1/payments/:id        # Get payment status
POST   /api/v1/payments/confirm    # Confirm payment
POST   /api/v1/payments/cancel     # Cancel payment
```

### Blog Endpoints (Public)

```
GET    /api/v1/blog/posts          # Get all published blog posts
GET    /api/v1/blog/posts/:slug    # Get specific blog post by slug
GET    /api/v1/blog/categories     # Get blog categories
GET    /api/v1/blog/tags           # Get blog tags
GET    /blog/:slug                 # View blog post page (HTML template)
```

### Webhook Endpoints

```
POST   /api/v1/webhooks/stripe     # Stripe webhook handler
POST   /api/v1/webhooks/paypal     # PayPal webhook handler
POST   /api/v1/webhooks/iyzico     # Iyzico webhook handler
```

### Authentication Endpoints (Admin Only)

```
POST   /api/v1/auth/login          # Admin login
POST   /api/v1/auth/refresh        # Refresh JWT token
POST   /api/v1/auth/logout         # Admin logout
POST   /api/v1/auth/forgot         # Password reset request
POST   /api/v1/auth/reset          # Password reset confirmation
```

### Admin Panel Endpoints (Authentication Required)

```
GET    /api/v1/admin/payments      # List all payments with filtering
GET    /api/v1/admin/analytics     # Payment and test analytics
GET    /api/v1/admin/users         # List users (admin accounts)
PUT    /api/v1/admin/users/:id     # Update user
DELETE /api/v1/admin/users/:id     # Delete user
GET    /api/v1/admin/tests         # List all test results
```

### Admin Blog Management Endpoints (Authentication Required)

```
POST   /api/v1/admin/blog/posts    # Create blog post
GET    /api/v1/admin/blog/posts/:id # Get blog post for editing
PUT    /api/v1/admin/blog/posts/:id # Update blog post
DELETE /api/v1/admin/blog/posts/:id # Delete blog post
POST   /api/v1/admin/blog/generate-article # Generate article from template
POST   /api/v1/admin/blog/generate-multilang # Generate multi-language articles
POST   /api/v1/admin/blog/publish-with-articles/:id # Publish with articles
```

## 🧪 Testing

### Testing Suite Overview

The project includes comprehensive testing across multiple layers:

#### **Manual Testing**
Located in `/api/_manual_tests/` directory:

```bash
# Run API endpoint tests
cd api/_manual_tests/main-tests
go run test_api.go

# Test email functionality
go run test_email.go

# Test payment components
go run test_components.go

# Test simple server functionality
go run simple_server.go
```

#### **Component Testing**
```bash
# Test individual components
cd api/_manual_tests/main-tests
go run test_components_simple.go

# Test Iyzico integration
go run test_simple.go
```

#### **Running Backend Tests**
```bash
cd api

# Run all tests
go test ./...

# Run specific package tests
go test ./services/...
go test ./handlers/...
go test ./models/...

# Run with verbose output
go test -v ./...

# Run with coverage
go test -cover ./...
```

#### **Integration Testing**
```bash
# Database testing with PostgreSQL
DATABASE_URL=postgres://user:pass@localhost:5432/iqt_test go test ./...

# Payment provider testing (requires API keys)
STRIPE_SECRET_KEY=sk_test_... go test ./services -run TestStripe
PAYPAL_CLIENT_ID=test_... go test ./services -run TestPayPal
IYZICO_API_KEY=sandbox-... go test ./services -run TestIyzico
```

### CI/CD Testing

GitHub Actions automatically runs:
- **Unit Tests**: All Go packages with coverage reporting
- **Integration Tests**: Database and payment provider integrations
- **Security Scans**: Vulnerability assessment with gosec
- **Build Tests**: Docker image building and verification
- **Deployment Tests**: End-to-end deployment verification

## 📈 Performance & Monitoring

### Performance Features

- **Database Optimization**: Indexed queries, connection pooling with GORM
- **Caching Strategy**: Redis for session management and frequently accessed data
- **Asset Optimization**: Minified CSS/JS via Kalenux build system
- **Image Optimization**: WebP, JPEG, PNG optimization through versionizers
- **CDN Support**: Static asset delivery optimization ready
- **Connection Pooling**: PostgreSQL connection management
- **Rate Limiting**: Per-IP and per-endpoint protection

### Automated Monitoring

Located in `/api/scripts/` directory:

#### **Health Monitoring System**
```bash
# Automated health checks (runs every 5 minutes in production)
./scripts/health-check.sh

# SSL certificate monitoring and renewal
./scripts/ssl-certificate-manager.sh

# System verification after deployment
./scripts/verify-deployment.sh
```

#### **Health Check Components**
- **API Health**: Endpoint responsiveness and status codes
- **Database Health**: PostgreSQL connection and query performance
- **Cache Health**: Redis connectivity and performance monitoring
- **System Resources**: CPU, memory, disk usage tracking
- **SSL Certificates**: Expiration tracking with auto-renewal
- **Docker Services**: Container status and health monitoring

#### **Logging & Analytics**
- **Structured Logging**: JSON logs with Logrus for better parsing
- **Error Tracking**: Comprehensive error handling and reporting
- **Payment Analytics**: Transaction success rates and failure analysis
- **Test Analytics**: User behavior and completion rates
- **Performance Metrics**: Response time and throughput monitoring

### Deployment Monitoring

```bash
# Automated deployment scripts
./scripts/deploy-ubuntu.sh      # Ubuntu server deployment
./scripts/deploy-docker.sh      # Docker-based deployment
./scripts/deploy-ssl-fix.sh     # SSL issue resolution
```

## 🔒 Security

### Security Measures

- **Authentication**: JWT tokens for admin-only operations
- **Guest Security**: Session-based management without user data collection
- **Authorization**: Role-based access control (RBAC) for admin functions
- **Data Protection**: Encrypted sensitive data storage with bcrypt hashing
- **Input Validation**: Comprehensive request validation and sanitization
- **CORS Configuration**: Properly configured cross-origin policies
- **Rate Limiting**: Per-IP and per-endpoint protection against abuse
- **SQL Injection Prevention**: GORM ORM protection with prepared statements
- **XSS Protection**: Output escaping and Content Security Policy headers
- **HTTPS Enforcement**: SSL/TLS termination in production environments

### Payment Security

- **PCI DSS Compliance**: All payment providers maintain compliance
- **Webhook Security**: Signature verification for all payment events
- **Secure Tokens**: Payment intent creation with client secrets
- **Fraud Prevention**: Built-in fraud detection through payment providers
- **Refund Management**: Secure refund processing and dispute handling
- **3D Secure**: Enhanced authentication for Iyzico payments

### Session Management

- **Guest Sessions**: Secure session handling for non-registered users
- **Session Timeouts**: Configurable session expiration
- **CSRF Protection**: Cross-site request forgery prevention
- **Secure Headers**: Security headers (HSTS, X-Frame-Options, etc.)
- **API Key Management**: Secure API key generation and validation

## 🌐 Internationalization

### Supported Languages

- **English (en)**: Primary language with comprehensive content
- **Turkish (tr)**: Full localization with cultural adaptations
- **Arabic (ar)**: RTL (Right-to-Left) support with proper text flow
- **Additional**: Framework supports Chinese (ch), German (de), Russian (ru)

### Language Implementation

#### **Template Variables**
Each language has dedicated JSON files in `/datas/html/`:
- `en.json` - English template variables
- `tr.json` - Turkish template variables  
- `ar.json` - Arabic template variables with RTL considerations
- `general.json` - Shared variables across languages

#### **CSS Localization**
Language-specific styling in `/datas/css/`:
- `ar.json` - RTL-specific CSS variables and adjustments
- `tr.json` - Turkish-specific styling preferences
- `en.json` - English default styling
- `general.json` - Universal CSS variables

#### **JavaScript Localization**
Language-specific configurations in `/datas/js/`:
- Localized error messages and UI text
- Number formatting and date preferences
- Language-specific validation rules

### Adding New Languages

1. **Create Language Files**:
```bash
# Add template variables
datas/html/{lang}.json

# Add CSS variables
datas/css/{lang}.json

# Add JS configuration
datas/js/{lang}.json
```

2. **Update Configuration**:
```json
// settings.json
{
  "languages": ["tr", "en", "ar", "new_lang"]
}
```

3. **RTL Support**:
For right-to-left languages, add RTL-specific CSS variables and ensure proper text direction handling.

4. **Rebuild Templates**:
```bash
# Rebuild with new language support
kalenux build
```

## 📝 Contributing

### Development Workflow

1. **Fork** the repository on GitHub
2. **Clone** your fork locally
```bash
git clone https://github.com/your-username/whats-your-iq.git
cd whats-your-iq
```
3. **Create** a feature branch
```bash
git checkout -b feature/amazing-feature
```
4. **Develop** your changes following the code standards
5. **Test** your changes thoroughly
```bash
cd api
go test ./...
```
6. **Commit** your changes with clear messages
```bash
git commit -m 'feat: add amazing feature'
```
7. **Push** to your branch
```bash
git push origin feature/amazing-feature
```
8. **Open** a Pull Request with detailed description

### Code Standards

- **Go**: Follow `gofmt`, `golint`, and `go vet` standards
- **JavaScript**: Use ESLint configuration for consistency
- **CSS**: Follow BEM methodology for class naming
- **Templates**: Maintain Kalenux syntax consistency
- **Documentation**: Update README and inline comments

### Commit Message Convention

Use conventional commit format for better changelog generation:

```
feat: add new IQ test type
fix: resolve payment webhook issue
docs: update API documentation
style: improve CSS organization
refactor: optimize database queries
test: add integration tests for auth
chore: update dependencies
```

### Testing Requirements

Before submitting a PR:
- All existing tests must pass
- New features should include appropriate tests
- Manual testing for payment flows
- Cross-browser testing for frontend changes

### Development Environment

1. **Backend Development**: Go 1.24.5+, PostgreSQL, Redis
2. **Frontend Development**: Knowledge of Kalenux template system
3. **Testing**: Familiarity with Go testing framework
4. **Payment Integration**: Understanding of webhook systems

## 📚 Documentation

### Project Documentation

- **Main README**: `/README.md` - This comprehensive project overview
- **API Documentation**: `/api/README.md` - Detailed backend API documentation
- **Blog Implementation**: `/BLOG_IMPLEMENTATION.md` - Blog system architecture
- **Blog Templates**: `/BLOG_TEMPLATE_SYSTEM.md` - Template system guide
- **Payment Integration**: `/IYZICO_INTEGRATION.md` - Iyzico payment setup
- **Blog Panel**: `/BLOG_PANEL_SUMMARY.md` - Admin panel overview
- **Markdown Guide**: `/site/BLOG_MARKDOWN_GUIDE.md` - Content writing guide

### Development Documentation

Located in `/api/` directory:
- **Email Setup**: `EMAIL_SERVER_SETUP.md` - Email system configuration
- **GitHub Secrets**: `GITHUB_SECRETS_SETUP.md` - CI/CD secrets management
- **Server Setup**: `SERVER_SETUP_GUIDE.md` - Production server setup

### API Reference

- **Health Endpoints**: System status and monitoring
- **Test Endpoints**: IQ test submission and results
- **Payment Endpoints**: Multi-provider payment processing
- **Blog Endpoints**: Content management and display
- **Admin Endpoints**: Administrative functions
- **Webhook Endpoints**: Payment provider integrations

### Template Documentation

- **Kalenux System**: Custom template engine with variable substitution
- **Multi-language Support**: Variable-based translation system
- **Build Process**: Automated compilation and optimization
- **Component Library**: Reusable UI components

### Deployment Guides

- **Docker Deployment**: Container-based deployment with docker-compose
- **Ubuntu Server**: Manual server setup and configuration
- **SSL Management**: Automated certificate management
- **CI/CD Pipeline**: GitHub Actions workflow configuration

## 🐛 Troubleshooting

### Common Issues

#### **Database Connection Issues**
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Verify connection manually
psql -h localhost -U your_user -d iqt_platform

# Check if database exists
psql -l | grep iqt_platform
```

#### **Template Compilation Issues**
```bash
# Verify Kalenux configuration
cat settings.json

# Check template syntax
kalenux validate

# Rebuild templates from scratch
kalenux clean && kalenux build
```

#### **Payment Provider Issues**
```bash
# Test Stripe webhook endpoint
curl -X POST http://localhost:8080/api/v1/webhooks/stripe \
  -H "Content-Type: application/json" \
  -d '{"test": true}'

# Test Iyzico configuration
cd api/_manual_tests/main-tests
go run test_simple.go

# Verify payment provider keys
echo $STRIPE_SECRET_KEY | head -c 20
```

#### **Docker Deployment Issues**
```bash
# Check container status
docker-compose ps

# View container logs
docker-compose logs api
docker-compose logs postgres

# Restart services
docker-compose restart

# Rebuild containers
docker-compose down && docker-compose up --build -d
```

#### **Docker Installation Conflicts (Ubuntu/Debian)**
```bash
# Remove conflicting containerd packages
sudo apt-get remove -y containerd runc docker.io docker-doc docker-compose podman-docker
sudo apt-get autoremove -y
sudo apt-get autoclean

# Install Docker using official convenience script
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
rm get-docker.sh

# Add user to docker group and restart
sudo usermod -aG docker $USER
newgrp docker

# Verify installation
docker --version
docker compose version
```

#### **Email Delivery Issues**
```bash
# Test email configuration
cd api/_manual_tests/main-tests
go run test_email.go

# Check SMTP settings
telnet smtp.gmail.com 587
```

#### **SSL Certificate Issues**
```bash
# Check certificate status
./api/scripts/ssl-certificate-manager.sh status

# Renew certificates
./api/scripts/ssl-renew.sh

# Verify certificate
openssl x509 -in /path/to/cert.pem -text -noout
```

### Performance Issues

#### **Database Performance**
```sql
-- Check slow queries
SELECT query, mean_time, calls 
FROM pg_stat_statements 
ORDER BY mean_time DESC 
LIMIT 10;

-- Analyze table statistics
ANALYZE test_results;
ANALYZE payments;
```

#### **Memory Usage**
```bash
# Check Go memory usage
go tool pprof http://localhost:8080/debug/pprof/heap

# Monitor system resources
htop
free -h
df -h
```

### Getting Help

1. **Check Logs**: Always start with application and system logs
2. **Review Documentation**: Check relevant documentation files
3. **Test Components**: Use manual tests in `_manual_tests/` directory
4. **GitHub Issues**: Search existing issues or create new ones
5. **Health Checks**: Run automated health check scripts

### Quick Fixes for Common Deployment Issues

#### **Docker Installation Conflicts during Deployment**
If you encounter `containerd.io : Conflicts: containerd` during deployment:

```bash
# The deployment script now handles this automatically, but if manual intervention is needed:

# Stop the failing deployment
Ctrl+C

# Remove conflicting packages manually
sudo apt-get remove -y containerd runc docker.io docker-doc docker-compose podman-docker
sudo apt-get autoremove -y

# Run the Docker installation script directly
cd api
sudo ./scripts/install-docker.sh

# Add user to docker group and restart session
sudo usermod -aG docker $USER
newgrp docker

# Retry the deployment
./scripts/deploy-ubuntu.sh
```

#### **Deployment Script Permissions**
```bash
# Make scripts executable
chmod +x api/scripts/*.sh

# Fix ownership if needed
sudo chown -R $USER:$USER api/scripts/
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team & Repository

- **Repository Owner**: [emirbaycan](https://github.com/emirbaycan)
- **Repository**: [whats-your-iq](https://github.com/emirbaycan/whats-your-iq)
- **Current Branch**: main
- **Backend Development**: Go API with multi-provider payment integration
- **Frontend Development**: Kalenux template system with multi-language support
- **DevOps**: Docker containerization with automated CI/CD
- **QA**: Comprehensive testing suite with manual and automated tests

## 🔗 Links

- **Production**: [https://iqtester.com](https://iqtester.com)
- **Repository**: [https://github.com/emirbaycan/whats-your-iq](https://github.com/emirbaycan/whats-your-iq)
- **Issue Tracker**: [GitHub Issues](https://github.com/emirbaycan/whats-your-iq/issues)
- **Documentation**: Available in repository `/docs/` and individual README files

## 🔄 Recent Updates

- ✅ **Multi-Provider Payments**: Added Stripe, PayPal, and Iyzico integration
- ✅ **Guest Checkout**: Implemented registration-free test taking
- ✅ **CI/CD Pipeline**: GitHub Actions with automated testing and deployment
- ✅ **Blog System**: Dynamic content management with template processing
- ✅ **Comprehensive Testing**: Manual tests and automated testing suite
- ✅ **Security Enhancements**: Admin-only authentication, rate limiting, input validation
- ✅ **Monitoring**: Health checks and automated deployment scripts
- ✅ **Multi-language Support**: Turkish, English, Arabic with RTL support

---

**Built with ❤️ using Go, PostgreSQL, and the Kalenux Template System**

*For technical support or questions, please check the documentation or create an issue in the GitHub repository.*