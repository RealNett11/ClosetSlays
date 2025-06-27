import { useState, useEffect } from 'react';
import { SizeSelector } from './SizeSelector';
import { useCart } from './CartContext';
import confetti from 'canvas-confetti';
// Ensure confetti is properly initialized
let canvasConfetti = confetti;

interface AddToCartButtonProps {
  className?: string;
  shirt: {
    id: number;
    name: string;
    price: string;
    image: string;
  };
}

export function AddToCartButton({ className, shirt }: AddToCartButtonProps) {
  const [showSizeSelector, setShowSizeSelector] = useState(false);

  const { addToCart } = useCart();

  const fireConfetti = () => {
    // Create multiple bursts across the entire width
    const end = Date.now() + 700; // 1 second duration
    
    // Log message to console when confetti is fired
    console.log('🎉 Celebration time! Confetti launched!');
    
    const frame = () => {
      // Launch from multiple positions across the entire width
      for (let i = 0; i < 5; i++) {
        const x = i / 4; // Distribute across 0 to 1 (left to right)
        confetti({
          particleCount: 9, // 200 particles per burst (5 bursts = 1000 total)
          spread: 100,
          origin: { x, y: 0 }, // Top at position x
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
    // First fire confetti
    fireConfetti();
    
    // Then update cart and close selector
    addToCart({
      ...shirt,
      size,
    });
    setShowSizeSelector(false);
  };

  return (
    <div className="mt-4">
      <div>
        <button
          onClick={() => setShowSizeSelector(true)}
          className={`add-to-cart-button px-6 py-3 ${className || ''}`}
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
          cardRef={null}
        />
      )}
    </div>
  );
}
