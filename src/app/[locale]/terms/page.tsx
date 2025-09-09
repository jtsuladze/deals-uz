'use client';

import { useParams } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { Locale } from '../../../i18n';

// Simple translation function for this page
const t = (locale: string, key: string): string => {
  const translations: Record<string, Record<string, string>> = {
    en: {
      termsOfService: 'Terms of Service',
      lastUpdated: 'Last updated',
      introduction: 'Introduction',
      introText: 'Welcome to Deals.uz. These Terms of Service govern your use of our marketplace platform. By accessing or using our services, you agree to be bound by these terms.',
      acceptance: 'Acceptance of Terms',
      acceptanceText: 'By creating an account or using any part of our service, you acknowledge that you have read, understood, and agree to these Terms of Service and our Privacy Policy.',
      userAccounts: 'User Accounts',
      accountRequirements: 'Account Requirements',
      accountReqText: 'You must be at least 18 years old to create an account. You are responsible for maintaining the confidentiality of your account credentials.',
      accountResponsibilities: 'Account Responsibilities',
      accountRespText: 'You are responsible for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.',
      userConduct: 'User Conduct',
      prohibitedActivities: 'Prohibited Activities',
      prohibitedText: 'You agree not to use our platform for any unlawful purpose or in any way that could damage, disable, or impair our services.',
      prohibitedList1: 'Posting false, misleading, or fraudulent listings',
      prohibitedList2: 'Engaging in spam or unsolicited communications',
      prohibitedList3: 'Violating intellectual property rights',
      prohibitedList4: 'Harassing or threatening other users',
      prohibitedList5: 'Attempting to circumvent our security measures',
      listingRules: 'Listing Rules',
      contentGuidelines: 'Content Guidelines',
      contentText: 'All listings must be accurate, complete, and not misleading. You retain ownership of your content but grant us a license to display it on our platform.',
      prohibitedItems: 'Prohibited Items',
      prohibitedItemsText: 'Certain items are prohibited from being sold on our platform, including but not limited to illegal goods, weapons, drugs, and counterfeit items.',
      fees: 'Fees and Payments',
      serviceFees: 'Service Fees',
      feesText: 'Our basic listing service is currently free. We reserve the right to introduce fees for premium services with proper notice.',
      transactionResponsibility: 'Transaction Responsibility',
      transactionText: 'Deals.uz is a platform that connects buyers and sellers. We are not party to the actual transactions and are not responsible for payment processing between users.',
      liability: 'Limitation of Liability',
      liabilityDisclaimer: 'Service Disclaimer',
      disclaimerText: 'Our platform is provided "as is" without warranties. We do not guarantee the accuracy of listings or the conduct of users.',
      limitationText: 'Limitation of Damages',
      limitationDesc: 'To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services.',
      termination: 'Termination',
      terminationRights: 'Termination Rights',
      terminationText: 'We may suspend or terminate your account at any time for violation of these terms or for any other reason at our sole discretion.',
      effectOfTermination: 'Effect of Termination',
      terminationEffectText: 'Upon termination, your right to use the service will cease immediately. Your listings may be removed, and your account data may be deleted.',
      intellectualProperty: 'Intellectual Property',
      ourRights: 'Our Rights',
      ourRightsText: 'The Deals.uz platform, including our logo, design, and software, is protected by intellectual property laws and is owned by us.',
      userContent: 'User Content',
      userContentText: 'You retain rights to your content but grant us a non-exclusive license to use, display, and distribute your listings on our platform.',
      governing: 'Governing Law',
      governingText: 'These terms are governed by the laws of the Republic of Uzbekistan. Any disputes will be resolved in the courts of Tashkent.',
      changes: 'Changes to Terms',
      changesText: 'We may update these terms at any time. We will notify users of significant changes via email or platform notifications.',
      contact: 'Contact Information',
      contactText: 'If you have questions about these Terms of Service, please contact us at legal@deals.uz or visit our office at:',
      address: '123 Innovation Street, Tashkent Business District, Tashkent 100000, Uzbekistan'
    },
    uz: {
      termsOfService: 'Foydalanish shartlari',
      lastUpdated: 'Oxirgi yangilangan',
      introduction: 'Kirish',
      introText: 'Deals.uz ga xush kelibsiz. Ushbu Foydalanish shartlari bizning bozor platformamizdan foydalanishingizni tartibga soladi. Xizmatlarimizga kirish yoki ulardan foydalanish orqali siz ushbu shartlarga rioya qilishga rozilik bildirasiz.',
      acceptance: 'Shartlarni qabul qilish',
      acceptanceText: 'Hisob yaratish yoki xizmatimizning biron bir qismidan foydalanish orqali siz ushbu Foydalanish shartlari va Maxfiylik siyosatimizni o\'qiganingizni, tushunganingizni va ularga roziligingizni bildirasiz.',
      userAccounts: 'Foydalanuvchi hisobi',
      accountRequirements: 'Hisob talablari',
      accountReqText: 'Hisob yaratish uchun kamida 18 yoshda bo\'lishingiz kerak. Hisob ma\'lumotlaringizning maxfiyligini saqlash uchun siz javobgarsiz.',
      accountResponsibilities: 'Hisob majburiyatlari',
      accountRespText: 'Hisobingiz ostida sodir bo\'ladigan barcha faoliyat uchun siz javobgarsiz. Hisobingizdan ruxsatsiz foydalanish haqida bizni darhol xabardor qilishingiz kerak.',
      userConduct: 'Foydalanuvchi xulqi',
      prohibitedActivities: 'Taqiqlangan faoliyatlar',
      prohibitedText: 'Siz platformamizdan noqonuniy maqsadlar uchun yoki xizmatlarimizga zarar etkazadigan tarzda foydalanmaslikka rozilik bildirasiz.',
      prohibitedList1: 'Yolg\'on, chalg\'ituvchi yoki firibgarlik e\'lonlar joylashtirish',
      prohibitedList2: 'Spam yoki istalmagan xabarlarda ishtirok etish',
      prohibitedList3: 'Intellektual mulk huquqlarini buzish',
      prohibitedList4: 'Boshqa foydalanuvchilarni ta\'qib qilish yoki tahdid qilish',
      prohibitedList5: 'Xavfsizlik choralarimizni chetlab o\'tishga harakat qilish',
      listingRules: 'E\'lon qoidalari',
      contentGuidelines: 'Kontent yo\'riqnomalari',
      contentText: 'Barcha e\'lonlar aniq, to\'liq va chalg\'ituvchi bo\'lmasligi kerak. Siz kontentingizning egasi bo\'lib qolasiz, lekin bizga uni platformamizda ko\'rsatish litsenziyasini berasiz.',
      prohibitedItems: 'Taqiqlangan buyumlar',
      prohibitedItemsText: 'Ba\'zi buyumlarni platformamizda sotish taqiqlanadi, jumladan noqonuniy tovarlar, qurollar, giyohvand moddalar va soxta buyumlar.',
      fees: 'To\'lovlar va to\'lov usullari',
      serviceFees: 'Xizmat to\'lovlari',
      feesText: 'Bizning asosiy e\'lon xizmatimiz hozirda bepul. Biz premium xizmatlar uchun tegishli xabar bilan to\'lovlarni joriy qilish huquqini saqlab qolamiz.',
      transactionResponsibility: 'Tranzaksiya mas\'uliyati',
      transactionText: 'Deals.uz xaridorlar va sotuvchilarni bog\'laydigan platformadir. Biz haqiqiy tranzaktsiyalarda ishtirok etmaymiz va foydalanuvchilar o\'rtasidagi to\'lov qayta ishlash uchun javobgar emasmiz.',
      liability: 'Javobgarlik cheklovi',
      liabilityDisclaimer: 'Xizmat rad etishi',
      disclaimerText: 'Bizning platformamiz hech qanday kafolatsiz "bor holatida" taqdim etiladi. Biz e\'lonlar aniqligini yoki foydalanuvchilar xatti-harakatlarini kafolatlamayamiz.',
      limitationText: 'Zararlar cheklovi',
      limitationDesc: 'Qonun tomonidan ruxsat etilgan maksimal darajada, biz xizmatlarimizdan foydalanishingiz natijasida kelib chiqadigan bilvosita, tasodifiy yoki oqibatli zararlar uchun javobgar bo\'lmaymiz.',
      termination: 'Tugatish',
      terminationRights: 'Tugatish huquqlari',
      terminationText: 'Biz ushbu shartlarni buzganingiz yoki boshqa sabablar uchun hisobingizni istalgan vaqtda to\'xtatib qo\'yish yoki tugatishimiz mumkin.',
      effectOfTermination: 'Tugatish ta\'siri',
      terminationEffectText: 'Tugagandan so\'ng, xizmatdan foydalanish huquqingiz darhol to\'xtaydi. E\'lonlaringiz olib tashlanishi va hisob ma\'lumotlaringiz o\'chirilishi mumkin.',
      intellectualProperty: 'Intellektual mulk',
      ourRights: 'Bizning huquqlarimiz',
      ourRightsText: 'Deals.uz platformasi, jumladan logotip, dizayn va dasturiy ta\'minot intellektual mulk qonunlari bilan himoyalangan va bizga tegishli.',
      userContent: 'Foydalanuvchi kontenti',
      userContentText: 'Siz kontentingiz huquqlarini saqlab qolasiz, lekin bizga e\'lonlaringizni platformamizda ishlatish, ko\'rsatish va tarqatish uchun eksklyuziv bo\'lmagan litsenziya berasiz.',
      governing: 'Huquqiy tartib',
      governingText: 'Ushbu shartlar O\'zbekiston Respublikasi qonunlariga bo\'ysunadi. Har qanday nizolar Toshkent sudlarida hal qilinadi.',
      changes: 'Shartlarga o\'zgartirishlar',
      changesText: 'Biz ushbu shartlarni istalgan vaqtda yangilashimiz mumkin. Muhim o\'zgarishlar haqida foydalanuvchilarni email yoki platforma xabarnomalar orqali xabardor qilamiz.',
      contact: 'Aloqa ma\'lumotlari',
      contactText: 'Ushbu Foydalanish shartlari bo\'yicha savollaringiz bo\'lsa, legal@deals.uz manziliga murojaat qiling yoki ofisimizga tashrif buyuring:',
      address: '123 Innovatsiya ko\'chasi, Toshkent biznes hududi, Toshkent 100000, O\'zbekiston'
    },
    ru: {
      termsOfService: 'Условия использования',
      lastUpdated: 'Последнее обновление',
      introduction: 'Введение',
      introText: 'Добро пожаловать на Deals.uz. Эти Условия использования регулируют использование вами нашей торговой платформы. Получая доступ к нашим услугам или используя их, вы соглашаетесь соблюдать эти условия.',
      acceptance: 'Принятие условий',
      acceptanceText: 'Создавая учетную запись или используя любую часть нашего сервиса, вы подтверждаете, что прочитали, поняли и согласны с настоящими Условиями использования и нашей Политикой конфиденциальности.',
      userAccounts: 'Учетные записи пользователей',
      accountRequirements: 'Требования к учетной записи',
      accountReqText: 'Вам должно быть не менее 18 лет для создания учетной записи. Вы несете ответственность за сохранение конфиденциальности данных вашей учетной записи.',
      accountResponsibilities: 'Обязанности по учетной записи',
      accountRespText: 'Вы несете ответственность за все действия, происходящие в рамках вашей учетной записи. Вы должны немедленно уведомить нас о любом несанкционированном использовании вашей учетной записи.',
      userConduct: 'Поведение пользователей',
      prohibitedActivities: 'Запрещенные действия',
      prohibitedText: 'Вы соглашаетесь не использовать нашу платформу в незаконных целях или способами, которые могут повредить, отключить или ухудшить наши услуги.',
      prohibitedList1: 'Размещение ложных, вводящих в заблуждение или мошеннических объявлений',
      prohibitedList2: 'Участие в спаме или нежелательных сообщениях',
      prohibitedList3: 'Нарушение прав интеллектуальной собственности',
      prohibitedList4: 'Преследование или угрозы другим пользователям',
      prohibitedList5: 'Попытки обойти наши меры безопасности',
      listingRules: 'Правила объявлений',
      contentGuidelines: 'Рекомендации по контенту',
      contentText: 'Все объявления должны быть точными, полными и не вводящими в заблуждение. Вы сохраняете права на свой контент, но предоставляете нам лицензию на его отображение на нашей платформе.',
      prohibitedItems: 'Запрещенные товары',
      prohibitedItemsText: 'Определенные товары запрещены для продажи на нашей платформе, включая незаконные товары, оружие, наркотики и поддельные предметы.',
      fees: 'Сборы и платежи',
      serviceFees: 'Плата за услуги',
      feesText: 'Наш базовый сервис размещения объявлений в настоящее время бесплатен. Мы оставляем за собой право ввести плату за премиум-услуги с должным уведомлением.',
      transactionResponsibility: 'Ответственность за транзакции',
      transactionText: 'Deals.uz - это платформа, которая соединяет покупателей и продавцов. Мы не участвуем в фактических транзакциях и не несем ответственности за обработку платежей между пользователями.',
      liability: 'Ограничение ответственности',
      liabilityDisclaimer: 'Отказ от гарантий услуг',
      disclaimerText: 'Наша платформа предоставляется "как есть" без гарантий. Мы не гарантируем точность объявлений или поведение пользователей.',
      limitationText: 'Ограничение ущерба',
      limitationDesc: 'В максимальной степени, разрешенной законом, мы не несем ответственности за любые косвенные, случайные или последующие убытки, возникающие в результате использования вами наших услуг.',
      termination: 'Прекращение',
      terminationRights: 'Права на прекращение',
      terminationText: 'Мы можем приостановить или прекратить вашу учетную запись в любое время за нарушение этих условий или по любой другой причине по нашему усмотрению.',
      effectOfTermination: 'Последствия прекращения',
      terminationEffectText: 'После прекращения ваше право на использование сервиса немедленно прекращается. Ваши объявления могут быть удалены, а данные учетной записи могут быть удалены.',
      intellectualProperty: 'Интеллектуальная собственность',
      ourRights: 'Наши права',
      ourRightsText: 'Платформа Deals.uz, включая наш логотип, дизайн и программное обеспечение, защищена законами об интеллектуальной собственности и принадлежит нам.',
      userContent: 'Пользовательский контент',
      userContentText: 'Вы сохраняете права на свой контент, но предоставляете нам неисключительную лицензию на использование, отображение и распространение ваших объявлений на нашей платформе.',
      governing: 'Применимое право',
      governingText: 'Эти условия регулируются законами Республики Узбекистан. Любые споры будут разрешаться в судах Ташкента.',
      changes: 'Изменения в условиях',
      changesText: 'Мы можем обновлять эти условия в любое время. Мы уведомим пользователей о значительных изменениях по электронной почте или через уведомления платформы.',
      contact: 'Контактная информация',
      contactText: 'Если у вас есть вопросы об этих Условиях использования, свяжитесь с нами по адресу legal@deals.uz или посетите наш офис по адресу:',
      address: 'ул. Инновации 123, Ташкентский деловой район, Ташкент 100000, Узбекистан'
    }
  };
  return translations[locale]?.[key] || translations.en[key] || key;
};

