interface AddToCartButtonProps {
  className?: string;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ className }) => {
  return (
    <button 
      className={` add-to-cart-button w-full py-3 px-6  ${className}`}
    >
      <span className="cart-icon">🛒</span>
      Add to Cart
    </button>
  );
};