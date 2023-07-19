import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleDetailsPageHeader } from '@/features/ArticleDetailsPageHeader';
import { VStack } from '@/shared/UI/Stack';
import { ArticleComments } from '@/features/ArticleComments';
import { ArticleDetails } from '@/entities/Article';
import cls from './ArticleDetailsPage.module.scss';
import { Page } from '@/widgets/Page';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import { ArticleRating } from '@/features/ArticleRating';

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = memo(({ className }: ArticleDetailsPageProps) => {
    const { id } = useParams<{ id: string }>();
    if (!id) {
        return null;
    }
    return (
        <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            <VStack gap="16" max>
                <ArticleDetailsPageHeader />
                <ArticleDetails id={id} />
                <ArticleRating articleId={id} />
                <ArticleRecommendationsList />
                <ArticleComments id={id} />
            </VStack>
        </Page>
    );
});

export default ArticleDetailsPage;
