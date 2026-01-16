# EverCapable Coaching Website

## Overview

A nutrition coaching and habit layering website for EverCapable, targeting high-achievers seeking science-backed, sustainable body transformation. The site features a modern, premium design with sections for the method, pricing programs, guarantee, FAQ, and contact forms. Built as a full-stack TypeScript application with React frontend and Express backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with custom design tokens defined in CSS variables
- **UI Components**: shadcn/ui component library (New York style variant)
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite with path aliases (@/, @shared/, @assets/)

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Pattern**: RESTful endpoints under /api prefix
- **Development**: Vite middleware for HMR during development
- **Production**: Static file serving from dist/public

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: shared/schema.ts (shared between client and server)
- **Current Storage**: In-memory storage (MemStorage class) with database schema ready for PostgreSQL
- **Tables**: users, contact_messages

### Design System
The project follows specific design guidelines (design_guidelines.md):
- Premium wellness brand aesthetic inspired by Airbnb, Calendly, Headspace
- Typography: Plus Jakarta Sans, DM Sans from Google Fonts
- Color scheme: Orange primary (#F97316), neutral backgrounds with HSL CSS variables
- Spacing: Tailwind units with generous whitespace
- Dark mode by default with light mode toggle
- Floating pill navigation in top-left corner with smooth animations

### Project Structure
```
client/           # React frontend
  src/
    components/   # Page sections (Hero, Method, Pricing, etc.)
    components/ui # shadcn/ui components
    pages/        # Route components
    hooks/        # Custom React hooks
    lib/          # Utilities and query client
server/           # Express backend
  index.ts        # Server entry point
  routes.ts       # API route handlers
  storage.ts      # Data storage layer
  vite.ts         # Vite dev server integration
shared/           # Shared code between client/server
  schema.ts       # Drizzle schema and Zod types
```

### Key Components
- **Header**: Floating pill navigation with The Method, Programs, FAQ links
- **Hero**: Full-screen with headline "Stop the Cycle. Build a Body You Can Keep."
- **Method**: 3-card bento grid (Objective Data, Habit Layering, Performance Mindset)
- **Pricing**: 2 tiers - Self-Led Blueprint ($99/mo) and Collaborative Pro ($500/mo)
- **Guarantee**: The Forever Guarantee section
- **FAQ**: Accordion with habit layering and program questions
- **Contact**: Application form for coaching

## External Dependencies

### UI Framework
- Radix UI primitives (dialog, accordion, popover, etc.)
- Lucide React icons
- react-icons for brand logos (X/Twitter)
- Embla Carousel for carousels
- Vaul for drawer components

### Data & Forms
- Drizzle ORM + drizzle-zod for database operations
- Zod for schema validation
- React Hook Form for form state

### Backend Services
- Express with express-session (connect-pg-simple for PostgreSQL sessions)
- PostgreSQL database (configured via DATABASE_URL environment variable)

### Build & Development
- Vite with React plugin
- esbuild for production server bundling
- TypeScript with strict mode

### Static Site Deployment (Netlify)
The project is configured for static site deployment:
- **netlify.toml**: Build configuration and SPA routing
- **Build command**: `npx vite build`
- **Publish directory**: `dist/public`
- **Contact Form**: Uses Netlify Forms for serverless form handling
- **SPA Routing**: Catch-all redirect to index.html for client-side routing

To deploy on Netlify:
1. Connect your repository to Netlify
2. Netlify will auto-detect the build settings from netlify.toml
3. Deploy - the contact form will work automatically with Netlify Forms
