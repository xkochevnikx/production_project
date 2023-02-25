import { useTranslation } from 'react-i18next';

export function AboutPage() {
   // ? первым аргументом передаём название нэймспейса
   const { t } = useTranslation('about');

   return <div>{t('О сайте')}</div>;
}
