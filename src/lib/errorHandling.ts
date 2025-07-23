/**
 * Error handling utility for third-party scripts
 */

// Handle module loading errors
export const handleModuleError = (error: Error): void => {
  if (error.message && error.message.includes("Cannot find module './en'")) {
    console.warn('Module loading error detected. This is a non-critical error.');
    // Non-blocking error, just log it
  } else {
    // Re-throw other errors
    throw error;
  }
};

// Handle Stripe-related errors
export const handleStripeError = (error: Error): void => {
  if (error.message && error.message.includes("Failed to fetch")) {
    console.warn('Stripe API request blocked. This might be caused by an ad blocker or privacy extension.');
    alert('Checkout failed: Your browser may be blocking the payment request. Please disable any ad blockers or privacy extensions and try again.');
  } else if (error.message && error.message.includes("401 (Unauthorized)")) {
    console.error('Stripe authentication error: 401 Unauthorized. Check your API keys and ensure you are using the webhook URL.');
    // Log additional debugging information
    console.log('API URL being used:', import.meta.env.VITE_API_BASE_URL || 'Not set');
    console.log('Stripe mode:', import.meta.env.VITE_STRIPE_MODE || 'Not set');
    
    // Check if the error message contains a direct API call to Stripe
    if (error.message.includes('api.stripe.com/v1/payment_pages')) {
      console.error('ERROR: Direct API call to Stripe detected. This is not allowed from client-side code.');
      alert('Checkout configuration error: Your browser is trying to access the Stripe API directly, which is not allowed. Please contact support.');
    } else {
      alert('Checkout failed: Authentication error. Please try again later or contact support.');
    }
  } else {
    // Re-throw other errors
    throw error;
  }
};

// Check if a URL is a direct Stripe API call instead of our webhook
export const isDirectStripeApiCall = (url: string): boolean => {
  // Check for direct Stripe API calls
  if (url.includes('api.stripe.com')) {
    console.error('CRITICAL: Attempting to use Stripe API directly:', url);
    return true;
  }
  
  // Check if we're using the correct webhook URL
  const expectedWebhookUrl = import.meta.env.VITE_API_BASE_URL || 'https://webhook.closetslays.com';
  const isUsingWebhook = url.includes(expectedWebhookUrl) || 
                         url.includes('localhost') || 
                         url.includes('/api/create-checkout-session');
  
  if (!isUsingWebhook) {
    console.warn('Warning: Using unexpected URL for checkout:', url);
  }
  
  return !isUsingWebhook;
};