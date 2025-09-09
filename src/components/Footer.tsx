'use client';

import Link from 'next/link';

interface FooterProps {
  locale: string;
}

// Simple translation function
const t = (locale: string, key: string): string => {
  const translations: Record<string, Record<string, string>> = {
    en: {
      footerDescription: 'Your trusted marketplace for buying and selling quality items across Uzbekistan.',
      quickLinks: 'Quick Links',
      home: 'Home',
      browse: 'Browse Items',
      postAd: 'Post an Ad',
      myListings: 'My Listings',
      categories: 'Categories',
      electronics: 'Electronics',
      clothing: 'Clothing & Fashion',
      homeGarden: 'Home & Garden',
      vehicles: 'Vehicles',
      support: 'Support',
      helpCenter: 'Help Center',
      contactUs: 'Contact Us',
      safetyTips: 'Safety Tips',
      terms: 'Terms of Service',
      allRightsReserved: 'All rights reserved.',
      privacy: 'Privacy Policy',
      cookies: 'Cookie Policy'
    },
    uz: {
      footerDescription: 'O\'zbekiston bo\'ylab sifatli narsalarni sotib olish va sotish uchun ishonchli bozor.',
      quickLinks: 'Tezkor havolalar',
      home: 'Bosh sahifa',
      browse: 'Mahsulotlarni ko\'rish',
      postAd: 'E\'lon berish',
      myListings: 'Mening e\'lonlarim',
      categories: 'Kategoriyalar',
      electronics: 'Elektronika',
      clothing: 'Kiyim va moda',
      homeGarden: 'Uy va bog\'',
      vehicles: 'Transport vositalari',
      support: 'Yordam',
      helpCenter: 'Yordam markazi',
      contactUs: 'Biz bilan bog\'laning',
      safetyTips: 'Xavfsizlik maslahatlari',
      terms: 'Foydalanish shartlari',
      allRightsReserved: 'Barcha huquqlar himoyalangan.',
      privacy: 'Maxfiylik siyosati',
      cookies: 'Cookie siyosati'
    },
    ru: {
      footerDescription: 'Ваша надежная торговая площадка для покупки и продажи качественных товаров по всему Узбекистану.',
      quickLinks: 'Быстрые ссылки',
      home: 'Главная',
      browse: 'Просмотр товаров',
      postAd: 'Подать объявление',
      myListings: 'Мои объявления',
      categories: 'Категории',
      electronics: 'Электроника',
      clothing: 'Одежда и мода',
      homeGarden: 'Дом и сад',
      vehicles: 'Транспорт',
      support: 'Поддержка',
      helpCenter: 'Центр помощи',
      contactUs: 'Связаться с нами',
      safetyTips: 'Советы по безопасности',
      terms: 'Условия использования',
      allRightsReserved: 'Все права защищены.',
      privacy: 'Политика конфиденциальности',
      cookies: 'Политика файлов cookie'
    }
  };
  return translations[locale]?.[key] || translations.en[key] || key;
};

export default function Footer({ locale }: FooterProps) {
  return (
    <footer style={{
      backgroundColor: '#1a1a1a',
      color: 'white',
      padding: '3rem 2rem 2rem',
      marginTop: '4rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Company Info */}
          <div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              marginBottom: '1rem',
              color: '#0070f3',
              fontWeight: '700'
            }}>
              Deals.uz
            </h3>
            <p style={{ 
              color: '#ccc', 
              lineHeight: '1.6',
              marginBottom: '1rem'
            }}>
              {t(locale, 'footerDescription')}
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <span style={{ fontSize: '1.2rem' }}>📧</span>
              <span style={{ fontSize: '1.2rem' }}>📱</span>
              <span style={{ fontSize: '1.2rem' }}>🌐</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ 
              fontSize: '1.2rem', 
              marginBottom: '1rem',
              fontWeight: '600'
            }}>
              {t(locale, 'quickLinks')}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link 
                  href={`/${locale}`}
                  style={{ 
                    color: '#ccc', 
                    textDecoration: 'none'
                  }}
                >
                  {t(locale, 'home')}
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link 
                  href={`/${locale}/browse`}
                  style={{ 
                    color: '#ccc', 
                    textDecoration: 'none'
                  }}
                >
                  {t(locale, 'browse')}
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link 
                  href={`/${locale}/post`}
                  style={{ 
                    color: '#ccc', 
                    textDecoration: 'none'
                  }}
                >
                  {t(locale, 'postAd')}
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link 
                  href={`/${locale}/my-listings`}
                  style={{ 
                    color: '#ccc', 
                    textDecoration: 'none'
                  }}
                >
                  {t(locale, 'myListings')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 style={{ 
              fontSize: '1.2rem', 
              marginBottom: '1rem',
              fontWeight: '600'
            }}>
              {t(locale, 'categories')}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.5rem', color: '#ccc' }}>
                {t(locale, 'electronics')}
              </li>
              <li style={{ marginBottom: '0.5rem', color: '#ccc' }}>
                {t(locale, 'clothing')}
              </li>
              <li style={{ marginBottom: '0.5rem', color: '#ccc' }}>
                {t(locale, 'homeGarden')}
              </li>
              <li style={{ marginBottom: '0.5rem', color: '#ccc' }}>
                {t(locale, 'vehicles')}
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 style={{ 
              fontSize: '1.2rem', 
              marginBottom: '1rem',
              fontWeight: '600'
            }}>
              {t(locale, 'support')}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.5rem', color: '#ccc' }}>
                {t(locale, 'helpCenter')}
              </li>
              <li style={{ marginBottom: '0.5rem', color: '#ccc' }}>
                {t(locale, 'contactUs')}
              </li>
              <li style={{ marginBottom: '0.5rem', color: '#ccc' }}>
                {t(locale, 'safetyTips')}
              </li>
              <li style={{ marginBottom: '0.5rem', color: '#ccc' }}>
                {t(locale, 'terms')}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid #333',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{ 
            color: '#999', 
            margin: 0,
            fontSize: '0.9rem'
          }}>
            © 2025 Deals.uz. {t(locale, 'allRightsReserved')}
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <span style={{ 
              color: '#999', 
              fontSize: '0.9rem'
            }}>
              {t(locale, 'privacy')}
            </span>
            <span style={{ 
              color: '#999', 
              fontSize: '0.9rem'
            }}>
              {t(locale, 'cookies')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
