# Explorian Safari - Real Website Development Project

## Project Overview
Building a professional, production-ready safari booking website for Explorian Safaris, inspired by tanzaniaspecialist.de, with real-time review integration and payment processing.

**Current Status:** Phase 6 Complete - Full Admin Dashboard Built
**Last Updated:** 2026-01-20
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

### Phase 2: Core UI Development ✅ COMPLETED (2026-01-12)
**Duration:** Completed in 1 day
**Goal:** Build home page with modern, spacious design inspired by advanced-website.html

**Tasks:**
1. ✅ Header/Navigation component (desktop + mobile)
2. ✅ Footer component with links and social media (earth-brown color #3d2717)
3. ✅ Home page layout and hero section (full-height with animations)
4. ✅ WhatsApp floating button
5. ✅ Responsive design (mobile/tablet/desktop)
6. ✅ **Design Integration:** Extracted CSS from advanced-website.html
7. ✅ **Typography:** Added Google Fonts (Playfair Display + Outfit)
8. ✅ **Color Palette:** Safari colors (forest green #2a4d2f, sunset orange #e85d04, golden yellow #faa307, sand beige #f4f1de, earth brown #3d2717)
9. ✅ **Hero Section:** Animated fadeInUp, elegant Playfair Display titles, proper spacing
10. ✅ **Trust Bar:** 4 trust indicators (rating, licensed, experience, satisfaction)
11. ✅ **Safari Packages Grid:** 3 featured packages with proper card design
12. ✅ **Package Cards:** Orange badges, category labels, pricing, checkmark features, hover animations
13. ✅ **Feature Preview:** 3 cards (Safaris, Mountains, Beaches) with icon placeholders
14. ✅ **Why Choose Us:** 8 benefit cards with icons and descriptions
15. ✅ **FAQ Section:** 5 expandable accordions with Playfair Display headers
16. ✅ **CTA Section:** Green gradient section with orange button
17. ✅ **Section Labels:** Orange uppercase labels ("OUR EXPERIENCES", "DISCOVER TANZANIA", etc.)
18. ✅ **Spacing:** Generous padding using clamp() (4rem-8rem), proper gaps
19. ✅ **Seamless Sections:** No gaps between CTA and Footer
20. ✅ **Content:** All content specific to Explorian Safaris (not copied from templates)

**Deliverables:**
- ✅ Professional header, footer, WhatsApp button
- ✅ Modern home page with proper spacing (open, inviting design)
- ✅ Safari package cards with pricing, categories, and features
- ✅ Why Choose Us section with 8 benefits
- ✅ Fun FAQ section with 5 questions
- ✅ All components responsive and modern
- ✅ Professional visual design inspired by advanced-website.html
- ✅ Safari-themed color palette throughout
- ✅ Elegant typography with Playfair Display and Outfit fonts
- ✅ Smooth animations and hover effects

**Key Achievement:**
Successfully integrated the design quality of advanced-website.html while keeping all content specific to Explorian Safaris. The site now has that "open, spread nicely, inviting" feel with proper safari colors (greens, oranges, browns) instead of generic greys.

---

### Phase 3: Review Integration ✅ COMPLETED (2026-01-17)
**Duration:** Completed
**Goal:** Real-time review display from TripAdvisor and Safari Bookings

**Tasks:**
1. ✅ Research TripAdvisor API/widget options (public profile scraping)
2. ✅ Set up TripAdvisor listing URL
3. ✅ Implement TripAdvisor review fetching (cheerio scraping)
4. ✅ Research Safari Bookings integration method (public API)
5. ✅ Implement Safari Bookings review fetching
6. ✅ Create unified review data model (Prisma schema)
7. ✅ Build review display components (`components/Reviews.tsx`)
8. ✅ Implement review carousel/grid on home page
9. ⬜ Add review schema markup for SEO (deferred to Phase 8)
10. ✅ Set up automatic review refresh (API endpoint for manual/cron sync)
11. ✅ Handle API errors gracefully
12. ✅ Cache reviews in database for performance

**Deliverables:**
- ✅ Live reviews displaying on website (8 reviews synced from Safari Bookings)
- ✅ Reviews can be synced via `/api/reviews/sync` endpoint
- ✅ Professional review presentation with star ratings
- ✅ Fast loading times (database cached)
- ✅ ReviewLinks component with actual TripAdvisor/Safari Bookings URLs

---

### Phase 4: Booking & Quote Request System ✅ COMPLETED (2026-01-20)
**Duration:** Completed
**Goal:** Smart booking flow with 7-day logic + Request Travel Offer system

**Tasks:**
1. ✅ Design "Request Travel Offer" form (primary CTA) - `/request-quote` page
2. ✅ Build quote request form with detailed preferences (`RequestQuoteForm.tsx`)
3. ✅ Implement smart date logic (check if < 7 days or ≥ 7 days)
4. ✅ Build package selection interface (dropdown with grouped categories)
5. ✅ Create date picker for travel dates (start/end date pickers + flexible dates checkbox)
6. ✅ Guest information form (name, email, phone, country, guests)
7. ✅ Special requirements/customization options (textarea field)
8. ✅ Booking summary page (shown after submission)
9. ✅ Form validation and error handling (Zod validation)
10. ✅ **IF < 7 days:** Show inquiry-only flow (status: INQUIRY)
11. ✅ **IF < 7 days:** Send "we will reach out" email to customer
12. ✅ **IF < 7 days:** Send urgent notification to admin
13. ✅ **IF ≥ 7 days:** Enable full booking + payment flow (status: PENDING → payment)
14. ✅ Save inquiries/bookings to database (Prisma MySQL)
15. ✅ Generate booking/inquiry reference number (EXP-XXXXXXXX format)
16. ✅ Send appropriate confirmation emails
17. ✅ Admin notification system for all inquiries

**New Components Created:**
- `components/forms/RequestQuoteForm.tsx` - Quote request with date pickers
- `components/forms/ContactForm.tsx` - Simple contact form
- `app/request-quote/page.tsx` - Request quote page
- `app/book/page.tsx` - Direct booking page with package selection
- `app/contact/page.tsx` - Contact page

**API Endpoints:**
- `/api/inquiry` - Handle contact form and quote requests
- `/api/booking` - Handle direct bookings with 7-day logic

**Deliverables:**
- ✅ "Request Travel Offer" form working at `/request-quote`
- ✅ Smart 7-day logic implemented in `/api/booking`
- ✅ Two separate flows (INQUIRY vs PENDING booking)
- ✅ Email notifications customized per flow
- ✅ User-friendly booking page with package pre-selection
- ✅ "Book Now" buttons on home page link to `/book?package=xxx`

---

### Phase 5: Payment Integration (Pesapal) ✅ COMPLETED (2026-01-20)
**Duration:** Completed
**Goal:** Secure payment processing with Pesapal (+ simulated mode for testing)

**Tasks:**
1. ⬜ Create Pesapal merchant account (pending client credentials)
2. ✅ Study Pesapal API documentation (v3 API implemented)
3. ✅ Install Pesapal SDK/libraries (custom implementation in `lib/pesapal.ts`)
4. ✅ Set up sandbox environment for testing (simulated payment mode)
5. ✅ Implement payment initiation (`/api/payment/initiate`)
6. ✅ Build payment redirect flow (`/payment/simulate` for testing)
7. ✅ Handle payment callback/webhook (`/api/payment/callback`, `/api/payment/ipn`)
8. ✅ Update booking status on payment (PENDING → PAID)
9. ✅ Generate payment receipts (email confirmation with payment details)
10. ⬜ Implement deposit payment option (backend ready, UI pending)
11. ✅ Add multi-currency support (USD, EUR, TZS supported)
12. ✅ Test payment scenarios (success, failure, pending all work in simulated mode)
13. ✅ Implement payment security measures (signature verification for IPN)
14. ✅ Create payment history for users (Payment model in database)
15. ⬜ Add refund handling logic (pending Pesapal credentials)

**New Files Created:**
- `lib/pesapal.ts` - Full Pesapal API v3 integration with simulated mode
- `app/api/payment/initiate/route.ts` - Start payment for booking
- `app/api/payment/callback/route.ts` - Handle Pesapal redirects
- `app/api/payment/ipn/route.ts` - Instant Payment Notifications
- `app/api/payment/status/route.ts` - Check payment status
- `app/api/payment/simulate-complete/route.ts` - Complete simulated payments
- `app/payment/simulate/page.tsx` - Simulated payment UI for testing
- `app/payment/success/page.tsx` - Payment success page
- `app/payment/failed/page.tsx` - Payment failed page
- `app/payment/pending/page.tsx` - Payment pending page
- `app/payment/error/page.tsx` - Payment error page

**Key Features:**
- **Simulated Payment Mode**: When Pesapal credentials not configured, uses `/payment/simulate` for testing
- **Real Pesapal Mode**: Full v3 API integration ready, just needs credentials
- **Auto-detection**: System automatically switches between simulated and real mode
- **Complete Flow**: Booking → Payment Initiate → Payment Page → Callback → Status Update → Email

**Deliverables:**
- ✅ Working payment gateway (simulated mode functional)
- ✅ Secure transaction processing (ready for Pesapal when credentials provided)
- ✅ Payment confirmations sent via email
- ✅ Admin can track payments in database
- ✅ Tested in simulated mode (success, failure, pending scenarios)

---

### Phase 6: Admin Dashboard (Full Content Management) ✅ COMPLETED (2026-01-20)
**Duration:** Completed
**Goal:** Complete CMS - Client can edit EVERYTHING without programmer

**Tasks:**
1. ✅ Design admin authentication system (NextAuth.js v5 with Credentials)
2. ✅ Build admin login page (`/admin/login`)
3. ✅ Create admin dashboard layout with analytics overview (`/admin`)
4. ✅ **Package Management (Full CRUD):**
   - ✅ Add/Edit/Delete safari packages (`/admin/packages`)
   - ✅ Text editor for descriptions (textarea-based)
   - ✅ Manage itineraries (day-by-day) - itinerary field added
   - ✅ Edit inclusions/exclusions lists
   - ✅ Update pricing and currency
   - ⬜ Upload multiple images per package (deferred - needs Cloudinary)
   - ⬜ Drag-and-drop image reordering (deferred - needs Cloudinary)
   - ✅ Set featured/active status
5. ⬜ **Home Page Editor:** (deferred to Phase 7 - needs content model)
   - ⬜ Edit hero section text
   - ⬜ Edit trust indicators
   - ⬜ Manage featured packages
   - ⬜ Update statistics (years, customers)
6. ✅ **FAQ Management:** (`/admin/faq`)
   - ✅ Add/Edit/Delete FAQ items
   - ✅ Reorder FAQs (order field)
   - ✅ Text answers with category support
7. ⬜ **About Page Editor** (deferred to Phase 7)
8. ⬜ **Gallery Management:** (deferred - needs Cloudinary)
   - ⬜ Upload images in bulk
   - ⬜ Organize by category
   - ⬜ Add captions
9. ✅ **Manual Testimonials Management** (`/admin/reviews` - add manual reviews)
10. ✅ **Contact Info Editor** (`/admin/settings` - address, phone, email, social media links)
11. ⬜ **YouTube Video Manager** (deferred to Phase 7)
12. ✅ **Bookings & Inquiries Management:** (`/admin/bookings`, `/admin/inquiries`)
    - ✅ View all bookings/inquiries
    - ✅ Filter by status, date
    - ✅ View customer details
    - ✅ Update booking status
    - ⬜ Add internal notes (deferred)
13. ✅ **Payment Tracking Dashboard** (`/admin/payments`)
14. ⬜ **Email Template Editor** (deferred - complex feature)
15. ⬜ **Multi-language Content Management** (deferred to Phase 7)
16. ⬜ **Analytics Dashboard** (deferred to Phase 8 - needs GA setup)
17. ⬜ **User Management** (seed endpoint created, full UI deferred)

**New Files Created:**
- `lib/auth.ts` - NextAuth.js v5 configuration
- `app/api/auth/[...nextauth]/route.ts` - Auth API routes
- `app/api/admin/seed/route.ts` - Create first admin user
- `app/admin/login/page.tsx` - Admin login page
- `app/admin/layout.tsx` - Protected admin layout with sidebar
- `app/admin/page.tsx` - Dashboard with stats
- `app/admin/bookings/page.tsx` - Bookings list
- `app/admin/bookings/[id]/page.tsx` - Booking detail
- `app/admin/inquiries/page.tsx` - Inquiries list
- `app/admin/payments/page.tsx` - Payments dashboard
- `app/admin/packages/page.tsx` - Packages list
- `app/admin/packages/new/page.tsx` - Create package
- `app/admin/packages/[id]/page.tsx` - Edit package
- `app/admin/faq/page.tsx` - FAQ management
- `app/admin/reviews/page.tsx` - Reviews management
- `app/admin/settings/page.tsx` - Site settings
- `components/admin/AdminSidebar.tsx` - Navigation sidebar
- `components/admin/PackageForm.tsx` - Package CRUD form
- `components/admin/BookingsFilter.tsx` - Booking filters
- `components/admin/BookingActions.tsx` - Status update dropdown
- All corresponding API routes for CRUD operations

**Database Schema Updates:**
- Added `Faq` model for FAQ management
- Added `Setting` model for site configuration (key-value store)
- Added `itinerary` field to Package model
- Updated `Review` model to support manual reviews (source as string, optional external_id)

**Deliverables:**
- ✅ Fully functional admin CMS at `/admin`
- ✅ Client can manage packages, FAQs, reviews, settings
- ✅ Booking and inquiry management
- ✅ Payment tracking
- ✅ Secure authentication with NextAuth.js
- ⬜ Image upload (needs Cloudinary credentials)
- ⬜ Home page content editing (deferred)

---

### Phase 7: Additional Features & Content ⏳ IN PROGRESS (2026-01-13)
**Duration:** Week 10
**Goal:** Polish and enhance functionality

**Tasks:**
1. ⬜ Multi-language implementation (i18n) - English, German, French
2. ⬜ Search functionality (packages by keyword, destination)
3. ⬜ Filter and sort packages (price, duration, type)
4. ✅ Photo galleries with lightbox effect
5. ✅ Fun FAQ section with expandable items:
   - ✅ Weather information by season
   - ✅ Visa requirements by country
   - ✅ Best time to visit for different activities
   - ✅ Packing tips for safari/mountain/beach
   - ⬜ Health requirements (vaccines, malaria)
   - ✅ Currency and payment info
   - ⬜ Tipping etiquette
6. ⬜ Newsletter signup with email service integration
7. ✅ Customer testimonials section (manual + API reviews)
8. ✅ YouTube video integration (safari footage embeds)
9. ⬜ Static map images (Tanzania, parks, routes)
10. ⬜ Social media feed widgets (Instagram, Facebook)
11. ✅ Trust badges and certifications display (trust bar on home page)
12. ✅ Customer counter (years in business, happy customers) (trust bar)

**Completed So Far:**
- ✅ Photo Gallery with Lightbox (`components/GalleryLightbox.tsx`)
  - Filter by category (All, Wildlife, Mountains, Beaches, Culture)
  - Lightbox modal with keyboard navigation (arrow keys, escape)
  - 8 curated safari images
  - Smooth hover effects and transitions
- ✅ Video Integration Section (3 demo videos on home page)
  - Supports YouTube video embeds (paste URL)
  - Will support local video uploads (MP4, WebM, MOV) in Phase 6
  - Admin dashboard will allow both YouTube URLs and direct file uploads
  - No YouTube account required if using local uploads
  - Mount Kilimanjaro Trek
  - Zanzibar Beach Paradise
  - Responsive embedded players
- ✅ Testimonials Section
  - 3 featured customer reviews
  - Links to TripAdvisor and Safari Bookings
  - Professional testimonial cards with ratings
- ✅ FAQ Section (5 questions already on home page)
  - Best time to visit
  - Visa requirements
  - Package inclusions
  - Safety information
  - Customization options
  - Weather information
  - Packing tips
  - Safari costs

**Deliverables:**
- ✅ Enhanced user experience with gallery and videos
- ✅ Informative FAQ section (5 questions)
- ✅ Video content integrated (3 YouTube videos)
- ⬜ Multi-language support (pending)
- ✅ Better engagement features (testimonials, gallery)

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

**2026-01-12 - Phase 2 Completed:**
- ✅ **Design System Integration:**
  - Extracted and adapted CSS from advanced-website.html
  - Added Google Fonts: Playfair Display (headings) + Outfit (body)
  - Implemented safari color palette: greens, oranges, browns, sand
  - Added CSS animations (fadeInUp, fadeIn, slideUp)
  - Used CSS clamp() for responsive spacing (4rem-8rem)

- ✅ **Home Page Sections Built:**
  - Full-height hero section with animations and Playfair Display titles
  - Trust bar with 4 indicators (rating, licensed, years, satisfaction)
  - Safari packages grid with 3 featured packages
  - Feature preview cards (Safaris, Mountains, Beaches)
  - Why Choose Us section with 8 benefit cards
  - FAQ section with 5 expandable questions
  - CTA section with gradient background
  - Footer with earth-brown color (#3d2717)

- ✅ **Design Quality Achieved:**
  - "Open, spread nicely, inviting" feel (client requirement met)
  - Safari-themed colors throughout (no more grey)
  - Professional typography with serif headings
  - Smooth hover effects and transitions
  - Proper spacing between sections
  - Seamless connection between CTA and footer
  - Orange section labels for visual hierarchy
  - Package cards with badges, categories, pricing, features

- ✅ **All Content:**
  - Specific to Explorian Safaris (not template content)
  - Real package information (Serengeti, Kilimanjaro, Zanzibar)
  - Company benefits and FAQ answers
  - Contact information and social links

- 🎯 **Next Up:** Phase 3 (Review Integration) or continue with remaining pages (Package detail, About, Contact, etc.)

**2026-01-15 - Backend Setup Started (Phase 3-4 Foundation):**
- ✅ **Credentials Gathered:**
  - cPanel hosting with Node.js support confirmed
  - MySQL database created: `explorians_safari`
  - Database user created: `explorians_explorians`
  - Email account configured: `info@exploriansafaris.com`
  - SMTP details: `mail.exploriansafaris.com:465`

- ✅ **Environment Variables Setup:**
  - Created `.env.local` with secure credentials (NEVER committed to Git)
  - Updated `.env.example` template for MySQL and cPanel SMTP
  - Verified `.gitignore` includes `.env*.local`
  - All passwords stored securely in environment variables

- ✅ **Database Schema Created:**
  - Prisma ORM installed and configured for MySQL
  - Complete schema defined with 6 models:
    - **Package**: Safari packages (safaris, mountains, beaches, day trips)
    - **Booking**: Customer bookings with 7-day logic support
    - **Payment**: Pesapal payment transactions
    - **Review**: Cached reviews from TripAdvisor & Safari Bookings
    - **Inquiry**: Contact form and quote requests
    - **User**: Admin users for dashboard
  - Generated Prisma Client successfully
  - Schema ready to deploy to cPanel database

- ✅ **Email Service Created:**
  - Nodemailer configured with cPanel SMTP
  - Email functions created:
    - `sendInquiryConfirmation()` - Customer inquiry confirmation
    - `sendInquiryNotification()` - Admin notification for inquiries
    - `sendUrgentBookingInquiry()` - < 7 days booking (inquiry only)
    - `sendBookingConfirmation()` - ≥ 7 days booking (full booking)
    - `sendBookingNotificationToAdmin()` - Admin booking alerts
  - Professional HTML email templates with safari branding

- ✅ **API Routes Started:**
  - Created `/api/inquiry` endpoint for contact/quote forms
  - Validates input, saves to database, sends emails
  - Error handling and email delivery retry logic
  - Ready for frontend integration

- ✅ **Review Integration Complete (2026-01-17):**
  - TripAdvisor URL: `https://www.tripadvisor.ie/Attraction_Review-g317084-d25058164-Reviews-Explorian_Safaris-Moshi_Kilimanjaro_Region.html`
  - Safari Bookings URL: `https://www.safaribookings.com/reviews/p5449`
  - Created `lib/reviews.ts` - Review scraping service using cheerio
  - Created `/api/reviews` - GET reviews from database
  - Created `/api/reviews/sync` - POST to trigger daily sync
  - Created `components/Reviews.tsx` - Dynamic review display component
  - Reviews stored in database and synced daily (no hardcoding!)
  - Safari Bookings: 4.8/5 rating, 23 reviews (21 five-star!)

- ⏳ **Still Needed:**
  - Pesapal merchant credentials (for real payment processing)
  - Set up cron job for daily review sync

**2026-01-20 - Phase 4 & 5 Completed:**
- ✅ **Booking & Quote System (Phase 4):**
  - Request Quote form with date pickers (start/end dates + flexible checkbox)
  - Direct booking page at `/book` with package pre-selection
  - 7-day logic working: < 7 days = INQUIRY, >= 7 days = PENDING + payment
  - "Book Now" buttons now link to `/book?package=xxx`
  - All email notifications working (customer + admin)
  - Database storing all bookings with reference numbers

- ✅ **Payment Integration (Phase 5):**
  - Complete Pesapal v3 API integration in `lib/pesapal.ts`
  - Simulated payment mode for testing (no credentials needed)
  - Payment pages: `/payment/simulate`, `/payment/success`, `/payment/failed`, `/payment/pending`, `/payment/error`
  - API endpoints: `/api/payment/initiate`, `/api/payment/callback`, `/api/payment/ipn`, `/api/payment/status`
  - Full booking → payment → confirmation flow tested and working
  - Auto-switches between simulated and real Pesapal mode

- ✅ **User Flow Now Complete:**
  1. User clicks "Book Now" on package → Goes to `/book?package=xxx`
  2. User fills booking form with travel date
  3. If < 7 days: Shows "we'll contact you" message (INQUIRY status)
  4. If >= 7 days: Redirects to payment page (PENDING status)
  5. User completes payment → Booking marked PAID
  6. Confirmation emails sent to customer and admin

- 🎯 **Next Phase:** Phase 6 - Admin Dashboard (Full Content Management)

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
2. ✅ Phase 1: Project setup (Next.js 16, TypeScript, Tailwind)
3. ✅ Phase 2: Core UI (Home page, Header, Footer)
4. ✅ Phase 3: Review Integration (Safari Bookings synced)
5. ✅ Phase 4: Booking & Quote System (7-day logic working)
6. ✅ Phase 5: Payment Integration (Pesapal ready, simulated mode working)
7. 🎯 **Phase 6: Admin Dashboard** - Next to implement
8. ⬜ Phase 7: Additional Features (multi-language, search, filters)
9. ⬜ Phase 8: SEO & Performance
10. ⬜ Phase 9: Testing & QA
11. ⬜ Phase 10: Deployment & Launch

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
