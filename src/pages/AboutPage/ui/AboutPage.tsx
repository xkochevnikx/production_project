import { useTranslation } from 'react-i18next';

export function AboutPage() {
    const { t } = useTranslation('about');
    // ? первым аргументом передаём название нэймспейса

    return (
        <div>
            <h2>{t('О сайте')}</h2>
        </div>
    );
}
