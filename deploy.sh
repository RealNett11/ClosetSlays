#!/bin/bash
# Deployment script for production
# Usage: Set your STRIPE_LIVE_KEY first, then run this script

if [ -z "$STRIPE_LIVE_KEY" ]; then
    echo "❌ Error: STRIPE_LIVE_KEY environment variable not set"
    echo "Please set it with: export STRIPE_LIVE_KEY=pk_live_your_actual_key"
    exit 1
fi

echo "🔧 Building with live Stripe key..."
export VITE_STRIPE_PUBLISHABLE_KEY="$STRIPE_LIVE_KEY"
export VITE_STRIPE_MODE="live" 
export VITE_API_BASE_URL="https://webhook.closetslays.com"
export VITE_FRONTEND_URL="https://closetslays.com"

npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful! Deploying..."
    npm run deploy
    echo "🚀 Deployment complete!"
else
    echo "❌ Build failed!"
    exit 1
fi
