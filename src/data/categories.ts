import { Category } from '../types';

export const categories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    nameRu: 'Электроника',
    nameUz: 'Elektronika',
    icon: '📱',
    isActive: true,
    subcategories: [
      { id: 'phones', name: 'Mobile Phones', nameRu: 'Мобильные телефоны', nameUz: 'Mobil telefonlar', categoryId: 'electronics', isActive: true },
      { id: 'computers', name: 'Computers & Laptops', nameRu: 'Компьютеры и ноутбуки', nameUz: 'Kompyuterlar va noutbuklar', categoryId: 'electronics', isActive: true },
      { id: 'tablets', name: 'Tablets', nameRu: 'Планшеты', nameUz: 'Planshetlar', categoryId: 'electronics', isActive: true },
      { id: 'audio', name: 'Audio & Headphones', nameRu: 'Аудио и наушники', nameUz: 'Audio va quloqchinlar', categoryId: 'electronics', isActive: true },
      { id: 'cameras', name: 'Cameras & Photography', nameRu: 'Камеры и фотография', nameUz: 'Kameralar va fotografiya', categoryId: 'electronics', isActive: true },
      { id: 'gaming', name: 'Gaming', nameRu: 'Игры', nameUz: 'O\'yinlar', categoryId: 'electronics', isActive: true },
      { id: 'accessories', name: 'Accessories', nameRu: 'Аксессуары', nameUz: 'Aksessuarlar', categoryId: 'electronics', isActive: true }
    ]
  },
  {
    id: 'vehicles',
    name: 'Vehicles',
    nameRu: 'Транспорт',
    nameUz: 'Transport',
    icon: '🚗',
    isActive: true,
    subcategories: [
      { id: 'cars', name: 'Cars', nameRu: 'Автомобили', nameUz: 'Avtomobillar', categoryId: 'vehicles', isActive: true },
      { id: 'motorcycles', name: 'Motorcycles', nameRu: 'Мотоциклы', nameUz: 'Mototsikllar', categoryId: 'vehicles', isActive: true },
      { id: 'trucks', name: 'Trucks & Commercial', nameRu: 'Грузовики и коммерческий транспорт', nameUz: 'Yuk mashinalari va tijorat transporti', categoryId: 'vehicles', isActive: true },
      { id: 'parts', name: 'Auto Parts', nameRu: 'Автозапчасти', nameUz: 'Avto ehtiyot qismlari', categoryId: 'vehicles', isActive: true },
      { id: 'bicycles', name: 'Bicycles', nameRu: 'Велосипеды', nameUz: 'Velosipedlar', categoryId: 'vehicles', isActive: true }
    ]
  },
  {
    id: 'real_estate',
    name: 'Real Estate',
    nameRu: 'Недвижимость',
    nameUz: 'Ko\'chmas mulk',
    icon: '🏠',
    isActive: true,
    subcategories: [
      { id: 'apartments', name: 'Apartments for Rent', nameRu: 'Квартиры в аренду', nameUz: 'Ijaraga kvartiralar', categoryId: 'real_estate', isActive: true },
      { id: 'houses', name: 'Houses for Sale', nameRu: 'Дома на продажу', nameUz: 'Sotilayotgan uylar', categoryId: 'real_estate', isActive: true },
      { id: 'commercial', name: 'Commercial Property', nameRu: 'Коммерческая недвижимость', nameUz: 'Tijorat mulki', categoryId: 'real_estate', isActive: true },
      { id: 'land', name: 'Land', nameRu: 'Земля', nameUz: 'Yer', categoryId: 'real_estate', isActive: true }
    ]
  },
  {
    id: 'home_garden',
    name: 'Home & Garden',
    nameRu: 'Дом и сад',
    nameUz: 'Uy va bog\'',
    icon: '🏡',
    isActive: true,
    subcategories: [
      { id: 'furniture', name: 'Furniture', nameRu: 'Мебель', nameUz: 'Mebel', categoryId: 'home_garden', isActive: true },
      { id: 'appliances', name: 'Home Appliances', nameRu: 'Бытовая техника', nameUz: 'Maishiy texnika', categoryId: 'home_garden', isActive: true },
      { id: 'decor', name: 'Home Decor', nameRu: 'Декор для дома', nameUz: 'Uy dekoratsiyasi', categoryId: 'home_garden', isActive: true },
      { id: 'tools', name: 'Tools & Hardware', nameRu: 'Инструменты', nameUz: 'Asboblar', categoryId: 'home_garden', isActive: true },
      { id: 'garden', name: 'Garden & Outdoor', nameRu: 'Сад и улица', nameUz: 'Bog\' va tashqi', categoryId: 'home_garden', isActive: true }
    ]
  },
  {
    id: 'fashion',
    name: 'Fashion & Beauty',
    nameRu: 'Мода и красота',
    nameUz: 'Moda va go\'zallik',
    icon: '👗',
    isActive: true,
    subcategories: [
      { id: 'womens_clothing', name: 'Women\'s Clothing', nameRu: 'Женская одежда', nameUz: 'Ayollar kiyimi', categoryId: 'fashion', isActive: true },
      { id: 'mens_clothing', name: 'Men\'s Clothing', nameRu: 'Мужская одежда', nameUz: 'Erkaklar kiyimi', categoryId: 'fashion', isActive: true },
      { id: 'shoes', name: 'Shoes', nameRu: 'Обувь', nameUz: 'Poyabzal', categoryId: 'fashion', isActive: true },
      { id: 'bags', name: 'Bags & Accessories', nameRu: 'Сумки и аксессуары', nameUz: 'Sumkalar va aksessuarlar', categoryId: 'fashion', isActive: true },
      { id: 'jewelry', name: 'Jewelry & Watches', nameRu: 'Украшения и часы', nameUz: 'Zargarlik va soatlar', categoryId: 'fashion', isActive: true },
      { id: 'beauty', name: 'Beauty & Cosmetics', nameRu: 'Красота и косметика', nameUz: 'Go\'zallik va kosmetika', categoryId: 'fashion', isActive: true }
    ]
  },
  {
    id: 'sports',
    name: 'Sports & Recreation',
    nameRu: 'Спорт и отдых',
    nameUz: 'Sport va dam olish',
    icon: '⚽',
    isActive: true,
    subcategories: [
      { id: 'fitness', name: 'Fitness Equipment', nameRu: 'Фитнес оборудование', nameUz: 'Fitnes uskunalari', categoryId: 'sports', isActive: true },
      { id: 'outdoor', name: 'Outdoor & Camping', nameRu: 'Туризм и кемпинг', nameUz: 'Turizm va kemping', categoryId: 'sports', isActive: true },
      { id: 'team_sports', name: 'Team Sports', nameRu: 'Командные виды спорта', nameUz: 'Jamoa sport turlari', categoryId: 'sports', isActive: true },
      { id: 'water_sports', name: 'Water Sports', nameRu: 'Водные виды спорта', nameUz: 'Suv sport turlari', categoryId: 'sports', isActive: true }
    ]
  },
  {
    id: 'books_media',
    name: 'Books & Media',
    nameRu: 'Книги и медиа',
    nameUz: 'Kitoblar va media',
    icon: '📚',
    isActive: true,
    subcategories: [
      { id: 'books', name: 'Books', nameRu: 'Книги', nameUz: 'Kitoblar', categoryId: 'books_media', isActive: true },
      { id: 'movies', name: 'Movies & TV', nameRu: 'Фильмы и ТВ', nameUz: 'Filmlar va televideniye', categoryId: 'books_media', isActive: true },
      { id: 'music', name: 'Music', nameRu: 'Музыка', nameUz: 'Musiqa', categoryId: 'books_media', isActive: true },
      { id: 'educational', name: 'Educational Materials', nameRu: 'Учебные материалы', nameUz: 'Ta\'lim materiallari', categoryId: 'books_media', isActive: true }
    ]
  },
  {
    id: 'services',
    name: 'Services',
    nameRu: 'Услуги',
    nameUz: 'Xizmatlar',
    icon: '🛠️',
    isActive: true,
    subcategories: [
      { id: 'home_services', name: 'Home Services', nameRu: 'Домашние услуги', nameUz: 'Uy xizmatlari', categoryId: 'services', isActive: true },
      { id: 'professional', name: 'Professional Services', nameRu: 'Профессиональные услуги', nameUz: 'Professional xizmatlar', categoryId: 'services', isActive: true },
      { id: 'tutoring', name: 'Tutoring & Education', nameRu: 'Репетиторство и образование', nameUz: 'Repetitorlik va ta\'lim', categoryId: 'services', isActive: true },
      { id: 'events', name: 'Events & Entertainment', nameRu: 'События и развлечения', nameUz: 'Tadbirlar va o\'yin-kulgi', categoryId: 'services', isActive: true },
      { id: 'business', name: 'Business Services', nameRu: 'Бизнес услуги', nameUz: 'Biznes xizmatlari', categoryId: 'services', isActive: true }
    ]
  },
  {
    id: 'jobs',
    name: 'Jobs',
    nameRu: 'Работа',
    nameUz: 'Ish o\'rinlari',
    icon: '💼',
    isActive: true,
    subcategories: [
      { id: 'full_time', name: 'Full-time Jobs', nameRu: 'Постоянная работа', nameUz: 'To\'liq kunlik ish', categoryId: 'jobs', isActive: true },
      { id: 'part_time', name: 'Part-time Jobs', nameRu: 'Частичная занятость', nameUz: 'Yarim kunlik ish', categoryId: 'jobs', isActive: true },
      { id: 'freelance', name: 'Freelance', nameRu: 'Фриланс', nameUz: 'Freelance', categoryId: 'jobs', isActive: true },
      { id: 'internships', name: 'Internships', nameRu: 'Стажировки', nameUz: 'Stajirovkalar', categoryId: 'jobs', isActive: true }
    ]
  },
  {
    id: 'other',
    name: 'Other',
    nameRu: 'Другое',
    nameUz: 'Boshqa',
    icon: '📦',
    isActive: true,
    subcategories: [
      { id: 'collectibles', name: 'Collectibles & Antiques', nameRu: 'Коллекционирование и антиквариат', nameUz: 'Kolleksiya va antikvariat', categoryId: 'other', isActive: true },
      { id: 'free', name: 'Free Items', nameRu: 'Бесплатные вещи', nameUz: 'Bepul narsalar', categoryId: 'other', isActive: true },
      { id: 'lost_found', name: 'Lost & Found', nameRu: 'Потеряно и найдено', nameUz: 'Yo\'qotilgan va topilgan', categoryId: 'other', isActive: true }
    ]
  }
];

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(cat => cat.id === id);
};

export const getSubcategoryById = (categoryId: string, subcategoryId: string) => {
  const category = getCategoryById(categoryId);
  return category?.subcategories.find(sub => sub.id === subcategoryId);
};

export const getCategoryName = (categoryId: string, locale: 'en' | 'ru' | 'uz' = 'en'): string => {
  const category = getCategoryById(categoryId);
  if (!category) return categoryId;
  
  switch (locale) {
    case 'ru': return category.nameRu;
    case 'uz': return category.nameUz;
    default: return category.name;
  }
};

export const getSubcategoryName = (categoryId: string, subcategoryId: string, locale: 'en' | 'ru' | 'uz' = 'en'): string => {
  const subcategory = getSubcategoryById(categoryId, subcategoryId);
  if (!subcategory) return subcategoryId;
  
  switch (locale) {
    case 'ru': return subcategory.nameRu;
    case 'uz': return subcategory.nameUz;
    default: return subcategory.name;
  }
};
