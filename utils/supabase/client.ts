import { createClient } from '@supabase/supabase-js';

// Use environment variables for Vercel deployment
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate that environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.error('❌ MISSING SUPABASE ENVIRONMENT VARIABLES');
  console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.error('');
  console.error('The following environment variables are required:');
  console.error('  • VITE_SUPABASE_URL');
  console.error('  • VITE_SUPABASE_ANON_KEY');
  console.error('');
  console.error('For Vercel deployment:');
  console.error('  1. Go to Vercel Dashboard → Your Project → Settings');
  console.error('  2. Click "Environment Variables"');
  console.error('  3. Add both variables (see ENVIRONMENT_VARIABLES.txt)');
  console.error('  4. Redeploy without build cache');
  console.error('');
  console.error('Current values:');
  console.error('  VITE_SUPABASE_URL:', supabaseUrl || '❌ NOT SET');
  console.error('  VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ SET' : '❌ NOT SET');
  console.error('');
  console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

// Create a dummy client if env vars are missing to prevent build errors
const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a proxy that logs errors when methods are called
    return new Proxy({} as any, {
      get: () => {
        return () => Promise.reject(new Error('Supabase not configured. Please set environment variables.'));
      }
    });
  }
  
  return createClient(supabaseUrl, supabaseAnonKey);
};

export const supabase = createSupabaseClient();