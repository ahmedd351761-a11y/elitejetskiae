import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create client with fallback values if env vars are missing (for graceful degradation)
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

// Log warning in development if env vars are missing
if (import.meta.env.DEV && (!supabaseUrl || !supabaseAnonKey)) {
  console.warn('⚠️ Missing Supabase environment variables. Some features may not work.');
}
