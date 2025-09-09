import SignUpPage from '../../../auth/signup/SignUpPage';
import type { Locale } from '../../../../i18n';

export default async function SignUpRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <SignUpPage locale={locale as Locale} />;
}

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ru' },
  ];
}
