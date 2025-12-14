import { Users, Diamond, Star, MapPin } from 'lucide-react';

export default function AboutUs() {
  const features = [
    {
      icon: Users,
      title: 'Experienced Team',
      description: 'EliteJetskisAE team has years of experience in the jet ski industry! We know what you are looking for and we will go beyond your expectation to make you have a wonderful time.'
    },
    {
      icon: Diamond,
      title: 'Quality First',
      description: 'Quality is not a one-time act. It is a habit at EliteJetskisAE! Coming for a jet ski trip or a flyboard session, we will make the extra effort to make you have the best time you could ever imagine. You will be delighted and ask for more.'
    },
    {
      icon: Star,
      title: 'Unique Experience',
      description: 'At EliteJetskisAE, we will make you feel unique. Our jet skis include 2025 Sea-Doo RXP-X 325 models with 1800cc / 325 horse power; we\'ll be looking after you from start to finish, we have it all at the ready for you.'
    },
    {
      icon: MapPin,
      title: 'Great Location',
      description: 'EliteJetskisAE rental is conveniently located on Jumeirah 4 in one of the most prestigious areas in Dubai, close by the iconic Burj al Arab and next to Kite beach, which is meters away from our station if you wanna sunbath after your jet ski session.'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-[#0A1128] mb-6">
            ABOUT US
          </h2>
          <div className="max-w-4xl mx-auto space-y-4 text-lg text-gray-700 leading-relaxed">
            <p>
              EliteJetskisAE is owned and operated by Abdullah Mubarak, a young entrepreneur passionate about watersports with years of experience in the industry.
            </p>
            <p>
              At EliteJetskisAE, we know what you are looking for and we'll meet your requirements; you can come & meet us down at 'EliteJetskisAE' to create memories which will last forever.
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
