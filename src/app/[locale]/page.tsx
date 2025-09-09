import { Locale } from '../../i18n'
import Marketplace from '../marketplace'

interface Props {
  params: Promise<{ locale: Locale }>
}

export default async function LocalePage({ params }: Props) {
  const { locale } = await params
  return <Marketplace locale={locale} />
}
