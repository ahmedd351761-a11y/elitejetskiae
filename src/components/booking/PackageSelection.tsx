import { useEffect, useState } from 'react';
import { Clock, Users, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Package } from '@/types';
import { formatPrice } from '@/utils/bookingUtils';
import { useLanguage } from '../../contexts/LanguageContext';

interface Props {
  onSelect: (pkg: Package) => void;
}

export default function PackageSelection({ onSelect }: Props) {
  const { t } = useLanguage();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchPackages();
  }, []);

  async function fetchPackages() {
    setLoading(true);
    setError('');
    
    try {
      const { data, error: supabaseError } = await supabase
        .from('packages')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
        setError(`Failed to load packages: ${supabaseError.message}`);
        setPackages([]);
        return;
      }

      if (!data || data.length === 0) {
        setError('No packages are currently available. Please contact us directly.');
        setPackages([]);
        return;
      }

      setPackages(data);
    } catch (err) {
      console.error('Error fetching packages:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`Unable to load packages: ${errorMessage}. Please try again or contact us.`);
      setPackages([]);
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
    if (pkg.image_url) {
      return pkg.image_url;
    }
    return defaultPackageImages[index % defaultPackageImages.length];
  };

  // Helper function to translate package name and description
  const translatePackage = (pkg: Package) => {
    const duration = pkg.duration_minutes;
    const nameKey = `package.db.${duration}.name`;
    const descKey = `package.db.${duration}.desc`;
    
    // Try to get translation, fallback to original if not found
    const translatedName = t(nameKey);
    const translatedDesc = t(descKey);
    
    return {
      name: translatedName !== nameKey ? translatedName : pkg.name,
      description: translatedDesc !== descKey ? translatedDesc : pkg.description
    };
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-black text-[#0A1128] mb-8 text-center">
          {t('booking.selectPackage')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-200 rounded-xl h-80 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-black text-[#0A1128] mb-8 text-center">
          {t('booking.selectPackage')}
        </h2>
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={fetchPackages}
            className="inline-flex items-center space-x-2 bg-[#E31E24] hover:bg-[#c41a20] text-white px-6 py-3 rounded-full font-semibold transition-all"
          >
            <RefreshCw size={18} />
            <span>{t('booking.tryAgain')}</span>
          </button>
          <p className="text-sm text-gray-500 mt-4">
            Or contact us via WhatsApp: <a href="https://wa.me/971526977676" className="text-[#E31E24] hover:underline">+971 52 697 7676</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-black text-[#0A1128] mb-8 text-center">
        {t('booking.selectPackage')}
      </h2>

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
                  const target = e.target as HTMLImageElement;
                  const fallbackSrc = defaultPackageImages[0];
                  if (target.src !== window.location.origin + fallbackSrc) {
                    target.src = fallbackSrc;
                  }
                }}
              />
              <div className="absolute top-4 right-4 bg-[#E31E24] text-white px-4 py-2 rounded-full flex items-center space-x-2">
                <Clock size={16} />
                <span className="font-semibold">{pkg.duration_minutes} {t('packages.min')}</span>
              </div>
            </div>

            <div className="p-6">
              {(() => {
                const translated = translatePackage(pkg);
                return (
                  <>
                    <h3 className="text-2xl font-black text-[#0A1128] mb-2">
                      {translated.name}
                    </h3>
                    {translated.description && (
                      <p className="text-gray-600 mb-4">
                        {translated.description}
                      </p>
                    )}
                  </>
                );
              })()}

              <div className="flex items-center space-x-2 text-gray-600 mb-4">
                <Users size={18} />
                <span>{t('booking.upToParticipants')} {pkg.max_participants} {t('booking.participantsText')}</span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <span className="text-3xl font-black text-[#E31E24]">
                    {formatPrice(pkg.price_aed)}
                  </span>
                </div>
                <div className="bg-[#E31E24] group-hover:bg-[#c41a20] text-white px-6 py-3 rounded-full font-semibold flex items-center space-x-2 transition-all">
                  <span>{t('booking.select')}</span>
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
