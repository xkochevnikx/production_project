import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

export function AboutPage() {
    const { t } = useTranslation('about');
    // ? первым аргументом передаём название нэймспейса

    return (
        <Page>
            <h2>{t('О сайте')}</h2>
        </Page>
    );
}
