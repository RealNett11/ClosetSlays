import { useState, useEffect, useRef } from 'react';
import { useCart } from './CartContext';
import { Cart } from './Cart';

export function StickyCartButton() {
  const [showCart, setShowCart] = useState(false);
  const { totalItems } = useCart();
  const prevItemsRef = useRef(totalItems);
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    // Only animate when the count increases
    if (totalItems > prevItemsRef.current) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 600); // Match animation duration
      return () => clearTimeout(timer);
    }
    prevItemsRef.current = totalItems;
  }, [totalItems]);

  return (
    <>
      <button
        onClick={() => setShowCart(true)}
        className={`fixed top-6 right-6 bg-black text-white add-to-cart-button rounded-full px-5 py-3 shadow-lg flex items-center gap-2 z-50 hover:bg-gray-800 transition-colors transform hover:scale-105 ${totalItems > 0 ? 'animate-float' : ''}`}
        style={{
          boxShadow: totalItems > 0 ? '0 0 15px rgba(255, 105, 180, 0.7)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <span className="text-xl">🛒</span>
        <span className="font-medium">View Cart</span>
        {totalItems > 0 && (
          <span className={`bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm ${animate ? 'animate-plop' : ''}`}>
            {totalItems}
          </span>
        )}
      </button>

      {showCart && <Cart onClose={() => setShowCart(false)} />}
    </>
  );
}