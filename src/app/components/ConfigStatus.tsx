import { useEffect, useState } from 'react';

export function ConfigStatus() {
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    // Only show if environment variables are missing
    if (!supabaseUrl || !supabaseAnonKey) {
      setShow(true);
      
      // Log helpful information
      console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #ff6b6b; font-weight: bold;');
      console.log('%c⚠️  CONFIGURATION WARNING', 'color: #ff6b6b; font-size: 16px; font-weight: bold;');
      console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #ff6b6b; font-weight: bold;');
      console.log('');
      console.log('Missing environment variables:');
      if (!supabaseUrl) {
        console.log('  ❌ VITE_SUPABASE_URL not set');
      } else {
        console.log('  ✅ VITE_SUPABASE_URL:', supabaseUrl);
      }
      if (!supabaseAnonKey) {
        console.log('  ❌ VITE_SUPABASE_ANON_KEY not set');
      } else {
        console.log('  ✅ VITE_SUPABASE_ANON_KEY: [REDACTED]');
      }
      console.log('');
      console.log('The app will not work properly until these are configured.');
      console.log('See the banner on the page for instructions.');
      console.log('');
      console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #ff6b6b; font-weight: bold;');
    }
  }, []);
  
  if (!show) return null;
  
  return (
    <div className="fixed top-0 left-0 right-0 bg-red-600 text-white p-4 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start gap-3">
          <svg
            className="w-6 h-6 flex-shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div className="flex-1">
            <h3 className="font-bold mb-1">Configuration Required</h3>
            <p className="text-sm opacity-90">
              Environment variables are missing. This app requires <code className="bg-red-700 px-1 rounded">VITE_SUPABASE_URL</code> and{' '}
              <code className="bg-red-700 px-1 rounded">VITE_SUPABASE_ANON_KEY</code> to be set.
            </p>
            <p className="text-sm opacity-90 mt-1">
              See <strong>START_HERE.md</strong> or check the browser console for instructions.
            </p>
          </div>
          <button
            onClick={() => setShow(false)}
            className="text-white hover:text-red-100 flex-shrink-0"
            aria-label="Dismiss"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
