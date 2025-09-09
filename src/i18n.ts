export type Locale = 'en' | 'ru';

export type TranslationKey = 
  | 'title'
  | 'postItem' 
  | 'browse'
  | 'signIn'
  | 'signOut'
  | 'signedInAs'
  | 'loading'
  | 'itemTitle'
  | 'description'
  | 'price'
  | 'location'
  | 'postItemTitle'
  | 'browseItems'
  | 'sendMessage'
  | 'message'
  | 'send'
  | 'messagesFor'
  | 'signInToPost'
  | 'signInRequired'
  | 'findGreatDeals'
  | 'featuredItems'
  | 'featured'
  | 'currency'
  | 'filterByCategory'
  | 'allCategories'
  | 'allItems'
  | 'noItemsFound'
  | 'whyChoose'
  | 'multilingualSupport'
  | 'multilingualDesc'
  | 'safeSecure'
  | 'safeSecureDesc'
  | 'fastEasy'
  | 'fastEasyDesc'
  | 'readyToStart'
  | 'joinThousands'
  | 'exploreMarketplace'
  | 'trustedMarketplace'
  | 'signUp'
  | 'createAccount'
  | 'email'
  | 'password'
  | 'confirmPassword'
  | 'name'
  | 'phone'
  | 'preferredLanguage'
  | 'alreadyHaveAccount'
  | 'dontHaveAccount'
  | 'forgotPassword'
  | 'profile'
  | 'editProfile'
  | 'saveChanges'
  | 'cancel'
  | 'bio'
  | 'memberSince'
  | 'myListings'
  | 'accountSettings'
  | 'welcomeBack'
  | 'createYourAccount'
  | 'invalidCredentials'
  | 'passwordsDoNotMatch'
  | 'allFieldsRequired'
  | 'emailAlreadyExists'
  | 'passwordTooShort'
  | 'profileUpdated'
  | 'signInSuccess'
  | 'signUpSuccess';

