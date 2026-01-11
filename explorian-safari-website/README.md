# Explorian Safari Website

Professional safari booking website for Explorian Safaris, Tanzania.

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL (to be added in Phase 2)
- **Payment:** Pesapal API
- **Reviews:** TripAdvisor & Safari Bookings integration

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
explorian-safari-website/
├── app/                    # Next.js App Router pages
├── components/             # Reusable React components
├── lib/                    # Utility functions and helpers
├── types/                  # TypeScript type definitions
├── public/                 # Static assets
│   ├── images/            # Image files
│   └── icons/             # Icon files
├── .env.example           # Environment variables template
└── README.md              # This file
```

## Development Progress

### Phase 1: Foundation & Setup ✅ COMPLETED
- [x] Next.js 16 with TypeScript
- [x] Tailwind CSS with safari theme
- [x] Project structure
- [x] Environment variables
- [x] Configuration files

### Phase 2: Core UI Development (Next)
- [ ] Header/Navigation
- [ ] Footer
- [ ] Home page
- [ ] Package pages

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

See `.env.example` for all required environment variables.

Key integrations:
- Pesapal (Payment gateway)
- TripAdvisor (Reviews)
- Safari Bookings (Reviews)
- SendGrid/Resend (Email)
- Cloudinary (Images)

## Documentation

Full project documentation: `../CLAUDE.md`

## License

Private - Explorian Safaris © 2026
