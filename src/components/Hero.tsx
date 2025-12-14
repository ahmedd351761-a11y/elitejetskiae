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
    <section className="relative h-screen overflow-hidden text-white bg-[#050d21]">
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
            <h1 className="hero-title text-5xl sm:text-6xl md:text-7xl font-black leading-tight">
              ELITEJETSKIS <span className="text-[#58d4ff]">AE</span>
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={onBookNowClick}
                className="bg-[#E31E24] hover:bg-[#c41a20] text-white px-8 py-4 rounded-full font-semibold flex items-center gap-3 transition-all hover:scale-105 shadow-xl shadow-[#E31E24]/40"
              >
                <span>BOOK NOW</span>
                <ArrowRight size={24} />
              </button>
              <span className="hidden sm:block text-sm uppercase tracking-[0.18em] text-white/70">
                Dubai marina • Burj Al Arab views • Pro instructors
              </span>
            </div>
          </div>
        </div>
      </div>

      <button className="fixed bottom-8 right-8 bg-[#E31E24] hover:bg-[#c41a20] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 z-40">
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
        </svg>
      </button>
    </section>
  );
}
