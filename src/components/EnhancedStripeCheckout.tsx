import React, { useState, useEffect } from 'react';
import {
  Elements,
  PaymentElement,
  AddressElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { loadStripe, type StripeElementsOptions } from '@stripe/stripe-js';
import { updatePaymentIntent, getShippingOptions } from '../lib/api';

// Initialize Stripe with publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

// Enhanced Stripe theme with modern, minimalist design
const createCustomTheme = (brandColor: string) => ({
  theme: 'stripe' as const,
  variables: {
    colorPrimary: brandColor,
    colorBackground: '#ffffff',
    colorText: '#1f2937',
    colorDanger: '#ef4444',
    fontFamily: 'Inter, system-ui, sans-serif',
    spacingUnit: '4px',
    borderRadius: '12px',
    fontSizeBase: '16px',
    fontWeightNormal: '400',
    fontWeightMedium: '500',
    fontWeightBold: '600',
  },
  rules: {
    '.Input': {
      borderColor: '#e5e7eb',
      borderWidth: '1px',
      borderRadius: '12px',
      padding: '16px',
      fontSize: '16px',
      transition: 'all 0.2s ease',
      backgroundColor: '#fafbfc',
    },
    '.Input:focus': {
      borderColor: brandColor,
      boxShadow: `0 0 0 3px ${brandColor}20`,
      backgroundColor: '#ffffff',
    },
    '.Input:hover': {
      borderColor: '#d1d5db',
      backgroundColor: '#ffffff',
    },
    '.Label': {
      color: '#374151',
      fontSize: '14px',
      fontWeight: '500',
      marginBottom: '8px',
      letterSpacing: '0.025em',
    },
    '.Error': {
      color: '#ef4444',
      fontSize: '14px',
      fontWeight: '500',
    },
    '.Tab': {
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      backgroundColor: '#ffffff',
      padding: '12px 16px',
      transition: 'all 0.2s ease',
    },
    '.Tab:hover': {
      borderColor: '#d1d5db',
      backgroundColor: '#f9fafb',
    },
    '.Tab--selected': {
      borderColor: brandColor,
      backgroundColor: `${brandColor}08`,
      color: brandColor,
    },
  },
});

interface EnhancedStripeCheckoutFormProps {
  clientSecret: string;
  onSuccess: () => void;
  onError: (error: string) => void;
  brandColor?: string;
  companyName?: string;
  showAddressForm?: boolean;
  addressData?: {
    name?: string;
    firstName?: string;
    lastName?: string;
    address?: {
      line1?: string;
      line2?: string;
      city?: string;
      state?: string;
      postal_code?: string;
      country: string;
    };
    phone?: string;
  };
  cartItems?: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    [key: string]: unknown;
  }>;
  onShippingUpdate?: (cost: number | null) => void;
  subtotal?: number;
}

