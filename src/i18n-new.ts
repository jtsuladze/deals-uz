export type Locale = 'en' | 'ru' | 'uz';
type TranslationKey = 'title' | 'postItem' | 'browse' | 'message' | 'description' | 'price' | 'image' | 'loading' | 'noItems' | 'signInToMessage' | 'signInToPost';
type Translations = {
  [key in Locale]: {
    [k in TranslationKey]: string;
  };
};

export const translations: Translations = {
  en: {
    title: 'Marketplace',
    postItem: 'Post an Item',
    browse: 'Browse Listings',
    message: 'Message Seller',
    description: 'Description',
    price: 'Price',
    image: 'Image',
    loading: 'Loading...',
    noItems: 'No items posted yet',
    signInToMessage: 'Sign in to message seller',
    signInToPost: 'You must be signed in to post an item',
  },
  ru: {
    title: 'Маркетплейс',
    postItem: 'Разместить товар',
    browse: 'Просмотреть объявления',
    message: 'Написать продавцу',
    description: 'Описание',
    price: 'Цена',
    image: 'Изображение',
    loading: 'Загрузка...',
    noItems: 'Товары еще не размещены',
    signInToMessage: 'Войдите, чтобы написать продавцу',
    signInToPost: 'Для размещения товара необходимо войти в систему',
  },
  uz: {
    title: 'Bozor',
    postItem: 'Mahsulot joylash',
    browse: 'E\'lonlarni ko\'rish',
    message: 'Sotuvchiga xabar yuborish',
    description: 'Tavsif',
    price: 'Narx',
    image: 'Rasm',
    loading: 'Yuklanmoqda...',
    noItems: 'Hali mahsulotlar joylanmagan',
    signInToMessage: 'Sotuvchiga xabar yuborish uchun tizimga kiring',
    signInToPost: 'Mahsulot joylash uchun tizimga kirish kerak',
  },
};

export function t(locale: Locale, key: TranslationKey): string {
  return translations[locale]?.[key] || translations.en[key];
}
