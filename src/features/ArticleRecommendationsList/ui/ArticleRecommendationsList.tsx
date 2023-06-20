import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticlesList } from 'entities/Article';
import { Text, TextSize } from 'shared/UI/Text/ui/Text';
import { VStack } from 'shared/UI/Stack/VStack/VStack';
import cls from './ArticleRecommendationsList.module.scss';
import { useArticleRecommendationsList } from '../api/ArticleRecommendationsApi';

export const ArticleRecommendationsList = memo(() => {
    const { t } = useTranslation();

    const { data, isLoading } = useArticleRecommendationsList(6);
    // todo - если запрос не вернул статьи то ничего не отрисовываем
    if (!data) {
        return null;
    }

    return (
        <VStack gap="16" align="start">
            <Text size={TextSize.L} title={t('Рекомендуем')} />
            <ArticlesList
                className={cls.recommendations}
                articles={data}
                isLoading={isLoading}
                target="_blank"
            />
        </VStack>
    );
});
