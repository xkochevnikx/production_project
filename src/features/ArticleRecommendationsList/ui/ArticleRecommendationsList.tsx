import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticlesList } from 'entities/Article';
import { Text, TextSize } from 'shared/UI/Text/Text';
import { VStack } from 'shared/UI/Stack/VStack/VStack';
import { useArticleRecommendationsList } from '../api/ArticleRecommendationsApi';

export const ArticleRecommendationsList = memo(() => {
    const { t } = useTranslation();

    const { data, isLoading } = useArticleRecommendationsList(4);
    // todo - если запрос не вернул статьи то ничего не отрисовываем
    if (!data) {
        return null;
    }

    return (
        <VStack gap="16" align="start">
            <Text size={TextSize.L} title={t('Рекомендуем')} />

            <ArticlesList
                articles={data}
                isLoading={isLoading}
                target="_blank"
            />
        </VStack>
    );
});
