import { ArrowRight, Instagram as InstagramIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Instagram() {
  const { t } = useLanguage();
  const instagramPosts = [
    '/latest.jpg',
    '/burj.jpg',
    '/atlantis.jpg',
    '/skyline.jpg'
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-[#0A1128]">
            {t('instagram.title')}
          </h2>
          <a
            href="https://www.instagram.com/elitejetskisae/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex bg-[#E31E24] hover:bg-[#c41a20] text-white px-6 py-3 rounded-full font-semibold items-center space-x-2 transition-all hover:scale-105"
          >
            <span>{t('instagram.followUs')}</span>
            <ArrowRight size={20} />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {instagramPosts.map((post, index) => (
            <a
              key={index}
              href="https://www.instagram.com/elitejetskisae/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all"
            >
              <img
                src={post}
                alt={`Instagram post ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                <InstagramIcon
                  size={48}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <a
            href="https://www.instagram.com/elitejetskisae/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex bg-[#E31E24] hover:bg-[#c41a20] text-white px-6 py-3 rounded-full font-semibold items-center space-x-2 transition-all hover:scale-105"
          >
            <span>{t('instagram.followUs')}</span>
            <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
