
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-200 via-pink-200 via-purple-200 via-blue-200 via-indigo-200 to-violet-200">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors font-medium"
          >
            <ArrowLeft size={20} />
            Back to Shop
          </Link>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/85 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                <span className="bg-gradient-to-r from-red-600 via-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  About closetslays
                </span>
              </h1>
              <p className="text-xl text-gray-600">Our Story & Mission</p>
            </div>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <div className="bg-gray-50/80 rounded-2xl p-6 border border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">💝 Supporting Education</h2>
                <p className="text-lg">
                  We're a small business founded by students working hard to save for college. Every purchase you make helps us pursue our educational dreams while creating amazing pride apparel that celebrates authenticity and self-expression.
                </p>
              </div>

              <div className="bg-gray-50/80 rounded-2xl p-6 border border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">🤝 Giving Back</h2>
                <p className="text-lg">
                  We believe in supporting our community. That's why we donate 10% of every order to important causes that align with our values of equality, acceptance, and positive change.
                </p>
              </div>

              <div className="bg-gray-50/80 rounded-2xl p-6 border border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">🏳️‍🌈 Our Vision</h2>
                <p className="text-lg">
                  closetslays exists to help people express their truth through fashion. We create shirts that make statements, spark conversations, and celebrate the beautiful diversity of our community. Every design is crafted with love, humor, and pride.
                </p>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link 
                to="/" 
                className="inline-block bg-gradient-to-r from-red-600 via-purple-600 via-blue-600 to-indigo-600 hover:from-red-700 hover:via-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Shop Our Collection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
