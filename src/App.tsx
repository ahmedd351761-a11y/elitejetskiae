import { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import TourPackages from './components/TourPackages';
import Statistics from './components/Statistics';
import AboutUs from './components/AboutUs';
import LatestEquipment from './components/LatestEquipment';
import FAQ from './components/FAQ';
import Instagram from './components/Instagram';
import Footer from './components/Footer';
import BookingFlow from './components/booking/BookingFlow';

type View = 'home' | 'booking';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');

  const handleBookNow = () => {
    setCurrentView('booking');
    window.scrollTo(0, 0);
  };

  const handleHomeClick = () => {
    setCurrentView('home');
    window.scrollTo(0, 0);
  };

  if (currentView === 'booking') {
    return (
      <LanguageProvider>
        <div className="min-h-screen bg-gray-50">
          <Header onBookNowClick={handleBookNow} onHomeClick={handleHomeClick} />
          <BookingFlow />
        </div>
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Header onBookNowClick={handleBookNow} onHomeClick={handleHomeClick} />
        <Hero onBookNowClick={handleBookNow} />
        <TourPackages onBookClick={handleBookNow} />
        <Statistics />
        <AboutUs />
        <LatestEquipment />
        <FAQ />
        <Instagram />
        <Footer onBookNowClick={handleBookNow} />
      </div>
    </LanguageProvider>
  );
}

export default App;
