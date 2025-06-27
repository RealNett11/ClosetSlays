import { Link } from 'react-router-dom';

const Cancel = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-200 via-pink-200 via-purple-200 via-blue-200 via-indigo-200 to-violet-200 flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 max-w-md w-full shadow-xl border border-white/50">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Order Cancelled</h2>
          <p className="text-lg text-gray-600 mb-6">
            Your order has been cancelled. No charges were made to your account.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/" 
              className="add-to-cart-button py-3 px-6 text-lg font-bold inline-block"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cancel;