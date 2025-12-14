import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if environment variables are properly set
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey && 
  supabaseUrl !== '' && 
  supabaseAnonKey !== '' &&
  !supabaseUrl.includes('placeholder') &&
  !supabaseAnonKey.includes('placeholder'));

// Create client - only use real values if configured, otherwise use placeholder
export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl : 'https://placeholder.supabase.co',
  isSupabaseConfigured ? supabaseAnonKey : 'placeholder-key'
);

// Log configuration status
if (!isSupabaseConfigured) {
  console.warn('⚠️ Supabase not configured. Missing or invalid environment variables:');
  console.warn('   VITE_SUPABASE_URL:', supabaseUrl ? 'Set' : 'Missing');
  console.warn('   VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Set' : 'Missing');
  console.warn('   Please set these in your Netlify environment variables.');
}
