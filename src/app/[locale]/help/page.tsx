'use client';

import { useParams } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { Locale } from '../../../i18n';

// Simple translation function for this page
const t = (locale: string, key: string): string => {
  const translations: Record<string, Record<string, string>> = {
    en: {
      helpCenter: 'Help Center',
      gettingStarted: 'Getting Started',
      howToCreateAccount: 'How to create an account?',
      createAccountAnswer: 'Click on the "Login/Register" button in the top right corner and follow the registration process. You\'ll need to provide your name, email, and phone number.',
      howToPostItem: 'How to post an item for sale?',
      postItemAnswer: 'After logging in, click "Post an Ad" and fill out the form with your item details, photos, and price. Your listing will be live immediately.',
      selling: 'Selling',
      howToEditListing: 'How to edit my listing?',
      editListingAnswer: 'Go to "My Listings" page, find your item, and click the edit button to update details, photos, or price.',
      howToDeleteListing: 'How to delete a listing?',
      deleteListingAnswer: 'In your "My Listings" page, click the delete button next to the item you want to remove.',
      buying: 'Buying',
      howToContactSeller: 'How to contact a seller?',
      contactSellerAnswer: 'Click on any listing to view details, then use the contact information provided to reach the seller directly.',
      howToSearch: 'How to search for items?',
      searchAnswer: 'Use the search bar on the Browse page, or filter by category, location, and price range to find what you\'re looking for.',
      safety: 'Safety & Security',
      safetyTips: 'What are the safety tips for transactions?',
      safetyAnswer: 'Always meet in public places, inspect items before paying, use secure payment methods, and trust your instincts. Never share personal financial information.',
      reportIssue: 'How to report suspicious activity?',
      reportAnswer: 'Contact our support team immediately at support@deals.uz with details of the suspicious activity.',
      technical: 'Technical Support',
      uploadPhotos: 'Having trouble uploading photos?',
      uploadAnswer: 'Ensure your photos are in JPG, PNG, or WebP format and under 5MB each. Try refreshing the page if uploads fail.',
      siteNotWorking: 'Website not working properly?',
      siteAnswer: 'Try clearing your browser cache, updating your browser, or contact our technical support team.',
      stillNeedHelp: 'Still need help?',
      contactSupport: 'Contact our support team at support@deals.uz or call +998 71 123 4567'
    },
    uz: {
      helpCenter: 'Yordam markazi',
      gettingStarted: 'Boshlash',
      howToCreateAccount: 'Hisob qaydnomasini qanday yaratish mumkin?',
      createAccountAnswer: 'Yuqori o\'ng burchakdagi "Kirish/Ro\'yxatdan o\'tish" tugmasini bosing va ro\'yxatdan o\'tish jarayonini bajaring. Ismingiz, email va telefon raqamingizni kiritishingiz kerak.',
      howToPostItem: 'Sotish uchun buyumni qanday joylashtirish mumkin?',
      postItemAnswer: 'Tizimga kirgandan so\'ng, "E\'lon berish"ni bosing va buyum tafsilotlari, rasmlar va narx bilan formani to\'ldiring. Sizning e\'loningiz darhol jonli bo\'ladi.',
      selling: 'Sotish',
      howToEditListing: 'E\'lonimni qanday tahrirlash mumkin?',
      editListingAnswer: '"Mening e\'lonlarim" sahifasiga o\'ting, buyumingizni toping va tafsilotlar, rasmlar yoki narxni yangilash uchun tahrirlash tugmasini bosing.',
      howToDeleteListing: 'E\'lonni qanday o\'chirish mumkin?',
      deleteListingAnswer: '"Mening e\'lonlarim" sahifasida o\'chirmoqchi bo\'lgan buyum yonidagi o\'chirish tugmasini bosing.',
      buying: 'Xarid qilish',
      howToContactSeller: 'Sotuvchi bilan qanday bog\'lanish mumkin?',
      contactSellerAnswer: 'Tafsilotlarni ko\'rish uchun har qanday e\'lonni bosing, so\'ngra sotuvchi bilan to\'g\'ridan-to\'g\'ri bog\'lanish uchun taqdim etilgan aloqa ma\'lumotlaridan foydalaning.',
      howToSearch: 'Buyumlarni qanday qidirish mumkin?',
      searchAnswer: 'Ko\'rish sahifasidagi qidiruv panelidan foydalaning yoki izlayotgan narsangizni topish uchun kategoriya, joylashuv va narx oralig\'i bo\'yicha filtrlang.',
      safety: 'Xavfsizlik',
      safetyTips: 'Tranzaktsiyalar uchun xavfsizlik maslahatlari qanday?',
      safetyAnswer: 'Har doim ommaviy joylarda uchrashing, to\'lashdan oldin buyumlarni tekshiring, xavfsiz to\'lov usullaridan foydalaning va o\'z his-tuyg\'ularingizga ishoning. Hech qachon shaxsiy moliyaviy ma\'lumotlarni baham ko\'rmang.',
      reportIssue: 'Shubhali faoliyatni qanday xabar qilish mumkin?',
      reportAnswer: 'Shubhali faoliyat tafsilotlari bilan darhol support@deals.uz manziliga yordam guruhimizga murojaat qiling.',
      technical: 'Texnik yordam',
      uploadPhotos: 'Rasm yuklashda muammo bormi?',
      uploadAnswer: 'Rasmlaringiz JPG, PNG yoki WebP formatida va har biri 5MB dan kam ekanligiga ishonch hosil qiling. Yuklash muvaffaqiyatsiz bo\'lsa, sahifani yangilashga harakat qiling.',
      siteNotWorking: 'Veb-sayt to\'g\'ri ishlamayaptimi?',
      siteAnswer: 'Brauzer keshini tozalashga, brauzerni yangilashga harakat qiling yoki texnik yordam guruhimizga murojaat qiling.',
      stillNeedHelp: 'Hali ham yordam kerakmi?',
      contactSupport: 'support@deals.uz manziliga yoki +998 71 123 4567 raqamiga qo\'ng\'iroq qiling'
    },
    ru: {
      helpCenter: 'Центр помощи',
      gettingStarted: 'Начало работы',
      howToCreateAccount: 'Как создать аккаунт?',
      createAccountAnswer: 'Нажмите на кнопку "Вход/Регистрация" в правом верхнем углу и следуйте процессу регистрации. Вам нужно будет указать имя, email и номер телефона.',
      howToPostItem: 'Как разместить товар для продажи?',
      postItemAnswer: 'После входа в систему нажмите "Подать объявление" и заполните форму с описанием товара, фотографиями и ценой. Ваше объявление будет опубликовано немедленно.',
      selling: 'Продажа',
      howToEditListing: 'Как редактировать мое объявление?',
      editListingAnswer: 'Перейдите на страницу "Мои объявления", найдите ваш товар и нажмите кнопку редактирования для обновления деталей, фотографий или цены.',
      howToDeleteListing: 'Как удалить объявление?',
      deleteListingAnswer: 'На странице "Мои объявления" нажмите кнопку удаления рядом с товаром, который хотите убрать.',
      buying: 'Покупка',
      howToContactSeller: 'Как связаться с продавцом?',
      contactSellerAnswer: 'Нажмите на любое объявление для просмотра деталей, затем используйте предоставленную контактную информацию для связи с продавцом.',
      howToSearch: 'Как искать товары?',
      searchAnswer: 'Используйте строку поиска на странице просмотра или фильтруйте по категории, местоположению и ценовому диапазону для поиска нужного.',
      safety: 'Безопасность',
      safetyTips: 'Какие советы по безопасности для сделок?',
      safetyAnswer: 'Всегда встречайтесь в общественных местах, проверяйте товары перед оплатой, используйте безопасные способы оплаты и доверяйте интуиции. Никогда не делитесь личной финансовой информацией.',
      reportIssue: 'Как сообщить о подозрительной активности?',
      reportAnswer: 'Немедленно свяжитесь с нашей службой поддержки по адресу support@deals.uz с деталями подозрительной активности.',
      technical: 'Техническая поддержка',
      uploadPhotos: 'Проблемы с загрузкой фотографий?',
      uploadAnswer: 'Убедитесь, что ваши фотографии в формате JPG, PNG или WebP и размером менее 5МБ каждая. Попробуйте обновить страницу, если загрузка не удается.',
      siteNotWorking: 'Сайт работает неправильно?',
      siteAnswer: 'Попробуйте очистить кэш браузера, обновить браузер или обратиться к нашей службе технической поддержки.',
      stillNeedHelp: 'Все еще нужна помощь?',
      contactSupport: 'Свяжитесь с нашей службой поддержки по адресу support@deals.uz или по телефону +998 71 123 4567'
    }
  };
  return translations[locale]?.[key] || translations.en[key] || key;
};