export default function TermsOfServicePage() {
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
          {t(locale, 'termsOfService')}
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
            2. {t(locale, 'acceptance')}
          </h2>
          <p style={{ lineHeight: '1.6', color: '#555' }}>
            {t(locale, 'acceptanceText')}
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            3. {t(locale, 'userAccounts')}
          </h2>
          
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#444' }}>
            3.1 {t(locale, 'accountRequirements')}
          </h3>
          <p style={{ lineHeight: '1.6', color: '#555', marginBottom: '1rem' }}>
            {t(locale, 'accountReqText')}
          </p>
          
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#444' }}>
            3.2 {t(locale, 'accountResponsibilities')}
          </h3>
          <p style={{ lineHeight: '1.6', color: '#555' }}>
            {t(locale, 'accountRespText')}
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            4. {t(locale, 'userConduct')}
          </h2>
          
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#444' }}>
            4.1 {t(locale, 'prohibitedActivities')}
          </h3>
          <p style={{ lineHeight: '1.6', color: '#555', marginBottom: '1rem' }}>
            {t(locale, 'prohibitedText')}
          </p>
          
          <ul style={{ paddingLeft: '1.5rem', color: '#555', lineHeight: '1.8' }}>
            <li>{t(locale, 'prohibitedList1')}</li>
            <li>{t(locale, 'prohibitedList2')}</li>
            <li>{t(locale, 'prohibitedList3')}</li>
            <li>{t(locale, 'prohibitedList4')}</li>
            <li>{t(locale, 'prohibitedList5')}</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            5. {t(locale, 'listingRules')}
          </h2>
          
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#444' }}>
            5.1 {t(locale, 'contentGuidelines')}
          </h3>
          <p style={{ lineHeight: '1.6', color: '#555', marginBottom: '1rem' }}>
            {t(locale, 'contentText')}
          </p>
          
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#444' }}>
            5.2 {t(locale, 'prohibitedItems')}
          </h3>
          <p style={{ lineHeight: '1.6', color: '#555' }}>
            {t(locale, 'prohibitedItemsText')}
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            6. {t(locale, 'fees')}
          </h2>
          
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#444' }}>
            6.1 {t(locale, 'serviceFees')}
          </h3>
          <p style={{ lineHeight: '1.6', color: '#555', marginBottom: '1rem' }}>
            {t(locale, 'feesText')}
          </p>
          
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#444' }}>
            6.2 {t(locale, 'transactionResponsibility')}
          </h3>
          <p style={{ lineHeight: '1.6', color: '#555' }}>
            {t(locale, 'transactionText')}
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            7. {t(locale, 'liability')}
          </h2>
          
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#444' }}>
            7.1 {t(locale, 'liabilityDisclaimer')}
          </h3>
          <p style={{ lineHeight: '1.6', color: '#555', marginBottom: '1rem' }}>
            {t(locale, 'disclaimerText')}
          </p>
          
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#444' }}>
            7.2 {t(locale, 'limitationText')}
          </h3>
          <p style={{ lineHeight: '1.6', color: '#555' }}>
            {t(locale, 'limitationDesc')}
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            8. {t(locale, 'termination')}
          </h2>
          
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#444' }}>
            8.1 {t(locale, 'terminationRights')}
          </h3>
          <p style={{ lineHeight: '1.6', color: '#555', marginBottom: '1rem' }}>
            {t(locale, 'terminationText')}
          </p>
          
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#444' }}>
            8.2 {t(locale, 'effectOfTermination')}
          </h3>
          <p style={{ lineHeight: '1.6', color: '#555' }}>
            {t(locale, 'terminationEffectText')}
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            9. {t(locale, 'intellectualProperty')}
          </h2>
          
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#444' }}>
            9.1 {t(locale, 'ourRights')}
          </h3>
          <p style={{ lineHeight: '1.6', color: '#555', marginBottom: '1rem' }}>
            {t(locale, 'ourRightsText')}
          </p>
          
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#444' }}>
            9.2 {t(locale, 'userContent')}
          </h3>
          <p style={{ lineHeight: '1.6', color: '#555' }}>
            {t(locale, 'userContentText')}
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            10. {t(locale, 'governing')}
          </h2>
          <p style={{ lineHeight: '1.6', color: '#555' }}>
            {t(locale, 'governingText')}
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            11. {t(locale, 'changes')}
          </h2>
          <p style={{ lineHeight: '1.6', color: '#555' }}>
            {t(locale, 'changesText')}
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#333' }}>
            12. {t(locale, 'contact')}
          </h2>
          <p style={{ lineHeight: '1.6', color: '#555', marginBottom: '1rem' }}>
            {t(locale, 'contactText')}
          </p>
          <p style={{ lineHeight: '1.6', color: '#555', fontStyle: 'italic' }}>
            {t(locale, 'address')}
          </p>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
