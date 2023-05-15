import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleDetails, ArticlesList } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { Text, TextSize } from 'shared/UI/Text/ui/Text';
import { CommentList } from 'entities/Comment';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AddCommentForm } from 'features/AddCommentForm';
import { Page } from 'widgets/Page/Page';
import { ArticleDetailsPageHeader } from 'features/ArticleDetailsPageHeader';
import { addCommentForArticle } from '../../modal/services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsByArticleId } from '../../modal/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleCommentsIsLoading } from '../../modal/selectors/comments';
import { getArticleComments } from '../../modal/slice/articleDetailsCommentsSlice';
import cls from './ArticleDetailsPage.module.scss';
import { getArticleRecommendations } from '../../modal/slice/articleDetailsPageRecommendationsSlice';
import { getArticleRecommendationsIsLoading } from '../../modal/selectors/recommendations';
import { fetchArticleRecommendations } from '../../modal/services/fetchArticleRecommendations/fetchArticleRecommendations';
import { articleDetailsPageReducer } from '../../modal/slice';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = memo(({ className }: ArticleDetailsPageProps) => {
    const dispatch = useAppDispatch();

    const onSendComment = useCallback(
        (text: string) => {
            if (text) {
                dispatch(addCommentForArticle(text));
            }
        },
        [dispatch],
    );

    const { id } = useParams<{ id: string }>();

    const { t } = useTranslation('articles');

    const comments = useSelector(getArticleComments.selectAll);

    const isLoading = useSelector(getArticleCommentsIsLoading);

    const recommendations = useSelector(getArticleRecommendations.selectAll);

    const recommendationsIsLoading = useSelector(
        getArticleRecommendationsIsLoading,
    );

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
        dispatch(fetchArticleRecommendations());
    });

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
        <DynamicModuleLoader removeAfterUnmount reducers={reducers}>
            <Page
                className={classNames(cls.ArticleDetailsPage, {}, [className])}
            >
                <ArticleDetailsPageHeader />
                <ArticleDetails id={id} />
                <Text
                    size={TextSize.L}
                    title={t('Рекомендуем')}
                    className={cls.recommedationsTitle}
                />
                <ArticlesList
                    articles={recommendations}
                    isLoading={recommendationsIsLoading}
                    className={cls.recommendations}
                    target="_blank"
                />
                <Text
                    size={TextSize.L}
                    title={t('Комментарии')}
                    className={cls.commentTitle}
                />

                <AddCommentForm onSendComment={onSendComment} />

                <CommentList isLoading={isLoading} comments={comments} />
            </Page>
        </DynamicModuleLoader>
    );
});

export default ArticleDetailsPage;
