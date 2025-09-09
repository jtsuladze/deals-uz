import PostItem from '../../post/page';
import type { Locale } from '../../../i18n';

export default async function LocalePostPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <PostItem locale={locale as Locale} />;
}
