'use client';

import { useParams } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { Locale } from '../../../i18n';

// Simple translation function for this page
const t = (locale: string, key: string): string => {
  const translations: Record<string, Record<string, string>> = {
    en: {
      safetyTips: 'Safety Tips',
      staySecure: 'Stay Safe While Trading',
      introText: 'Your safety is our priority. Follow these essential tips to protect yourself when buying or selling on Deals.uz.',
      meetingSafely: 'Meeting Safely',
      meetingTitle: '🤝 Safe Meeting Practices',
      meetPublic: 'Always meet in public places',
      meetPublicDesc: 'Choose busy, well-lit public locations like malls, coffee shops, or police stations.',
      bringFriend: 'Bring a friend if possible',
      bringFriendDesc: 'Having someone with you increases safety and provides a witness to the transaction.',
      meetDaylight: 'Meet during daylight hours',
      meetDaylightDesc: 'Avoid late evening or early morning meetings when visibility is poor.',
      trustInstincts: 'Trust your instincts',
      trustInstinctsDesc: 'If something feels wrong, don\'t proceed with the meeting or transaction.',
      paymentSafety: 'Payment Safety',
      paymentTitle: '💳 Secure Payment Methods',
      cashOnly: 'Prefer cash transactions for in-person deals',
      cashOnlyDesc: 'Cash is the safest method for face-to-face transactions - no chargebacks or fraud risk.',
      inspectFirst: 'Inspect before paying',
      inspectFirstDesc: 'Always examine the item thoroughly before handing over any money.',
      avoidWireTransfers: 'Avoid wire transfers to strangers',
      avoidWireTransfersDesc: 'Never send money through wire services to people you haven\'t met in person.',
      noAdvancePayment: 'Don\'t pay in advance',
      noAdvancePaymentDesc: 'Avoid paying for items before seeing and inspecting them in person.',
      recognizeScams: 'Recognize Scams',
      scamTitle: '🚨 Common Scam Warning Signs',
      tooGoodToBeTrue: 'Prices that seem too good to be true',
      tooGoodDesc: 'Extremely low prices on expensive items are often scams.',
      urgentPressure: 'Pressure to act quickly',
      urgentDesc: 'Scammers often create false urgency to prevent you from thinking carefully.',
      poorCommunication: 'Poor grammar or communication',
      poorCommDesc: 'Broken English or evasive answers to simple questions are red flags.',
      requestPersonalInfo: 'Requests for personal information',
      personalInfoDesc: 'Never share social security numbers, bank details, or passwords.',
      protectInfo: 'Protect Your Information',
      infoTitle: '🔒 Information Security',
      limitPersonalDetails: 'Limit personal details in listings',
      limitDetailsDesc: 'Don\'t include your full name, exact address, or personal phone number in public listings.',
      useMessageSystem: 'Use our messaging system initially',
      useMessageDesc: 'Start communication through our platform before sharing direct contact information.',
      meetingLocation: 'Don\'t reveal your home address',
      meetingLocationDesc: 'Never invite strangers to your home or go to theirs for transactions.',
      phoneNumberCaution: 'Be cautious with phone numbers',
      phoneDesc: 'Consider using a secondary phone number or messaging app for initial contact.',
      reportingSuspicious: 'Reporting Suspicious Activity',
      reportTitle: '📢 How to Report',
      reportImmediately: 'Report suspicious behavior immediately',
      reportDesc: 'Contact our support team at report@deals.uz if you encounter suspicious activity.',
      blockUsers: 'Block problematic users',
      blockDesc: 'Use our platform tools to block users who behave inappropriately.',
      keepRecords: 'Keep records of communications',
      recordsDesc: 'Save screenshots of suspicious messages for reporting purposes.',
      contactPolice: 'Contact authorities if threatened',
      policeDesc: 'If you feel physically threatened, contact local law enforcement immediately.',
      additionalTips: 'Additional Safety Tips',
      additionalTitle: '💡 Extra Precautions',
      researchSeller: 'Research the seller',
      researchDesc: 'Check their profile, ratings, and previous listings before proceeding.',
      verifyIdentity: 'Verify item authenticity',
      verifyDesc: 'For expensive items, consider professional authentication or verification.',
      insuranceReceipts: 'Keep receipts and documentation',
      receiptsDesc: 'For valuable items, maintain proof of purchase and transaction records.',
      emergencyContacts: 'Share your plans',
      emergencyDesc: 'Let someone know where you\'re going and when you expect to return.',
      rememberTitle: 'Remember: Better Safe Than Sorry',
      rememberDesc: 'If a deal seems suspicious or makes you uncomfortable, it\'s always better to walk away. There will always be other opportunities to buy or sell.'
    },
    uz: {
      safetyTips: 'Xavfsizlik maslahatlari',
      staySecure: 'Savdo qilishda xavfsiz bo\'ling',
      introText: 'Sizning xavfsizligingiz bizning ustuvorligimizdir. Deals.uz da sotib olish yoki sotishda o\'zingizni himoya qilish uchun ushbu muhim maslahatlarga amal qiling.',
      meetingSafely: 'Xavfsiz uchrashish',
      meetingTitle: '🤝 Xavfsiz uchrashish amaliyoti',
      meetPublic: 'Har doim ommaviy joylarda uchrashing',
      meetPublicDesc: 'Savdo markazlari, qahvaxonalar yoki politsiya bo\'limlari kabi band, yoritilgan ommaviy joylarni tanlang.',
      bringFriend: 'Imkon bo\'lsa, do\'stingizni olib keling',
      bringFriendDesc: 'Siz bilan kimdir bo\'lishi xavfsizlikni oshiradi va tranzaksiyaga guvoh bo\'ladi.',
      meetDaylight: 'Kunduzgi vaqtlarda uchrashing',
      meetDaylightDesc: 'Kechki yoki erta tonggi uchrashuvlardan saqlaning, ko\'rinish yomon bo\'ladi.',
      trustInstincts: 'O\'z his-tuyg\'ularingizga ishoning',
      trustInstinctsDesc: 'Agar biror narsa noto\'g\'ri tuyulsa, uchrashuv yoki tranzaksiya bilan davom etmang.',
      paymentSafety: 'To\'lov xavfsizligi',
      paymentTitle: '💳 Xavfsiz to\'lov usullari',
      cashOnly: 'Shaxsiy savdolar uchun naqd to\'lovni afzal ko\'ring',
      cashOnlyDesc: 'Naqd pul yuzma-yuz tranzaktsiyalar uchun eng xavfsiz usul - qaytarib berish yoki firibgarlik xavfi yo\'q.',
      inspectFirst: 'To\'lashdan oldin tekshiring',
      inspectFirstDesc: 'Pul berishdan oldin har doim buyumni yaxshilab tekshiring.',
      avoidWireTransfers: 'Notanish odamlarga pul o\'tkazmalaridan saqlaning',
      avoidWireTransfersDesc: 'Shaxsan uchrashmagan odamlarga hech qachon pul o\'tkazma xizmatlari orqali pul jo\'natmang.',
      noAdvancePayment: 'Oldindan to\'lamang',
      noAdvancePaymentDesc: 'Buyumlarni shaxsan ko\'rish va tekshirishdan oldin to\'lashdan saqlaning.',
      recognizeScams: 'Firibgarlikni tanib oling',
      scamTitle: '🚨 Umumiy firibgarlik belgilari',
      tooGoodToBeTrue: 'Juda yaxshi ko\'rinadigan narxlar',
      tooGoodDesc: 'Qimmat buyumlardagi juda past narxlar ko\'pincha firibgarlikdir.',
      urgentPressure: 'Tez harakat qilish bosimi',
      urgentDesc: 'Firibgarlar sizni ehtiyotkorlik bilan o\'ylashdan to\'xtatish uchun soxta shoshilinchlik yaratadi.',
      poorCommunication: 'Yomon grammatika yoki muloqot',
      poorCommDesc: 'Buzuq ingliz tili yoki oddiy savollarga qochish javoblar qizil bayroqlar.',
      requestPersonalInfo: 'Shaxsiy ma\'lumotlar so\'rash',
      personalInfoDesc: 'Hech qachon ijtimoiy sug\'urta raqamlari, bank ma\'lumotlari yoki parollarni baham ko\'rmang.',
      protectInfo: 'Ma\'lumotlaringizni himoya qiling',
      infoTitle: '🔒 Ma\'lumot xavfsizligi',
      limitPersonalDetails: 'E\'lonlardagi shaxsiy ma\'lumotlarni cheklang',
      limitDetailsDesc: 'Ommaviy e\'lonlarda to\'liq ismingiz, aniq manzilingiz yoki shaxsiy telefon raqamingizni kiritmang.',
      useMessageSystem: 'Dastlab bizning xabar tizimimizdan foydalaning',
      useMessageDesc: 'To\'g\'ridan-to\'g\'ri aloqa ma\'lumotlarini baham ko\'rishdan oldin platformamiz orqali muloqot boshlang.',
      meetingLocation: 'Uy manzilingizni oshkor qilmang',
      meetingLocationDesc: 'Hech qachon notanish odamlarni uyingizga taklif qilmang yoki tranzaktsiyalar uchun ularning uyiga bormang.',
      phoneNumberCaution: 'Telefon raqamlari bilan ehtiyot bo\'ling',
      phoneDesc: 'Dastlabki aloqa uchun ikkinchi telefon raqami yoki xabar ilovasidan foydalanishni o\'ylab ko\'ring.',
      reportingSuspicious: 'Shubhali faoliyatni xabar qilish',
      reportTitle: '📢 Qanday xabar qilish',
      reportImmediately: 'Shubhali xatti-harakatni darhol xabar qiling',
      reportDesc: 'Agar shubhali faoliyat bilan duch kelsangiz, report@deals.uz manziliga yordam guruhimizga murojaat qiling.',
      blockUsers: 'Muammoli foydalanuvchilarni bloklang',
      blockDesc: 'Noto\'g\'ri harakat qiladigan foydalanuvchilarni bloklash uchun platforma vositalardan foydalaning.',
      keepRecords: 'Muloqot yozuvlarini saqlang',
      recordsDesc: 'Xabar qilish maqsadida shubhali xabarlarning skrinshotlarini saqlang.',
      contactPolice: 'Tahdid qilinsa, rasmiy organlarga murojaat qiling',
      policeDesc: 'Agar jismoniy tahdid his qilsangiz, darhol mahalliy huquq-tartibot organlariga murojaat qiling.',
      additionalTips: 'Qo\'shimcha xavfsizlik maslahatlari',
      additionalTitle: '💡 Qo\'shimcha ehtiyot choralari',
      researchSeller: 'Sotuvchini tekshiring',
      researchDesc: 'Davom etishdan oldin ularning profili, reytinglari va oldingi e\'lonlarini tekshiring.',
      verifyIdentity: 'Buyum haqiqiyligini tekshiring',
      verifyDesc: 'Qimmat buyumlar uchun professional autentifikatsiya yoki tekshirishni o\'ylab ko\'ring.',
      insuranceReceipts: 'Kvitansiyalar va hujjatlarni saqlang',
      receiptsDesc: 'Qimmatli buyumlar uchun xarid va tranzaksiya yozuvlarining dalilini saqlang.',
      emergencyContacts: 'Rejalaringizni baham ko\'ring',
      emergencyDesc: 'Kimgadir qayerga borayotganingizni va qachon qaytishingizni ayting.',
      rememberTitle: 'Eslab qoling: Xavfsizlik eng muhim',
      rememberDesc: 'Agar savdo shubhali ko\'rinsa yoki sizni bezovta qilsa, har doim ketish yaxshiroqdir. Sotib olish yoki sotish uchun har doim boshqa imkoniyatlar bo\'ladi.'
    },
    ru: {
      safetyTips: 'Советы по безопасности',
      staySecure: 'Оставайтесь в безопасности при торговле',
      introText: 'Ваша безопасность - наш приоритет. Следуйте этим важным советам для защиты себя при покупке или продаже на Deals.uz.',
      meetingSafely: 'Безопасные встречи',
      meetingTitle: '🤝 Практики безопасных встреч',
      meetPublic: 'Всегда встречайтесь в общественных местах',
      meetPublicDesc: 'Выбирайте оживленные, хорошо освещенные общественные места, такие как торговые центры, кафе или полицейские участки.',
      bringFriend: 'По возможности приводите друга',
      bringFriendDesc: 'Наличие кого-то с вами повышает безопасность и обеспечивает свидетеля сделки.',
      meetDaylight: 'Встречайтесь в дневное время',
      meetDaylightDesc: 'Избегайте поздних вечерних или ранних утренних встреч, когда плохая видимость.',
      trustInstincts: 'Доверяйте своим инстинктам',
      trustInstinctsDesc: 'Если что-то кажется неправильным, не продолжайте встречу или сделку.',
      paymentSafety: 'Безопасность платежей',
      paymentTitle: '💳 Безопасные способы оплаты',
      cashOnly: 'Предпочитайте наличные расчеты для личных сделок',
      cashOnlyDesc: 'Наличные - самый безопасный способ для личных сделок - нет риска возврата средств или мошенничества.',
      inspectFirst: 'Проверяйте перед оплатой',
      inspectFirstDesc: 'Всегда тщательно осматривайте товар перед передачей денег.',
      avoidWireTransfers: 'Избегайте денежных переводов незнакомцам',
      avoidWireTransfersDesc: 'Никогда не отправляйте деньги через службы переводов людям, которых не встречали лично.',
      noAdvancePayment: 'Не платите авансом',
      noAdvancePaymentDesc: 'Избегайте оплаты товаров до их личного осмотра.',
      recognizeScams: 'Распознавайте мошенничество',
      scamTitle: '🚨 Признаки обычного мошенничества',
      tooGoodToBeTrue: 'Цены, которые кажутся слишком хорошими',
      tooGoodDesc: 'Чрезвычайно низкие цены на дорогие товары часто являются мошенничеством.',
      urgentPressure: 'Давление быстро действовать',
      urgentDesc: 'Мошенники часто создают ложную срочность, чтобы не дать вам тщательно подумать.',
      poorCommunication: 'Плохая грамматика или общение',
      poorCommDesc: 'Плохой английский или уклончивые ответы на простые вопросы - красные флаги.',
      requestPersonalInfo: 'Запросы личной информации',
      personalInfoDesc: 'Никогда не делитесь номерами социального страхования, банковскими данными или паролями.',
      protectInfo: 'Защитите свою информацию',
      infoTitle: '🔒 Информационная безопасность',
      limitPersonalDetails: 'Ограничьте личные данные в объявлениях',
      limitDetailsDesc: 'Не включайте полное имя, точный адрес или личный номер телефона в публичные объявления.',
      useMessageSystem: 'Сначала используйте нашу систему сообщений',
      useMessageDesc: 'Начните общение через нашу платформу, прежде чем делиться прямой контактной информацией.',
      meetingLocation: 'Не раскрывайте домашний адрес',
      meetingLocationDesc: 'Никогда не приглашайте незнакомцев домой и не ходите к ним для сделок.',
      phoneNumberCaution: 'Будьте осторожны с номерами телефонов',
      phoneDesc: 'Рассмотрите возможность использования второго номера телефона или приложения для сообщений для первоначального контакта.',
      reportingSuspicious: 'Сообщение о подозрительной активности',
      reportTitle: '📢 Как сообщить',
      reportImmediately: 'Немедленно сообщайте о подозрительном поведении',
      reportDesc: 'Свяжитесь с нашей службой поддержки по адресу report@deals.uz, если столкнетесь с подозрительной активностью.',
      blockUsers: 'Блокируйте проблемных пользователей',
      blockDesc: 'Используйте инструменты платформы для блокировки пользователей, которые ведут себя неподобающе.',
      keepRecords: 'Ведите записи общения',
      recordsDesc: 'Сохраняйте скриншоты подозрительных сообщений для отчетности.',
      contactPolice: 'Обращайтесь к властям при угрозах',
      policeDesc: 'Если чувствуете физическую угрозу, немедленно обращайтесь в местные правоохранительные органы.',
      additionalTips: 'Дополнительные советы по безопасности',
      additionalTitle: '💡 Дополнительные меры предосторожности',
      researchSeller: 'Изучите продавца',
      researchDesc: 'Проверьте их профиль, рейтинги и предыдущие объявления перед продолжением.',
      verifyIdentity: 'Проверьте подлинность товара',
      verifyDesc: 'Для дорогих товаров рассмотрите профессиональную аутентификацию или проверку.',
      insuranceReceipts: 'Сохраняйте чеки и документацию',
      receiptsDesc: 'Для ценных товаров ведите доказательства покупки и записи сделок.',
      emergencyContacts: 'Поделитесь своими планами',
      emergencyDesc: 'Сообщите кому-нибудь, куда вы идете и когда ожидаете вернуться.',
      rememberTitle: 'Помните: лучше перестраховаться',
      rememberDesc: 'Если сделка кажется подозрительной или заставляет вас чувствовать дискомфорт, всегда лучше уйти. Всегда будут другие возможности для покупки или продажи.'
    }
  };
  return translations[locale]?.[key] || translations.en[key] || key;
};

