'use client';

import { useParams } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { Locale } from '../../../i18n';

// Simple translation function for this page
const t = (locale: string, key: string): string => {
  const translations: Record<string, Record<string, string>> = {
    en: {
      contactUs: 'Contact Us',
      getInTouch: 'Get in Touch',
      getInTouchDesc: 'We\'re here to help! Reach out to us through any of the following channels, and we\'ll get back to you as soon as possible.',
      generalSupport: 'General Support',
      email: 'Email',
      phone: 'Phone',
      businessHours: 'Business Hours',
      mondayFriday: 'Monday - Friday: 9:00 AM - 6:00 PM',
      saturday: 'Saturday: 10:00 AM - 4:00 PM',
      sunday: 'Sunday: Closed',
      officeAddress: 'Office Address',
      address: '123 Innovation Street, Tashkent Business District, Tashkent 100000, Uzbekistan',
      departmentContacts: 'Department Contacts',
      technicalSupport: 'Technical Support',
      techSupportDesc: 'For website issues, bugs, or technical problems',
      businessInquiries: 'Business Inquiries',
      businessDesc: 'For partnerships, advertising, or business opportunities',
      reportIssues: 'Report Issues',
      reportDesc: 'To report suspicious activity or content violations',
      feedbackSuggestions: 'Feedback & Suggestions',
      feedbackDesc: 'Share your ideas to help us improve Deals.uz',
      socialMedia: 'Follow Us on Social Media',
      responseTime: 'Response Time',
      responseTimeDesc: 'We typically respond to emails within 24 hours during business days. For urgent technical issues, please call our support line.',
      emergencyContact: 'Emergency Contact',
      emergencyDesc: 'For urgent security issues or emergencies, call',
      visitOffice: 'Visit Our Office',
      visitDesc: 'Feel free to visit us during business hours. We recommend scheduling an appointment in advance.'
    },
    uz: {
      contactUs: 'Biz bilan bog\'laning',
      getInTouch: 'Aloqada bo\'ling',
      getInTouchDesc: 'Biz yordam berishga tayyormiz! Quyidagi kanallardan biri orqali biz bilan bog\'laning va biz imkon qadar tezroq javob beramiz.',
      generalSupport: 'Umumiy yordam',
      email: 'Email',
      phone: 'Telefon',
      businessHours: 'Ish vaqti',
      mondayFriday: 'Dushanba - Juma: 9:00 - 18:00',
      saturday: 'Shanba: 10:00 - 16:00',
      sunday: 'Yakshanba: Dam olish',
      officeAddress: 'Ofis manzili',
      address: '123 Innovatsiya ko\'chasi, Toshkent biznes hududi, Toshkent 100000, O\'zbekiston',
      departmentContacts: 'Bo\'lim kontaktlari',
      technicalSupport: 'Texnik yordam',
      techSupportDesc: 'Veb-sayt muammolari, xatolar yoki texnik muammolar uchun',
      businessInquiries: 'Biznes so\'rovlari',
      businessDesc: 'Hamkorlik, reklama yoki biznes imkoniyatlari uchun',
      reportIssues: 'Muammolarni xabar qilish',
      reportDesc: 'Shubhali faoliyat yoki kontent buzilishlarini xabar qilish uchun',
      feedbackSuggestions: 'Fikr va takliflar',
      feedbackDesc: 'Deals.uz ni yaxshilashga yordam berish uchun g\'oyalaringizni baham ko\'ring',
      socialMedia: 'Ijtimoiy tarmoqlarda bizni kuzatib boring',
      responseTime: 'Javob berish vaqti',
      responseTimeDesc: 'Biz odatda ish kunlarida 24 soat ichida emailga javob beramiz. Shoshilinch texnik muammolar uchun yordam liniyamizga qo\'ng\'iroq qiling.',
      emergencyContact: 'Favqulodda aloqa',
      emergencyDesc: 'Shoshilinch xavfsizlik muammolari yoki favqulodda holatlar uchun qo\'ng\'iroq qiling',
      visitOffice: 'Ofisimizga tashrif buyuring',
      visitDesc: 'Ish vaqtida bizga tashrif buyuring. Oldindan uchrashuvni belgilashni tavsiya qilamiz.'
    },
    ru: {
      contactUs: 'Свяжитесь с нами',
      getInTouch: 'Свяжитесь с нами',
      getInTouchDesc: 'Мы здесь, чтобы помочь! Свяжитесь с нами через любой из следующих каналов, и мы ответим вам как можно скорее.',
      generalSupport: 'Общая поддержка',
      email: 'Email',
      phone: 'Телефон',
      businessHours: 'Рабочие часы',
      mondayFriday: 'Понедельник - Пятница: 9:00 - 18:00',
      saturday: 'Суббота: 10:00 - 16:00',
      sunday: 'Воскресенье: Выходной',
      officeAddress: 'Адрес офиса',
      address: 'ул. Инновации 123, Ташкентский деловой район, Ташкент 100000, Узбекистан',
      departmentContacts: 'Контакты отделов',
      technicalSupport: 'Техническая поддержка',
      techSupportDesc: 'По вопросам работы сайта, ошибок или технических проблем',
      businessInquiries: 'Деловые запросы',
      businessDesc: 'По вопросам партнерства, рекламы или бизнес-возможностей',
      reportIssues: 'Сообщить о проблемах',
      reportDesc: 'Для сообщений о подозрительной активности или нарушениях контента',
      feedbackSuggestions: 'Отзывы и предложения',
      feedbackDesc: 'Поделитесь своими идеями, чтобы помочь нам улучшить Deals.uz',
      socialMedia: 'Следите за нами в социальных сетях',
      responseTime: 'Время ответа',
      responseTimeDesc: 'Мы обычно отвечаем на письма в течение 24 часов в рабочие дни. При срочных технических проблемах звоните на линию поддержки.',
      emergencyContact: 'Экстренный контакт',
      emergencyDesc: 'При срочных вопросах безопасности или чрезвычайных ситуациях звоните',
      visitOffice: 'Посетите наш офис',
      visitDesc: 'Приходите к нам в рабочее время. Рекомендуем заранее договориться о встрече.'
    }
  };
  return translations[locale]?.[key] || translations.en[key] || key;
};

