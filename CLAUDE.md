# Explorian Safari - Real Website Development Project

## Project Overview
Building a professional, production-ready safari booking website for Explorian Safaris, inspired by tanzaniaspecialist.de, with real-time review integration and payment processing.

**Current Status:** Template exists (index.html) - Starting from scratch with proper architecture
**Last Updated:** 2026-01-11
**Target Launch:** TBD

---

## 🎯 Client-Specific Requirements (Updated 2026-01-11)

### Critical Business Logic:

1. **Request Travel Offer / Quote System** ⭐ PRIORITY
   - Prominent "Request Travel Offer" button (like tanzaniaspecialist.de)
   - Custom quote request form with detailed trip preferences
   - Admin receives detailed inquiry with customer requirements
   - Customers receive acknowledgment email

2. **Smart Booking Flow Based on Travel Date** ⭐ CRITICAL
   - **If trip is < 7 days away:**
     - Customer submits inquiry
     - Automatic email: "We will reach out to you shortly to arrange your booking"
     - No payment processing (too urgent for online booking)
     - Admin gets high-priority notification

   - **If trip is ≥ 7 days away:**
     - Full booking flow activated
     - Multi-step booking process
     - Payment gateway integration
     - Automated confirmation

3. **Content Management Philosophy** ⭐ ESSENTIAL
   - Admin dashboard must allow client to edit EVERYTHING possible
   - No programmer needed for routine updates
   - Editable content includes:
     - Package details (name, description, price, images)
     - Itineraries
     - Inclusions/exclusions
     - Pricing and currency
     - Home page content
     - About page content
     - FAQ answers
     - Gallery images
     - Testimonials (manual ones)
     - Contact information
     - Social media links
   - WYSIWYG editor for rich text content
   - Drag-and-drop image management

4. **Features NOT Needed:**
   - ❌ Blog/Vlog section (removed)
   - ❌ Live chat support (WhatsApp is sufficient)
   - ❌ Interactive maps (Google Maps API too expensive)
   - ❌ Custom itinerary builder (quote system handles this)