export default function HelpCenterPage() {
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
          marginBottom: '2rem',
          color: '#333',
          textAlign: 'center'
        }}>
          {t(locale, 'helpCenter')}
        </h1>

        {/* Getting Started Section */}
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ 
            fontSize: '1.8rem', 
            fontWeight: '600', 
            marginBottom: '1rem', 
            color: '#0070f3',
            borderBottom: '2px solid #0070f3',
            paddingBottom: '0.5rem'
          }}>
            {t(locale, 'gettingStarted')}
          </h2>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>
              {t(locale, 'howToCreateAccount')}
            </h3>
            <p style={{ lineHeight: '1.6', color: '#555', paddingLeft: '1rem' }}>
              {t(locale, 'createAccountAnswer')}
            </p>
          </div>
          
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>
              {t(locale, 'howToPostItem')}
            </h3>
            <p style={{ lineHeight: '1.6', color: '#555', paddingLeft: '1rem' }}>
              {t(locale, 'postItemAnswer')}
            </p>
          </div>
        </section>

        {/* Selling Section */}
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ 
            fontSize: '1.8rem', 
            fontWeight: '600', 
            marginBottom: '1rem', 
            color: '#0070f3',
            borderBottom: '2px solid #0070f3',
            paddingBottom: '0.5rem'
          }}>
            {t(locale, 'selling')}
          </h2>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>
              {t(locale, 'howToEditListing')}
            </h3>
            <p style={{ lineHeight: '1.6', color: '#555', paddingLeft: '1rem' }}>
              {t(locale, 'editListingAnswer')}
            </p>
          </div>
          
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>
              {t(locale, 'howToDeleteListing')}
            </h3>
            <p style={{ lineHeight: '1.6', color: '#555', paddingLeft: '1rem' }}>
              {t(locale, 'deleteListingAnswer')}
            </p>
          </div>
        </section>

        {/* Buying Section */}
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ 
            fontSize: '1.8rem', 
            fontWeight: '600', 
            marginBottom: '1rem', 
            color: '#0070f3',
            borderBottom: '2px solid #0070f3',
            paddingBottom: '0.5rem'
          }}>
            {t(locale, 'buying')}
          </h2>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>
              {t(locale, 'howToContactSeller')}
            </h3>
            <p style={{ lineHeight: '1.6', color: '#555', paddingLeft: '1rem' }}>
              {t(locale, 'contactSellerAnswer')}
            </p>
          </div>
          
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>
              {t(locale, 'howToSearch')}
            </h3>
            <p style={{ lineHeight: '1.6', color: '#555', paddingLeft: '1rem' }}>
              {t(locale, 'searchAnswer')}
            </p>
          </div>
        </section>

        {/* Safety Section */}
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ 
            fontSize: '1.8rem', 
            fontWeight: '600', 
            marginBottom: '1rem', 
            color: '#0070f3',
            borderBottom: '2px solid #0070f3',
            paddingBottom: '0.5rem'
          }}>
            {t(locale, 'safety')}
          </h2>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>
              {t(locale, 'safetyTips')}
            </h3>
            <p style={{ lineHeight: '1.6', color: '#555', paddingLeft: '1rem' }}>
              {t(locale, 'safetyAnswer')}
            </p>
          </div>
          
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>
              {t(locale, 'reportIssue')}
            </h3>
            <p style={{ lineHeight: '1.6', color: '#555', paddingLeft: '1rem' }}>
              {t(locale, 'reportAnswer')}
            </p>
          </div>
        </section>

        {/* Technical Support Section */}
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ 
            fontSize: '1.8rem', 
            fontWeight: '600', 
            marginBottom: '1rem', 
            color: '#0070f3',
            borderBottom: '2px solid #0070f3',
            paddingBottom: '0.5rem'
          }}>
            {t(locale, 'technical')}
          </h2>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>
              {t(locale, 'uploadPhotos')}
            </h3>
            <p style={{ lineHeight: '1.6', color: '#555', paddingLeft: '1rem' }}>
              {t(locale, 'uploadAnswer')}
            </p>
          </div>
          
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>
              {t(locale, 'siteNotWorking')}
            </h3>
            <p style={{ lineHeight: '1.6', color: '#555', paddingLeft: '1rem' }}>
              {t(locale, 'siteAnswer')}
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '1.5rem', 
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            {t(locale, 'stillNeedHelp')}
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#555' }}>
            {t(locale, 'contactSupport')}
          </p>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
