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

// Helper function to detect if a string is a Checkout Session ID
export const isCheckoutSessionId = (str: string): boolean => {
  return typeof str === 'string' && 
    (str.startsWith('cs_test_') || str.startsWith('cs_live_'));
};

// Export the API URL
export const getStripeApiUrl = () => {
  // Always use the webhook URL for production and the environment variable as fallback
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 
    (import.meta.env.MODE === 'production' ? 'https://webhook.closetslays.com' : 'http://localhost:3001');
  
  // Ensure we're using the webhook URL, not the Stripe API directly
  const apiUrl = `${baseUrl}/api/create-checkout-session`;
  
  // Validate the URL is not pointing to Stripe API directly
  if (apiUrl.includes('api.stripe.com')) {
    console.error('CRITICAL ERROR: API URL is pointing to Stripe API directly!');
    // Return the correct webhook URL as a fallback
    return 'https://webhook.closetslays.com/api/create-checkout-session';
  }
  
  return apiUrl;
};