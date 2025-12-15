import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Throw early in development to surface misconfiguration
if (import.meta.env.DEV && (!supabaseUrl || !supabaseAnonKey)) {
  throw new Error(
    'Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
  );
}

// In production, if env vars are missing, the client will fail on first request
// This is intentional - we want real errors, not silent fallbacks
export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '');
