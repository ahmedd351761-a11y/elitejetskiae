import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const heroImages = [
  '/1.jpg',
  '/2.jpg',
  '/3.jpg'
];

interface HeroProps {
  onBookNowClick?: () => void;
}

export default function Hero({ onBookNowClick }: HeroProps = {}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      className="relative h-screen overflow-hidden text-white bg-[#050d21]"
      aria-label="Hero section - Jet ski rental Dubai"
      itemScope
      itemType="https://schema.org/Service"
    >
      {heroImages.map((image, index) => (
        <div
          key={image}
          aria-hidden={index !== currentImageIndex}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{ backgroundImage: `url(${image})` }}
            role="img"
            aria-label="Jet ski adventure in Dubai waters"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        </div>
      ))}

      <div className="relative h-full">
        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-16 sm:pb-20">
          <div className="max-w-2xl space-y-4">
            <p className="hero-kicker text-lg sm:text-xl uppercase tracking-[0.22em] text-white/80">
              Book your jetski today
            </p>
            <h1 className="hero-title text-5xl sm:text-6xl md:text-7xl font-black leading-tight" itemProp="name">
              <span itemProp="provider">ELITEJETSKIS</span> <span className="text-[#58d4ff]">AE</span>
              <span className="sr-only"> - Premium Jet Ski Rental Dubai, Burj Al Arab Tours, Atlantis The Palm</span>
            </h1>
            <p className="sr-only" itemProp="description">
              Dubai's premier jet ski rental service offering guided tours to Burj Al Arab, Atlantis The Palm, and Dubai Marina. 8+ years experience with 2025 Yamaha models.
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={onBookNowClick}
                className="bg-[#E31E24] hover:bg-[#c41a20] text-white px-8 py-4 rounded-full font-semibold flex items-center gap-3 transition-all hover:scale-105 shadow-xl shadow-[#E31E24]/40"
                aria-label="Book your jet ski tour now"
              >
                <span>BOOK NOW</span>
                <ArrowRight size={24} aria-hidden="true" />
              </button>
              <span className="hidden sm:block text-sm uppercase tracking-[0.18em] text-white/70">
                Dubai Marina • Burj Al Arab views • Pro instructors
              </span>
            </div>
          </div>
        </div>
      </div>

      <a 
        href="https://wa.me/971526977676?text=Hi%20Elite%20Jetskis!%20I%20want%20to%20book%20a%20jet%20ski%20tour."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-[#25D366] hover:bg-[#128C7E] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 z-40"
        aria-label="Contact us on WhatsApp"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </section>
  );
}
