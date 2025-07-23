import { useState, useRef } from 'react';
import { SizeSelector } from './SizeSelector';
import { useCart } from './CartContext';
import confetti from 'canvas-confetti';


interface AddToCartButtonProps {
  className?: string;
  shirt: {
    id: number;
    name: string;
    price: string;
    image: string;
    printful_variant_id?: string;
  };
}

export function AddToCartButton({ className, shirt }: AddToCartButtonProps) {
  const [showSizeSelector, setShowSizeSelector] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  const fireConfetti = () => {
    const end = Date.now() + 700;
    
  
    const frame = () => {

      for (let i = 0; i < 5; i++) {
        const x = i / 4;
        confetti({
          particleCount: 9,
          spread: 100,
          origin: { x, y: 0 },
          colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
          shapes: ['square'],
          scalar: 1,
          gravity: 3.5,
          ticks: 300,
          disableForReducedMotion: true
        });
      }

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  const handleAddToCart = (size: string) => {

    fireConfetti();

    addToCart({
      ...shirt,
      size,
    });
    setShowSizeSelector(false);
  };

  return (
    <div className="mt-4" ref={cardRef}>
      <div>
        <button
          onClick={() => setShowSizeSelector(true)}
          className={`add-to-cart-button px-4 md:px-6 py-2 md:py-3 ${className || ''}`}
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
