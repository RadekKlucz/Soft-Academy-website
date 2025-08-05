// Types
export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  description_pl?: string;
  description_en?: string;
  detailedDescription?: string;
  detailedDescription_en?: string;
  category: "spring" | "summer" | "autumn" | "winter";
  imageUrl: string;
  beforeAfterImages?: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ContentItem {
  id: number;
  key: string;
  plValue: string;
  enValue: string;
  category: string;
}

// Static data for portfolio items
export const defaultPortfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Spring Color Analysis",
    description: "Complete color analysis for Spring type",
    description_pl: "Kompleksowa analiza kolorystyczna dla typu Wiosna",
    description_en: "Complete color analysis for Spring type",
    category: "spring",
    imageUrl: "/images/akademia-soft-about-me.jpg",
    beforeAfterImages: ["/images/akademia-soft-background.jpg", "/images/akademia-soft-about-me.jpg"]
  },
  {
    id: 2,
    title: "Summer Color Analysis",
    description: "Professional analysis for Summer type",
    description_pl: "Profesjonalna analiza dla typu Lato",
    description_en: "Professional analysis for Summer type",
    category: "summer",
    imageUrl: "/images/akademia-soft-background.jpg",
    beforeAfterImages: ["/images/akademia-soft-logo.jpg", "/images/akademia-soft-background.jpg"]
  },
  {
    id: 3,
    title: "Autumn Color Analysis",
    description: "Detailed analysis for Autumn type",
    description_pl: "Szczegółowa analiza dla typu Jesień",
    description_en: "Detailed analysis for Autumn type",
    category: "autumn",
    imageUrl: "/images/akademia-soft-logo.jpg",
    beforeAfterImages: ["/images/akademia-soft-about-me.jpg", "/images/akademia-soft-logo.jpg"]
  },
  {
    id: 4,
    title: "Winter Color Analysis",
    description: "Complete analysis for Winter type",
    description_pl: "Kompleksowa analiza dla typu Zima",
    description_en: "Complete analysis for Winter type",
    category: "winter",
    imageUrl: "/images/akademia-soft-about-me.jpg",
    beforeAfterImages: ["/images/akademia-soft-background.jpg", "/images/akademia-soft-about-me.jpg"]
  }
];

// Legacy export for compatibility
export const portfolioData = defaultPortfolioItems;

// Static data for testimonials - now loaded from locale files
export const testimonialsData = [
  {
    id: 1,
    name: "Anna Kowalska",
    rating: 5,
    comment: "Fantastyczna analiza kolorystyczna! Całkowicie zmieniła moje podejście do garderoby.",
    date: "2024-01-15"
  },
  {
    id: 2,
    name: "Maria Nowak",
    rating: 5,
    comment: "Profesjonalne podejście i doskonałe rezultaty. Polecam wszystkim!",
    date: "2024-01-10"
  }
];

// Service types definition
export type ServiceType = "basic" | "complex" | "vip";

// Array of services with translations
export const services = [
  {
    id: "basic",
    name_pl: "Podstawowa analiza kolorystyczna (350 PLN)",
    name_en: "Basic color analysis (350 PLN)",
  },
  {
    id: "complex",
    name_pl: "Kompleksowa analiza kolorystyczna (550 PLN)",
    name_en: "Complex color analysis (550 PLN)",
  },
  {
    id: "vip",
    name_pl: "VIP analiza kolorystyczna (1200 PLN)",
    name_en: "VIP color analysis (1200 PLN)",
  },
];

// Static content items for managing translations
export const defaultContentItems: ContentItem[] = [
  {
    id: 1,
    key: "site.title",
    plValue: "ColorAnalyst | Profesjonalna analiza kolorystyczna",
    enValue: "ColorAnalyst | Professional Color Analysis",
    category: "meta",
  },
  {
    id: 2,
    key: "site.description",
    plValue:
      "Profesjonalna analiza kolorystyczna dla kobiet. Odkryj kolory, które podkreślą Twoją naturalną urodę i dopasuj swoją garderobę idealnie do Twojego typu urody.",
    enValue:
      "Professional color analysis for women. Discover colors that enhance your natural beauty and match your wardrobe perfectly to your beauty type.",
    category: "meta",
  },
  {
    id: 3,
    key: "company.address",
    plValue: "ul. Kolorowa 12/3, 00-001 Warszawa",
    enValue: "12/3 Colorful Street, 00-001 Warsaw",
    category: "contact",
  },
  {
    id: 4,
    key: "company.phone",
    plValue: "+48 123 456 789",
    enValue: "+48 123 456 789",
    category: "contact",
  },
  {
    id: 5,
    key: "company.email",
    plValue: "kontakt@akademiasoft.pl",
    enValue: "contact@softacademy.com",
    category: "contact",
  },
];

// Admin account for demo purposes
export const admin = {
  username: "admin",
  password: "admin123", // In a real application, this would be stored hashed
};