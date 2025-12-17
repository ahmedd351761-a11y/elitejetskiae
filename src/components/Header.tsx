import { useState } from 'react';
import { User, ShoppingCart, Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  onBookNowClick?: () => void;
  onHomeClick?: () => void;
}

export default function Header({ onBookNowClick, onHomeClick }: HeaderProps = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const cartCount = 0;

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[#0A1128]/70 via-[#0A1128]/50 to-transparent backdrop-blur-md border-b border-white/5"
      role="banner"
    >
      <nav className="container mx-auto px-4 py-4" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); onHomeClick?.(); }}
              className="flex items-center gap-4 hover:opacity-80 transition-opacity"
              aria-label="Elite Jetskis AE - Home"
            >
              <img
                src="/logo.jpg"
                alt="Elite Jetskis AE - Dubai's Premier Jet Ski Rental"
                className="h-14 w-auto drop-shadow-lg"
                width="56"
                height="56"
              />
              <div className="hidden sm:block leading-tight uppercase text-white font-black tracking-tight">
                <span className="text-[11px] tracking-[0.25em] text-white/70">{t('header.bookYour')}</span>
                <span className="text-lg block">Elite Jetskis AE</span>
              </div>
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4 text-white">
            <button
              onClick={onBookNowClick}
              className="bg-[#E31E24] hover:bg-[#c41a20] px-5 py-2 rounded-full text-sm font-semibold shadow-lg shadow-[#E31E24]/40 transition-all hover:-translate-y-0.5"
            >
              {t('header.bookNow')}
            </button>

            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <User size={22} />
            </button>

            <button className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <ShoppingCart size={22} />
              <span className="absolute -top-1.5 -right-1.5 bg-[#E31E24] text-white text-[11px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md shadow-[#E31E24]/50">
                {cartCount}
              </span>
            </button>

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <span className="text-2xl">{language === 'en' ? '🇬🇧' : '🇦🇪'}</span>
              <span className="text-xs font-semibold">{language.toUpperCase()}</span>
            </button>
          </div>

          <div className="md:hidden flex items-center gap-3 text-white">
            <button
              onClick={onBookNowClick}
              className="bg-[#E31E24] px-4 py-2 rounded-full text-xs font-semibold shadow-lg shadow-[#E31E24]/40"
            >
              {t('header.book')}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4 space-y-3 text-white">
            <button
              onClick={() => {
                onBookNowClick?.();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-[#E31E24] px-4 py-3 rounded-full font-semibold shadow-lg shadow-[#E31E24]/40"
            >
              {t('header.bookNow')}
            </button>

            <button className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/10 transition-colors">
              <User size={22} />
              <span>{t('header.account')}</span>
            </button>

            <button className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/10 transition-colors">
              <ShoppingCart size={22} />
              <span>{t('header.cart')} ({cartCount})</span>
            </button>

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <span className="text-2xl">{language === 'en' ? '🇬🇧' : '🇦🇪'}</span>
              <span>{t('header.language')}: {language.toUpperCase()}</span>
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
