import { useCart } from './CartContext';
import { loadStripe } from '@stripe/stripe-js';

interface CartProps {
  onClose: () => void;
}

// Initialize Stripe with the publishable key from environment variables
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

export const Cart: React.FC<CartProps> = ({ onClose }) => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      
      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }

      // Use the appropriate backend URL based on environment
      const backendUrl = import.meta.env.MODE === 'production' 
        ? 'https://api.closetslays.com/api/create-checkout-session'
        : 'http://closetslays-b-env.eba-etpxeejf.us-east-2.elasticbeanstalk.com/api/create-checkout-session';
        
      console.log(`Checkout initiated in ${import.meta.env.MODE} mode`);
        
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            id: item.id,
            name: item.name,
            price: parseFloat(item.price.replace('$', '')),
            quantity: item.quantity,
            size: item.size,
          })),
          mode: import.meta.env.MODE // Pass the current environment mode to the backend
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Checkout API error:', {
          status: response.status,
          statusText: response.statusText,
          errorText
        });
        alert('Checkout failed. Please try again later.');
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
      }

      const session = await response.json();
      
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error);
        alert('Checkout failed: ' + result.error.message);
      }
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Your Cart ({totalItems})</h2>
          <div className="flex gap-2">
            <button 
              onClick={clearCart}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Clear All
            </button>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-black text-2xl"
            >
              &times;
            </button>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-center py-8">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cartItems.map(item => (
                <div key={`${item.id}-${item.size}`} className="flex items-center justify-between p-3 border-b">
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600">
                      {item.price} {item.size && <span className="ml-2">| Size: {item.size}</span>}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button 
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="px-2 py-1 bg-gray-200 rounded-l"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-3 py-1 bg-gray-100">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 rounded-r"
                    >
                      +
                    </button>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between font-bold text-lg mb-4">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full py-3 px-6 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-colors"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};