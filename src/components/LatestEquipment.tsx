import { CheckCircle } from 'lucide-react';

export default function LatestEquipment() {
  const jetSkis = [
    {
      category: "FOR COMFORT & VERSATILITY",
      model: "2025 Yamaha VX-C",
      image: "/2025YamahaVX-C.jpg",
      description: "Versatile. Reliable. Perfect for All Riders. The ideal choice for recreational adventures and family outings with exceptional stability and comfort.",
      specs: "1,049cc | 3-Cylinder Engine | Up to 3 Riders"
    },
    {
      category: "FOR TRICKS & STUNTS",
      model: "2025 Spark Trixx™",
      image: "/trixx.jpg",
      description: "Playful. Agile. Built For Stunts. Your go-to for freestyle tricks and exhilarating water maneuvers with enhanced control and stability.",
      specs: "90 HP | Rotax® 900 ACE™ | Extended VTS™"
    },
    {
      category: "FOR SPEED & POWER",
      model: "2021 SEA-DOO RXT-X 350",
      image: "/rxtx.jpeg",
      subtitle: "LIMITED EDITION PURPLE/NEON",
      description: "Sporty. Powerful. Made for Thrill Chasers. Experience unmatched speed and performance with cutting-edge technology and race-inspired design.",
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
                  OUR JET SKIS ARE THE LATEST MODELS
                </h3>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-black text-[#0A1128]">
              2025 MODELS
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We'll make this the best Jet Ski experience you've ever had. At EliteJetskis AE, we create memories via our tours, so that our customers can relive them again and again. We are the best Jet Ski service in Dubai.
            </p>

            <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6 inline-block">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-600" size={32} />
                <p className="text-lg font-bold text-green-700">
                  The best Jet Ski experience you've ever had!
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
