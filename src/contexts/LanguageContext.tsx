import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation keys
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    'header.bookNow': 'Book Now',
    'header.book': 'Book',
    'header.account': 'Account',
    'header.cart': 'Cart',
    'header.language': 'Language',
    'header.bookYour': 'Book your',
    
    // Hero
    'hero.kicker': 'Book your jetski today',
    'hero.bookNow': 'BOOK NOW',
    'hero.subtitle': 'Dubai Marina • Burj Al Arab views • Pro instructors',
    
    // Tour Packages
    'packages.title': 'Jet Ski Tour Packages Dubai',
    'packages.subtitle': 'Four signature rides. Dubai\'s icons. Book online for instant confirmation.',
    'packages.checkout': 'Checkout / Pay',
    'packages.bookInApp': 'Book in-app',
    'packages.min': 'min',
    // Package 1: Burj Al Arab Sprint
    'packages.burj30.title': 'Burj Al Arab Sprint',
    'packages.burj30.location': 'Burj Al Arab',
    'packages.burj30.highlight': 'Fast-track ride with an iconic Burj Al Arab photo stop.',
    // Package 2: Atlantis Adventure
    'packages.atlantis60.title': 'Atlantis Adventure',
    'packages.atlantis60.location': 'Atlantis, The Palm',
    'packages.atlantis60.highlight': 'Ride the Palm crescent and frame Atlantis in your shots.',
    // Package 3: Dubai Skyline Tour
    'packages.skyline90.title': 'Dubai Skyline Tour',
    'packages.skyline90.location': 'Atlantis • Burj Al Arab • Burj Khalifa',
    'packages.skyline90.highlight': 'Cover Atlantis, both Burjs, and the skyline in one loop.',
    // Package 4: Ultimate Ain Dubai Loop
    'packages.ultimate120.title': 'Ultimate Ain Dubai Loop',
    'packages.ultimate120.location': 'All Icons + Ain Dubai',
    'packages.ultimate120.highlight': 'Full Dubai coastline sweep including Bluewaters & Ain Dubai.',
    
    // Statistics
    'stats.yearsExperience': 'years of experience',
    'stats.satisfiedClients': 'satisfied clients',
    'stats.languages': '2 Languages',
    'stats.languagesSub': 'EN AR',
    
    // About Us
    'about.title': 'ABOUT US',
    'about.paragraph1': 'EliteJetskisAE is owned and operated by Abdullah Mubarak, a young entrepreneur passionate about watersports with years of experience in the industry.',
    'about.paragraph2': 'At EliteJetskisAE, we know what you are looking for and we\'ll meet your requirements; you can come & meet us down at \'EliteJetskisAE\' to create memories which will last forever.',
    'about.experiencedTeam': 'Experienced Team',
    'about.experiencedTeamDesc': 'EliteJetskisAE team has years of experience in the jet ski industry! We know what you are looking for and we will go beyond your expectation to make you have a wonderful time.',
    'about.qualityFirst': 'Quality First',
    'about.qualityFirstDesc': 'Quality is not a one-time act. It is a habit at EliteJetskisAE! Coming for a jet ski trip or a flyboard session, we will make the extra effort to make you have the best time you could ever imagine. You will be delighted and ask for more.',
    'about.uniqueExperience': 'Unique Experience',
    'about.uniqueExperienceDesc': 'At EliteJetskisAE, we will make you feel unique. Our jet skis include 2025 Sea-Doo RXP-X 325 models with 1800cc / 325 horse power; we\'ll be looking after you from start to finish, we have it all at the ready for you.',
    'about.greatLocation': 'Great Location',
    'about.greatLocationDesc': 'EliteJetskisAE rental is conveniently located on Jumeirah 4 in one of the most prestigious areas in Dubai, close by the iconic Burj al Arab and next to Kite beach, which is meters away from our station if you wanna sunbath after your jet ski session.',
    
    // FAQ
    'faq.title': 'FREQUENTLY ASKED QUESTIONS',
    'faq.subtitle': 'Everything you need to know',
    'faq.q1': 'I have never driven a Jet Ski, can I take part in the trip?',
    'faq.a1': 'Absolutely! Our experienced team will provide full training and guidance before your tour. We ensure all safety measures are in place and will teach you everything you need to know to enjoy your jet ski experience safely.',
    'faq.q2': 'Do I need a boat or Jetski license to drive the Jetski?',
    'faq.a2': 'No license is required! Our tours are guided and we provide comprehensive instructions before departure. However, you must be at least 16 years old to drive a jet ski.',
    'faq.q3': 'Can my child sit behind me?',
    'faq.a3': 'Yes, children can ride as passengers if they are at least 5 years old. They must wear proper safety equipment including life jackets which we provide. Maximum 2 people per jet ski.',
    'faq.q4': 'Do you take pictures while at sea?',
    'faq.a4': 'Yes! We offer photography services during your tour to capture your amazing experience. You can purchase the photos after your tour or bring your own waterproof camera.',
    'faq.q5': 'I don\'t know how to swim, is that risky?',
    'faq.a5': 'While swimming ability is recommended, it is not mandatory. All participants must wear life jackets at all times, which we provide. Our guides are trained in water safety and will be with you throughout the tour.',
    'faq.q6': 'What should I bring for the jet ski tour?',
    'faq.a6': 'We recommend bringing sunscreen, sunglasses with a strap, a towel, and a change of clothes. Waterproof cameras are welcome. We provide all safety equipment including life jackets.',
    'faq.q7': 'What is the minimum age requirement?',
    'faq.a7': 'The minimum age to drive a jet ski is 16 years old. Children from 5 years and above can ride as passengers with an adult. All minors must be accompanied by a parent or legal guardian.',
    'faq.q8': 'What happens if weather conditions are bad?',
    'faq.a8': 'Safety is our top priority. If weather conditions are unsuitable, we will contact you to reschedule your booking or offer a full refund. We monitor weather conditions closely and will never compromise on safety.',
    
    // Footer
    'footer.bookNow': 'BOOK NOW',
    'footer.quickLinks': 'QUICK LINKS',
    'footer.home': 'Home',
    'footer.tourPackages': 'Tour Packages',
    'footer.about': 'About Us',
    'footer.faq': 'FAQ',
    'footer.contactUs': 'Contact Us',
    'footer.ourServices': 'OUR SERVICES',
    'footer.service1': 'Jet Ski Rental Dubai',
    'footer.service2': 'Burj Al Arab Jet Ski Tour',
    'footer.service3': 'Atlantis The Palm Tour',
    'footer.service4': 'Dubai Marina Water Sports',
    'footer.service5': 'Private Jet Ski Tours',
    'footer.stayConnected': 'STAY CONNECTED',
    'footer.newsletter': 'Subscribe to our newsletter for exclusive offers and Dubai water sports updates.',
    'footer.emailPlaceholder': 'Your email',
    'footer.subscribe': 'Subscribe',
    'footer.followUs': 'Follow Us',
    'footer.rights': 'All rights reserved.',
    
    // Booking
    'booking.selectPackage': 'Select Your Package',
    'booking.tryAgain': 'Try Again',
    'booking.select': 'Select',
    
    // Latest Equipment
    'equipment.title': '2025 MODELS',
    'equipment.subtitle': 'OUR JET SKIS ARE THE LATEST MODELS',
    'equipment.description': 'We\'ll make this the best Jet Ski experience you\'ve ever had. At EliteJetskis AE, we create memories via our tours, so that our customers can relive them again and again. We are the best Jet Ski service in Dubai.',
    'equipment.guarantee': 'The best Jet Ski experience you\'ve ever had!',
    'equipment.category1': 'FOR COMFORT & VERSATILITY',
    'equipment.category2': 'FOR TRICKS & STUNTS',
    'equipment.category3': 'FOR SPEED & POWER',
    'equipment.model1': '2025 Yamaha VX-C',
    'equipment.model1Desc': 'Versatile. Reliable. Perfect for All Riders. The ideal choice for recreational adventures and family outings with exceptional stability and comfort.',
    'equipment.model2': '2025 Spark Trixx™',
    'equipment.model2Desc': 'Playful. Agile. Built For Stunts. Your go-to for freestyle tricks and exhilarating water maneuvers with enhanced control and stability.',
    'equipment.model3': '2021 SEA-DOO RXT-X 350',
    'equipment.model3Subtitle': 'LIMITED EDITION PURPLE/NEON',
    'equipment.model3Desc': 'Sporty. Powerful. Made for Thrill Chasers. Experience unmatched speed and performance with cutting-edge technology and race-inspired design.',
    
    // Instagram
    'instagram.title': 'FOLLOW US ON INSTAGRAM',
    'instagram.followUs': 'FOLLOW US',
  },
  ar: {
    // Header
    'header.bookNow': 'احجز الآن',
    'header.book': 'احجز',
    'header.account': 'الحساب',
    'header.cart': 'السلة',
    'header.language': 'اللغة',
    'header.bookYour': 'احجز',
    
    // Hero
    'hero.kicker': 'احجز جت سكي اليوم',
    'hero.bookNow': 'احجز الآن',
    'hero.subtitle': 'دبي مارينا • إطلالات برج العرب • مدربون محترفون',
    
    // Tour Packages
    'packages.title': 'باقات جولات جت سكي دبي',
    'packages.subtitle': 'أربع رحلات مميزة. معالم دبي. احجز عبر الإنترنت للحصول على تأكيد فوري.',
    'packages.checkout': 'الدفع',
    'packages.bookInApp': 'احجز في التطبيق',
    'packages.min': 'دقيقة',
    // Package 1: Burj Al Arab Sprint
    'packages.burj30.title': 'سباق برج العرب',
    'packages.burj30.location': 'برج العرب',
    'packages.burj30.highlight': 'رحلة سريعة مع توقف لالتقاط صورة أيقونية لبرج العرب.',
    // Package 2: Atlantis Adventure
    'packages.atlantis60.title': 'مغامرة أتلانتس',
    'packages.atlantis60.location': 'أتلانتس، النخلة',
    'packages.atlantis60.highlight': 'اركب هلال النخلة والتقط أتلانتس في صورك.',
    // Package 3: Dubai Skyline Tour
    'packages.skyline90.title': 'جولة أفق دبي',
    'packages.skyline90.location': 'أتلانتس • برج العرب • برج خليفة',
    'packages.skyline90.highlight': 'غطِ أتلانتس، كلا البرجين، والأفق في حلقة واحدة.',
    // Package 4: Ultimate Ain Dubai Loop
    'packages.ultimate120.title': 'حلقة عين دبي النهائية',
    'packages.ultimate120.location': 'جميع المعالم + عين دبي',
    'packages.ultimate120.highlight': 'مسح كامل لساحل دبي بما في ذلك بلو ووترز وعين دبي.',
    
    // Statistics
    'stats.yearsExperience': 'سنوات من الخبرة',
    'stats.satisfiedClients': 'عميل راضٍ',
    'stats.languages': 'لغتان',
    'stats.languagesSub': 'عربي إنجليزي',
    
    // About Us
    'about.title': 'من نحن',
    'about.paragraph1': 'إليت جت سكيز إي إي مملوكة ومدارة من قبل عبدالله مبارك، رجل أعمال شاب شغوف بالرياضات المائية مع سنوات من الخبرة في الصناعة.',
    'about.paragraph2': 'في إليت جت سكيز إي إي، نحن نعرف ما تبحث عنه وسنلبي متطلباتك؛ يمكنك القدوم ومقابلتنا في \'إليت جت سكيز إي إي\' لإنشاء ذكريات ستدوم إلى الأبد.',
    'about.experiencedTeam': 'فريق ذو خبرة',
    'about.experiencedTeamDesc': 'فريق إليت جت سكيز إي إي لديه سنوات من الخبرة في صناعة جت سكي! نحن نعرف ما تبحث عنه وسنتجاوز توقعاتك لنمنحك وقتاً رائعاً.',
    'about.qualityFirst': 'الجودة أولاً',
    'about.qualityFirstDesc': 'الجودة ليست عملاً لمرة واحدة. إنها عادة في إليت جت سكيز إي إي! سواء كنت قادماً لرحلة جت سكي أو جلسة فلوبورد، سنبذل جهداً إضافياً لنمنحك أفضل وقت يمكنك تخيله. ستكون سعيداً وستطلب المزيد.',
    'about.uniqueExperience': 'تجربة فريدة',
    'about.uniqueExperienceDesc': 'في إليت جت سكيز إي إي، سنجعلك تشعر بأنك فريد. تتضمن جت سكيزنا نماذج Sea-Doo RXP-X 325 لعام 2025 مع 1800 سي سي / 325 حصان؛ سنعتني بك من البداية إلى النهاية، لدينا كل شيء جاهز لك.',
    'about.greatLocation': 'موقع رائع',
    'about.greatLocationDesc': 'يقع إيجار إليت جت سكيز إي إي بشكل مناسب في جميرا 4 في واحدة من أكثر المناطق المرموقة في دبي، بالقرب من برج العرب الأيقوني وبجوار شاطئ كايت، الذي يبعد أمتاراً عن محطتنا إذا كنت تريد الاستلقاء تحت الشمس بعد جلسة جت سكي.',
    
    // FAQ
    'faq.title': 'الأسئلة الشائعة',
    'faq.subtitle': 'كل ما تحتاج معرفته',
    'faq.q1': 'لم أقم بقيادة جت سكي من قبل، هل يمكنني المشاركة في الرحلة؟',
    'faq.a1': 'بالتأكيد! سيوفر فريقنا ذو الخبرة تدريباً كاملاً وإرشاداً قبل جولتك. نضمن أن جميع إجراءات السلامة موجودة وسنعلمك كل ما تحتاج معرفته للاستمتاع بتجربة جت سكي بأمان.',
    'faq.q2': 'هل أحتاج إلى رخصة قارب أو جت سكي لقيادة الجت سكي؟',
    'faq.a2': 'لا رخصة مطلوبة! جولاتنا مرشدة ونوفر تعليمات شاملة قبل المغادرة. ومع ذلك، يجب أن تكون على الأقل 16 عاماً لقيادة جت سكي.',
    'faq.q3': 'هل يمكن لطفلي الجلوس خلفي؟',
    'faq.a3': 'نعم، يمكن للأطفال الركوب كركاب إذا كانوا على الأقل 5 سنوات. يجب أن يرتدوا معدات السلامة المناسبة بما في ذلك سترات النجاة التي نوفرها. حد أقصى شخصان لكل جت سكي.',
    'faq.q4': 'هل تلتقطون صوراً في البحر؟',
    'faq.a4': 'نعم! نقدم خدمات التصوير أثناء جولتك لالتقاط تجربتك المذهلة. يمكنك شراء الصور بعد جولتك أو إحضار كاميرتك المائية الخاصة.',
    'faq.q5': 'لا أعرف كيف أسبح، هل هذا خطير؟',
    'faq.a5': 'بينما يُنصح بالقدرة على السباحة، إلا أنها ليست إلزامية. يجب على جميع المشاركين ارتداء سترات النجاة في جميع الأوقات، والتي نوفرها. مدربونا مدربون على سلامة المياه وسيكونون معك طوال الجولة.',
    'faq.q6': 'ماذا يجب أن أحضر لجولة جت سكي؟',
    'faq.a6': 'نوصي بإحضار واقي الشمس، ونظارات شمسية بحزام، ومنشفة، وملابس للتبديل. الكاميرات المائية مرحب بها. نوفر جميع معدات السلامة بما في ذلك سترات النجاة.',
    'faq.q7': 'ما هو الحد الأدنى للعمر المطلوب؟',
    'faq.a7': 'الحد الأدنى للعمر لقيادة جت سكي هو 16 عاماً. يمكن للأطفال من 5 سنوات فما فوق الركوب كركاب مع بالغ. يجب أن يكون جميع القاصرين برفقة أحد الوالدين أو الوصي القانوني.',
    'faq.q8': 'ماذا يحدث إذا كانت الظروف الجوية سيئة؟',
    'faq.a8': 'السلامة هي أولويتنا القصوى. إذا كانت الظروف الجوية غير مناسبة، سنتواصل معك لإعادة جدولة حجزك أو نقدم استرداداً كاملاً. نراقب الظروف الجوية عن كثب ولن نتنازل أبداً عن السلامة.',
    
    // Footer
    'footer.bookNow': 'احجز الآن',
    'footer.quickLinks': 'روابط سريعة',
    'footer.home': 'الرئيسية',
    'footer.tourPackages': 'باقات الجولات',
    'footer.about': 'من نحن',
    'footer.faq': 'الأسئلة الشائعة',
    'footer.contactUs': 'اتصل بنا',
    'footer.ourServices': 'خدماتنا',
    'footer.service1': 'إيجار جت سكي دبي',
    'footer.service2': 'جولة جت سكي برج العرب',
    'footer.service3': 'جولة أتلانتس النخلة',
    'footer.service4': 'رياضات مائية دبي مارينا',
    'footer.service5': 'جولات جت سكي خاصة',
    'footer.stayConnected': 'ابق على اتصال',
    'footer.newsletter': 'اشترك في نشرتنا الإخبارية للحصول على عروض حصرية وتحديثات الرياضات المائية في دبي.',
    'footer.emailPlaceholder': 'بريدك الإلكتروني',
    'footer.subscribe': 'اشترك',
    'footer.followUs': 'تابعنا',
    'footer.rights': 'جميع الحقوق محفوظة.',
    
    // Booking
    'booking.selectPackage': 'اختر باقاتك',
    'booking.tryAgain': 'حاول مرة أخرى',
    'booking.select': 'اختر',
    
    // Latest Equipment
    'equipment.title': 'نماذج 2025',
    'equipment.subtitle': 'جت سكيزنا هي أحدث النماذج',
    'equipment.description': 'سنجعل هذه أفضل تجربة جت سكي لديك على الإطلاق. في إليت جت سكيز إي إي، ننشئ ذكريات عبر جولاتنا، حتى يتمكن عملاؤنا من إحيائها مرة تلو الأخرى. نحن أفضل خدمة جت سكي في دبي.',
    'equipment.guarantee': 'أفضل تجربة جت سكي لديك على الإطلاق!',
    'equipment.category1': 'للراحة والتنوع',
    'equipment.category2': 'للحيل والحركات البهلوانية',
    'equipment.category3': 'للسرعة والقوة',
    'equipment.model1': '2025 ياماها VX-C',
    'equipment.model1Desc': 'متعدد الاستخدامات. موثوق. مثالي لجميع الراكبين. الخيار المثالي للمغامرات الترفيهية والنزهات العائلية مع استقرار وراحة استثنائية.',
    'equipment.model2': '2025 Spark Trixx™',
    'equipment.model2Desc': 'مرح. رشيق. مصمم للحركات البهلوانية. خيارك المثالي للحيل الحرة والمناورات المائية المثيرة مع تحكم واستقرار محسّنين.',
    'equipment.model3': '2021 SEA-DOO RXT-X 350',
    'equipment.model3Subtitle': 'إصدار محدود بنفسجي/نيون',
    'equipment.model3Desc': 'رياضي. قوي. مصنوع لمحبي الإثارة. اختبر سرعة وأداء لا مثيل لهما مع تقنية متطورة وتصميم مستوحى من السباق.',
    
    // Instagram
    'instagram.title': 'تابعنا على إنستغرام',
    'instagram.followUs': 'تابعنا',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'ar' || saved === 'en') ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

