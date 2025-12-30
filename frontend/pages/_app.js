import '../styles/globals.css';
import { AuthProvider } from '../contexts/AuthContext';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <Toaster position="top-right" />
    </AuthProvider>
  );
}

export default MyApp;
