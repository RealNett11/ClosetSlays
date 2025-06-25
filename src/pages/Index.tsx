import { ShirtCard } from "@/components/ShirtCard";
import { Link } from "react-router-dom";
import { CartProvider } from '@/components/CartContext';
import { Cart } from '@/components/Cart';
import { useState } from 'react';

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
      name: "Amazon Pride - Two Gay Delivery",
      price: "$20",
      image: "/images/AmazonPrideS.png"
    }
  ];

  return (
    <CartProvider>
      <div className="min-h-screen bg-gradient-to-br from-red-200 via-pink-200 via-purple-200 via-blue-200 via-indigo-200 to-violet-200">
        <div className="container mx-auto px-4 py-8">
          {/* Main Banner with Title */}
          <div className="bg-transparent backdrop-blur backdrop-contrast-125 backdrop-saturate-175 rounded-3xl p-4 mb-8 border-2 border-white/20">
            <div className="text-center space-y-4">
              <h1 className="text-5xl md:text-8xl font-bold mb-2 tracking-tight">
                <span className="text-9xl animate-rainbow">
                  Closeted Slays
                </span>
              </h1>
              <p className="text-6xl tracking-wider font-bold text-gray-700 textborder">Pride Shirts</p>
              
              <div className="flex items-center justify-center gap-4">
                <p className="text-2xl text-gray-500">Express yourself with our exclusive designs</p>
                <Link 
                  to="/about" 
                  className="text-white bg-black font-medium py-2 px-4 rounded-full transition-all duration-200 hover:scale-105 shadow hover:shadow-md text-sm"
                >
                  About Us
                </Link>
              </div>
            </div>
          </div>

          {/* New Prominent View Cart Button */}
          <div className="mb-8 text-center">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="w-full max-w-2xl mx-auto py-4 px-8 text-2xl font-bold rounded-full transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl"
              style={{
                background: 'black',
                color: 'white',
                border: '2px solid black'
              }}
            >
              🛒 View Your Cart
            </button>
          </div>

          {/* Shirt Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {shirts.map((shirt) => (
              <ShirtCard key={shirt.id} shirt={shirt} />
            ))}
          </div>

          {/* Large About Us Button at bottom */}
          <div className="text-center">
            <Link 
              to="/about" 
              className="inline-block add-to-cart-button text-white bg-black font-semibold py-4 px-8 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              About Us
            </Link>
          </div>
        </div>

        {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
      </div>
    </CartProvider>
  );
};

export default Index;
