import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { ArticlesList } from 'entities/Article';
import { Text, TextSize } from 'shared/UI/Text/ui/Text';
import { VStack } from 'shared/UI/Stack/VStack/VStack';
import cls from './ArticleRecommendationsList.module.scss';
import { useArticleRecommendationsList } from '../api/ArticleRecommendationsApi';

export interface IArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo(
    (props: IArticleRecommendationsListProps) => {
        const { data, isLoading } = useArticleRecommendationsList(6);

        const { className } = props;
        const { t } = useTranslation();

        return (
            <VStack gap="8" className={classNames('', {}, [className])}>
                <Text size={TextSize.L} title={t('Рекомендуем')} />

                <ArticlesList
                    className={cls.recommendations}
                    articles={data}
                    isLoading={isLoading}
                    target="_blank"
                />
            </VStack>
        );
    },
);
