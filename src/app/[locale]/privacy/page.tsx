'use client';

import { useParams } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { Locale } from '../../../i18n';

// Simple translation function for this page
const t = (locale: string, key: string): string => {
  const translations: Record<string, Record<string, string>> = {
    en: {
      privacyPolicy: 'Privacy Policy',
      lastUpdated: 'Last updated',
      introduction: 'Introduction',
      introText: 'At Deals.uz, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our marketplace platform.',
      infoWeCollect: 'Information We Collect',
      personalInfo: 'Personal Information',
      personalInfoText: 'When you register or use our services, we may collect personal information such as your name, email address, phone number, and location.',
      usageData: 'Usage Data',
      usageDataText: 'We automatically collect information about how you interact with our platform, including IP address, browser type, pages visited, and time spent on our site.',
      howWeUse: 'How We Use Your Information',
      useList1: 'To provide and maintain our marketplace services',
      useList2: 'To process transactions and manage your listings',
      useList3: 'To communicate with you about your account and our services',
      useList4: 'To improve our platform and user experience',
      useList5: 'To comply with legal obligations',
      dataSharing: 'Data Sharing and Disclosure',
      dataSharingText: 'We do not sell, trade, or otherwise transfer your personal information to third parties except as described in this policy or with your explicit consent.',
      security: 'Data Security',
      securityText: 'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
      yourRights: 'Your Rights',
      rightsText: 'You have the right to access, update, or delete your personal information. You may also object to certain processing of your data.',
      contact: 'Contact Us',
      contactText: 'If you have any questions about this Privacy Policy, please contact us at privacy@deals.uz'
    },
    uz: {
      privacyPolicy: 'Maxfiylik siyosati',
      lastUpdated: 'Oxirgi yangilangan',
      introduction: 'Kirish',
      introText: 'Deals.uz da biz sizning maxfiyligingizni hurmat qilamiz va shaxsiy ma\'lumotlaringizni himoya qilishga majburmiz. Ushbu Maxfiylik siyosati bizning bozor platformamizdan foydalanganingizda ma\'lumotlaringizni qanday yig\'ishimiz, ishlatishimiz va himoya qilishimizni tushuntiradi.',
      infoWeCollect: 'Yig\'iladigan ma\'lumotlar',
      personalInfo: 'Shaxsiy ma\'lumotlar',
      personalInfoText: 'Ro\'yxatdan o\'tganingizda yoki xizmatlarimizdan foydalanganingizda, ismingiz, email manzilingiz, telefon raqamingiz va joylashuvingiz kabi shaxsiy ma\'lumotlarni yig\'ishimiz mumkin.',
      usageData: 'Foydalanish ma\'lumotlari',
      usageDataText: 'Biz platformamiz bilan qanday muloqot qilishingiz haqida avtomatik ravishda ma\'lumot yig\'amiz, jumladan IP manzil, brauzer turi, tashrif buyurilgan sahifalar va saytda o\'tkazilgan vaqt.',
      howWeUse: 'Ma\'lumotlaringizni qanday ishlatamiz',
      useList1: 'Bozor xizmatlarini taqdim etish va saqlash uchun',
      useList2: 'Tranzaktsiyalarni qayta ishlash va e\'lonlaringizni boshqarish uchun',
      useList3: 'Hisobingiz va xizmatlarimiz haqida siz bilan bog\'lanish uchun',
      useList4: 'Platformamiz va foydalanuvchi tajribasini yaxshilash uchun',
      useList5: 'Huquqiy majburiyatlarga rioya qilish uchun',
      dataSharing: 'Ma\'lumotlarni baham ko\'rish',
      dataSharingText: 'Biz shaxsiy ma\'lumotlaringizni ushbu siyosatda tavsiflangandan yoki sizning aniq roziligingizdan tashqari uchinchi tomonlarga sotmaymiz, almashtirmaymiz yoki boshqa yo\'l bilan o\'tkazmaymiz.',
      security: 'Ma\'lumotlar xavfsizligi',
      securityText: 'Biz shaxsiy ma\'lumotlaringizni ruxsatsiz kirish, o\'zgartirish, oshkor qilish yoki yo\'q qilishdan himoya qilish uchun tegishli xavfsizlik choralarini amalga oshiramiz.',
      yourRights: 'Sizning huquqlaringiz',
      rightsText: 'Siz shaxsiy ma\'lumotlaringizga kirish, yangilash yoki o\'chirish huquqiga egasiz. Shuningdek, ma\'lumotlaringizning muayyan qayta ishlanishiga e\'tiroz bildira olasiz.',
      contact: 'Biz bilan bog\'laning',
      contactText: 'Ushbu Maxfiylik siyosati bo\'yicha savollaringiz bo\'lsa, privacy@deals.uz manziliga murojaat qiling'
    },
    ru: {
      privacyPolicy: 'Политика конфиденциальности',
      lastUpdated: 'Последнее обновление',
      introduction: 'Введение',
      introText: 'В Deals.uz мы уважаем вашу конфиденциальность и обязуемся защищать вашу личную информацию. Эта Политика конфиденциальности объясняет, как мы собираем, используем и защищаем вашу информацию при использовании нашей торговой платформы.',
      infoWeCollect: 'Собираемая информация',
      personalInfo: 'Личная информация',
      personalInfoText: 'При регистрации или использовании наших услуг мы можем собирать личную информацию, такую как ваше имя, адрес электронной почты, номер телефона и местоположение.',
      usageData: 'Данные использования',
      usageDataText: 'Мы автоматически собираем информацию о том, как вы взаимодействуете с нашей платформой, включая IP-адрес, тип браузера, посещенные страницы и время, проведенное на нашем сайте.',
      howWeUse: 'Как мы используем вашу информацию',
      useList1: 'Для предоставления и поддержания наших торговых услуг',
      useList2: 'Для обработки транзакций и управления вашими объявлениями',
      useList3: 'Для связи с вами по поводу вашей учетной записи и наших услуг',
      useList4: 'Для улучшения нашей платформы и пользовательского опыта',
      useList5: 'Для соблюдения правовых обязательств',
      dataSharing: 'Обмен данными',
      dataSharingText: 'Мы не продаем, не обмениваем и не передаем вашу личную информацию третьим лицам, за исключением случаев, описанных в этой политике или с вашего явного согласия.',
      security: 'Безопасность данных',
      securityText: 'Мы внедряем соответствующие меры безопасности для защиты вашей личной информации от несанкционированного доступа, изменения, раскрытия или уничтожения.',
      yourRights: 'Ваши права',
      rightsText: 'У вас есть право доступа, обновления или удаления вашей личной информации. Вы также можете возражать против определенной обработки ваших данных.',
      contact: 'Свяжитесь с нами',
      contactText: 'Если у вас есть вопросы по этой Политике конфиденциальности, свяжитесь с нами по адресу privacy@deals.uz'
    }
  };
  return translations[locale]?.[key] || translations.en[key] || key;
};

