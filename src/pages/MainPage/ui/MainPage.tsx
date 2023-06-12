import { BugButton } from 'app/providers/ErrorBoundary';
import { useTranslation } from 'react-i18next';
import { ListBox } from 'shared/ListBox/ListBox';
import { HStack } from 'shared/UI/Stack/HStack/HStack';
import { Page } from 'widgets/Page/Page';

export function MainPage() {
    const { t } = useTranslation('main');
    return (
        <Page>
            <HStack gap="8">
                <h2>{t('Главная')}</h2>
                <BugButton />
            </HStack>
        </Page>
    );
}
