import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    }
  }, [isAuthenticated, loading, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-light_cyan-500 via-frosted_blue-600 to-blue_green-600 animate-gradient">
      <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-white"></div>
    </div>
  );
}
