import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '@/components/CartContext';
import ReactConfetti from 'react-confetti';

const Success = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [orderStatus, setOrderStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [windowDimensions, setWindowDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Handle window resize for confetti
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // You could verify the session with your backend if needed
    if (sessionId) {
      // Set success status after a short delay to simulate verification
      const timer = setTimeout(() => {
        setOrderStatus('success');
        setShowConfetti(true);
        
        // Hide confetti after 8 seconds
        setTimeout(() => setShowConfetti(false), 8000);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else {
      setOrderStatus('error');
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-200 via-pink-200 via-purple-200 via-blue-200 via-indigo-200 to-violet-200 flex items-center justify-center">
      {showConfetti && (
        <ReactConfetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={500}
          colors={['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3']}
        />
      )}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 max-w-md w-full shadow-xl border border-white/50">
        {orderStatus === 'loading' && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-800">Processing your order...</h2>
          </div>
        )}
        
        {orderStatus === 'success' && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h2>
            <p className="text-lg text-gray-600 mb-6">
              Your order has been successfully placed. We'll send you a confirmation email shortly.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Order ID: {sessionId?.substring(0, 8)}...
            </p>
            <Link 
              to="/" 
              className="add-to-cart-button py-3 px-6 text-lg font-bold inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        )}
        
        {orderStatus === 'error' && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Something went wrong</h2>
            <p className="text-lg text-gray-600 mb-6">
              We couldn't process your order. Please try again or contact customer support.
            </p>
            <Link 
              to="/" 
              className="add-to-cart-button py-3 px-6 text-lg font-bold inline-block"
            >
              Return to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Success;