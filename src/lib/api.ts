// API utility for making requests to the backend
// Handles environment-specific API URLs

const getApiBaseUrl = (): string => {
  // Get the base URL from environment variable
  const envApiUrl = import.meta.env.VITE_API_BASE_URL;
  
  if (envApiUrl) {
    // console.log('Using API URL from environment:', envApiUrl);
    return envApiUrl;
  }
  
  // Fallback based on build mode
  const fallbackUrl = import.meta.env.MODE === 'production' 
    ? 'https://webhook.closetslays.com' 
    : 'http://localhost:3001';
  
  // console.log('Using fallback API URL:', fallbackUrl);
  return fallbackUrl;
};

// Base API URL
const API_BASE_URL = getApiBaseUrl();

// Helper function to make API requests
export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // console.log(`Making API request to: ${url}`);
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const config: RequestInit = {
    ...options,
    mode: 'cors', // Explicitly set CORS mode
    credentials: 'omit', // Try without credentials first to isolate CORS issues
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    // Check if response is HTML (indicating an error page)
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('text/html')) {
      console.error(`API returned HTML instead of JSON. This usually means the endpoint doesn't exist.`);
      console.error(`URL: ${url}`);
      console.error(`Content-Type: ${contentType}`);
      throw new Error(`API endpoint not found: ${url}`);
    }
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API request failed: ${response.status} ${response.statusText}`, errorText);
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    return response;
  } catch (error) {
    console.error(`API request error for ${url}:`, error);
    
    // Check if this is a CORS error
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.error('This appears to be a CORS error. The server may not be properly configured for cross-origin requests.');
      console.error('Check that the backend server:');
      console.error('1. Is running and accessible');
      console.error('2. Has CORS middleware properly configured');
      console.error('3. Includes the frontend domain in allowed origins');
      
      throw new Error(`CORS Error: Unable to connect to ${url}. The server may not be properly configured for cross-origin requests.`);
    }
    
    throw error;
  }
};

// Specific API functions
export const createPaymentIntent = async (items: any[]) => {
  const response = await apiRequest('/api/create-payment-intent', {
    method: 'POST',
    body: JSON.stringify({ items }),
  });
  
  return response.json();
};

export const updatePaymentIntent = async (paymentIntentId: string, address: any, items: any[], shippingOption: string, phoneNumber?: string) => {
  const response = await apiRequest('/api/update-payment-intent', {
    method: 'POST',
    body: JSON.stringify({
      paymentIntentId,
      address,
      items,
      shippingOption,
      phoneNumber,
    }),
  });
  
  return response.json();
};

export const getShippingOptions = async (address: any, items: any[]) => {
  const response = await apiRequest('/api/shipping-options', {
    method: 'POST',
    body: JSON.stringify({
      address,
      items,
    }),
  });
  
  return response.json();
};

// Export the base URL for other components that might need it
export { API_BASE_URL };