export default function PrivacyPolicyPage() {
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
          {t(locale, 'privacyPolicy')}
        </h1>
        
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          {t(locale, 'lastUpdated')}: September 9, 2025
        </p>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            {t(locale, 'introduction')}
          </h2>
          <p style={{ lineHeight: '1.6', color: '#555' }}>
            {t(locale, 'introText')}
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            {t(locale, 'infoWeCollect')}
          </h2>
          
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#444' }}>
            {t(locale, 'personalInfo')}
          </h3>
          <p style={{ lineHeight: '1.6', color: '#555', marginBottom: '1rem' }}>
            {t(locale, 'personalInfoText')}
          </p>
          
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#444' }}>
            {t(locale, 'usageData')}
          </h3>
          <p style={{ lineHeight: '1.6', color: '#555' }}>
            {t(locale, 'usageDataText')}
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            {t(locale, 'howWeUse')}
          </h2>
          <ul style={{ paddingLeft: '1.5rem', color: '#555', lineHeight: '1.8' }}>
            <li>{t(locale, 'useList1')}</li>
            <li>{t(locale, 'useList2')}</li>
            <li>{t(locale, 'useList3')}</li>
            <li>{t(locale, 'useList4')}</li>
            <li>{t(locale, 'useList5')}</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            {t(locale, 'dataSharing')}
          </h2>
          <p style={{ lineHeight: '1.6', color: '#555' }}>
            {t(locale, 'dataSharingText')}
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            {t(locale, 'security')}
          </h2>
          <p style={{ lineHeight: '1.6', color: '#555' }}>
            {t(locale, 'securityText')}
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            {t(locale, 'yourRights')}
          </h2>
          <p style={{ lineHeight: '1.6', color: '#555' }}>
            {t(locale, 'rightsText')}
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            {t(locale, 'contact')}
          </h2>
          <p style={{ lineHeight: '1.6', color: '#555' }}>
            {t(locale, 'contactText')}
          </p>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
