# ClosetSlays

## Environment Setup

### Local Development

1. Copy `.env.example` to `.env.local` and fill in your development keys
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server

### GitHub Deployment

The project is configured to deploy to GitHub Pages automatically when pushing to the main branch.

Required GitHub secrets:
- `VITE_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key

### Environment Files

- `.env.local`: Local development overrides (not committed to git)
- `.env.development`: Development environment defaults
- `.env.production`: Production environment defaults
- `.env.example`: Example file for documentation

## Backend Integration

The frontend connects to the ClosetSlays-B backend service which handles:
- Stripe payment processing
- Order fulfillment via Printful
- Webhook handling

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run build:dev`: Build for development
- `npm run deploy`: Deploy to GitHub Pages
- `npm run preview`: Preview production build locally