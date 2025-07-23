import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const RedirectHandler = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if we have a saved path from a 404 redirect
    const redirectPath = sessionStorage.getItem('redirectPath');
    if (redirectPath) {
      // Clear the stored path
      sessionStorage.removeItem('redirectPath');
      // Navigate to the stored path
      navigate(redirectPath);
    }
  }, [navigate]);
  
  return null;
};