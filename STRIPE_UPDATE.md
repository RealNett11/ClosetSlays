
## Recent Changes
- Updated GitHub secret `VITE_STRIPE_PUBLISHABLE_KEY` with LIVE key
- Frontend will now use pk_live_ key instead of pk_test_ key
- This fixes the 404 errors during checkout process
- Added verification step to ensure GitHub secret is correct

## Deployment
- Automatically deployed via GitHub Actions
- Environment variables are injected during build process
- Live site: https://closetslays.com
- Build verification checks if secret contains live vs test key

Last updated: August 7, 2025