const translations: Record<Locale, Record<TranslationKey, string>> = {
  en: {
    title: 'Uzbekistan Marketplace',
    postItem: 'Post Item',
    browse: 'Browse Items',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    signedInAs: 'Signed in as',
    loading: 'Loading...',
    itemTitle: 'Item Title',
    description: 'Description',
    price: 'Price (UZS)',
    location: 'Location',
    postItemTitle: 'Post an Item',
    browseItems: 'Browse Items',
    sendMessage: 'Send Message',
    message: 'Message',
    send: 'Send',
    messagesFor: 'Messages for',
    signInToPost: 'Please sign in to post items',
    signInRequired: 'Sign in required',
    findGreatDeals: 'Find great deals in your area',
    featuredItems: 'Featured Items',
    featured: 'Featured',
    currency: 'UZS',
    filterByCategory: 'Filter by Category',
    allCategories: 'All Categories',
    allItems: 'All Items',
    noItemsFound: 'No items found in this category',
    whyChoose: 'Why Choose DealsUZ?',
    multilingualSupport: 'Multilingual Support',
    multilingualDesc: 'Available in English and Russian to serve everyone in our community.',
    safeSecure: 'Safe & Secure',
    safeSecureDesc: 'Built with modern security practices to protect your transactions and data.',
    fastEasy: 'Fast & Easy',
    fastEasyDesc: 'Post your items in minutes and start connecting with buyers instantly.',
    readyToStart: 'Ready to Start Trading?',
    joinThousands: 'Join thousands of users buying and selling on DealsUZ',
    exploreMarketplace: 'Explore Marketplace',
    trustedMarketplace: 'Your trusted marketplace for buying and selling in Uzbekistan',
    signUp: 'Sign Up',
    createAccount: 'Create Account',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    name: 'Full Name',
    phone: 'Phone Number',
    preferredLanguage: 'Preferred Language',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: "Don't have an account?",
    forgotPassword: 'Forgot Password?',
    profile: 'Profile',
    editProfile: 'Edit Profile',
    saveChanges: 'Save Changes',
    cancel: 'Cancel',
    bio: 'Bio',
    memberSince: 'Member since',
    myListings: 'My Listings',
    accountSettings: 'Account Settings',
    welcomeBack: 'Welcome back!',
    createYourAccount: 'Create your account',
    invalidCredentials: 'Invalid email or password',
    passwordsDoNotMatch: 'Passwords do not match',
    allFieldsRequired: 'All fields are required',
    emailAlreadyExists: 'User with this email already exists',
    passwordTooShort: 'Password must be at least 6 characters',
    profileUpdated: 'Profile updated successfully',
    signInSuccess: 'Signed in successfully',
    signUpSuccess: 'Account created successfully'
  },
  ru: {
    title: 'Узбекистанская Торговая Площадка',
    postItem: 'Разместить Товар',
    browse: 'Просмотр Товаров',
    signIn: 'Войти',
    signOut: 'Выйти',
    signedInAs: 'Вошли как',
    loading: 'Загрузка...',
    itemTitle: 'Название Товара',
    description: 'Описание',
    price: 'Цена (UZS)',
    location: 'Местоположение',
    postItemTitle: 'Разместить Товар',
    browseItems: 'Просмотр Товаров',
    sendMessage: 'Отправить Сообщение',
    message: 'Сообщение',
    send: 'Отправить',
    messagesFor: 'Сообщения для',
    signInToPost: 'Пожалуйста, войдите для размещения товаров',
    signInRequired: 'Требуется авторизация',
    findGreatDeals: 'Найдите выгодные предложения в вашем районе',
    featuredItems: 'Рекомендуемые Товары',
    featured: 'Рекомендуемый',
    currency: 'UZS',
    filterByCategory: 'Фильтр по Категории',
    allCategories: 'Все Категории',
    allItems: 'Все Товары',
    noItemsFound: 'Товары в этой категории не найдены',
    whyChoose: 'Почему выбирают DealsUZ?',
    multilingualSupport: 'Многоязычная Поддержка',
    multilingualDesc: 'Доступно на английском и русском языках для обслуживания всех в нашем сообществе.',
    safeSecure: 'Безопасно и Надежно',
    safeSecureDesc: 'Создано с современными методами безопасности для защиты ваших транзакций и данных.',
    fastEasy: 'Быстро и Легко',
    fastEasyDesc: 'Размещайте товары за минуты и мгновенно связывайтесь с покупателями.',
    readyToStart: 'Готовы начать торговать?',
    joinThousands: 'Присоединяйтесь к тысячам пользователей, покупающих и продающих на DealsUZ',
    exploreMarketplace: 'Исследовать Торговую Площадку',
    trustedMarketplace: 'Ваша надежная торговая площадка для покупки и продажи в Узбекистане',
    signUp: 'Регистрация',
    createAccount: 'Создать Аккаунт',
    email: 'Электронная почта',
    password: 'Пароль',
    confirmPassword: 'Подтвердите пароль',
    name: 'Полное имя',
    phone: 'Номер телефона',
    preferredLanguage: 'Предпочитаемый язык',
    alreadyHaveAccount: 'Уже есть аккаунт?',
    dontHaveAccount: 'Нет аккаунта?',
    forgotPassword: 'Забыли пароль?',
    profile: 'Профиль',
    editProfile: 'Редактировать профиль',
    saveChanges: 'Сохранить изменения',
    cancel: 'Отмена',
    bio: 'О себе',
    memberSince: 'Участник с',
    myListings: 'Мои объявления',
    accountSettings: 'Настройки аккаунта',
    welcomeBack: 'Добро пожаловать!',
    createYourAccount: 'Создайте свой аккаунт',
    invalidCredentials: 'Неверный email или пароль',
    passwordsDoNotMatch: 'Пароли не совпадают',
    allFieldsRequired: 'Все поля обязательны',
    emailAlreadyExists: 'Пользователь с таким email уже существует',
    passwordTooShort: 'Пароль должен содержать минимум 6 символов',
    profileUpdated: 'Профиль успешно обновлен',
    signInSuccess: 'Вход выполнен успешно',
    signUpSuccess: 'Аккаунт создан успешно'
  }
};

export function t(locale: Locale, key: TranslationKey): string {
  return translations[locale]?.[key] || translations.en[key] || key;
}
