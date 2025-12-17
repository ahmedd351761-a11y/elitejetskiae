import { Award, Users, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Statistics() {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 h-full min-h-[300px]">
            <img
              src="/12years.jpg"
              alt={t('stats.yearsExperience')}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-[#0A1128] p-6">
              <h3 className="text-5xl font-black text-white mb-1">8</h3>
              <p className="text-xl text-white/90">{t('stats.yearsExperience')}</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0A1128] to-[#1a2847] rounded-xl p-8 text-white shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full">
                <Users size={48} className="text-white" />
              </div>
            </div>
            <h3 className="text-5xl font-black text-center mb-2">50,000+</h3>
            <p className="text-xl text-center text-white/90">{t('stats.satisfiedClients')}</p>
            <div className="mt-6 grid grid-cols-8 gap-2">
              {[...Array(24)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-white/20 rounded-full"
                />
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#E31E24] to-[#c41a20] rounded-xl p-8 text-white shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full">
                <Globe size={48} className="text-white" />
              </div>
            </div>
            <h3 className="text-5xl font-black text-center mb-2">{t('stats.languages')}</h3>
            <p className="text-xl text-center text-white/90">{t('stats.languagesSub')}</p>
            <div className="mt-6 flex items-center justify-center space-x-4">
              <span className="text-6xl">🇦🇪</span>
              <span className="text-6xl">🇺🇸</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
