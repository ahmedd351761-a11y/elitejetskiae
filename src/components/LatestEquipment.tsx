import { CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function LatestEquipment() {
  const { t } = useLanguage();
  
  const jetSkis = [
    {
      category: t('equipment.category1'),
      model: t('equipment.model1'),
      image: "/2025YamahaVX-C.jpg",
      description: t('equipment.model1Desc'),
      specs: "1,049cc | 3-Cylinder Engine | Up to 3 Riders"
    },
    {
      category: t('equipment.category2'),
      model: t('equipment.model2'),
      image: "/trixx.jpg",
      description: t('equipment.model2Desc'),
      specs: "90 HP | Rotax® 900 ACE™ | Extended VTS™"
    },
    {
      category: t('equipment.category3'),
      model: t('equipment.model3'),
      image: "/rxtx.jpeg",
      subtitle: t('equipment.model3Subtitle'),
      description: t('equipment.model3Desc'),
      specs: "81 MPH @ 8,350 RPM | 350 HORSEPOWER"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/latest.jpg"
                alt="OUR JET SKIS ARE THE LATEST MODELS"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-3xl md:text-4xl font-black text-white">
                  {t('equipment.subtitle')}
                </h3>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-black text-[#0A1128]">
              {t('equipment.title')}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('equipment.description')}
            </p>

            <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6 inline-block">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-600" size={32} />
                <p className="text-lg font-bold text-green-700">
                  {t('equipment.guarantee')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
              {jetSkis.map((jetSki, index) => (
                <div key={index} className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col">
                  <div className="relative h-64 overflow-hidden bg-gray-100">
                    <img
                      src={jetSki.image}
                      alt={jetSki.model}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 space-y-3 flex-grow flex flex-col">
                    <p className="text-xs font-black text-[#E31E24] uppercase tracking-wider">
                      {jetSki.category}
                    </p>
                    <h3 className="text-xl font-black text-[#0A1128] leading-tight">
                      {jetSki.model}
                    </h3>
                    {jetSki.subtitle && (
                      <p className="text-sm font-bold text-[#0A1128]">
                        {jetSki.subtitle}
                      </p>
                    )}
                    <p className="text-sm text-gray-700 leading-relaxed flex-grow">
                      {jetSki.description}
                    </p>
                    <p className="text-xs font-bold text-[#0A1128] pt-3 border-t border-gray-200">
                      {jetSki.specs}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
