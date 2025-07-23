import { useCart } from './CartContext';
import { stripePromise, getStripeApiUrl } from '../lib/stripe';

interface CartProps {
  onClose: () => void;
}

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

      // Use the appropriate backend URL from our utility
      const backendUrl = getStripeApiUrl();
        
      console.log(`Checkout initiated in ${import.meta.env.MODE} mode`);
        
      // Log the Stripe mode being used to help with debugging
      const stripeMode = import.meta.env.VITE_STRIPE_MODE || 'test';
      console.log(`Using Stripe mode: ${stripeMode}`);
      
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Stripe-Mode': stripeMode, // Add as header for more visibility
        },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            id: item.id,
            name: item.name,
            price: parseFloat(item.price.replace('$', '')),
            quantity: item.quantity,
            size: item.size,
          })),
          mode: stripeMode // Explicitly use the Stripe mode from env vars
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
      
      // Log the session details to help with debugging (excluding sensitive data)
      console.log('Checkout session created:', { 
        id: session.id ? session.id.substring(0, 5) + '...' : 'undefined',
        mode: session.mode || 'unknown'
      });
      
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
        className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Your Cart ({totalItems})</h2>
          <div className="flex gap-4">
            <button 
              onClick={clearCart}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              Clear All
            </button>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-black text-3xl"
            >
              &times;
            </button>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-center py-8 text-lg">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-6 mb-8">
              {cartItems.map(item => (
                <div key={`${item.id}-${item.size}`} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-20 h-20 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain rounded"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "/placeholder-shirt.svg";
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{item.name}</h3>
                    <p className="text-gray-600">
                      {item.price} {item.size && <span className="ml-2">| Size: {item.size}</span>}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button 
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1), item.size)}
                      className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-1 bg-gray-100">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)}
                      className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
                    >
                      +
                    </button>
                    <button 
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="ml-4 text-red-500 hover:text-red-700 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <div className="flex justify-between font-bold text-xl mb-6">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full py-4 px-6 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-colors text-lg"
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