export default function ContactUsPage() {
  const params = useParams();
  const locale = params?.locale as Locale || 'en';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Header locale={locale} />
      
      <main style={{ 
        maxWidth: '1000px', 
        margin: '0 auto', 
        padding: '2rem'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          marginBottom: '1rem',
          color: '#333',
          textAlign: 'center'
        }}>
          {t(locale, 'contactUs')}
        </h1>

        <p style={{ 
          textAlign: 'center', 
          fontSize: '1.2rem', 
          color: '#666', 
          marginBottom: '3rem',
          maxWidth: '600px',
          margin: '0 auto 3rem'
        }}>
          {t(locale, 'getInTouchDesc')}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          {/* General Contact Card */}
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '15px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📞</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
              {t(locale, 'generalSupport')}
            </h3>
            <div style={{ marginBottom: '1rem' }}>
              <strong>{t(locale, 'email')}:</strong>
              <br />
              <a href="mailto:support@deals.uz" style={{ color: '#0070f3', textDecoration: 'none' }}>
                support@deals.uz
              </a>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>{t(locale, 'phone')}:</strong>
              <br />
              <a href="tel:+998711234567" style={{ color: '#0070f3', textDecoration: 'none' }}>
                +998 71 123 4567
              </a>
            </div>
          </div>

          {/* Business Hours Card */}
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '15px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🕐</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
              {t(locale, 'businessHours')}
            </h3>
            <div style={{ lineHeight: '1.8', color: '#555' }}>
              <div>{t(locale, 'mondayFriday')}</div>
              <div>{t(locale, 'saturday')}</div>
              <div>{t(locale, 'sunday')}</div>
            </div>
          </div>

          {/* Office Location Card */}
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '15px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📍</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
              {t(locale, 'officeAddress')}
            </h3>
            <p style={{ color: '#555', lineHeight: '1.6' }}>
              {t(locale, 'address')}
            </p>
          </div>
        </div>

        {/* Department Contacts */}
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '15px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          marginBottom: '3rem'
        }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: '600', 
            marginBottom: '2rem', 
            color: '#333',
            textAlign: 'center'
          }}>
            {t(locale, 'departmentContacts')}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div style={{ padding: '1rem', border: '1px solid #e9ecef', borderRadius: '10px' }}>
              <h4 style={{ color: '#0070f3', marginBottom: '0.5rem' }}>{t(locale, 'technicalSupport')}</h4>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>{t(locale, 'techSupportDesc')}</p>
              <a href="mailto:tech@deals.uz" style={{ color: '#0070f3', textDecoration: 'none' }}>tech@deals.uz</a>
            </div>

            <div style={{ padding: '1rem', border: '1px solid #e9ecef', borderRadius: '10px' }}>
              <h4 style={{ color: '#0070f3', marginBottom: '0.5rem' }}>{t(locale, 'businessInquiries')}</h4>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>{t(locale, 'businessDesc')}</p>
              <a href="mailto:business@deals.uz" style={{ color: '#0070f3', textDecoration: 'none' }}>business@deals.uz</a>
            </div>

            <div style={{ padding: '1rem', border: '1px solid #e9ecef', borderRadius: '10px' }}>
              <h4 style={{ color: '#0070f3', marginBottom: '0.5rem' }}>{t(locale, 'reportIssues')}</h4>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>{t(locale, 'reportDesc')}</p>
              <a href="mailto:report@deals.uz" style={{ color: '#0070f3', textDecoration: 'none' }}>report@deals.uz</a>
            </div>

            <div style={{ padding: '1rem', border: '1px solid #e9ecef', borderRadius: '10px' }}>
              <h4 style={{ color: '#0070f3', marginBottom: '0.5rem' }}>{t(locale, 'feedbackSuggestions')}</h4>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>{t(locale, 'feedbackDesc')}</p>
              <a href="mailto:feedback@deals.uz" style={{ color: '#0070f3', textDecoration: 'none' }}>feedback@deals.uz</a>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '15px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            {t(locale, 'socialMedia')}
          </h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '2rem', cursor: 'pointer' }}>📘</span>
            <span style={{ fontSize: '2rem', cursor: 'pointer' }}>📷</span>
            <span style={{ fontSize: '2rem', cursor: 'pointer' }}>🐦</span>
            <span style={{ fontSize: '2rem', cursor: 'pointer' }}>📺</span>
          </div>
        </div>

        {/* Response Time & Emergency */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div style={{
            backgroundColor: '#e3f2fd',
            padding: '1.5rem',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <h4 style={{ color: '#1976d2', marginBottom: '0.5rem' }}>{t(locale, 'responseTime')}</h4>
            <p style={{ fontSize: '0.9rem', color: '#555' }}>{t(locale, 'responseTimeDesc')}</p>
          </div>

          <div style={{
            backgroundColor: '#fff3e0',
            padding: '1.5rem',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <h4 style={{ color: '#f57c00', marginBottom: '0.5rem' }}>{t(locale, 'emergencyContact')}</h4>
            <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '0.5rem' }}>{t(locale, 'emergencyDesc')}</p>
            <strong style={{ color: '#f57c00' }}>+998 71 911 0000</strong>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
