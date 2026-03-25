import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import './styles/index.css';

// Check for environment variables and log helpful message
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '%c⚠️  Environment variables not configured!',
    'color: #ff6b6b; font-size: 16px; font-weight: bold;'
  );
  console.warn('This is expected during first deployment. Please add environment variables in Vercel.');
  console.warn('See START_HERE.md for instructions.');
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);