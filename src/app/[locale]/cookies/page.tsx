'use client';

import { useParams } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { Locale } from '../../../i18n';

// Simple translation function for this page
const t = (locale: string, key: string): string => {
  const translations: Record<string, Record<string, string>> = {
    en: {
      cookiePolicy: 'Cookie Policy',
      lastUpdated: 'Last updated',
      introduction: 'Introduction',
      introText: 'This Cookie Policy explains how Deals.uz uses cookies and similar technologies when you visit our website or use our services.',
      whatAreCookies: 'What are Cookies?',
      cookiesExplanation: 'Cookies are small text files that are stored on your device when you visit a website. They help us provide you with a better experience by remembering your preferences and improving our services.',
      typesOfCookies: 'Types of Cookies We Use',
      essentialCookies: 'Essential Cookies',
      essentialText: 'These cookies are necessary for our website to function properly. They enable basic features like page navigation, access to secure areas, and user authentication.',
      essentialExamples: 'Examples: Session management, security tokens, language preferences',
      performanceCookies: 'Performance Cookies',
      performanceText: 'These cookies help us understand how visitors interact with our website by collecting information about pages visited, time spent, and any errors encountered.',
      performanceExamples: 'Examples: Google Analytics, page load times, error tracking',
      functionalCookies: 'Functional Cookies',
      functionalText: 'These cookies allow our website to remember choices you make and provide enhanced, personalized features.',
      functionalExamples: 'Examples: Remember login details, preferred currency, search filters',
      targetingCookies: 'Targeting Cookies',
      targetingText: 'These cookies may be set by our advertising partners to build a profile of your interests and show relevant advertisements.',
      targetingExamples: 'Examples: Facebook Pixel, Google Ads, remarketing tags',
      cookieDetails: 'Detailed Cookie Information',
      cookieTable: 'Cookie Name | Purpose | Duration | Type',
      cookie1: 'session_id | User session management | Session | Essential',
      cookie2: '_ga | Google Analytics tracking | 2 years | Performance',
      cookie3: 'lang_pref | Language preference | 1 year | Functional',
      cookie4: 'user_consent | Cookie consent status | 1 year | Essential',
      cookie5: 'search_filters | Saved search preferences | 30 days | Functional',
      cookie6: '_fbp | Facebook Pixel | 3 months | Targeting',
      thirdPartyServices: 'Third-Party Services',
      thirdPartyText: 'We use several third-party services that may set their own cookies:',
      googleAnalytics: 'Google Analytics',
      googleAnalyticsDesc: 'For website analytics and performance monitoring',
      facebookPixel: 'Facebook Pixel',
      facebookPixelDesc: 'For advertising and remarketing purposes',
      googleAds: 'Google Ads',
      googleAdsDesc: 'For displaying relevant advertisements',
      yandexMetrica: 'Yandex Metrica',
      yandexMetricaDesc: 'For website analytics in the CIS region',
      managingCookies: 'Managing Your Cookie Preferences',
      browserSettings: 'Browser Settings',
      browserText: 'You can control cookies through your browser settings. Most browsers allow you to:',
      browserList1: 'View and delete existing cookies',
      browserList2: 'Block cookies from specific websites',
      browserList3: 'Block all cookies',
      browserList4: 'Delete cookies when you close the browser',
      ourCookieSettings: 'Our Cookie Settings',
      cookieSettingsText: 'We provide a cookie preferences center where you can manage your consent for different types of cookies. You can access this at any time by clicking the "Cookie Settings" link in our footer.',
      cookieConsent: 'Cookie Consent',
      consentText: 'When you first visit our website, we will ask for your consent to use non-essential cookies. You can withdraw your consent at any time through our cookie settings.',
      consentTypes: 'Consent Categories',
      consentTypesList1: 'Essential: Always active (cannot be disabled)',
      consentTypesList2: 'Performance: Optional (helps improve our website)',
      consentTypesList3: 'Functional: Optional (enhances user experience)',
      consentTypesList4: 'Targeting: Optional (for personalized advertising)',
      dataRetention: 'Data Retention',
      retentionText: 'We retain cookie data for different periods depending on the type of cookie:',
      retentionList1: 'Session cookies: Deleted when you close your browser',
      retentionList2: 'Persistent cookies: Expire after the specified duration',
      retentionList3: 'Analytics data: Retained for up to 26 months',
      retentionList4: 'Advertising data: Retained for up to 13 months',
      yourRights: 'Your Rights',
      rightsText: 'Under data protection laws, you have the right to:',
      rightsList1: 'Know what cookies we use and why',
      rightsList2: 'Control which cookies are set',
      rightsList3: 'Withdraw your consent at any time',
      rightsList4: 'Request deletion of your cookie data',
      cookieUpdates: 'Updates to This Policy',
      updatesText: 'We may update this Cookie Policy from time to time. We will notify you of any significant changes by posting the new policy on our website and updating the "last updated" date.',
      internationalTransfers: 'International Data Transfers',
      transfersText: 'Some of our third-party services may transfer your data outside of Uzbekistan. We ensure appropriate safeguards are in place to protect your data.',
      contact: 'Contact Information',
      contactText: 'If you have any questions about our use of cookies, please contact us at:',
      email: 'Email: privacy@deals.uz',
      phone: 'Phone: +998 71 123 4567',
      address: 'Address: 123 Innovation Street, Tashkent Business District, Tashkent 100000, Uzbekistan',
      cookieSettings: 'Manage Cookie Settings',
      cookieSettingsDesc: 'Click here to manage your cookie preferences and update your consent choices.'
    },
    uz: {
      cookiePolicy: 'Cookie siyosati',
      lastUpdated: 'Oxirgi yangilanish',
      introduction: 'Kirish',
      introText: 'Ushbu Cookie siyosati Deals.uz veb-saytimizga tashrif buyurganingizda yoki xizmatlarimizdan foydalanganingizda cookie va shunga o\'xshash texnologiyalardan qanday foydalanishimizni tushuntiradi.',
      whatAreCookies: 'Cookie nima?',
      cookiesExplanation: 'Cookie - bu veb-saytga tashrif buyurganingizda qurilmangizda saqlanadigan kichik matn fayllari. Ular afzalliklaringizni eslab qolish va xizmatlarimizni yaxshilash orqali sizga yaxshiroq tajriba taqdim etishga yordam beradi.',
      typesOfCookies: 'Biz foydalanadigan cookie turlari',
      essentialCookies: 'Zaruriy cookie\'lar',
      essentialText: 'Bu cookie\'lar veb-saytimizning to\'g\'ri ishlashi uchun zarur. Ular sahifa navigatsiyasi, xavfsiz hududlarga kirish va foydalanuvchi autentifikatsiyasi kabi asosiy funksiyalarni yoqadi.',
      essentialExamples: 'Misollar: Sessiya boshqaruvi, xavfsizlik tokenlari, til afzalliklari',
      performanceCookies: 'Samaradorlik cookie\'lari',
      performanceText: 'Bu cookie\'lar tashrif buyurilgan sahifalar, sarflangan vaqt va duch keladigan xatolar haqida ma\'lumot to\'plash orqali mehmonlarning veb-saytimiz bilan qanday muloqot qilishini tushunishga yordam beradi.',
      performanceExamples: 'Misollar: Google Analytics, sahifa yuklash vaqti, xato kuzatuvi',
      functionalCookies: 'Funktsional cookie\'lar',
      functionalText: 'Bu cookie\'lar veb-saytimizga tanlovlaringizni eslab qolish va kengaytirilgan, shaxsiylashtirilgan funksiyalarni taqdim etish imkonini beradi.',
      functionalExamples: 'Misollar: Login ma\'lumotlarini eslab qolish, afzal qilinadigan valyuta, qidiruv filtrlari',
      targetingCookies: 'Maqsadli cookie\'lar',
      targetingText: 'Bu cookie\'lar reklama hamkorlarimiz tomonidan qiziqishlaringiz profilini yaratish va tegishli reklamalarni ko\'rsatish uchun o\'rnatilishi mumkin.',
      targetingExamples: 'Misollar: Facebook Pixel, Google Ads, qayta marketing teglari',
      cookieDetails: 'Cookie haqida batafsil ma\'lumot',
      cookieTable: 'Cookie nomi | Maqsad | Davomiyligi | Turi',
      cookie1: 'session_id | Foydalanuvchi sessiyasini boshqarish | Sessiya | Zaruriy',
      cookie2: '_ga | Google Analytics kuzatuvi | 2 yil | Samaradorlik',
      cookie3: 'lang_pref | Til afzalligi | 1 yil | Funktsional',
      cookie4: 'user_consent | Cookie rozilik holati | 1 yil | Zaruriy',
      cookie5: 'search_filters | Saqlangan qidiruv afzalliklari | 30 kun | Funktsional',
      cookie6: '_fbp | Facebook Pixel | 3 oy | Maqsadli',
      thirdPartyServices: 'Uchinchi tomon xizmatlari',
      thirdPartyText: 'Biz o\'z cookie\'larini o\'rnatishi mumkin bo\'lgan bir nechta uchinchi tomon xizmatlaridan foydalanamiz:',
      googleAnalytics: 'Google Analytics',
      googleAnalyticsDesc: 'Veb-sayt analitikasi va samaradorlikni kuzatish uchun',
      facebookPixel: 'Facebook Pixel',
      facebookPixelDesc: 'Reklama va qayta marketing maqsadlari uchun',
      googleAds: 'Google Ads',
      googleAdsDesc: 'Tegishli reklamalarni ko\'rsatish uchun',
      yandexMetrica: 'Yandex Metrica',
      yandexMetricaDesc: 'MDH mintaqasida veb-sayt analitikasi uchun',
      managingCookies: 'Cookie afzalliklaringizni boshqarish',
      browserSettings: 'Brauzer sozlamalari',
      browserText: 'Siz brauzer sozlamalari orqali cookie\'larni boshqarishingiz mumkin. Ko\'pchilik brauzerlar sizga imkon beradi:',
      browserList1: 'Mavjud cookie\'larni ko\'rish va o\'chirish',
      browserList2: 'Ma\'lum veb-saytlardan cookie\'larni bloklash',
      browserList3: 'Barcha cookie\'larni bloklash',
      browserList4: 'Brauzerni yopganingizda cookie\'larni o\'chirish',
      ourCookieSettings: 'Bizning cookie sozlamalarimiz',
      cookieSettingsText: 'Biz turli xil cookie turlari uchun roziligingizni boshqarish imkonini beradigan cookie afzalliklari markazini taqdim etamiz. Siz bunga istalgan vaqtda footerimizdagi "Cookie sozlamalari" havolasi orqali kirishingiz mumkin.',
      cookieConsent: 'Cookie roziligi',
      consentText: 'Veb-saytimizga birinchi marta tashrif buyurganingizda, biz sizdan zarur bo\'lmagan cookie\'lardan foydalanish uchun rozilik so\'raymiz. Siz cookie sozlamalari orqali istalgan vaqtda roziligingizni qaytarib olishingiz mumkin.',
      consentTypes: 'Rozilik toifalari',
      consentTypesList1: 'Zaruriy: Har doim faol (o\'chirib bo\'lmaydi)',
      consentTypesList2: 'Samaradorlik: Ixtiyoriy (veb-saytimizni yaxshilashga yordam beradi)',
      consentTypesList3: 'Funktsional: Ixtiyoriy (foydalanuvchi tajribasini yaxshilaydi)',
      consentTypesList4: 'Maqsadli: Ixtiyoriy (shaxsiylashtirilgan reklama uchun)',
      dataRetention: 'Ma\'lumotlarni saqlash',
      retentionText: 'Biz cookie turlariga qarab turli muddatlarda cookie ma\'lumotlarini saqlaymiz:',
      retentionList1: 'Sessiya cookie\'lari: Brauzerni yopganingizda o\'chiriladi',
      retentionList2: 'Doimiy cookie\'lar: Belgilangan muddatdan keyin tugaydi',
      retentionList3: 'Analitik ma\'lumotlar: 26 oygacha saqlanadi',
      retentionList4: 'Reklama ma\'lumotlari: 13 oygacha saqlanadi',
      yourRights: 'Sizning huquqlaringiz',
      rightsText: 'Ma\'lumotlarni himoyalash qonunlariga ko\'ra, sizda quyidagi huquqlar bor:',
      rightsList1: 'Biz qanday cookie\'lardan foydalanishimiz va nima uchun bilish',
      rightsList2: 'Qaysi cookie\'lar o\'rnatilishini nazorat qilish',
      rightsList3: 'Istalgan vaqtda roziligingizni qaytarib olish',
      rightsList4: 'Cookie ma\'lumotlaringizni o\'chirishni so\'rash',
      cookieUpdates: 'Ushbu siyosatga yangilanishlar',
      updatesText: 'Biz vaqti-vaqti bilan ushbu Cookie siyosatini yangilashimiz mumkin. Veb-saytimizda yangi siyosatni joylashtirish va "oxirgi yangilanish" sanasini yangilash orqali muhim o\'zgarishlar haqida sizni xabardor qilamiz.',
      internationalTransfers: 'Xalqaro ma\'lumot uzatishlari',
      transfersText: 'Ba\'zi uchinchi tomon xizmatlarimiz ma\'lumotlaringizni O\'zbekistondan tashqariga uzatishi mumkin. Biz ma\'lumotlaringizni himoya qilish uchun tegishli kafolatlar mavjudligini ta\'minlaymiz.',
      contact: 'Aloqa ma\'lumotlari',
      contactText: 'Cookie\'lardan foydalanishimiz haqida savollaringiz bo\'lsa, biz bilan bog\'laning:',
      email: 'Email: privacy@deals.uz',
      phone: 'Telefon: +998 71 123 4567',
      address: 'Manzil: 123 Innovatsiya ko\'chasi, Toshkent biznes hududi, Toshkent 100000, O\'zbekiston',
      cookieSettings: 'Cookie sozlamalarini boshqarish',
      cookieSettingsDesc: 'Cookie afzalliklaringizni boshqarish va rozilik tanlovlaringizni yangilash uchun shu yerni bosing.'
    },
    ru: {
      cookiePolicy: 'Политика использования файлов cookie',
      lastUpdated: 'Последнее обновление',
      introduction: 'Введение',
      introText: 'Эта Политика использования файлов cookie объясняет, как Deals.uz использует файлы cookie и аналогичные технологии при посещении нашего веб-сайта или использовании наших услуг.',
      whatAreCookies: 'Что такое файлы cookie?',
      cookiesExplanation: 'Файлы cookie - это небольшие текстовые файлы, которые сохраняются на вашем устройстве при посещении веб-сайта. Они помогают нам предоставить вам лучший опыт, запоминая ваши предпочтения и улучшая наши услуги.',
      typesOfCookies: 'Типы файлов cookie, которые мы используем',
      essentialCookies: 'Основные файлы cookie',
      essentialText: 'Эти файлы cookie необходимы для правильной работы нашего веб-сайта. Они обеспечивают основные функции, такие как навигация по страницам, доступ к защищенным областям и аутентификация пользователей.',
      essentialExamples: 'Примеры: Управление сеансами, токены безопасности, языковые предпочтения',
      performanceCookies: 'Файлы cookie производительности',
      performanceText: 'Эти файлы cookie помогают нам понять, как посетители взаимодействуют с нашим веб-сайтом, собирая информацию о посещенных страницах, времени пребывания и любых ошибках.',
      performanceExamples: 'Примеры: Google Analytics, время загрузки страниц, отслеживание ошибок',
      functionalCookies: 'Функциональные файлы cookie',
      functionalText: 'Эти файлы cookie позволяют нашему веб-сайту запоминать ваши выборы и предоставлять расширенные, персонализированные функции.',
      functionalExamples: 'Примеры: Запоминание данных входа, предпочитаемая валюта, фильтры поиска',
      targetingCookies: 'Целевые файлы cookie',
      targetingText: 'Эти файлы cookie могут устанавливаться нашими рекламными партнерами для создания профиля ваших интересов и показа релевантной рекламы.',
      targetingExamples: 'Примеры: Facebook Pixel, Google Ads, теги ремаркетинга',
      cookieDetails: 'Подробная информация о файлах cookie',
      cookieTable: 'Название cookie | Цель | Продолжительность | Тип',
      cookie1: 'session_id | Управление пользовательскими сеансами | Сеанс | Основной',
      cookie2: '_ga | Отслеживание Google Analytics | 2 года | Производительность',
      cookie3: 'lang_pref | Языковые предпочтения | 1 год | Функциональный',
      cookie4: 'user_consent | Статус согласия на cookie | 1 год | Основной',
      cookie5: 'search_filters | Сохраненные предпочтения поиска | 30 дней | Функциональный',
      cookie6: '_fbp | Facebook Pixel | 3 месяца | Целевой',
      thirdPartyServices: 'Сторонние сервисы',
      thirdPartyText: 'Мы используем несколько сторонних сервисов, которые могут устанавливать свои собственные файлы cookie:',
      googleAnalytics: 'Google Analytics',
      googleAnalyticsDesc: 'Для аналитики веб-сайта и мониторинга производительности',
      facebookPixel: 'Facebook Pixel',
      facebookPixelDesc: 'Для рекламы и целей ремаркетинга',
      googleAds: 'Google Ads',
      googleAdsDesc: 'Для показа релевантной рекламы',
      yandexMetrica: 'Яндекс.Метрика',
      yandexMetricaDesc: 'Для аналитики веб-сайта в регионе СНГ',
      managingCookies: 'Управление настройками файлов cookie',
      browserSettings: 'Настройки браузера',
      browserText: 'Вы можете управлять файлами cookie через настройки браузера. Большинство браузеров позволяют вам:',
      browserList1: 'Просматривать и удалять существующие файлы cookie',
      browserList2: 'Блокировать файлы cookie с определенных веб-сайтов',
      browserList3: 'Блокировать все файлы cookie',
      browserList4: 'Удалять файлы cookie при закрытии браузера',
      ourCookieSettings: 'Наши настройки файлов cookie',
      cookieSettingsText: 'Мы предоставляем центр предпочтений файлов cookie, где вы можете управлять своим согласием на различные типы файлов cookie. Вы можете получить к нему доступ в любое время, нажав на ссылку "Настройки файлов cookie" в нашем подвале.',
      cookieConsent: 'Согласие на использование файлов cookie',
      consentText: 'При первом посещении нашего веб-сайта мы попросим ваше согласие на использование несущественных файлов cookie. Вы можете отозвать свое согласие в любое время через наши настройки файлов cookie.',
      consentTypes: 'Категории согласия',
      consentTypesList1: 'Основные: Всегда активны (не могут быть отключены)',
      consentTypesList2: 'Производительность: Опционально (помогает улучшить наш веб-сайт)',
      consentTypesList3: 'Функциональные: Опционально (улучшает пользовательский опыт)',
      consentTypesList4: 'Целевые: Опционально (для персонализированной рекламы)',
      dataRetention: 'Хранение данных',
      retentionText: 'Мы храним данные файлов cookie в течение различных периодов в зависимости от типа файла cookie:',
      retentionList1: 'Сеансовые файлы cookie: Удаляются при закрытии браузера',
      retentionList2: 'Постоянные файлы cookie: Истекают после указанного срока',
      retentionList3: 'Аналитические данные: Хранятся до 26 месяцев',
      retentionList4: 'Рекламные данные: Хранятся до 13 месяцев',
      yourRights: 'Ваши права',
      rightsText: 'Согласно законам о защите данных, вы имеете право:',
      rightsList1: 'Знать, какие файлы cookie мы используем и почему',
      rightsList2: 'Контролировать, какие файлы cookie устанавливаются',
      rightsList3: 'Отозвать свое согласие в любое время',
      rightsList4: 'Запросить удаление данных ваших файлов cookie',
      cookieUpdates: 'Обновления этой политики',
      updatesText: 'Мы можем время от времени обновлять эту Политику использования файлов cookie. Мы уведомим вас о любых существенных изменениях, разместив новую политику на нашем веб-сайте и обновив дату "последнего обновления".',
      internationalTransfers: 'Международные передачи данных',
      transfersText: 'Некоторые из наших сторонних сервисов могут передавать ваши данные за пределы Узбекистана. Мы обеспечиваем наличие соответствующих гарантий для защиты ваших данных.',
      contact: 'Контактная информация',
      contactText: 'Если у вас есть вопросы о нашем использовании файлов cookie, свяжитесь с нами по адресу:',
      email: 'Email: privacy@deals.uz',
      phone: 'Телефон: +998 71 123 4567',
      address: 'Адрес: ул. Инновации 123, Ташкентский деловой район, Ташкент 100000, Узбекистан',
      cookieSettings: 'Управление настройками файлов cookie',
      cookieSettingsDesc: 'Нажмите здесь, чтобы управлять настройками файлов cookie и обновить свои варианты согласия.'
    }
  };
  return translations[locale]?.[key] || translations.en[key] || key;
};

