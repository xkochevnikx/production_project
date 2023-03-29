import { BugButton } from 'app/providers/ErrorBoundary';
import { useTranslation } from 'react-i18next';

export function MainPage() {
    const { t } = useTranslation('main');
    return (
        <div>
            <h2>{t('Главная')}</h2>
            <BugButton />
        </div>
    );
}
