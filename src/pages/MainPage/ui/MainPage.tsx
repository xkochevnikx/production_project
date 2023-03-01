import { BugButton } from 'app/providers/ErrorBoundary';
import { Counter } from 'entities/Counter';
import { useTranslation } from 'react-i18next';

export function MainPage() {
    const { t } = useTranslation('main');

    return (
        <div>
            <BugButton />
            {t('Главная')}
            <Counter />
        </div>
    );
}
