import { ShirtCard } from "@/components/ShirtCard";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  // Each shirt now has a sizeToVariantId mapping for Printful compliance
  const shirts = [
    // All shirts use the same Printful variant IDs for S, M, L, XL, 2XL
    {
      id: 1,
      name: "GNC - Gay & Cranky",
      price: "$20",
      image: "/images/GNCS.png",
      sizeToVariantId: {
        S: "1974",
        M: "1975",
        L: "1976",
        XL: "1977",
        "2XL": "1978"
      }
    },
    {
      id: 2,
      name: "This Shirt Is Gay",
      price: "$20",
      image: "/images/ThisShirtIsGayS.png",
      sizeToVariantId: {
        S: "1974",
        M: "1975",
        L: "1976",
        XL: "1977",
        "2XL": "1978"
      }
    },
    {
      id: 3,
      name: "Supreme Shirt",
      price: "$20",
      image: "/images/supremeS.png",
      sizeToVariantId: {
        S: "1974",
        M: "1975",
        L: "1976",
        XL: "1977",
        "2XL": "1978"
      }
    },   
    {
      id: 4,
      name: "Slay Now Cry Later",
      price: "$20",
      image: "/images/SlayNowCryLaterS.png",
      sizeToVariantId: {
        S: "1974",
        M: "1975",
        L: "1976",
        XL: "1977",
        "2XL": "1978"
      }
    },
    {
      id: 5,
      name: "Homo Depot",
      price: "$20",
      image: "/images/TheHomeDepotS.png",
      sizeToVariantId: {
        S: "1974",
        M: "1975",
        L: "1976",
        XL: "1977",
        "2XL": "1978"
      }
    },
    {
      id: 6,
      name: "Emotionally Attached to My Air Fryer",
      price: "$20",
      image: "/images/AirFryerS.png",
      sizeToVariantId: {
        S: "1974",
        M: "1975",
        L: "1976",
        XL: "1977",
        "2XL": "1978"
      }
    },
    {
      id: 7,
      name: "Dept of Gay Affairs",
      price: "$20",
      image: "/images/Dept-GayAffairsS.png",
      sizeToVariantId: {
        S: "1974",
        M: "1975",
        L: "1976",
        XL: "1977",
        "2XL": "1978"
      }
    },
    {
      id: 8,
      name: "GAY™",
      price: "$20",
      image: "/images/gay-tm.png",
      sizeToVariantId: {
        S: "1974",
        M: "1975",
        L: "1976",
        XL: "1977",
        "2XL": "1978"
      }
    },
    {
      id: 9,
      name: "Spread Love Like Glitter",
      price: "$20",
      image: "/images/SpreadLoveLikeGlitterS.png",
      sizeToVariantId: {
        S: "1974",
        M: "1975",
        L: "1976",
        XL: "1977",
        "2XL": "1978"
      }
    },
    {
      id: 10,
      name: "I Came Out For This",
      price: "$20",
      image: "/images/ICameOutForThisS.png",
      sizeToVariantId: {
        S: "1974",
        M: "1975",
        L: "1976",
        XL: "1977",
        "2XL": "1978"
      }
    },
    {
      id: 11,
      name: "Amazon Pride - Two Gay Delivery",
      price: "$20",
      image: "/images/AmazonPrideS.png",
      sizeToVariantId: {
        S: "1974",
        M: "1975",
        L: "1976",
        XL: "1977",
        "2XL": "1978"
      }
    },
    {
      id: 12,
      name: "Gaytorade",
      price: "$20",
      image: "/images/GaytoradeS.png",
      sizeToVariantId: {
        S: "1974",
        M: "1975",
        L: "1976",
        XL: "1977",
        "2XL": "1978"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-200 via-pink-200 via-purple-200 via-blue-200 via-indigo-200 to-violet-200">
      <div className="container mx-auto px-4 py-8">
        {/* Main Banner with Title */}
        <div className="bg-transparent backdrop-blur backdrop-contrast-125 backdrop-saturate-175 rounded-3xl p-4 md:p-6 mb-6 md:mb-8 border-2 border-white/20">
          <div className="text-center space-y-4 md:space-y-6">
            <h1 className="text-4xl md:text-12xl font-bold mb-3 md:mb-4 tracking-tight">
            <span className="hidden md:inline text-4xl md:text-9xl animate-rainbow">Closeted Slays</span>
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

        {/* New Prominent View Cart Button with Rainbow Glow - hidden on mobile */}
        <div className="mb-8 text-center hidden md:block">
          <CartButton onClick={() => setIsCartOpen(true)} />
        </div>

        {/* Shirt Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto mb-8 md:mb-12">
          {shirts.map((shirt) => (
            <ShirtCard key={shirt.id} shirt={shirt} />
          ))}
        </div>

        {/* Shirt Description */}
        <div className="text-center max-w-3xl mx-auto mb-8 bg-white/20 backdrop-blur-md p-5 rounded-xl shadow-sm border border-black/20 hover:border-black/30 hover:bg-white/30">
          <p className="text-gray-800 text-lg">
            Each shirt is made from 100% ring-spun cotton and designed with a semi-fitted shape, soft side seams, and tear-away tags for a comfortable fit that feels as great as it looks.<br/>
            Your support helps make a difference and empowers others.
          </p>
        </div>

        {/* About Us button above payment logos */}
        <div className="w-full flex items-center justify-center mb-2">
          <Link 
            to="/about" 
            className="mx-2 md:mx-4 inline-block add-to-cart-button text-white bg-black font-semibold py-2 md:py-4 px-4 md:px-8 rounded-full transition-all duration-200 transform hover:scale-105 shadow hover:shadow-md text-sm md:text-base"
          >
            About Us
          </Link>
        </div>
        {/* Payment section with adjusted mobile heights */}
        <div className="w-full flex items-center justify-center overflow-x-auto py-2 md:py-0 mb-8 no-scrollbar">
          <div className="grid grid-cols-3 md:flex md:flex-row items-center justify-center min-w-max gap-2 md:gap-4 px-4 w-full max-w-xs md:max-w-none mx-auto">
            <img 
              src="/images/Visa-Payment-Card.png" 
              alt="Visa" 
              className="h-[38px] md:h-[71px] w-14 md:w-[100px] object-contain mx-auto" 
            />
            <img 
              src="/images/mastercard-payment.png" 
              alt="Mastercard" 
              className="h-[38px] md:h-[71px] w-14 md:w-[100px] object-contain md:scale-75 mx-auto" 
            />
            <img 
              src="/images/AmericanEX-Payment.png" 
              alt="American Express" 
              className="h-[38px] md:h-[57px] w-14 md:w-[100px] object-contain mx-auto" 
            />
            {/* Discover Logo */}
            <img
              src="/images/discover.png"
              alt="Discover"
              className="h-[32px] md:h-[40px] w-auto object-contain mx-auto scale-125"
            />
            {/* Apple Pay Logo */}
            <img
              src="/images/applepay.png"
              alt="Apple Pay"
              className="h-[32px] md:h-[40px] w-auto object-contain mx-auto scale-125"
            />
            {/* Google Pay Logo */}
            <img
              src="/images/googlepay.png"
              alt="Google Pay"
              className="h-[32px] md:h-[40px] w-auto object-contain mx-auto"
            />
          </div>
        </div>
      </div>


      {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
    </div>
  );
};

export default Index;
