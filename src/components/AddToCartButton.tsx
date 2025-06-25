import { useState, useRef } from 'react';
import { SizeSelector } from './SizeSelector';
import { useCart } from './CartContext';

interface AddToCartButtonProps {
    className?: string;

  shirt: {
    id: number;
    name: string;
    price: string;
    image: string;
  };
}

export function AddToCartButton({ shirt }: AddToCartButtonProps) {
  const [showSizeSelector, setShowSizeSelector] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  const handleAddToCart = (size: string) => {
    addToCart({
      ...shirt,
      size,
    });
    setShowSizeSelector(false);
  };

  return (
    <div className="mt-4">
      <div ref={cardRef}>
        <button
          onClick={() => setShowSizeSelector(true)}
          className="add-to-cart-button px-6 py-3"
        >
          <span className="cart-icon">🛒</span>
          Add to Cart
        </button>
      </div>

      {showSizeSelector && (
        <SizeSelector
          shirt={shirt}
          onClose={() => setShowSizeSelector(false)}
          onAddToCart={handleAddToCart}
          cardRef={cardRef}
        />
      )}
    </div>
  );
}