import { Clock, ArrowRight } from 'lucide-react';

interface TourPackagesProps {
  onBookClick?: () => void;
}

const featuredPackages = [
  {
    id: 'burj-30',
    title: 'Burj Al Arab Sprint',
    durationMinutes: 30,
    priceAed: 250,
    location: 'Burj Al Arab',
    highlight: 'Fast-track ride with an iconic Burj Al Arab photo stop.',
    image: '/burj.jpg',
    checkoutUrl:
      'https://wa.me/971552851012?text=Hi%20EliteJetskis%20AE!%20I%27d%20like%20to%20book%20the%2030%20min%20Burj%20Al%20Arab%20tour%20for%20250%20AED.'
  },
  {
    id: 'atlantis-60',
    title: 'Atlantis Adventure',
    durationMinutes: 60,
    priceAed: 450,
    location: 'Atlantis, The Palm',
    highlight: 'Ride the Palm crescent and frame Atlantis in your shots.',
    image: '/atlantis.jpg',
    checkoutUrl:
      'https://wa.me/971552851012?text=Hi%20EliteJetskis%20AE!%20I%27d%20like%20to%20book%20the%2060%20min%20Atlantis%20tour%20for%20450%20AED.'
  },
  {
    id: 'skyline-90',
    title: 'Dubai Skyline Tour',
    durationMinutes: 90,
    priceAed: 600,
    location: 'Atlantis • Burj Al Arab • Burj Khalifa',
    highlight: 'Cover Atlantis, both Burjs, and the skyline in one loop.',
    image: '/skyline.jpg',
    checkoutUrl:
      'https://wa.me/971552851012?text=Hi%20EliteJetskis%20AE!%20I%27d%20like%20to%20book%20the%2090%20min%20Dubai%20Skyline%20tour%20for%20600%20AED.'
  },
  {
    id: 'ultimate-120',
    title: 'Ultimate Ain Dubai Loop',
    durationMinutes: 120,
    priceAed: 750,
    location: 'All Icons + Ain Dubai',
    highlight: 'Full Dubai coastline sweep including Bluewaters & Ain Dubai.',
    image: '/loop.jpg',
    checkoutUrl:
      'https://wa.me/971552851012?text=Hi%20EliteJetskis%20AE!%20I%27d%20like%20to%20book%20the%20120%20min%20Ultimate%20tour%20for%20750%20AED.'
  }
];

export default function TourPackages({ onBookClick }: TourPackagesProps = {}) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-[#0A1128] mb-4">
            OUR TOUR PACKAGES
          </h2>
          <p className="text-lg text-gray-600">
            Four signature rides. Dubai's icons. Tap to go straight to checkout.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPackages.map((pkg) => (
            <a
              key={pkg.id}
              href={pkg.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 min-h-[26rem] bg-[#0A1128]"
            >
              <img
                src={pkg.image}
                alt={pkg.title}
                className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-[#0A1128]/70 to-transparent group-hover:from-black/85 group-hover:via-[#0A1128]/80 transition-colors" />

              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="bg-white/90 text-[#0A1128] text-xs font-black tracking-wide px-3 py-1 rounded-full uppercase">
                  {pkg.location}
                </span>
                <span className="bg-[#E31E24] text-white text-xs font-black tracking-wide px-3 py-1 rounded-full flex items-center gap-2 uppercase">
                  <Clock size={14} />
                  {pkg.durationMinutes} min
                </span>
              </div>

              <div className="absolute top-4 right-4 bg-white/85 text-[#0A1128] text-sm font-black px-4 py-2 rounded-full shadow-lg">
                {pkg.priceAed} AED
              </div>

              <div className="absolute inset-x-4 bottom-5 text-white space-y-2">
                <p className="text-2xl font-black leading-tight drop-shadow-sm">
                  {pkg.title}
                </p>
                <p className="text-sm text-white/85">{pkg.highlight}</p>
                <div className="flex items-center flex-wrap gap-3 pt-3">
                  <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold">
                    Checkout / Pay
                    <ArrowRight size={16} />
                  </span>
                  {onBookClick && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        onBookClick();
                      }}
                      className="text-[#0A1128] bg-white hover:bg-gray-100 font-semibold px-4 py-2 rounded-full shadow-md transition-all hover:-translate-y-0.5"
                    >
                      Book in-app
                    </button>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
