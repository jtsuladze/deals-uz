export type Locale = 'en' | 'uz'

export const locales: Locale[] = ['en', 'uz']

export const defaultLocale: Locale = 'en'

// Simple translation function for now
export function t(key: string, locale: Locale = 'en'): string {
  const translations: Record<Locale, Record<string, string>> = {
    en: {
      'welcome': 'Welcome to DealsUZ',
      'marketplace': 'Marketplace',
      'search': 'Search',
      'categories': 'Categories',
      'featured': 'Featured',
      'login': 'Login',
      'register': 'Register',
      'profile': 'Profile',
      'messages': 'Messages',
      'favorites': 'Favorites',
      'post_ad': 'Post Ad',
      'buy_sell': 'Buy & Sell Anything',
      'uzbekistan': 'in Uzbekistan'
    },
    uz: {
      'welcome': 'DealsUZ ga xush kelibsiz',
      'marketplace': 'Bozor',
      'search': 'Qidirish',
      'categories': 'Kategoriyalar',
      'featured': 'Tavsiya etilgan',
      'login': 'Kirish',
      'register': 'Ro\'yxatdan o\'tish',
      'profile': 'Profil',
      'messages': 'Xabarlar',
      'favorites': 'Sevimlilar',
      'post_ad': 'E\'lon berish',
      'buy_sell': 'Har narsani sotib oling va soting',
      'uzbekistan': 'O\'zbekistonda'
    }
  }

  return translations[locale]?.[key] || key
}
