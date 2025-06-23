import { ShirtCard } from "@/components/ShirtCard";
import { Link } from "react-router-dom";

const Index = () => {
  const shirts = [
    {
      id: 1,
      name: "GNC - Gay & Cranky",
      price: "$24.99",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "This Shirt Is Gay",
      price: "$22.99",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Supreme Pride Collection",
      price: "$29.99",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Slay Now Cry Later",
      price: "$25.99",
      image: "/placeholder.svg"
    },
    {
      id: 5,
      name: "Homo Depot",
      price: "$26.99",
      image: "/placeholder.svg"
    },
    {
      id: 6,
      name: "Emotionally Attached to My Air Fryer",
      price: "$23.99",
      image: "/placeholder.svg"
    },
    {
      id: 7,
      name: "Dept of Gay Affairs",
      price: "$27.99",
      image: "/placeholder.svg"
    },
    {
      id: 8,
      name: "GAY™",
      price: "$24.99",
      image: "/placeholder.svg"
    },
    {
      id: 9,
      name: "Amazon Pride - Two Gay Delivery",
      price: "$28.99",
      image: "/placeholder.svg"
    }
  ];

return (
  <div className="min-h-screen bg-gradient-to-br from-red-200 via-pink-200 via-purple-200 via-blue-200 via-indigo-200 to-violet-200">
    <div className="container mx-auto px-4 py-8">
      {/* Main Banner with Title */}
      <div className="bg-transparent backdrop-blur backdrop-contrast-125 backdrop-saturate-175 rounded-3xl p-4 mb-4 border-2 border-white/20">
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-8xl font-bold mb-2 tracking-tight">
            <span className="text-9xl animate-rainbow ">
              Closeted Slays
            </span>
          </h1>

          <p className="text-6xl tracking-wider font-bold text-gray-700 border">Pride Shirts</p>

          {/* This will now appear on its own line with proper spacing */}
          <p className="text-2xl text-gray-500  ">Express yourself with our exclusive designs</p>
          </div>
        </div>

        {/* Shirt Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12 ">
          {shirts.map((shirt) => (
            <ShirtCard key={shirt.id} shirt={shirt} />
          ))}
        </div>

        {/* About Us Button */}
        <div className="text-center">
          <Link 
            to="/about" 
            className="inline-block text-white bg-black font-semibold py-4 px-8 rounded-full transition-all duration-2  q00 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            About Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;