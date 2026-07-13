import { Package } from '@/types';
import { DEFAULT_PACKAGES } from '@/data/defaultPackages';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export type PackagesSource = 'supabase' | 'fallback';

export interface PackagesResult {
  packages: Package[];
  source: PackagesSource;
  error?: string;
}

function isNetworkError(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  const message = error.message.toLowerCase();
  return (
    message.includes('failed to fetch') ||
    message.includes('network') ||
    message.includes('name not resolved')
  );
}

export async function fetchActivePackages(): Promise<PackagesResult> {
  if (!isSupabaseConfigured()) {
    return {
      packages: DEFAULT_PACKAGES,
      source: 'fallback',
      error: 'Supabase environment variables are not configured.',
    };
  }

  try {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .eq('is_active', true)
      .order('display_order');

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      return {
        packages: DEFAULT_PACKAGES,
        source: 'fallback',
        error: 'No active packages found in the database.',
      };
    }

    return { packages: data, source: 'supabase' };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : typeof error === 'object' && error !== null && 'message' in error
          ? String((error as { message: unknown }).message)
          : 'Unknown error';

    console.warn('Falling back to default packages:', message);

    return {
      packages: DEFAULT_PACKAGES,
      source: 'fallback',
      error: isNetworkError(error) || message.toLowerCase().includes('failed to fetch')
        ? 'Unable to reach the booking database. Showing standard packages.'
        : message,
    };
  }
}
