import SignInPage from '../../../auth/signin/SignInPage';
import type { Locale } from '../../../../i18n';

export default async function SignInRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <SignInPage locale={locale as Locale} />;
}

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ru' },
  ];
}
