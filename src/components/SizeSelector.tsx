import { useState, useEffect } from 'react';

interface SizeSelectorProps {
  shirt: {
    id: number;
    name: string;
    price: string;
    image: string;
    sizeToVariantId: Record<string, string>;
  };
  onClose: () => void;
  onAddToCart: (size: string) => void;
  cardRef: React.RefObject<HTMLDivElement>;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({ shirt, onClose, onAddToCart, cardRef }) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [showGuide, setShowGuide] = useState(false);
  // Show S, M, L, XL, XXL, and Guide as a pseudo-size
  const sizes = ['S', 'M', 'L', 'XL', 'XXL', 'Guide'];

  const handleAddToCart = () => {
    if (selectedSize && selectedSize !== 'Guide') {
      onAddToCart(selectedSize);
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Select Size for {shirt.name}</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-black text-2xl"
          >
            &times;
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {sizes.map(size => (
            size === 'Guide' ? (
              <button
                key="Guide"
                className="py-2 px-4 border rounded-lg bg-blue-100 text-blue-900 hover:bg-blue-200 border-blue-300 font-semibold"
                onClick={() => setShowGuide(true)}
              >
                Guide
              </button>
            ) : (
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
            )
          ))}
        </div>
        <button
          onClick={handleAddToCart}
          disabled={!selectedSize || selectedSize === 'Guide'}
          className={`w-full py-3 px-6 rounded-full font-semibold ${
            selectedSize && selectedSize !== 'Guide'
              ? 'bg-black text-white hover:bg-gray-800' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          Add to Cart
        </button>
        {showGuide && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" onClick={() => setShowGuide(false)}>
            <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
              <h3 className="text-lg font-bold mb-2">Size Guide</h3>
              <p className="mb-4 text-gray-700">All shirts are semi-fitted, 100% ring-spun cotton. Measurements are in inches:</p>
              <table className="w-full text-sm mb-4 border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-1 px-2 text-left">Size</th>
                    <th className="py-1 px-2 text-left">Chest (in)</th>
                    <th className="py-1 px-2 text-left">Length (in)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="py-1 px-2">S</td><td className="py-1 px-2">34-37</td><td className="py-1 px-2">28</td></tr>
                  <tr><td className="py-1 px-2">M</td><td className="py-1 px-2">38-41</td><td className="py-1 px-2">29</td></tr>
                  <tr><td className="py-1 px-2">L</td><td className="py-1 px-2">42-45</td><td className="py-1 px-2">30</td></tr>
                  <tr><td className="py-1 px-2">XL</td><td className="py-1 px-2">46-49</td><td className="py-1 px-2">31</td></tr>
                  <tr><td className="py-1 px-2">XXL</td><td className="py-1 px-2">50-53</td><td className="py-1 px-2">32</td></tr>
                </tbody>
              </table>
              <button className="w-full py-2 px-4 rounded-full font-semibold bg-black text-white mt-2" onClick={() => setShowGuide(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};