import { Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface TourPackagesProps {
  onBookClick?: () => void;
}

const featuredPackages = [
  {
    id: 'burj-30',
    translationKey: 'burj30',
    durationMinutes: 30,
    priceAed: 250,
    image: '/burj.jpg',
    checkoutUrl:
      'https://wa.me/971526977676?text=Hi%20EliteJetskis%20AE!%20I%27d%20like%20to%20book%20the%2030%20min%20Burj%20Al%20Arab%20tour%20for%20250%20AED.'
  },
  {
    id: 'atlantis-60',
    translationKey: 'atlantis60',
    durationMinutes: 60,
    priceAed: 450,
    image: '/atlantis.jpg',
    checkoutUrl:
      'https://wa.me/971526977676?text=Hi%20EliteJetskis%20AE!%20I%27d%20like%20to%20book%20the%2060%20min%20Atlantis%20tour%20for%20450%20AED.'
  },
  {
    id: 'skyline-90',
    translationKey: 'skyline90',
    durationMinutes: 90,
    priceAed: 600,
    image: '/skyline.jpg',
    checkoutUrl:
      'https://wa.me/971526977676?text=Hi%20EliteJetskis%20AE!%20I%27d%20like%20to%20book%20the%2090%20min%20Dubai%20Skyline%20tour%20for%20600%20AED.'
  },
  {
    id: 'ultimate-120',
    translationKey: 'ultimate120',
    durationMinutes: 120,
    priceAed: 750,
    image: '/loop.jpg',
    checkoutUrl:
      'https://wa.me/971526977676?text=Hi%20EliteJetskis%20AE!%20I%27d%20like%20to%20book%20the%20120%20min%20Ultimate%20tour%20for%20750%20AED.'
  }
];

export default function TourPackages({ onBookClick }: TourPackagesProps = {}) {
  const { t } = useLanguage();
  
  return (
    <section 
      className="py-20 bg-gray-50" 
      id="packages"
      aria-labelledby="packages-heading"
      itemScope 
      itemType="https://schema.org/ItemList"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 
            id="packages-heading"
            className="text-4xl md:text-5xl font-black text-[#0A1128] mb-4"
          >
            {t('packages.title')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('packages.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPackages.map((pkg, index) => (
            <article
              key={pkg.id}
              itemScope
              itemType="https://schema.org/Product"
              itemProp="itemListElement"
              className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 min-h-[26rem] bg-[#0A1128]"
            >
              <meta itemProp="position" content={String(index + 1)} />
              <a
                href={pkg.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10"
                aria-label={`Book ${t(`packages.${pkg.translationKey}.title`)} - ${pkg.durationMinutes} minutes for ${pkg.priceAed} AED`}
                itemProp="url"
              />
              <img
                src={pkg.image}
                alt={`${t(`packages.${pkg.translationKey}.title`)} - Jet ski tour to ${t(`packages.${pkg.translationKey}.location`)} Dubai`}
                className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                itemProp="image"
                width="400"
                height="500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-[#0A1128]/70 to-transparent group-hover:from-black/85 group-hover:via-[#0A1128]/80 transition-colors" />

              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="bg-white/90 text-[#0A1128] text-xs font-black tracking-wide px-3 py-1 rounded-full uppercase">
                  {t(`packages.${pkg.translationKey}.location`)}
                </span>
                <span className="bg-[#E31E24] text-white text-xs font-black tracking-wide px-3 py-1 rounded-full flex items-center gap-2 uppercase">
                  <Clock size={14} />
                  {pkg.durationMinutes} {t('packages.min')}
                </span>
              </div>

              <div className="absolute top-4 right-4 bg-white/85 text-[#0A1128] text-sm font-black px-4 py-2 rounded-full shadow-lg">
                {pkg.priceAed} AED
              </div>

              <div className="absolute inset-x-4 bottom-5 text-white space-y-2">
                <h3 className="text-2xl font-black leading-tight drop-shadow-sm" itemProp="name">
                  {t(`packages.${pkg.translationKey}.title`)}
                </h3>
                <p className="text-sm text-white/85" itemProp="description">{t(`packages.${pkg.translationKey}.highlight`)}</p>
                <div itemProp="offers" itemScope itemType="https://schema.org/Offer" className="hidden">
                  <meta itemProp="priceCurrency" content="AED" />
                  <meta itemProp="price" content={String(pkg.priceAed)} />
                  <link itemProp="availability" href="https://schema.org/InStock" />
                </div>
                <div className="flex items-center flex-wrap gap-3 pt-3">
                  <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold">
                    {t('packages.checkout')}
                    <ArrowRight size={16} aria-hidden="true" />
                  </span>
                  {onBookClick && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onBookClick();
                      }}
                      className="relative z-20 text-[#0A1128] bg-white hover:bg-gray-100 font-semibold px-4 py-2 rounded-full shadow-md transition-all hover:-translate-y-0.5"
                    >
                      {t('packages.bookInApp')}
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
