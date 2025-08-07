# PowerShell deployment script for production
# Usage: Set your STRIPE_LIVE_KEY first, then run this script

param([string]$StripeKey = $env:STRIPE_LIVE_KEY)

if (-not $StripeKey) {
    Write-Host "❌ Error: STRIPE_LIVE_KEY environment variable not set" -ForegroundColor Red
    Write-Host "Please set it with: `$env:STRIPE_LIVE_KEY = 'pk_live_your_actual_key'" -ForegroundColor Yellow
    exit 1
}

Write-Host "🔧 Building with live Stripe key..." -ForegroundColor Green
$env:VITE_STRIPE_PUBLISHABLE_KEY = $StripeKey
$env:VITE_STRIPE_MODE = "live"
$env:VITE_API_BASE_URL = "https://webhook.closetslays.com"
$env:VITE_FRONTEND_URL = "https://closetslays.com"

npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful! Deploying..." -ForegroundColor Green
    npm run deploy
    Write-Host "🚀 Deployment complete!" -ForegroundColor Green
} else {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}
