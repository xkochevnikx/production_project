import { memo, useCallback } from 'react';
import { Card } from '@/shared/UI/Card/Card';
import { Rating } from '@/entities/Rating';
import { useTranslation } from 'react-i18next';
import { useArticleRating, useRateArticle } from '../modal/api/api';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/UI/Skeleton/Skeleton';

export interface ArticleRatingProps {
    className?: string;
    articleId: string;
}

const ArticleRating = memo(({ className, articleId }: ArticleRatingProps) => {
    const { t } = useTranslation();

    const userData = useSelector(getUserAuthData);
    const { data, isLoading } = useArticleRating({
        articleId,
        userId: userData?.id ?? '',
    });

    const rating = data?.[0];

    const [rateArticleMutation] = useRateArticle();

    const handleRateArticle = useCallback(
        (starsCount: number, feedback?: string) => {
            try {
                rateArticleMutation({
                    articleId,
                    rate: starsCount,
                    userId: userData?.id ?? '',
                    feedback,
                });
            } catch (e) {
                console.log(e);
            }
        },
        []
    );

    const onAccept = useCallback((starsCount: number, feedback?: string) => {
        handleRateArticle(starsCount, feedback);
    }, []);

    const onCancel = useCallback((starsCount: number) => {
        handleRateArticle(starsCount);
    }, []);

    if (isLoading) {
        return <Skeleton width={'100%'} height={'120px'} />;
    }

    return (
        <Card className={className} fullWidth>
            <Rating
                onAccept={onAccept}
                onCancel={onCancel}
                hasFeedback
                title={t('Оцените статью')}
                feedbackTitle={t('Поделитесь своим мнением')}
                rate={rating?.rate}
            />
        </Card>
    );
});

export default ArticleRating;
