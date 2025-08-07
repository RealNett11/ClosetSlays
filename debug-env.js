// Debug script to check what environment variables are being used
console.log('=== Environment Debug ===');
console.log('VITE_STRIPE_PUBLISHABLE_KEY:', process.env.VITE_STRIPE_PUBLISHABLE_KEY ? 
  process.env.VITE_STRIPE_PUBLISHABLE_KEY.substring(0, 20) + '...' : 'NOT SET');
console.log('VITE_STRIPE_MODE:', process.env.VITE_STRIPE_MODE || 'NOT SET');
console.log('NODE_ENV:', process.env.NODE_ENV || 'NOT SET');

// Check if the key is live or test
const key = process.env.VITE_STRIPE_PUBLISHABLE_KEY;
if (key) {
  console.log('Key type:', key.startsWith('pk_live_') ? 'LIVE' : 
                     key.startsWith('pk_test_') ? 'TEST' : 'UNKNOWN');
} else {
  console.log('Key type: NO KEY FOUND');
}
