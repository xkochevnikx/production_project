import { BugButton } from 'app/providers/ErrorBoundary';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page/Page';

export function MainPage() {
    const { t } = useTranslation('main');
    return (
        <Page>
            <h2>{t('Главная')}</h2>
            <BugButton />
        </Page>
    );
}
