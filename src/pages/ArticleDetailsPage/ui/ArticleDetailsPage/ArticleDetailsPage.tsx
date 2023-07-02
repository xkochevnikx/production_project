import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page/ui/Page';
import { ArticleDetailsPageHeader } from '@/features/ArticleDetailsPageHeader';
import { VStack } from '@/shared/UI/Stack/VStack/VStack';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList/ui/ArticleRecommendationsList';
import { ArticleComments } from '@/features/ArticleComments';
import { ArticleDetails } from '@/entities/Article';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = memo(({ className }: ArticleDetailsPageProps) => {
    const { id } = useParams<{ id: string }>();
    return (
        <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            <VStack gap="16" max>
                <ArticleDetailsPageHeader />
                <ArticleDetails id={id} />
                <ArticleRecommendationsList />

                <ArticleComments id={id} />
            </VStack>
        </Page>
    );
});

export default ArticleDetailsPage;
