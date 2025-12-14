import { useEffect, useState } from 'react';
import { Clock, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Package } from '../../types';
import { formatPrice } from '../../utils/bookingUtils';

interface Props {
  onSelect: (pkg: Package) => void;
}

// Fallback packages in case Supabase is unavailable
const fallbackPackages: Package[] = [
  {
    id: 'burj-30',
    name: '30 Minutes - Burj Al Arab Tour',
    duration_minutes: 30,
    price_aed: 250,
    description: 'Experience the thrill of jet skiing with stunning views of the iconic Burj Al Arab',
    max_participants: 2,
    is_active: true,
    display_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 'atlantis-60',
    name: '60 Minutes - Atlantis Tour',
    duration_minutes: 60,
    price_aed: 450,
    description: 'Extended tour featuring Atlantis The Palm and surrounding areas',
    max_participants: 2,
    is_active: true,
    display_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: 'skyline-90',
    name: '90 Minutes - Dubai Skyline Tour',
    duration_minutes: 90,
    price_aed: 600,
    description: 'Comprehensive tour including Atlantis and both Burjs with breathtaking skyline views',
    max_participants: 2,
    is_active: true,
    display_order: 3,
    created_at: new Date().toISOString()
  },
  {
    id: 'ultimate-120',
    name: '120 Minutes - Complete Experience',
    duration_minutes: 120,
    price_aed: 750,
    description: 'Ultimate Dubai experience including Ain Dubai and all major landmarks',
    max_participants: 2,
    is_active: true,
    display_order: 4,
    created_at: new Date().toISOString()
  }
];

export default function PackageSelection({ onSelect }: Props) {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    fetchPackages();
  }, []);

  async function fetchPackages() {
    try {
      setError('');
      const { data, error: supabaseError } = await supabase
        .from('packages')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
        // Use fallback packages if Supabase fails
        setPackages(fallbackPackages);
        setUsingFallback(true);
        setError('Using default packages. Database connection unavailable.');
      } else if (data && data.length > 0) {
        setPackages(data);
        setUsingFallback(false);
      } else {
        // No packages in database, use fallback
        setPackages(fallbackPackages);
        setUsingFallback(true);
        setError('No packages found. Using default packages.');
      }
    } catch (err) {
      console.error('Error fetching packages:', err);
      // Use fallback packages on any error
      setPackages(fallbackPackages);
      setUsingFallback(true);
      setError('Unable to load packages from database. Using default packages.');
    } finally {
      setLoading(false);
    }
  }

  // Default images to cycle through if package doesn't have image_url
  const defaultPackageImages = [
    '/burj.jpg',
    '/atlantis.jpg',
    '/skyline.jpg',
    '/loop.jpg'
  ];

  // Helper function to get image for a package
  const getPackageImage = (pkg: Package, index: number): string => {
    // First priority: use image_url from database if available
    if (pkg.image_url) {
      return pkg.image_url;
    }
    // Fallback: cycle through default images using modulo
    return defaultPackageImages[index % defaultPackageImages.length];
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-black text-[#0A1128] mb-8 text-center">
          Select Your Package
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-200 rounded-xl h-80 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-black text-[#0A1128] mb-8 text-center">
        Select Your Package
      </h2>

      {error && (
        <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="text-yellow-400 mr-3" size={20} />
            <p className="text-sm text-yellow-700">{error}</p>
          </div>
        </div>
      )}

      {packages.length === 0 && !loading && (
        <div className="text-center py-12">
          <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-600">No packages available at the moment.</p>
          <p className="text-sm text-gray-500 mt-2">Please try again later or contact us directly.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {packages.map((pkg, index) => (
          <div
            key={pkg.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all cursor-pointer group"
            onClick={() => onSelect(pkg)}
          >
            <div className="relative h-48">
              <img
                src={getPackageImage(pkg, index)}
                alt={pkg.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  // Fallback to first default image if image fails to load
                  const target = e.target as HTMLImageElement;
                  
                  // Extract pathname from the current src URL for comparison
                  let currentPath: string;
                  try {
                    // If src is already a full URL, extract pathname
                    const url = new URL(target.src);
                    currentPath = url.pathname;
                  } catch {
                    // If src is a relative path, use it directly
                    currentPath = target.src;
                  }
                  
                  const fallbackPath = defaultPackageImages[0];
                  
                  // Only set fallback if we haven't already tried it (prevent infinite loop)
                  if (currentPath !== fallbackPath) {
                    target.src = fallbackPath;
                  } else {
                    // If fallback also failed, hide the image to prevent infinite loop
                    target.style.display = 'none';
                  }
                }}
              />
              <div className="absolute top-4 right-4 bg-[#E31E24] text-white px-4 py-2 rounded-full flex items-center space-x-2">
                <Clock size={16} />
                <span className="font-semibold">{pkg.duration_minutes} min</span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-black text-[#0A1128] mb-2">
                {pkg.name}
              </h3>
              {pkg.description && (
                <p className="text-gray-600 mb-4">
                  {pkg.description}
                </p>
              )}

              <div className="flex items-center space-x-2 text-gray-600 mb-4">
                <Users size={18} />
                <span>Up to {pkg.max_participants} participants</span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <span className="text-3xl font-black text-[#E31E24]">
                    {formatPrice(pkg.price_aed)}
                  </span>
                </div>
                <div className="bg-[#E31E24] group-hover:bg-[#c41a20] text-white px-6 py-3 rounded-full font-semibold flex items-center space-x-2 transition-all">
                  <span>Select</span>
                  <CheckCircle size={18} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}