import { useTranslation } from 'react-i18next';
import { BugButton } from '@/app/providers/ErrorBoundary';
import { HStack } from '@/shared/UI/Stack/HStack/HStack';
import { Page } from '@/widgets/Page/ui/Page';

export function MainPage() {
    const { t } = useTranslation('main');
    return (
        <Page>
            <HStack gap="8" justify="start">
                <h2>{t('Главная')}</h2>
                <BugButton />
            </HStack>
        </Page>
    );
}
