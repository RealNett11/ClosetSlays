import { useCart } from '@/components/CartContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { EnhancedStripeCheckout } from '../components/EnhancedStripeCheckout';
import { createPaymentIntent } from '@/lib/api';

export default function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [shippingCost, setShippingCost] = useState<number | null>(null);
  const navigate = useNavigate();

  // Create PaymentIntent immediately when component loads
  useEffect(() => {
    const createPaymentIntentAsync = async () => {
      try {
        const data = await createPaymentIntent(cartItems);
        setClientSecret(data.clientSecret);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    };

    if (cartItems.length > 0) {
      createPaymentIntentAsync();
    }
  }, [cartItems, totalPrice]);

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/');
    }
  }, [cartItems, navigate]);

  if (paymentSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100">
        <div className="bg-white rounded-2xl p-8 shadow-xl text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">Thank you for your order. You'll receive a confirmation email shortly.</p>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-200 via-pink-200 via-purple-200 via-blue-200 via-indigo-200 to-violet-200">
      {/* Hide floating cart button on checkout */}
      <style>{`.sticky-cart-button { display: none !important; }`}</style>
      
      {/* Back button */}
      <div className="pt-8 px-4">
        <div className="max-w-lg mx-auto">
          <button
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/80 hover:bg-white shadow-sm border border-gray-200 font-medium text-gray-700 hover:text-gray-900 transition-all"
            onClick={() => navigate(-1)}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Cart</span>
          </button>
        </div>
      </div>

      {/* Enhanced Stripe Checkout */}
      {clientSecret ? (
        <EnhancedStripeCheckout
          clientSecret={clientSecret}
          onSuccess={() => { 
            clearCart(); 
            navigate('/success');
          }}
          onError={setError}
          brandColor="#8fe0f0" // Updated to match your requested accent color
          companyName="ClosetSlays"
          amount={Math.round(totalPrice * 100)}
          currency="USD"
          showAddressForm={true}
          cartItems={cartItems}
          subtotal={totalPrice}
          onShippingUpdate={setShippingCost}
        />
      ) : (
        <div className="py-8">
          <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-pink-500 to-purple-600 rounded-full animate-pulse flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 bg-gray-100 rounded animate-pulse w-2/3 mx-auto"></div>
              </div>
              <p className="text-gray-500">Preparing your secure checkout...</p>
              
              {/* Cart Summary */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-2">
                  {cartItems.map(item => (
                    <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.name} ({item.size}) × {item.quantity}</span>
                      <span className="font-medium">${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 pt-2 mt-4">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg max-w-sm">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium">{error}</span>
          </div>
        </div>
      )}
    </div>
  );
}
