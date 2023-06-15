import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleDetails } from 'entities/Article';
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
import { VStack } from 'shared/UI/Stack/VStack/VStack';
import { ArticleRecommendationsList } from 'features/ArticleRecommendationsList/ui/ArticleRecommendationsList';
import { ArticleComments } from 'features/ArticleComments';
import { addCommentForArticle } from '../../modal/services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsByArticleId } from '../../modal/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import {
    getArticleComments,
    getArticleCommentsIsLoading,
} from '../../modal/selectors/comments';
import cls from './ArticleDetailsPage.module.scss';

import { articleDetailsPageReducer } from '../../modal/slice';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    //! тут два редюсера сразу, на комментарии и на рекомендации, создаётся с помощью combineReducers под редюсерами в отдельном индекс файле
    articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = memo(({ className }: ArticleDetailsPageProps) => {
    const dispatch = useAppDispatch();

    const { id } = useParams<{ id: string }>();

    const { t } = useTranslation('articles');

    //! получаем список комментариев
    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    });

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
        <DynamicModuleLoader reducers={reducers}>
            <Page
                className={classNames(cls.ArticleDetailsPage, {}, [className])}
            >
                <VStack gap="16" max align="start">
                    <ArticleDetailsPageHeader />
                    <ArticleDetails id={id} />
                    <ArticleRecommendationsList />
                    <ArticleComments />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default ArticleDetailsPage;