function EnhancedStripeCheckoutForm({
  clientSecret,
  onSuccess,
  onError,
  brandColor = '#8fe0f0',
  companyName = 'Your Company',
  showAddressForm = true,
  addressData,
  cartItems = [],
  onShippingUpdate,
  subtotal,
}: EnhancedStripeCheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [paymentMethodTypes, setPaymentMethodTypes] = useState<string[]>([]);
  const [addressComplete, setAddressComplete] = useState(!showAddressForm);
  const [shippingCost, setShippingCost] = useState<number | null>(null);
  const [isUpdatingShipping, setIsUpdatingShipping] = useState(false);
  const [shippingOptions, setShippingOptions] = useState<Array<{
    id: string;
    name: string;
    rate: number;
    minDeliveryDays?: number;
    maxDeliveryDays?: number;
  }>>([]);
  const [selectedShippingOption, setSelectedShippingOption] = useState<string>('standard');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');

  useEffect(() => {
    if (!stripe || !clientSecret) return;

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (paymentIntent) {
        setPaymentMethodTypes(paymentIntent.payment_method_types || []);
      }
    });
  }, [stripe, clientSecret]);

  // Function to update shipping when address changes
  const updateShippingCost = async (addressData: {
    name?: string;
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
    address?: {
      line1?: string;
      line2?: string;
      city?: string;
      state?: string;
      postal_code?: string;
      country?: string;
    };
  }) => {
    if (!addressData || !cartItems.length) return;
    
    console.log('updateShippingCost called with:', addressData);
    
    setIsUpdatingShipping(true);
    try {
      // Extract PaymentIntent ID from client secret
      const paymentIntentId = clientSecret.split('_secret_')[0];
      
      // Build address object with better international support
      const shippingAddress = {
        name: addressData.name || 'Customer',
        line1: addressData.address?.line1 || addressData.line1 || '',
        line2: addressData.address?.line2 || addressData.line2 || '',
        city: addressData.address?.city || addressData.city || '',
        state: addressData.address?.state || addressData.state || '',
        postal_code: addressData.address?.postal_code || addressData.postal_code || '',
        country: addressData.address?.country || addressData.country || 'US',
      };
      
      console.log('Sending shipping address to API:', shippingAddress);
      
      const data = await updatePaymentIntent(
        paymentIntentId,
        shippingAddress,
        cartItems,
        selectedShippingOption,
        selectedShippingOption === 'express' ? phoneNumber : undefined
      );
      
      console.log('Shipping update response:', data);
      
      setShippingCost(data.shippingCost);
      if (data.shippingOptions) {
        setShippingOptions(data.shippingOptions);
      }
      onShippingUpdate?.(data.shippingCost);
      console.log('Shipping updated:', data.shippingCost);
    } catch (err) {
      console.error('Shipping update error:', err);
    } finally {
      setIsUpdatingShipping(false);
    }
  };

  // Function to handle shipping option change
  const handleShippingOptionChange = async (optionId: string) => {
    setSelectedShippingOption(optionId);
    setPhoneError(''); // Clear any phone errors when changing options
    
    // Update shipping cost immediately when option changes
    const addressElement = elements?.getElement('address');
    if (addressElement) {
      const addressValue = await addressElement.getValue();
      if (addressValue.complete && addressValue.value) {
        setIsUpdatingShipping(true);
        try {
          // Extract PaymentIntent ID from client secret
          const paymentIntentId = clientSecret.split('_secret_')[0];
          
          const data = await updatePaymentIntent(
            paymentIntentId,
            {
              name: addressValue.value.name || 'Customer',
              line1: addressValue.value.address?.line1 || '',
              line2: addressValue.value.address?.line2 || '',
              city: addressValue.value.address?.city || '',
              state: addressValue.value.address?.state || '',
              postal_code: addressValue.value.address?.postal_code || '',
              country: addressValue.value.address?.country || 'US',
            },
            cartItems,
            optionId, // Use the newly selected option
            optionId === 'express' ? phoneNumber : undefined
          );
          
          setShippingCost(data.shippingCost);
          onShippingUpdate?.(data.shippingCost);
          console.log('Shipping updated for option:', optionId, 'Cost:', data.shippingCost);
        } catch (err) {
          console.error('Shipping update error:', err);
        } finally {
          setIsUpdatingShipping(false);
        }
      }
    }
  };

  // Function to validate phone number for express shipping
  const validatePhoneNumber = (phone: string): boolean => {
    // Remove all non-digit characters for validation
    const digitsOnly = phone.replace(/\D/g, '');
    // Must have at least 10 digits (US phone number)
    return digitsOnly.length >= 10;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Validate phone number for express shipping
    if (selectedShippingOption === 'express') {
      if (!phoneNumber.trim()) {
        setPhoneError('Phone number is required for express shipping');
        return;
      }
      if (!validatePhoneNumber(phoneNumber)) {
        setPhoneError('Please enter a valid phone number');
        return;
      }
    }

    setIsLoading(true);
    setError('');
    setPhoneError('');

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || 'An error occurred');
      setIsLoading(false);
      onError(submitError.message || 'An error occurred');
      return;
    }

    // Get address data to provide billing details if needed
    const addressElement = elements.getElement('address');
    let billingDetails: {
      name?: string;
      email: string;
      phone: string;
      address?: {
        line1: string;
        line2?: string;
        city: string;
        state: string;
        postal_code: string;
        country: string;
      };
    } = {
      email: 'customer@example.com', // Default email since we're not collecting it
      phone: phoneNumber || '+1234567890', // Always provide phone, use entered one or default
    };
    
    if (addressElement && showAddressForm) {
      const addressValue = await addressElement.getValue();
      if (addressValue.complete && addressValue.value) {
        billingDetails = {
          name: addressValue.value.name || 'Customer',
          email: 'customer@example.com', // Default email since we're not collecting it
          phone: phoneNumber || '+1234567890', // Always provide phone, use entered one or default
          address: {
            line1: addressValue.value.address?.line1 || '',
            line2: addressValue.value.address?.line2 || '',
            city: addressValue.value.address?.city || '',
            state: addressValue.value.address?.state || '',
            postal_code: addressValue.value.address?.postal_code || '',
            country: addressValue.value.address?.country || 'US',
          }
        };
      }
    }

    // Confirm payment with enhanced return URL and billing details
    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
        payment_method_data: {
          billing_details: billingDetails,
        },
      },
      redirect: 'if_required',
    });

    if (confirmError) {
      setError(confirmError.message || 'An error occurred');
      onError(confirmError.message || 'An error occurred');
    } else {
      onSuccess();
    }

    setIsLoading(false);
  };

  // Google Maps API key from environment
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <div className="space-y-8">
      {/* Header with company branding */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <img
            src="/images/Closetslayspfp.png"
            alt="ClosetSlays Logo"
            className="h-10 w-10 object-contain border border-gray-200 bg-white"
            style={{ borderRadius: '8px' }}
          />
          <span className="text-2xl font-bold text-gray-400 select-none">+</span>
          <img 
            src="/images/stripe Icon.png" 
            alt="Stripe" 
            className="h-10 w-12 object-contain"
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Secure Checkout</h1>
        <p className="text-gray-600 font-medium">{companyName}</p>
      </div>

      {/* Payment Method Icons */}
      {/* Removed payment method icons and "Accepted:" text for cleaner design */}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Address Section with Enhanced UX */}
        {showAddressForm && (
          <div className={`space-y-4 transition-all duration-500 ${addressComplete ? 'scale-95 opacity-75' : ''}`}>
            <div className="flex items-center space-x-2 mb-4">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold bg-black"
              >
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Shipping Address</h3>
            </div>
            <div className={`bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 transition-all duration-500 ${addressComplete ? 'p-3' : 'p-6'}`}>
              <AddressElement
                options={{
                  mode: 'shipping',
                  autocomplete: googleMapsApiKey ? {
                    mode: 'google_maps_api',
                    apiKey: googleMapsApiKey,
                  } : {
                    mode: 'automatic',
                  },
                  // Explicitly allow all major countries for international shipping
                  allowedCountries: [
                    'US', 'CA', 'GB', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 'SE', 'NO', 'DK', 'FI',
                    'CH', 'AT', 'BE', 'IE', 'PT', 'LU', 'JP', 'SG', 'HK', 'NZ', 'MX', 'BR', 'IN'
                  ],
                  display: {
                    name: 'full',
                  },
                  defaultValues: addressData || {},
                }}
                onChange={(event) => {
                  console.log('AddressElement onChange:', event); // Debug logging
                  if (event.complete) {
                    setAddressComplete(true);
                    // Update shipping cost when address is complete
                    if (event.value && cartItems.length > 0) {
                      console.log('Triggering shipping update with address:', event.value);
                      updateShippingCost(event.value);
                    }
                  } else {
                    // Also trigger updates for partial but valid addresses for international
                    if (event.value && event.value.address && cartItems.length > 0) {
                      const addr = event.value.address;
                      // Check if we have minimum required fields for shipping calculation
                      if (addr.country && addr.city && (addr.postal_code || addr.country !== 'US')) {
                        console.log('Triggering shipping update with partial international address:', event.value);
                        updateShippingCost(event.value);
                      }
                    }
                  }
                }}
              />
              
              {/* Shipping cost display */}
              {isUpdatingShipping && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm text-blue-700 font-medium">Calculating shipping...</span>
                  </div>
                </div>
              )}
              
              {shippingCost !== null && !isUpdatingShipping && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-800 font-medium">
                      Current Shipping Cost:
                    </span>
                    <span className="text-sm font-bold text-green-900">
                      ${shippingCost.toFixed(2)}
                    </span>
                  </div>
                  {selectedShippingOption && (
                    <div className="mt-1">
                      <span className="text-xs text-green-700">
                        {selectedShippingOption === 'express' ? 'Express Shipping Selected' : 'Standard Shipping Selected'}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Shipping Options */}
              {shippingOptions.length > 1 && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium mb-3">Shipping Options</p>
                  <div className="space-y-2">
                    {shippingOptions.map((option) => (
                      <label 
                        key={option.id} 
                        className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors"
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="shippingOption"
                            value={option.id}
                            checked={selectedShippingOption === option.id}
                            onChange={(e) => handleShippingOptionChange(e.target.value)}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{option.name}</p>
                            {option.minDeliveryDays && option.maxDeliveryDays && (
                              <p className="text-xs text-gray-500">
                                {option.minDeliveryDays}-{option.maxDeliveryDays} business days
                              </p>
                            )}
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">
                          ${option.rate.toFixed(2)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Phone Number Field for Express Shipping */}
              {selectedShippingOption === 'express' && (
                <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center mb-3">
                    <svg className="w-4 h-4 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <p className="text-sm text-orange-800 font-medium">Phone Number Required</p>
                  </div>
                  <p className="text-xs text-orange-700 mb-3">Express shipments require a contact phone number for delivery coordination.</p>
                  <div className="space-y-2">
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                        setPhoneError(''); // Clear error when typing
                      }}
                      placeholder="(555) 123-4567"
                      className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors ${
                        phoneError 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                      }`}
                    />
                    {phoneError && (
                      <p className="text-xs text-red-600 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {phoneError}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Payment Section with Enhanced UX */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                addressComplete 
                  ? 'text-white bg-black' 
                  : 'text-gray-400 border-2 border-gray-300'
              }`}
            >
              2
            </div>
            <h3 className={`text-lg font-semibold ${addressComplete ? 'text-gray-900' : 'text-gray-400'}`}>
              Payment Details
            </h3>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
            <PaymentElement
              options={{
                layout: 'tabs',
                wallets: {
                  applePay: 'auto',
                  googlePay: 'auto',
                },
                terms: {
                  card: 'auto',
                },
                fields: {
                  billingDetails: showAddressForm ? 'never' : 'auto',
                },
                paymentMethodOrder: ['card'], // Explicitly order card payment methods first
              }}
            />
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800 font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Submit Button */}
        <button
          type="submit"
          disabled={!stripe || isLoading || (showAddressForm && !addressComplete)}
          className={`group relative w-full py-4 px-6 rounded-xl font-semibold text-black text-lg transition-all duration-300 transform hover:scale-[1.02] focus:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-opacity-30 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl stripe-payment-button ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'hover:shadow-2xl active:scale-[0.98]'
          }`}
          style={{
            backgroundColor: isLoading ? undefined : brandColor,
            boxShadow: isLoading ? undefined : `0 10px 25px ${brandColor}40`,
          }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-3">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing Payment...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-3">
              <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-black">Complete Secure Payment</span>
            </div>
          )}
        </button>
      </form>

      {/* Enhanced Security Indicators */}
      <div className="space-y-4">
        <div className="flex justify-center items-center space-x-6 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">256-bit SSL</span>
          </div>
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">PCI DSS Level 1</span>
          </div>
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">Stripe Secured</span>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-gray-400">
            Your payment information is encrypted and processed securely. We never store your card details.
          </p>
        </div>
      </div>
    </div>
  );
}

interface EnhancedStripeCheckoutProps {
  clientSecret: string;
  onSuccess: () => void;
  onError: (error: string) => void;
  brandColor?: string;
  companyName?: string;
  amount?: number;
  currency?: string;
  showAddressForm?: boolean;
  addressData?: {
    name?: string;
    firstName?: string;
    lastName?: string;
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
    address?: {
      line1?: string;
      line2?: string;
      city?: string;
      state?: string;
      postal_code?: string;
      country: string;
    };
    phone?: string;
  };
  cartItems?: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    [key: string]: unknown;
  }>;
  subtotal?: number;
  onShippingUpdate?: (cost: number | null) => void;
}

export function EnhancedStripeCheckout({
  clientSecret,
  onSuccess,
  onError,
  brandColor = '#8fe0f0',
  companyName = 'Your Company',
  amount,
  currency = 'USD',
  showAddressForm = true,
  addressData,
  cartItems = [],
  subtotal,
  onShippingUpdate,
}: EnhancedStripeCheckoutProps) {
  const [shippingCost, setShippingCost] = useState<number | null>(null);
  const [isUpdatingShipping, setIsUpdatingShipping] = useState(false);

  const handleShippingUpdate = (cost: number | null) => {
    setShippingCost(cost);
    onShippingUpdate?.(cost);
  };
  if (!clientSecret) {
    return (
      <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 bg-gray-100 rounded animate-pulse w-2/3 mx-auto"></div>
          </div>
          <p className="text-gray-500">Preparing secure checkout...</p>
        </div>
      </div>
    );
  }

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: createCustomTheme(brandColor),
    fonts: [
      {
        cssSrc: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-200 via-purple-200 to-violet-200 py-8 px-4">
      <div className="max-w-lg mx-auto">
        {/* Amount Display with Dynamic Shipping */}
        {subtotal && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2 font-medium">Order Total</p>
              
              {/* Subtotal */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg text-gray-700">Subtotal:</span>
                <span className="text-lg font-semibold text-gray-900">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: currency,
                  }).format(subtotal)}
                </span>
              </div>
              
              {/* Shipping */}
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                <span className="text-lg text-gray-700">Shipping:</span>
                <span className="text-lg font-semibold text-gray-900">
                  {shippingCost !== null ? (
                    new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: currency,
                    }).format(shippingCost)
                  ) : isUpdatingShipping ? (
                    <span className="text-blue-600">Calculating...</span>
                  ) : (
                    <span className="text-gray-500">Enter address</span>
                  )}
                </span>
              </div>
              
              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-gray-900">Total:</span>
                <span className="text-2xl font-bold text-gray-900">
                  {shippingCost !== null ? (
                    new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: currency,
                    }).format(subtotal + shippingCost)
                  ) : (
                    <span className="text-xl text-gray-600">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: currency,
                      }).format(subtotal)} + shipping
                    </span>
                  )}
                </span>
              </div>
              
              <p className="text-xs text-gray-500 mt-2">
                {shippingCost !== null ? 'Includes all taxes and fees' : 'Shipping calculated at checkout'}
              </p>
            </div>
          </div>
        )}

        {/* Main Checkout Form */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <Elements stripe={stripePromise} options={options}>
            <EnhancedStripeCheckoutForm
              clientSecret={clientSecret}
              onSuccess={onSuccess}
              onError={onError}
              brandColor={brandColor}
              companyName={companyName}
              showAddressForm={showAddressForm}
              addressData={addressData}
              cartItems={cartItems}
              onShippingUpdate={handleShippingUpdate}
              subtotal={subtotal}
            />
          </Elements>
        </div>

        {/* Footer with payment method logos removed as requested */}
      </div>
    </div>
  );
}

export default EnhancedStripeCheckout;
