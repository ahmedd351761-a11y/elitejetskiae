import { useEffect, useState } from 'react';
import { Clock, Users, CheckCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Package } from '../../types';
import { formatPrice } from '../../utils/bookingUtils';

interface Props {
  onSelect: (pkg: Package) => void;
}

export default function PackageSelection({ onSelect }: Props) {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, []);

  async function fetchPackages() {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .eq('is_active', true)
      .order('display_order');

    if (!error && data) {
      setPackages(data);
    }
    setLoading(false);
  }

  const packageImages = [
    '/burj.jpg',
    '/atlantis.jpg',
    '/skyline.jpg',
    '/loop.jpg'
  ];

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {packages.map((pkg, index) => (
          <div
            key={pkg.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all cursor-pointer group"
            onClick={() => onSelect(pkg)}
          >
            <div className="relative h-48">
              <img
                src={packageImages[index]}
                alt={pkg.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
