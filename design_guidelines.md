# Design Guidelines: Rachel Stone Personal Trainer Website

## Design Approach

**Reference-Based Strategy**: Drawing inspiration from premium service marketplaces (Airbnb, Calendly) and wellness brands (Headspace, Calm) to create a trustworthy, approachable personal service experience. The design balances professional credibility with warmth and accessibility—essential for personal coaching services.

**Core Principles**:
- Human-first: Photography and testimonials build immediate trust
- Spacious breathing room: Generous whitespace reflects premium positioning
- Guided journey: Clear visual hierarchy leads users from awareness to booking

## Typography System

**Hierarchy**:
- Hero Headline: Bold, oversized (text-5xl to text-7xl), tight letter-spacing for impact
- Section Headers: Medium weight (text-4xl to text-5xl), clear hierarchy
- Body Copy: Regular weight (text-base to text-lg), optimized for readability (max-w-prose)
- Accent Text: Small caps or uppercase for labels/categories (text-xs tracking-wider)
- Testimonials: Italic for quotes, medium weight for attribution

**Font Selection**: Use 2 Google Fonts:
- Display/Headers: Modern geometric sans (e.g., "Inter" or "Plus Jakarta Sans")
- Body: Highly readable sans (same family, different weights)

## Layout & Spacing System

**Spacing Primitives**: Tailwind units of 4, 6, 8, 12, 16, 20, 24, 32
- Section padding: py-20 (desktop), py-12 (mobile)
- Component gaps: gap-8 to gap-16
- Card padding: p-6 to p-8
- Container: max-w-7xl with px-6 padding

**Grid Strategy**:
- Hero: Full-width with centered content (max-w-4xl)
- Stats: 4-column grid (grid-cols-2 md:grid-cols-4)
- Services: 2-column split (md:grid-cols-2)
- Pricing: 3-column cards (grid-cols-1 md:grid-cols-3)
- Contact: 2-column (form + info split)

## Component Specifications

### Hero Section
- Full viewport height (min-h-screen) with background image
- Centered content overlay with dark gradient for text legibility
- Large headline with tight line-height (leading-tight)
- Primary CTA button with blur background (backdrop-blur-sm bg-white/10)
- Trust indicators below CTA: client count + rating + testimonial avatars in horizontal row
- Two circular customer images positioned top-right as social proof

### Stats Section
- 4-column responsive grid (stack on mobile)
- Each stat: large number (text-6xl font-bold), label beneath (text-sm)
- Animated counting effect on scroll (optional enhancement)
- Subtle dividers between stats

### Testimonial Card
- Large quote format with oversized quotation marks
- Client photo: circular (rounded-full), positioned top or side
- Quote in italic, larger text (text-xl)
- Attribution: name + program in smaller text below

### About Section
- 2-column layout: text left, large portrait image right
- Bio text: comfortable reading width (max-w-2xl)
- Philosophy points: 3 items with bold headers, stacked with spacing

### Services Grid
- 4 service cards in 2x2 grid (md:grid-cols-2)
- Each card: icon/illustration, title, brief description
- Minimal borders, subtle hover lift effect
- "Get Started" CTA at section end

### How It Works Timeline
- Vertical timeline with 5 steps
- Step numbers in large circles, connected by vertical line
- Each step: number, title, description in card format
- Alternating left/right layout on desktop (center on mobile)

### Pricing Cards
- 3 columns with equal height cards
- "Most Popular" badge on middle tier (absolute positioning)
- Pricing: large number with /month, feature list with checkmarks
- Distinct visual hierarchy: price prominent, features listed cleanly
- CTA button at card bottom (mt-auto for alignment)

### Results/Before-After
- Side-by-side image comparison (grid-cols-2)
- Equal image heights with object-cover
- Testimonial quote overlay or positioned above/below images

### FAQ Accordion
- Single column, full-width questions
- Clean expand/collapse UI with smooth transitions
- Question in medium weight, answer in regular
- Subtle borders between items

### Contact Section
- 2-column: contact methods left, form right
- Email and phone as large clickable cards
- Form: clean inputs with labels, generous spacing
- Submit button matches primary CTA styling

## Images

**Required Images** (use high-quality placeholders):
1. **Hero Background**: Full-width fitness studio or outdoor training scene (bright, motivational)
2. **Customer Avatars**: 2 circular portraits for hero trust badges (diverse, smiling clients)
3. **Main Testimonial**: Square portrait of Sara Chen (authentic, happy expression)
4. **Rachel Portrait (About)**: Vertical portrait in fitness setting (confident, professional)
5. **Rachel Full-Body (Services)**: Standing pose, casual fitness attire
6. **Before/After**: Two matched comparison photos of client transformation
7. **Results Testimonial**: Square portrait of Sophie Lammers

**Image Treatment**:
- Hero: Dark overlay (bg-black/40) for text contrast
- Portraits: Natural lighting, authentic expressions
- All images: rounded corners (rounded-lg to rounded-2xl)
- Maintain consistent aspect ratios per section

## Navigation
- Fixed header on scroll with blur background (backdrop-blur-md)
- Logo left, nav links center/right, CTA button right
- Mobile: hamburger menu with smooth slide-in drawer
- Smooth scroll to sections on nav click