import { Users, Diamond, Star, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function AboutUs() {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: Users,
      title: t('about.experiencedTeam'),
      description: t('about.experiencedTeamDesc')
    },
    {
      icon: Diamond,
      title: t('about.qualityFirst'),
      description: t('about.qualityFirstDesc')
    },
    {
      icon: Star,
      title: t('about.uniqueExperience'),
      description: t('about.uniqueExperienceDesc')
    },
    {
      icon: MapPin,
      title: t('about.greatLocation'),
      description: t('about.greatLocationDesc')
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-[#0A1128] mb-6">
            {t('about.title')}
          </h2>
          <div className="max-w-4xl mx-auto space-y-4 text-lg text-gray-700 leading-relaxed">
            <p>
              {t('about.paragraph1')}
            </p>
            <p>
              {t('about.paragraph2')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-[#E31E24] p-4 rounded-full flex-shrink-0">
                  <feature.icon size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-[#0A1128] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-xl p-8 shadow-lg">
          <div className="max-w-3xl mx-auto">
            <img
              src="/arch.jpg"
              alt="Architectural illustration of EliteJetskisAE station"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
