import { useTranslation } from 'react-i18next';
import { HStack } from '@/shared/UI/Stack';
import { Page } from '@/widgets/Page';

export function MainPage() {
    const { t } = useTranslation('main');
    return (
        <Page data-testid="MainPage">
            <HStack gap="8" justify="start">
                <h2>{t('Главная')}</h2>
            </HStack>
        </Page>
    );
}
