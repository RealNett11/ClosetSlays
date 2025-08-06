# ClosetSlays Frontend - Updated Stripe Configuration

This update ensures the frontend uses the correct LIVE Stripe publishable key from GitHub secrets.

## Recent Changes
- Updated GitHub secret `VITE_STRIPE_PUBLISHABLE_KEY` with LIVE key
- Frontend will now use pk_live_ key instead of pk_test_ key
- This fixes the 404 errors during checkout process

## Deployment
- Automatically deployed via GitHub Actions
- Environment variables are injected during build process
- Live site: https://closetslays.com

Last updated: August 6, 2025