5. **Features TO INCLUDE:**
   - ✅ Fun FAQ section with useful info (weather, visa, best time to visit, packing tips)
   - ✅ Embedded YouTube safari videos (client's videos or curated)
   - ✅ WhatsApp floating button (primary communication)
   - ✅ Request Quote/Travel Offer form (main CTA)
   - ✅ Simple contact form for general inquiries
   - ✅ Static maps (images/embeds, not interactive API)

---

## Key Requirements Summary

### 1. Reference Site Analysis (tanzaniaspecialist.de)
**Design Elements:**
- Modern, sophisticated color palette (browns, greens, yellows, sand tones)
- Responsive grid system (1-4 columns)
- Interactive hover effects with backdrop blur and overlays
- Gradient overlays and SVG masking for visual depth
- Language selector (multi-language support)
- Social media integration across multiple platforms

**Layout Structure:**
- Fixed header with sticky navigation
- Card-based content presentation
- Responsive breakpoints: mobile (640px), tablet (768px), desktop (1024px+)
- Animated content overlays on grid items
- Custom typography with decorative serif fonts

**Interactive Features:**
- Hover-triggered content overlays with transform animations
- Smooth transitions and backdrop effects
- Focus management for accessibility
- Dynamic form elements with custom styling

### 2. Critical Integrations

#### A. Review System (Real-time)
**TripAdvisor Integration:**
- Display live reviews from TripAdvisor
- Show overall rating and recent testimonials
- Automatic updates when new reviews are posted
- API: TripAdvisor Content API or widget embedding

**Safari Bookings Integration:**
- Pull verified reviews from SafariBookings.com
- Display operator ratings and badges
- Show review count and average rating
- Real-time synchronization

**Requirements:**
- Aggregate reviews from both platforms
- Display star ratings, review text, author info
- Show review date and source
- Responsive review cards/carousel
- Schema markup for SEO

#### B. Payment Integration
**Pesapal API:**
- Secure payment processing for Tanzania
- Support for multiple payment methods (cards, mobile money, etc.)
- Transaction tracking and confirmation
- Payment receipt generation
- Webhook handling for payment status updates

**Features Needed:**
- Deposit payment option (30-50%)
- Full payment processing
- Multi-currency support (USD, EUR, TZS)
- Payment confirmation emails
- Admin dashboard for transaction management

### 3. Website Features Needed

#### Core Pages:
1. **Home** - Hero, featured packages, trust indicators, reviews
2. **Safari Packages** - Grid/list view with filtering
3. **Mountain Trekking** - Kilimanjaro routes, Meru, etc.
4. **Beach Holidays** - Zanzibar packages
5. **Day Trips** - Cultural tours, waterfalls, hot springs
6. **About Us** - Company info, team, certifications
7. **Contact** - Form, map, office details
8. **Booking System** - Multi-step booking flow
9. **Payment Gateway** - Pesapal integration
10. **Admin Dashboard** - Booking management, content updates

#### Essential Features:
- ✅ **Request Travel Offer System** (primary CTA - like tanzaniaspecialist.de)
- ✅ **Smart Booking Logic** (7-day rule: inquiry vs full booking)
- ✅ **Multi-language support** (English, German, French at minimum)
- ✅ **SEO optimization** (meta tags, structured data, sitemap)
- ✅ **Mobile-first responsive design**
- ✅ **Performance optimization** (lazy loading, image optimization)
- ✅ **WhatsApp integration** (floating button, direct messaging - PRIMARY support)
- ✅ **Email notifications** (booking confirmations, inquiries, quote requests)
- ✅ **Full Content Management** (client edits everything without programmer)
- ✅ **Search functionality** (find safaris by destination, duration, price)
- ✅ **Filter & sort** (price range, trip type, duration)
- ✅ **Photo galleries** (lightbox, professional safari images)
- ✅ **Fun FAQ section** (weather info, visa info, packing tips, best time to visit)
- ✅ **Social proof** (customer count, years in business, certifications)
- ✅ **Trust badges** (licensing, partner logos)
- ✅ **Newsletter signup**
- ✅ **Analytics integration** (Google Analytics, conversion tracking)
- ✅ **YouTube video integration** (embedded safari videos)
- ✅ **Static map images** (no expensive Google Maps API)

#### Features REMOVED (Not Needed):
- ❌ Blog/Vlog section
- ❌ Live chat support (WhatsApp is sufficient)
- ❌ Interactive maps (too expensive)
- ❌ Custom itinerary builder (quote system handles this)
- ❌ Customer login portal (not needed at launch)
- ❌ Real-time availability calendar (manual process is fine)

---

## Technology Stack Recommendations

### Frontend:
- **Framework:** Next.js 14+ (React with SSR/SSG for SEO)
- **Styling:** Tailwind CSS (matches reference site)
- **UI Components:** Headless UI or Shadcn/ui
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod validation
- **State Management:** Zustand or React Context
- **Image Optimization:** Next.js Image component

### Backend:
- **Framework:** Next.js API Routes or Node.js/Express
- **Database:** PostgreSQL (structured data) or Supabase
- **ORM:** Prisma
- **Authentication:** NextAuth.js (for admin/customer portal)
- **File Storage:** Cloudinary or AWS S3 (images)
- **Email Service:** SendGrid or Resend

### Integrations:
- **Payment:** Pesapal SDK/API
- **Reviews:** TripAdvisor API + Safari Bookings scraping/API
- **Analytics:** Google Analytics 4
- **Email:** SendGrid or Resend
- **Images:** Cloudinary (image hosting and optimization)
- **YouTube:** Embed API (for safari videos)
- **WhatsApp:** Direct link integration (no API needed)

### Deployment:
- **Hosting:** Vercel (Next.js optimized) or Netlify
- **Domain:** exploriansafaris.com (configure DNS)
- **SSL:** Automatic with hosting provider
- **CDN:** Cloudflare or Vercel Edge Network

---

## Development Phases

### Phase 1: Foundation & Setup ✅ COMPLETED (2026-01-11)
**Duration:** Completed in 1 day
**Goal:** Establish project architecture and development environment

**Tasks:**
1. ✅ Create project documentation (CLAUDE.md)
2. ✅ Initialize Next.js 16.1.1 with TypeScript
3. ✅ Configure Tailwind CSS 4.x with custom safari theme
4. ✅ Set up ESLint configuration
5. ✅ Create project folder structure (app/, components/, lib/, types/, public/)
6. ✅ Set up environment variables template (.env.example)
7. ✅ Create design system (safari theme colors defined in CSS)
8. ✅ Install core dependencies (React 19, Next.js 16, Tailwind 4)
9. ✅ Set up .gitignore and README.md
10. ✅ Development server running successfully

**Deliverables:**
- ✅ Clean project structure created
- ✅ Design tokens defined (primary, secondary, accent, earth, sand, savanna)
- ✅ Tailwind CSS 4.x configured with @theme directive
- ✅ Development environment ready (localhost:3000)
- ✅ TypeScript, ESLint, PostCSS configured
- ✅ Environment variables template created

**Location:** `explorian-safari-website/` folder

---

### Phase 2: Core UI Development ⏳ CURRENT PHASE
**Duration:** Weeks 2-3
**Goal:** Build main pages and navigation with modern, spacious design

**Tasks:**
1. ✅ Header/Navigation component (desktop + mobile)
2. ✅ Footer component with links and social media
3. ✅ Home page layout and hero section
4. ✅ WhatsApp floating button
5. ✅ Responsive design (mobile/tablet/desktop)
6. ✅ Button spacing fixed (generous padding)
7. ⬜ Safari packages grid with real package cards
8. ⬜ Package detail page template
9. ⬜ "Why Choose Us" section on home page
10. ⬜ Destination gallery section
11. ⬜ Testimonials carousel section (placeholder for Phase 3)
12. ⬜ Mountain trekking pages
13. ⬜ Beach holidays pages
14. ⬜ Day trips pages
15. ⬜ About page
16. ⬜ Contact page with form
17. ⬜ FAQ section (expandable accordions)
18. ⬜ Image optimization and lazy loading

**Deliverables:**
- ✅ Professional header, footer, WhatsApp button
- ✅ Modern home page with proper spacing
- ⬜ Safari package cards with images and pricing
- ⬜ All main pages functional
- ⬜ Responsive across all devices
- ⬜ Professional visual design matching reference site

---

### Phase 3: Review Integration
**Duration:** Week 4
**Goal:** Real-time review display from TripAdvisor and Safari Bookings

**Tasks:**
1. ⬜ Research TripAdvisor API/widget options
2. ⬜ Set up TripAdvisor developer account
3. ⬜ Implement TripAdvisor review fetching
4. ⬜ Research Safari Bookings integration method
5. ⬜ Implement Safari Bookings review fetching
6. ⬜ Create unified review data model
7. ⬜ Build review display components
8. ⬜ Implement review carousel/grid
9. ⬜ Add review schema markup for SEO
10. ⬜ Set up automatic review refresh (cron job)
11. ⬜ Handle API errors gracefully
12. ⬜ Cache reviews for performance

**Deliverables:**
- Live reviews displaying on website
- Reviews update automatically
- Professional review presentation
- Fast loading times

---

### Phase 4: Booking & Quote Request System
**Duration:** Weeks 5-6
**Goal:** Smart booking flow with 7-day logic + Request Travel Offer system

**Tasks:**
1. ⬜ Design "Request Travel Offer" form (primary CTA)
2. ⬜ Build quote request form with detailed preferences
3. ⬜ Implement smart date logic (check if < 7 days or ≥ 7 days)
4. ⬜ Build package selection interface
5. ⬜ Create date picker for travel dates
6. ⬜ Guest information form
7. ⬜ Special requirements/customization options
8. ⬜ Booking summary page
9. ⬜ Form validation and error handling
10. ⬜ **IF < 7 days:** Show inquiry-only flow
11. ⬜ **IF < 7 days:** Send "we will reach out" email to customer
12. ⬜ **IF < 7 days:** Send urgent notification to admin
13. ⬜ **IF ≥ 7 days:** Enable full booking + payment flow
14. ⬜ Save inquiries/bookings to database
15. ⬜ Generate booking/inquiry reference number
16. ⬜ Send appropriate confirmation emails
17. ⬜ Admin notification system for all inquiries

**Deliverables:**
- "Request Travel Offer" form working
- Smart 7-day logic implemented
- Two separate flows (inquiry vs booking)
- Email notifications customized per flow
- User-friendly multi-step process

---

### Phase 5: Payment Integration (Pesapal)
**Duration:** Week 7
**Goal:** Secure payment processing with Pesapal

**Tasks:**
1. ⬜ Create Pesapal merchant account
2. ⬜ Study Pesapal API documentation
3. ⬜ Install Pesapal SDK/libraries
4. ⬜ Set up sandbox environment for testing
5. ⬜ Implement payment initiation
6. ⬜ Build payment redirect flow
7. ⬜ Handle payment callback/webhook
8. ⬜ Update booking status on payment
9. ⬜ Generate payment receipts
10. ⬜ Implement deposit payment option
11. ⬜ Add multi-currency support
12. ⬜ Test payment scenarios (success, failure, cancellation)
13. ⬜ Implement payment security measures
14. ⬜ Create payment history for users
15. ⬜ Add refund handling logic

**Deliverables:**
- Working payment gateway
- Secure transaction processing
- Payment confirmations sent
- Admin can track payments
- Tested thoroughly in sandbox

---

### Phase 6: Admin Dashboard (Full Content Management)
**Duration:** Weeks 8-9
**Goal:** Complete CMS - Client can edit EVERYTHING without programmer

**Tasks:**
1. ⬜ Design admin authentication system
2. ⬜ Build admin login page
3. ⬜ Create admin dashboard layout with analytics overview
4. ⬜ **Package Management (Full CRUD):**
   - ⬜ Add/Edit/Delete safari packages
   - ⬜ WYSIWYG editor for descriptions
   - ⬜ Manage itineraries (day-by-day)
   - ⬜ Edit inclusions/exclusions lists
   - ⬜ Update pricing and currency
   - ⬜ Upload multiple images per package
   - ⬜ Drag-and-drop image reordering
   - ⬜ Set featured/active status
5. ⬜ **Home Page Editor:**
   - ⬜ Edit hero section text
   - ⬜ Edit trust indicators
   - ⬜ Manage featured packages
   - ⬜ Update statistics (years, customers)
6. ⬜ **FAQ Management:**
   - ⬜ Add/Edit/Delete FAQ items
   - ⬜ Reorder FAQs
   - ⬜ Rich text answers
7. ⬜ **About Page Editor**
8. ⬜ **Gallery Management:**
   - ⬜ Upload images in bulk
   - ⬜ Organize by category
   - ⬜ Add captions
9. ⬜ **Manual Testimonials Management**
10. ⬜ **Contact Info Editor** (address, phone, email, social media links)
11. ⬜ **YouTube Video Manager** (add/remove embedded videos)
12. ⬜ **Bookings & Inquiries Management:**
    - ⬜ View all bookings/inquiries
    - ⬜ Filter by status, date
    - ⬜ View customer details
    - ⬜ Update booking status
    - ⬜ Add internal notes
13. ⬜ **Payment Tracking Dashboard**
14. ⬜ **Email Template Editor** (customize automated emails)
15. ⬜ **Multi-language Content Management** (translate content)
16. ⬜ **Analytics Dashboard** (Google Analytics integration)
17. ⬜ **User Management** (add admin users, roles)

**Deliverables:**
- Fully functional admin CMS
- Client can update ALL content independently
- WYSIWYG editors for rich content
- Drag-and-drop image management
- No programmer needed for routine updates
- Secure authentication
- Booking/payment tracking
- Analytics overview

---

### Phase 7: Additional Features & Content
**Duration:** Week 10
**Goal:** Polish and enhance functionality

**Tasks:**
1. ⬜ Multi-language implementation (i18n) - English, German, French
2. ⬜ Search functionality (packages by keyword, destination)
3. ⬜ Filter and sort packages (price, duration, type)
4. ⬜ Photo galleries with lightbox effect
5. ⬜ Fun FAQ section with expandable items:
   - ⬜ Weather information by season
   - ⬜ Visa requirements by country
   - ⬜ Best time to visit for different activities
   - ⬜ Packing tips for safari/mountain/beach
   - ⬜ Health requirements (vaccines, malaria)
   - ⬜ Currency and payment info
   - ⬜ Tipping etiquette
6. ⬜ Newsletter signup with email service integration
7. ⬜ Customer testimonials section (manual + API reviews)
8. ⬜ YouTube video integration (safari footage embeds)
9. ⬜ Static map images (Tanzania, parks, routes)
10. ⬜ Social media feed widgets (Instagram, Facebook)
11. ⬜ Trust badges and certifications display
12. ⬜ Customer counter (years in business, happy customers)

**Deliverables:**
- Enhanced user experience
- Informative FAQ section
- Video content integrated
- Multi-language support
- Better engagement features

---

### Phase 8: SEO & Performance Optimization
**Duration:** Week 10
**Goal:** Maximize visibility and speed

**Tasks:**
1. ⬜ Meta tags optimization
2. ⬜ Open Graph tags for social sharing
3. ⬜ Structured data markup (JSON-LD)
4. ⬜ XML sitemap generation
5. ⬜ Robots.txt configuration
6. ⬜ Google Search Console setup
7. ⬜ Google Analytics integration
8. ⬜ Performance audit (Lighthouse)
9. ⬜ Image optimization (WebP, lazy loading)
10. ⬜ Code splitting and bundling
11. ⬜ Caching strategy
12. ⬜ CDN setup
13. ⬜ Mobile performance optimization
14. ⬜ Accessibility audit (WCAG)

**Deliverables:**
- Excellent SEO scores
- Fast page load times
- High Lighthouse scores
- Search engine ready

---

### Phase 9: Testing & QA
**Duration:** Week 11
**Goal:** Ensure everything works perfectly

**Tasks:**
1. ⬜ Cross-browser testing (Chrome, Safari, Firefox, Edge)
2. ⬜ Mobile device testing (iOS, Android)
3. ⬜ Tablet testing
4. ⬜ Form submission testing
5. ⬜ Payment flow testing (all scenarios)
6. ⬜ Email delivery testing
7. ⬜ Review integration testing
8. ⬜ Navigation testing
9. ⬜ Link verification
10. ⬜ Security testing
11. ⬜ Load testing
12. ⬜ Error handling testing
13. ⬜ User acceptance testing (UAT)
14. ⬜ Bug fixing

**Deliverables:**
- Comprehensive test report
- All critical bugs fixed
- Site ready for production
- UAT approval

---

### Phase 10: Deployment & Launch
**Duration:** Week 12
**Goal:** Go live!

**Tasks:**
1. ⬜ Set up production environment
2. ⬜ Configure production database
3. ⬜ Set up production payment gateway
4. ⬜ Configure domain and DNS
5. ⬜ SSL certificate installation
6. ⬜ Final content review
7. ⬜ Deploy to production
8. ⬜ Post-launch testing
9. ⬜ Monitor error logs
10. ⬜ Set up backups
11. ⬜ Create user documentation
12. ⬜ Admin training
13. ⬜ Launch announcement
14. ⬜ Submit to search engines

**Deliverables:**
- Live website at exploriansafaris.com
- All systems operational
- Admin trained
- Monitoring in place
- Ready for customers

---

## Critical APIs & Services Setup Required

### 1. TripAdvisor
- **What needed:** API key or widget embed code
- **Where to get:** https://www.tripadvisor.com/developers
- **Purpose:** Display live reviews

### 2. Safari Bookings
- **What needed:** Reviews feed or API access
- **Where to get:** Contact SafariBookings.com partner support
- **Purpose:** Display verified safari reviews

### 3. Pesapal
- **What needed:** Merchant account, API keys
- **Where to get:** https://www.pesapal.com/
- **Purpose:** Payment processing

### 4. Email Service (SendGrid/Resend)
- **What needed:** API key, verified sender domain
- **Where to get:** https://sendgrid.com/ or https://resend.com/
- **Purpose:** Booking confirmations, notifications

### 5. Google Analytics
- **What needed:** Analytics tracking ID (GA4)
- **Where to get:** https://analytics.google.com/
- **Purpose:** Website analytics and conversion tracking

### 6. Cloudinary (Image Hosting)
- **What needed:** Account and API credentials
- **Where to get:** https://cloudinary.com/
- **Purpose:** Image storage and optimization

---

## Design System

### Color Palette (Inspired by Tanzania Specialist)
```css
/* Primary Colors */
--color-primary: #2c5f2d;        /* Forest Green */
--color-secondary: #ff6b35;      /* Safari Orange */
--color-accent: #ffd23f;         /* Sunset Yellow */

/* Neutral Colors */
--color-dark: #1a1a1a;           /* Near Black */
--color-gray-800: #2d2d2d;
--color-gray-600: #666666;
--color-gray-400: #999999;
--color-gray-200: #e0e0e0;
--color-light: #f8f9fa;          /* Off White */
--color-white: #ffffff;

/* Semantic Colors */
--color-success: #10b981;
--color-warning: #f59e0b;
--color-error: #ef4444;
--color-info: #3b82f6;

/* Safari Theme Colors */
--color-earth: #8b6f47;          /* Earth Brown */
--color-sand: #e8d5b5;           /* Sand */
--color-savanna: #c9a876;        /* Savanna Gold */
```

### Typography
```css
/* Font Families */
--font-primary: 'Segoe UI', system-ui, sans-serif;
--font-heading: 'Georgia', serif;
--font-decorative: Custom decorative serif (like reference site)

/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
```

### Spacing
```css
/* Use Tailwind's spacing scale */
4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px, 96px
```

### Breakpoints
```css
/* Responsive Breakpoints */
--screen-sm: 640px;   /* Mobile */
--screen-md: 768px;   /* Tablet */
--screen-lg: 1024px;  /* Desktop */
--screen-xl: 1280px;  /* Large Desktop */
--screen-2xl: 1536px; /* Extra Large */
```

---

## Database Schema (Preliminary)

### Tables Needed:

**packages**
- id, name, slug, type (safari/mountain/beach/daytrip)
- description, highlights, inclusions, exclusions
- duration_days, price_from, currency
- images[], max_group_size, difficulty_level
- active, featured, created_at, updated_at

**bookings**
- id, package_id, reference_number
- customer_name, email, phone, country
- travel_date, number_of_guests, guest_details[]
- total_amount, deposit_amount, currency
- special_requests, status (pending/confirmed/paid/cancelled)
- created_at, updated_at

**payments**
- id, booking_id, transaction_id (Pesapal)
- amount, currency, payment_method, status
- pesapal_merchant_reference, pesapal_tracking_id
- paid_at, created_at

**reviews** (cached)
- id, source (tripadvisor/safaribookings)
- author_name, rating, review_text, review_date
- external_id, last_synced, active

**inquiries**
- id, name, email, phone, message
- trip_interest, travel_dates, status
- created_at, responded_at

**users** (admin)
- id, email, password_hash, name, role
- created_at, last_login

---

## File Structure (Next.js)

```
explorian-safari/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx           # Home page
│   │   ├── safaris/
│   │   ├── mountains/
│   │   ├── beaches/
│   │   ├── day-trips/
│   │   ├── about/
│   │   ├── contact/
│   │   ├── booking/
│   │   ├── admin/
│   │   └── api/               # API routes
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   ├── layout/            # Header, Footer, etc.
│   │   ├── booking/           # Booking flow components
│   │   ├── reviews/           # Review components
│   │   └── admin/             # Admin components
│   ├── lib/
│   │   ├── db/                # Database utilities
│   │   ├── api/               # API integrations
│   │   ├── utils/             # Helper functions
│   │   └── validations/       # Zod schemas
│   ├── styles/
│   │   └── globals.css
│   └── types/
│       └── index.ts
├── public/
│   ├── images/
│   └── icons/
├── prisma/
│   └── schema.prisma
├── .env.local
├── .env.example
├── tailwind.config.js
├── next.config.js
├── tsconfig.json
├── package.json
├── CLAUDE.md                  # This file
└── README.md
```

---

## Environment Variables Template

```bash
# Database
DATABASE_URL="postgresql://..."

# Pesapal
PESAPAL_CONSUMER_KEY=""
PESAPAL_CONSUMER_SECRET=""
PESAPAL_CALLBACK_URL=""
PESAPAL_ENV="sandbox" # or "production"

# TripAdvisor
TRIPADVISOR_API_KEY=""
TRIPADVISOR_LOCATION_ID=""

# Safari Bookings
SAFARIBOOKINGS_OPERATOR_ID=""

# Email
SENDGRID_API_KEY=""
EMAIL_FROM="info@exploriansafaris.com"

# Google Analytics
NEXT_PUBLIC_GA_ID=""

# Cloudinary
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

# NextAuth (Admin)
NEXTAUTH_SECRET=""
NEXTAUTH_URL=""

# App
NEXT_PUBLIC_SITE_URL="https://exploriansafaris.com"
```

---

## Notes & Decisions Log

**2026-01-11 - Initial Planning:**
- Project documentation created
- Reference site analyzed (tanzaniaspecialist.de)
- Technology stack decided: Next.js + Tailwind CSS + PostgreSQL
- 10 phases defined with clear deliverables
- Current template (index.html) to be replaced with proper React architecture
- Key integrations identified: Pesapal, TripAdvisor, Safari Bookings

**2026-01-11 - Client Requirements Update:**
- ✅ **Added "Request Travel Offer" system** - Primary CTA (like tanzaniaspecialist.de)
- ✅ **Implemented 7-day booking logic:**
  - < 7 days = Inquiry only with "we'll reach out" message
  - ≥ 7 days = Full booking flow with payment
- ✅ **Enhanced Admin Dashboard requirements:**
  - Client must be able to edit ALL content without programmer
  - WYSIWYG editors for rich content
  - Drag-and-drop image management
  - Full package management (CRUD)
  - FAQ management
  - Manual testimonials
  - YouTube video manager
  - Email template editor
- ✅ **Removed unnecessary features:**
  - Blog/Vlog section (not needed)
  - Live chat (WhatsApp is sufficient)
  - Interactive Google Maps (too expensive - use static images)
  - Custom itinerary builder (quote system handles this)
  - Customer portal (not needed at launch)
- ✅ **Added features:**
  - Fun FAQ section (weather, visa, packing tips, etc.)
  - YouTube video embeds
  - Static map images
  - WhatsApp as primary support channel
- ✅ **Google Analytics** - Will be added in Phase 8 (free tier)

**2026-01-11 - Phase 1 Completed:**
- ✅ Next.js 16.1.1 with React 19 and TypeScript initialized
- ✅ Tailwind CSS 4.x configured with @tailwindcss/postcss plugin
- ✅ Custom safari theme colors defined using @theme directive
- ✅ Project structure created (app/, components/, lib/, types/, public/)
- ✅ Environment variables template (.env.example) created
- ✅ ESLint, TypeScript, PostCSS configured
- ✅ Development server running successfully at localhost:3000
- ✅ .gitignore and README.md added
- 🎯 Ready to begin Phase 2: Core UI Development

---

## Success Metrics

**Technical:**
- Lighthouse score > 90 (Performance, Accessibility, SEO)
- Page load time < 3 seconds
- Mobile responsive on all devices
- Zero critical security vulnerabilities
- 99.9% uptime

**Business:**
- Conversion rate: Inquiry form submissions
- Payment completion rate
- Review integration working 24/7
- Admin can manage content without developer help
- Multi-language support increases international reach

---

## Next Steps

1. ✅ Complete this documentation
2. Get client approval on phases and timeline
3. Gather all API credentials needed
4. Begin Phase 1: Project setup
5. Set up weekly progress reviews

---

## Client Information

**Company:** Explorian Safaris
**Location:** Moshi, Kilimanjaro, Tanzania
**Contact:** info@exploriansafaris.com
**Phone:** +255 719 245 540
**Partners:** Safari Bookings, SafariDeal.com, Safariopedia

**Current Online Presence:**
- Instagram: @explorian_safaris
- Facebook: /exploriansafaris
- Safari Bookings: Listed
- Current template: index.html (basic)

---

*This document is a living guide. Update as decisions are made and progress happens.*
