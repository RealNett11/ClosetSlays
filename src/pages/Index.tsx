
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
        <div className="bg-white/85 backdrop-blur-md rounded-3xl p-8 mb-12 shadow-xl border border-white/30">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-3 tracking-tight">
              <span className="bg-gradient-to-r from-red-600 via-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                closetslays
              </span>
            </h1>
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-4 max-w-md mx-auto"></div>
            <p className="text-xl text-gray-600 font-medium">Pride Shirts</p>
            <p className="text-sm text-gray-500 mt-1">Express yourself with our exclusive designs</p>
          </div>
        </div>

        {/* Shirt Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {shirts.map((shirt) => (
            <ShirtCard key={shirt.id} shirt={shirt} />
          ))}
        </div>

        {/* About Us Button */}
        <div className="text-center">
          <Link 
            to="/about" 
            className="inline-block bg-gradient-to-r from-red-600 via-purple-600 via-blue-600 to-indigo-600 hover:from-red-700 hover:via-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            About Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
