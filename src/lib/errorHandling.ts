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
    // You can implement custom error handling here
  } else {
    // Re-throw other errors
    throw error;
  }
};