export default function SafetyTipsPage() {
  const params = useParams();
  const locale = params?.locale as Locale || 'en';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Header locale={locale} />
      
      <main style={{ 
        maxWidth: '900px', 
        margin: '0 auto', 
        padding: '2rem'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem',
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '15px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            marginBottom: '1rem',
            color: '#333'
          }}>
            {t(locale, 'safetyTips')}
          </h1>
          <h2 style={{ 
            fontSize: '1.5rem', 
            color: '#0070f3', 
            marginBottom: '1rem'
          }}>
            {t(locale, 'staySecure')}
          </h2>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#666', 
            lineHeight: '1.6'
          }}>
            {t(locale, 'introText')}
          </p>
        </div>

        {/* Meeting Safely Section */}
        <section style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '15px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ 
            fontSize: '1.8rem', 
            fontWeight: '600', 
            marginBottom: '1.5rem', 
            color: '#333'
          }}>
            {t(locale, 'meetingTitle')}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '10px', border: '1px solid #e9ecef' }}>
              <h4 style={{ color: '#28a745', marginBottom: '0.5rem' }}>✅ {t(locale, 'meetPublic')}</h4>
              <p style={{ fontSize: '0.9rem', color: '#555' }}>{t(locale, 'meetPublicDesc')}</p>
            </div>

            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '10px', border: '1px solid #e9ecef' }}>
              <h4 style={{ color: '#28a745', marginBottom: '0.5rem' }}>✅ {t(locale, 'bringFriend')}</h4>
              <p style={{ fontSize: '0.9rem', color: '#555' }}>{t(locale, 'bringFriendDesc')}</p>
            </div>

            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '10px', border: '1px solid #e9ecef' }}>
              <h4 style={{ color: '#28a745', marginBottom: '0.5rem' }}>✅ {t(locale, 'meetDaylight')}</h4>
              <p style={{ fontSize: '0.9rem', color: '#555' }}>{t(locale, 'meetDaylightDesc')}</p>
            </div>

            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '10px', border: '1px solid #e9ecef' }}>
              <h4 style={{ color: '#28a745', marginBottom: '0.5rem' }}>✅ {t(locale, 'trustInstincts')}</h4>
              <p style={{ fontSize: '0.9rem', color: '#555' }}>{t(locale, 'trustInstinctsDesc')}</p>
            </div>
          </div>
        </section>

        {/* Payment Safety Section */}
        <section style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '15px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ 
            fontSize: '1.8rem', 
            fontWeight: '600', 
            marginBottom: '1.5rem', 
            color: '#333'
          }}>
            {t(locale, 'paymentTitle')}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div style={{ padding: '1rem', backgroundColor: '#e8f5e8', borderRadius: '10px', border: '2px solid #28a745' }}>
              <h4 style={{ color: '#155724', marginBottom: '0.5rem' }}>💰 {t(locale, 'cashOnly')}</h4>
              <p style={{ fontSize: '0.9rem', color: '#155724' }}>{t(locale, 'cashOnlyDesc')}</p>
            </div>

            <div style={{ padding: '1rem', backgroundColor: '#fff3cd', borderRadius: '10px', border: '2px solid #ffc107' }}>
              <h4 style={{ color: '#856404', marginBottom: '0.5rem' }}>🔍 {t(locale, 'inspectFirst')}</h4>
              <p style={{ fontSize: '0.9rem', color: '#856404' }}>{t(locale, 'inspectFirstDesc')}</p>
            </div>

            <div style={{ padding: '1rem', backgroundColor: '#f8d7da', borderRadius: '10px', border: '2px solid #dc3545' }}>
              <h4 style={{ color: '#721c24', marginBottom: '0.5rem' }}>❌ {t(locale, 'avoidWireTransfers')}</h4>
              <p style={{ fontSize: '0.9rem', color: '#721c24' }}>{t(locale, 'avoidWireTransfersDesc')}</p>
            </div>

            <div style={{ padding: '1rem', backgroundColor: '#f8d7da', borderRadius: '10px', border: '2px solid #dc3545' }}>
              <h4 style={{ color: '#721c24', marginBottom: '0.5rem' }}>❌ {t(locale, 'noAdvancePayment')}</h4>
              <p style={{ fontSize: '0.9rem', color: '#721c24' }}>{t(locale, 'noAdvancePaymentDesc')}</p>
            </div>
          </div>
        </section>

        {/* Scam Recognition Section */}
        <section style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '15px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ 
            fontSize: '1.8rem', 
            fontWeight: '600', 
            marginBottom: '1.5rem', 
            color: '#333'
          }}>
            {t(locale, 'scamTitle')}
          </h2>

          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'start', gap: '1rem', padding: '1rem', backgroundColor: '#fff3cd', borderRadius: '10px' }}>
              <span style={{ fontSize: '2rem' }}>⚠️</span>
              <div>
                <h4 style={{ color: '#856404', marginBottom: '0.5rem' }}>{t(locale, 'tooGoodToBeTrue')}</h4>
                <p style={{ fontSize: '0.9rem', color: '#856404', margin: 0 }}>{t(locale, 'tooGoodDesc')}</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'start', gap: '1rem', padding: '1rem', backgroundColor: '#fff3cd', borderRadius: '10px' }}>
              <span style={{ fontSize: '2rem' }}>⏰</span>
              <div>
                <h4 style={{ color: '#856404', marginBottom: '0.5rem' }}>{t(locale, 'urgentPressure')}</h4>
                <p style={{ fontSize: '0.9rem', color: '#856404', margin: 0 }}>{t(locale, 'urgentDesc')}</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'start', gap: '1rem', padding: '1rem', backgroundColor: '#fff3cd', borderRadius: '10px' }}>
              <span style={{ fontSize: '2rem' }}>💬</span>
              <div>
                <h4 style={{ color: '#856404', marginBottom: '0.5rem' }}>{t(locale, 'poorCommunication')}</h4>
                <p style={{ fontSize: '0.9rem', color: '#856404', margin: 0 }}>{t(locale, 'poorCommDesc')}</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'start', gap: '1rem', padding: '1rem', backgroundColor: '#f8d7da', borderRadius: '10px' }}>
              <span style={{ fontSize: '2rem' }}>🔐</span>
              <div>
                <h4 style={{ color: '#721c24', marginBottom: '0.5rem' }}>{t(locale, 'requestPersonalInfo')}</h4>
                <p style={{ fontSize: '0.9rem', color: '#721c24', margin: 0 }}>{t(locale, 'personalInfoDesc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Information Protection */}
        <section style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '15px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ 
            fontSize: '1.8rem', 
            fontWeight: '600', 
            marginBottom: '1.5rem', 
            color: '#333'
          }}>
            {t(locale, 'infoTitle')}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div>
              <h4 style={{ color: '#0070f3', marginBottom: '0.5rem' }}>{t(locale, 'limitPersonalDetails')}</h4>
              <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '1rem' }}>{t(locale, 'limitDetailsDesc')}</p>
            </div>

            <div>
              <h4 style={{ color: '#0070f3', marginBottom: '0.5rem' }}>{t(locale, 'useMessageSystem')}</h4>
              <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '1rem' }}>{t(locale, 'useMessageDesc')}</p>
            </div>

            <div>
              <h4 style={{ color: '#0070f3', marginBottom: '0.5rem' }}>{t(locale, 'meetingLocation')}</h4>
              <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '1rem' }}>{t(locale, 'meetingLocationDesc')}</p>
            </div>

            <div>
              <h4 style={{ color: '#0070f3', marginBottom: '0.5rem' }}>{t(locale, 'phoneNumberCaution')}</h4>
              <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '1rem' }}>{t(locale, 'phoneDesc')}</p>
            </div>
          </div>
        </section>

        {/* Reporting Section */}
        <section style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '15px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ 
            fontSize: '1.8rem', 
            fontWeight: '600', 
            marginBottom: '1.5rem', 
            color: '#333'
          }}>
            {t(locale, 'reportTitle')}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📧</div>
              <h4 style={{ color: '#dc3545' }}>{t(locale, 'reportImmediately')}</h4>
              <p style={{ fontSize: '0.9rem', color: '#555' }}>{t(locale, 'reportDesc')}</p>
            </div>

            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🚫</div>
              <h4 style={{ color: '#dc3545' }}>{t(locale, 'blockUsers')}</h4>
              <p style={{ fontSize: '0.9rem', color: '#555' }}>{t(locale, 'blockDesc')}</p>
            </div>

            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📱</div>
              <h4 style={{ color: '#dc3545' }}>{t(locale, 'keepRecords')}</h4>
              <p style={{ fontSize: '0.9rem', color: '#555' }}>{t(locale, 'recordsDesc')}</p>
            </div>

            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🚔</div>
              <h4 style={{ color: '#dc3545' }}>{t(locale, 'contactPolice')}</h4>
              <p style={{ fontSize: '0.9rem', color: '#555' }}>{t(locale, 'policeDesc')}</p>
            </div>
          </div>
        </section>

        {/* Final Reminder */}
        <section style={{
          backgroundColor: '#0070f3',
          color: 'white',
          padding: '2rem',
          borderRadius: '15px',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>{t(locale, 'rememberTitle')}</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>{t(locale, 'rememberDesc')}</p>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
