// API utility for making requests to the backend
// Handles environment-specific API URLs

const getApiBaseUrl = (): string => {
  // Get the base URL from environment variable
  const envApiUrl = import.meta.env.VITE_API_BASE_URL;
  
  if (envApiUrl) {
    console.log('Using API URL from environment:', envApiUrl);
    return envApiUrl;
  }
  
  // Fallback based on build mode
  const fallbackUrl = import.meta.env.MODE === 'production' 
    ? 'https://webhook.closetslays.com' 
    : 'http://localhost:3001';
  
  console.log('Using fallback API URL:', fallbackUrl);
  return fallbackUrl;
};

// Base API URL
const API_BASE_URL = getApiBaseUrl();

// Helper function to make API requests
export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  console.log(`Making API request to: ${url}`);
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API request failed: ${response.status} ${response.statusText}`, errorText);
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    return response;
  } catch (error) {
    console.error(`API request error for ${url}:`, error);
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
