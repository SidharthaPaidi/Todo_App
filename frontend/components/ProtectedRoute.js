import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-light_cyan-500 via-frosted_blue-600 to-blue_green-600">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-white"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
