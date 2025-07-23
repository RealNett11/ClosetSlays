import { loadStripe } from '@stripe/stripe-js';

// Get environment variables
// In GitHub Actions, these will be set via secrets
const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';
const stripeMode = import.meta.env.VITE_STRIPE_MODE || 'test';

// Log environment info (but not the key itself)
console.log(`Stripe environment: ${stripeMode}`);
console.log(`Build mode: ${import.meta.env.MODE}`);
console.log(`API URL: ${import.meta.env.VITE_API_BASE_URL || 'not set'}`);

// Validate the key matches the mode
const validateStripeKey = () => {
  if (!publishableKey) {
    console.error('Stripe publishable key is not set!');
    return false;
  }

  const isLiveKey = publishableKey.startsWith('pk_live_');
  const isTestKey = publishableKey.startsWith('pk_test_');
  
  if (stripeMode === 'live' && !isLiveKey) {
    console.error('ERROR: Stripe is in live mode but using a test key!');
    return false;
  }
  
  if (stripeMode === 'test' && !isTestKey) {
    console.error('ERROR: Stripe is in test mode but using a live key!');
    return false;
  }
  
  return true;
};

// Initialize Stripe
const isValid = validateStripeKey();
console.log(`Stripe configuration is ${isValid ? 'valid' : 'INVALID'} (Mode: ${stripeMode})`);

// Export the Stripe instance
export const stripePromise = loadStripe(publishableKey);

// Export the API URL
export const getStripeApiUrl = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 
    (import.meta.env.MODE === 'production' ? 'https://webhook.closetslays.com' : 'http://localhost:3001');
  
  return `${baseUrl}/api/create-checkout-session`;
};