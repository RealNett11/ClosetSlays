import { useState } from 'react';
import { useCart } from './CartContext';
import { SizeSelector } from './SizeSelector';

interface AddToCartButtonProps {
  className?: string;
  shirt: {
    id: number;
    name: string;
    price: string;
    image: string;
  };
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ className, shirt }) => {
  const { addToCart } = useCart();
  const [showSizeSelector, setShowSizeSelector] = useState(false);

  const handleAddToCart = (size: string) => {
    addToCart({
      ...shirt,
      size // Add size to the shirt object
    });
  };

  return (
    <>
      <button 
        className={`add-to-cart-button w-full py-3 px-6 ${className}`}
        onClick={() => setShowSizeSelector(true)}
      >
        <span className="cart-icon">🛒</span>
        Add to Cart
      </button>

      {showSizeSelector && (
        <SizeSelector 
          shirt={shirt}
          onClose={() => setShowSizeSelector(false)}
          onAddToCart={handleAddToCart}
        />
      )}
    </>
  );
};