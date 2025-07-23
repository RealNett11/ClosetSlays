import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div id="top" className="min-h-screen bg-gradient-to-br from-red-200 via-pink-200 via-purple-200 via-blue-200 via-indigo-200 to-violet-200">
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
                  About Closet Slays
                </span>
              </h1>
            </div>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              {/* Our Vision */}
              <div className="bg-gray-50/80 rounded-2xl p-6 border border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">🏳️‍🌈 Our Vision</h2>
                <p className="text-lg">
                  At Closet Slays, we believe in speaking out, being bold, and expressing your true self without compromise. Our apparel is designed to celebrate diversity, spark conversations, and empower you to wear your identity with pride. Every piece we create is crafted with love, humor, and the unwavering belief that fashion should be as unique as you are.
                </p>
              </div>

              {/* Giving Back */}
              <div className="bg-gray-50/80 rounded-2xl p-6 border border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">🤝 Giving Back</h2>
                <p className="text-lg">
                  At Closet Slays, we put our values into action. We support organizations that share our commitment to equality and acceptance, because fashion should do more than look good it should do good. Every purchase helps us create positive change, proving that together, we're building more than a brand we're building a better world.
                </p>
              </div>

              {/* Supporting Education */}
              <div className="bg-gray-50/80 rounded-2xl p-6 border border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">💝 Supporting Education</h2>
                <p className="text-lg">
                  We're a student-founded small business working hard to save for college. Your support doesn't just get you amazing pride apparel - it helps us pursue our educational dreams and build a future where we can continue making a difference through our work.
                </p>
              </div>

              {/* Delivery Policy */}
              <div className="bg-gray-50/80 rounded-2xl p-6 border border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">🚚 Delivery Policy</h2>
                <p className="text-lg">
                  All items are made to order and typically ship within 3–7 business days. Once your order has shipped, you'll receive a tracking number via email.
                </p>
              </div>

              {/* Refund & Cancellation Policy */}
              <div className="bg-gray-50/80 rounded-2xl p-6 border border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">🛍️ Refund & Cancellation Policy</h2>
                <p className="text-lg">
                  We offer refunds within 30 days with proof of purchase. Your satisfaction is important to us, and we're committed to making things right if you're not completely happy with your order. Please note: orders cannot be cancelled once placed, as production begins shortly after purchase.
                </p>
              </div>

{/* Secure Payments */}
              <div className="bg-gray-50/80 rounded-2xl p-6 border border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">💳 Secure Payments</h2>
                <p className="text-lg">
                  All prices are listed in USD ($). Payments are processed securely through Stripe and comply with PCI standards. Your payment information is encrypted and protected throughout checkout. As well as this we collect no meta data and information.
                </p>
              </div>
            </div>

            
              {/* Contact Us */}
              <div className="bg-gray-50/80 rounded-2xl p-6 border border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">📬 Contact Us</h2>
                <p className="text-lg">
                  Have questions or just want to say hello? Reach out to us at <span className="font-bold">closetslays@proton.me</span> or <span className="font-bold">612-470-6557</span>. We'd love to hear from you about anything - from product inquiries to suggestions for new designs that celebrate our community.
                </p>
              </div>

              

            {/* CTA Button */}
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
