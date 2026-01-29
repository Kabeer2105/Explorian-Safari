// Static content translations for home page and common elements
import type { Locale } from './locale';

interface Translations {
  nav: {
    home: string;
    safaris: string;
    mountains: string;
    beaches: string;
    dayTrips: string;
    about: string;
    contact: string;
    requestQuote: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  trustBar: {
    rating: string;
    licensed: string;
    experience: string;
    satisfaction: string;
  };
  common: {
    learnMore: string;
    bookNow: string;
    perPerson: string;
    days: string;
    from: string;
    viewAll: string;
  };
}

const translations: Record<Locale, Translations> = {
  en: {
    nav: {
      home: 'Home',
      safaris: 'Safaris',
      mountains: 'Mountains',
      beaches: 'Beaches',
      dayTrips: 'Day Trips',
      about: 'About',
      contact: 'Contact',
      requestQuote: 'Request Quote',
    },
    hero: {
      title: 'Discover the Magic of Tanzania',
      subtitle: 'Unforgettable safaris, mountain treks, and beach holidays in East Africa',
      cta: 'Explore Our Adventures',
    },
    trustBar: {
      rating: '4.8/5 Rating on Safari Bookings',
      licensed: 'Licensed Tour Operator',
      experience: '10+ Years of Experience',
      satisfaction: '100% Satisfaction Guarantee',
    },
    common: {
      learnMore: 'Learn More',
      bookNow: 'Book Now',
      perPerson: 'per person',
      days: 'days',
      from: 'From',
      viewAll: 'View All',
    },
  },
  de: {
    nav: {
      home: 'Startseite',
      safaris: 'Safaris',
      mountains: 'Berge',
      beaches: 'Strände',
      dayTrips: 'Tagesausflüge',
      about: 'Über uns',
      contact: 'Kontakt',
      requestQuote: 'Angebot anfordern',
    },
    hero: {
      title: 'Entdecken Sie die Magie Tansanias',
      subtitle: 'Unvergessliche Safaris, Bergtouren und Strandurlaube in Ostafrika',
      cta: 'Entdecken Sie unsere Abenteuer',
    },
    trustBar: {
      rating: '4,8/5 Bewertung auf Safari Bookings',
      licensed: 'Lizenzierter Reiseveranstalter',
      experience: '10+ Jahre Erfahrung',
      satisfaction: '100% Zufriedenheitsgarantie',
    },
    common: {
      learnMore: 'Mehr erfahren',
      bookNow: 'Jetzt buchen',
      perPerson: 'pro Person',
      days: 'Tage',
      from: 'Ab',
      viewAll: 'Alle anzeigen',
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      safaris: 'Safaris',
      mountains: 'Montagnes',
      beaches: 'Plages',
      dayTrips: 'Excursions',
      about: 'À propos',
      contact: 'Contact',
      requestQuote: 'Demander un devis',
    },
    hero: {
      title: 'Découvrez la magie de la Tanzanie',
      subtitle: 'Safaris inoubliables, trekkings en montagne et vacances à la plage en Afrique de l\'Est',
      cta: 'Explorez nos aventures',
    },
    trustBar: {
      rating: 'Note de 4,8/5 sur Safari Bookings',
      licensed: 'Tour opérateur agréé',
      experience: 'Plus de 10 ans d\'expérience',
      satisfaction: 'Garantie de satisfaction à 100%',
    },
    common: {
      learnMore: 'En savoir plus',
      bookNow: 'Réserver maintenant',
      perPerson: 'par personne',
      days: 'jours',
      from: 'À partir de',
      viewAll: 'Voir tout',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      safaris: 'Safaris',
      mountains: 'Montañas',
      beaches: 'Playas',
      dayTrips: 'Excursiones',
      about: 'Acerca de',
      contact: 'Contacto',
      requestQuote: 'Solicitar cotización',
    },
    hero: {
      title: 'Descubre la magia de Tanzania',
      subtitle: 'Safaris inolvidables, trekkings de montaña y vacaciones en la playa en África Oriental',
      cta: 'Explora nuestras aventuras',
    },
    trustBar: {
      rating: 'Calificación 4.8/5 en Safari Bookings',
      licensed: 'Operador turístico licenciado',
      experience: 'Más de 10 años de experiencia',
      satisfaction: '100% de garantía de satisfacción',
    },
    common: {
      learnMore: 'Saber más',
      bookNow: 'Reservar ahora',
      perPerson: 'por persona',
      days: 'días',
      from: 'Desde',
      viewAll: 'Ver todo',
    },
  },
  zh: {
    nav: {
      home: '首页',
      safaris: '野生动物园',
      mountains: '登山',
      beaches: '海滩',
      dayTrips: '一日游',
      about: '关于我们',
      contact: '联系我们',
      requestQuote: '索取报价',
    },
    hero: {
      title: '探索坦桑尼亚的魔力',
      subtitle: '在东非体验难忘的野生动物园、登山和海滩假期',
      cta: '探索我们的冒险',
    },
    trustBar: {
      rating: 'Safari Bookings评分4.8/5',
      licensed: '持牌旅游运营商',
      experience: '10+年经验',
      satisfaction: '100%满意保证',
    },
    common: {
      learnMore: '了解更多',
      bookNow: '立即预订',
      perPerson: '每人',
      days: '天',
      from: '从',
      viewAll: '查看全部',
    },
  },
};

export function getTranslations(locale: Locale = 'en'): Translations {
  return translations[locale] || translations.en;
}

export default translations;
