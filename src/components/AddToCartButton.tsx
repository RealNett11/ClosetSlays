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

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ className, shirt }) => {
  const { addToCart } = useCart();

  return (
    <button 
      className={`add-to-cart-button w-full py-3 px-6 ${className}`}
      onClick={() => addToCart(shirt)}
    >
      <span className="cart-icon">🛒</span>
      Add to Cart
    </button>
  );
};