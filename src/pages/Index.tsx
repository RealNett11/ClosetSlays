import { ShirtCard } from "@/components/ShirtCard";
import { Link } from "react-router-dom";
import { useCart } from '@/components/CartContext';
import { Cart } from '@/components/Cart';
import { useState, useEffect, useRef } from 'react';

// Cart button component that uses the cart context
const CartButton = ({ onClick }: { onClick: () => void }) => {
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
    <div className="w-full max-w-2xl mx-auto">
      <button 
        onClick={onClick}
        className="add-to-cart-button w-full py-4 px-8 text-2xl font-bold flex items-center justify-center gap-2 relative"
      >
        <span className="cart-icon">🛒</span>
        View Your Cart
        
        {totalItems > 0 && (
          <div className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2 pointer-events-none">
            <div className={`bg-red-600 text-white text-base font-bold rounded-full h-9 w-9 flex items-center justify-center shadow-md ${animate ? 'animate-plop' : ''}`}>
              {totalItems}
            </div>
          </div>
        )}
      </button>
    </div>
  );
};

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const shirts = [
    {
      id: 1,
      name: "GNC - Gay & Cranky",
      price: "$20",
      image: "/images/GNCS.png"
    },
    {
      id: 2,
      name: "This Shirt Is Gay",
      price: "$20",
      image: "/images/ThisShirtIsGayS.png"
    },
    {
      id: 3,
      name: "Supreme Shirt",
      price: "$20",
      image: "/images/supremeS.png"
    },
    {
      id: 4,
      name: "Slay Now Cry Later",
      price: "$20",
      image: "/images/SlayNowCryLaterS.png"
    },
    {
      id: 5,
      name: "Homo Depot",
      price: "$20",
      image: "/images/TheHomeDepotS.png"
    },
    {
      id: 6,
      name: "Emotionally Attached to My Air Fryer",
      price: "$20",
      image: "/images/AirFryerS.png"
    },
    {
      id: 7,
      name: "Dept of Gay Affairs",
      price: "$20",
      image: "/images/Dept-GayAffairsS.png"
    },
    {
      id: 8,
      name: "GAY™",
      price: "$20",
      image: "/images/gay-tm.png"
    },
    {
      id: 9,
      name: "Spread Love Like Glitter",
      price: "$20",
      image: "/images/SpreadLoveLikeGlitterS.png"
    },
    {
      id: 10,
      name: "I Came Out For This ",
      price: "$20",
      image: "/images/ICameOutForThisS.png"
    },
    {
      id: 11,
      name: "Amazon Pride - Two Gay Delivery",
      price: "$20",
      image: "/images/AmazonPrideS.png"
    },
    {
      id: 12,
      name: "Gaytorade",
      price: "$20",
      image: "/images/GaytoradeS.png"
    }
    
  ];

  return (

      <div className="min-h-screen bg-gradient-to-br from-red-200 via-pink-200 via-purple-200 via-blue-200 via-indigo-200 to-violet-200">
        <div className="container mx-auto px-4 py-8">
          {/* Main Banner with Title */}
          <div className="bg-transparent backdrop-blur backdrop-contrast-125 backdrop-saturate-175 rounded-3xl p-4 md:p-6 mb-6 md:mb-8 border-2 border-white/20">
            <div className="text-center space-y-4 md:space-y-6">
              <h1 className="text-3xl md:text-8xl font-bold mb-3 md:mb-4 tracking-tight">
                <span className="text-4xl md:text-9xl animate-rainbow">
                  Closeted Slays
                </span>
              </h1>
              <p className="mt-6 md:mt-8 text-2xl md:text-6xl tracking-normal font-bold text-gray-900 textborder">Pride Shirts</p>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4">
                <p className="text-xl md:text-2xl font-bold text-gray-600">Spread Love With Pride</p>
                <Link 
                  to="/about" 
                  className="text-white bg-black font-medium py-2 px-4 rounded-full transition-all duration-200 hover:scale-105 shadow hover:shadow-md text-sm"
                >
                  About Us
                </Link>
              </div>
            </div>
          </div>

          {/* New Prominent View Cart Button with Rainbow Glow */}
          <div className="mb-8 text-center">
            <CartButton onClick={() => setIsCartOpen(true)} />
          </div>

          {/* Shirt Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto mb-8 md:mb-12">
            {shirts.map((shirt) => (
              <ShirtCard key={shirt.id} shirt={shirt} />
            ))}
          </div>

          {/* Large About Us Button at bottom */}
          <div className="text-center">
            <Link 
              to="/about" 
              className="inline-block add-to-cart-button text-white bg-black font-semibold py-3 md:py-4 px-6 md:px-8 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              About Us
            </Link>
          </div>
        </div>

        {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
      </div>
      
  );
};

export default Index;