export default function CookiePolicyPage() {
  const params = useParams();
  const locale = params?.locale as Locale || 'en';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Header locale={locale} />
      
      <main style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        padding: '2rem',
        backgroundColor: 'white',
        marginTop: '2rem',
        marginBottom: '2rem',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          marginBottom: '1rem',
          color: '#333'
        }}>
          {t(locale, 'cookiePolicy')}
        </h1>
        
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          {t(locale, 'lastUpdated')}: September 9, 2025
        </p>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            1. {t(locale, 'introduction')}
          </h2>
          <p style={{ lineHeight: '1.6', color: '#555' }}>
            {t(locale, 'introText')}
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            2. {t(locale, 'whatAreCookies')}
          </h2>
          <p style={{ lineHeight: '1.6', color: '#555' }}>
            {t(locale, 'cookiesExplanation')}
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            3. {t(locale, 'typesOfCookies')}
          </h2>
          
          <div style={{ backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#28a745' }}>
              🔒 {t(locale, 'essentialCookies')}
            </h3>
            <p style={{ lineHeight: '1.6', color: '#555', marginBottom: '0.5rem' }}>
              {t(locale, 'essentialText')}
            </p>
            <p style={{ fontSize: '0.9rem', color: '#666', fontStyle: 'italic' }}>
              {t(locale, 'essentialExamples')}
            </p>
          </div>

          <div style={{ backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#007bff' }}>
              📊 {t(locale, 'performanceCookies')}
            </h3>
            <p style={{ lineHeight: '1.6', color: '#555', marginBottom: '0.5rem' }}>
              {t(locale, 'performanceText')}
            </p>
            <p style={{ fontSize: '0.9rem', color: '#666', fontStyle: 'italic' }}>
              {t(locale, 'performanceExamples')}
            </p>
          </div>

          <div style={{ backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#6f42c1' }}>
              ⚙️ {t(locale, 'functionalCookies')}
            </h3>
            <p style={{ lineHeight: '1.6', color: '#555', marginBottom: '0.5rem' }}>
              {t(locale, 'functionalText')}
            </p>
            <p style={{ fontSize: '0.9rem', color: '#666', fontStyle: 'italic' }}>
              {t(locale, 'functionalExamples')}
            </p>
          </div>

          <div style={{ backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#fd7e14' }}>
              🎯 {t(locale, 'targetingCookies')}
            </h3>
            <p style={{ lineHeight: '1.6', color: '#555', marginBottom: '0.5rem' }}>
              {t(locale, 'targetingText')}
            </p>
            <p style={{ fontSize: '0.9rem', color: '#666', fontStyle: 'italic' }}>
              {t(locale, 'targetingExamples')}
            </p>
          </div>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            4. {t(locale, 'cookieDetails')}
          </h2>
          
          <div style={{ overflow: 'auto', backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #dee2e6' }}>
                  <th style={{ padding: '0.5rem', textAlign: 'left', fontWeight: '600' }}>Cookie</th>
                  <th style={{ padding: '0.5rem', textAlign: 'left', fontWeight: '600' }}>Purpose</th>
                  <th style={{ padding: '0.5rem', textAlign: 'left', fontWeight: '600' }}>Duration</th>
                  <th style={{ padding: '0.5rem', textAlign: 'left', fontWeight: '600' }}>Type</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #dee2e6' }}>
                  <td style={{ padding: '0.5rem' }}>session_id</td>
                  <td style={{ padding: '0.5rem' }}>User session management</td>
                  <td style={{ padding: '0.5rem' }}>Session</td>
                  <td style={{ padding: '0.5rem', color: '#28a745' }}>Essential</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #dee2e6' }}>
                  <td style={{ padding: '0.5rem' }}>_ga</td>
                  <td style={{ padding: '0.5rem' }}>Google Analytics tracking</td>
                  <td style={{ padding: '0.5rem' }}>2 years</td>
                  <td style={{ padding: '0.5rem', color: '#007bff' }}>Performance</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #dee2e6' }}>
                  <td style={{ padding: '0.5rem' }}>lang_pref</td>
                  <td style={{ padding: '0.5rem' }}>Language preference</td>
                  <td style={{ padding: '0.5rem' }}>1 year</td>
                  <td style={{ padding: '0.5rem', color: '#6f42c1' }}>Functional</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #dee2e6' }}>
                  <td style={{ padding: '0.5rem' }}>user_consent</td>
                  <td style={{ padding: '0.5rem' }}>Cookie consent status</td>
                  <td style={{ padding: '0.5rem' }}>1 year</td>
                  <td style={{ padding: '0.5rem', color: '#28a745' }}>Essential</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #dee2e6' }}>
                  <td style={{ padding: '0.5rem' }}>search_filters</td>
                  <td style={{ padding: '0.5rem' }}>Saved search preferences</td>
                  <td style={{ padding: '0.5rem' }}>30 days</td>
                  <td style={{ padding: '0.5rem', color: '#6f42c1' }}>Functional</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.5rem' }}>_fbp</td>
                  <td style={{ padding: '0.5rem' }}>Facebook Pixel</td>
                  <td style={{ padding: '0.5rem' }}>3 months</td>
                  <td style={{ padding: '0.5rem', color: '#fd7e14' }}>Targeting</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            5. {t(locale, 'thirdPartyServices')}
          </h2>
          <p style={{ lineHeight: '1.6', color: '#555', marginBottom: '1rem' }}>
            {t(locale, 'thirdPartyText')}
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4 style={{ color: '#333', marginBottom: '0.5rem' }}>{t(locale, 'googleAnalytics')}</h4>
              <p style={{ fontSize: '0.9rem', color: '#555' }}>{t(locale, 'googleAnalyticsDesc')}</p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4 style={{ color: '#333', marginBottom: '0.5rem' }}>{t(locale, 'facebookPixel')}</h4>
              <p style={{ fontSize: '0.9rem', color: '#555' }}>{t(locale, 'facebookPixelDesc')}</p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4 style={{ color: '#333', marginBottom: '0.5rem' }}>{t(locale, 'googleAds')}</h4>
              <p style={{ fontSize: '0.9rem', color: '#555' }}>{t(locale, 'googleAdsDesc')}</p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4 style={{ color: '#333', marginBottom: '0.5rem' }}>{t(locale, 'yandexMetrica')}</h4>
              <p style={{ fontSize: '0.9rem', color: '#555' }}>{t(locale, 'yandexMetricaDesc')}</p>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            6. {t(locale, 'managingCookies')}
          </h2>
          
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#444' }}>
            {t(locale, 'browserSettings')}
          </h3>
          <p style={{ lineHeight: '1.6', color: '#555', marginBottom: '1rem' }}>
            {t(locale, 'browserText')}
          </p>
          
          <ul style={{ paddingLeft: '1.5rem', color: '#555', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            <li>{t(locale, 'browserList1')}</li>
            <li>{t(locale, 'browserList2')}</li>
            <li>{t(locale, 'browserList3')}</li>
            <li>{t(locale, 'browserList4')}</li>
          </ul>

          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#444' }}>
            {t(locale, 'ourCookieSettings')}
          </h3>
          <p style={{ lineHeight: '1.6', color: '#555' }}>
            {t(locale, 'cookieSettingsText')}
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            7. {t(locale, 'cookieConsent')}
          </h2>
          <p style={{ lineHeight: '1.6', color: '#555', marginBottom: '1rem' }}>
            {t(locale, 'consentText')}
          </p>
          
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#444' }}>
            {t(locale, 'consentTypes')}
          </h3>
          <ul style={{ paddingLeft: '1.5rem', color: '#555', lineHeight: '1.8' }}>
            <li>{t(locale, 'consentTypesList1')}</li>
            <li>{t(locale, 'consentTypesList2')}</li>
            <li>{t(locale, 'consentTypesList3')}</li>
            <li>{t(locale, 'consentTypesList4')}</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            8. {t(locale, 'dataRetention')}
          </h2>
          <p style={{ lineHeight: '1.6', color: '#555', marginBottom: '1rem' }}>
            {t(locale, 'retentionText')}
          </p>
          
          <ul style={{ paddingLeft: '1.5rem', color: '#555', lineHeight: '1.8' }}>
            <li>{t(locale, 'retentionList1')}</li>
            <li>{t(locale, 'retentionList2')}</li>
            <li>{t(locale, 'retentionList3')}</li>
            <li>{t(locale, 'retentionList4')}</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            9. {t(locale, 'yourRights')}
          </h2>
          <p style={{ lineHeight: '1.6', color: '#555', marginBottom: '1rem' }}>
            {t(locale, 'rightsText')}
          </p>
          
          <ul style={{ paddingLeft: '1.5rem', color: '#555', lineHeight: '1.8' }}>
            <li>{t(locale, 'rightsList1')}</li>
            <li>{t(locale, 'rightsList2')}</li>
            <li>{t(locale, 'rightsList3')}</li>
            <li>{t(locale, 'rightsList4')}</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            10. {t(locale, 'cookieUpdates')}
          </h2>
          <p style={{ lineHeight: '1.6', color: '#555' }}>
            {t(locale, 'updatesText')}
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            11. {t(locale, 'internationalTransfers')}
          </h2>
          <p style={{ lineHeight: '1.6', color: '#555' }}>
            {t(locale, 'transfersText')}
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            12. {t(locale, 'contact')}
          </h2>
          <p style={{ lineHeight: '1.6', color: '#555', marginBottom: '1rem' }}>
            {t(locale, 'contactText')}
          </p>
          
          <div style={{ backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
            <p style={{ margin: '0.5rem 0', color: '#555' }}>{t(locale, 'email')}</p>
            <p style={{ margin: '0.5rem 0', color: '#555' }}>{t(locale, 'phone')}</p>
            <p style={{ margin: '0.5rem 0', color: '#555' }}>{t(locale, 'address')}</p>
          </div>
        </section>

        <section>
          <div style={{ 
            backgroundColor: '#e7f3ff', 
            padding: '1.5rem', 
            borderRadius: '8px', 
            textAlign: 'center',
            border: '1px solid #007bff'
          }}>
            <h3 style={{ color: '#007bff', marginBottom: '0.5rem' }}>
              ⚙️ {t(locale, 'cookieSettings')}
            </h3>
            <p style={{ color: '#555', marginBottom: '1rem' }}>
              {t(locale, 'cookieSettingsDesc')}
            </p>
            <button style={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '0.75rem 1.5rem',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500'
            }}>
              {t(locale, 'cookieSettings')}
            </button>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
