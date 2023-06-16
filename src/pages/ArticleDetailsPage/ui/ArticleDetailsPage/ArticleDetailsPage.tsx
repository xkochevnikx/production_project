import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Page } from 'widgets/Page/Page';
import { ArticleDetailsPageHeader } from 'features/ArticleDetailsPageHeader';
import { VStack } from 'shared/UI/Stack/VStack/VStack';
import { ArticleRecommendationsList } from 'features/ArticleRecommendationsList/ui/ArticleRecommendationsList';
import { ArticleComments } from 'features/ArticleComments';
import { ArticleDetails } from 'entities/Article';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = memo(({ className }: ArticleDetailsPageProps) => {
    const { id } = useParams<{ id: string }>();

    const { t } = useTranslation('articles');

    //! если нет айди то алес
    if (!id) {
        return (
            <Page
                className={classNames(cls.ArticleDetailsPage, {}, [className])}
            >
                <h1>{t('Статья не найдена')}</h1>
            </Page>
        );
    }
    return (
        <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            <VStack gap="16" max align="start">
                <ArticleDetailsPageHeader />
                <ArticleDetails id={id} />
                <ArticleRecommendationsList />
                <ArticleComments id={id} />
            </VStack>
        </Page>
    );
});

export default ArticleDetailsPage;
