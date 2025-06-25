import { useState } from 'react';

interface SizeSelectorProps {
  shirt: {
    id: number;
    name: string;
    price: string;
    image: string;
  };
  onClose: () => void;
  onAddToCart: (size: string) => void;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({ shirt, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState<string>('');

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const handleAddToCart = () => {
    if (selectedSize) {
      onAddToCart(selectedSize);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Select Size for {shirt.name}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-black text-2xl">
            &times;
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-6">
          {sizes.map(size => (
            <button
              key={size}
              className={`py-2 px-4 border rounded-lg ${
                selectedSize === size 
                  ? 'bg-black text-white border-black' 
                  : 'border-gray-300 hover:border-black'
              }`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={!selectedSize}
          className={`w-full py-3 add-to-cart-button px-6 rounded-full font-semibold ${
            selectedSize 
              ? 'bg-black text-white hover:bg-gray-800' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};