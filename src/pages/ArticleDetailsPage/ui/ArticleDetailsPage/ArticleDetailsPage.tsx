import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleDetails } from 'entities/Article';
import { useNavigate, useParams } from 'react-router-dom';
import { Text } from 'shared/UI/Text/ui/Text';
import { CommentList } from 'entities/Comment';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AddCommentForm } from 'features/AddCommentForm';
import { Button, ThemeButton } from 'shared/UI/Button/ui/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Page } from 'widgets/Page/Page';
import { addCommentForArticle } from '../../modal/services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsByArticleId } from '../../modal/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleCommentsIsLoading } from '../../modal/selectors/comments';
import {
    articleDetailsCommentsReducer,
    getArticleComments,
} from '../../modal/slice/articleDetailsCommentsSlice';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetailsComments: articleDetailsCommentsReducer,
};

export const ArticleDetailsPage = memo(
    ({ className }: ArticleDetailsPageProps) => {
        const dispatch = useAppDispatch();

        const onSendComment = useCallback(
            (text: string) => {
                if (text) {
                    dispatch(addCommentForArticle(text));
                }
            },
            [dispatch],
        );

        const navigate = useNavigate();

        const onBackToList = useCallback(() => {
            navigate(RoutePath.articles);
        }, [navigate]);

        const { id } = useParams<{ id: string }>();

        const { t } = useTranslation('articles');

        const comments = useSelector(getArticleComments.selectAll);

        const isLoading = useSelector(getArticleCommentsIsLoading);

        useInitialEffect(() => dispatch(fetchCommentsByArticleId(id)));

        if (!id) {
            return (
                <Page
                    className={classNames(cls.ArticleDetailsPage, {}, [
                        className,
                    ])}
                >
                    <h1>{t('Статья не найдена')}</h1>
                </Page>
            );
        }
        return (
            <DynamicModuleLoader removeAfterUnmount reducers={reducers}>
                <Page
                    className={classNames(cls.ArticleDetailsPage, {}, [
                        className,
                    ])}
                >
                    <Button onClick={onBackToList} theme={ThemeButton.OUTLINE}>
                        {t('Назад к списку')}
                    </Button>
                    <ArticleDetails id={id} />
                    <Text
                        title={t('Комментарии')}
                        className={cls.commentTitle}
                    />

                    <AddCommentForm onSendComment={onSendComment} />

                    <CommentList isLoading={isLoading} comments={comments} />
                </Page>
            </DynamicModuleLoader>
        );
    },
);
