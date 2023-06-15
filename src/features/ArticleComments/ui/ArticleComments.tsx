import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './ArticleComments.module.scss';
import { VStack } from 'shared/UI/Stack/VStack/VStack';
import { Text, TextSize } from 'shared/UI/Text/ui/Text';
import { CommentList } from 'entities/Comment';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { addCommentForArticle } from 'pages/ArticleDetailsPage/modal/services/addCommentForArticle/addCommentForArticle';
import { useSelector } from 'react-redux';

export interface IArticleCommentsProps {
    className?: string;
}

export const ArticleComments = memo((props: IArticleCommentsProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const comments = useSelector(getArticleComments.selectAll);

    const isLoading = useSelector(getArticleCommentsIsLoading);

    //! в AddCommentForm передаём функцию добавления комментария к статье и в ней дёргам фанк
    const onSendComment = useCallback(
        (text: string) => {
            if (text) {
                dispatch(addCommentForArticle(text));
            }
        },
        [dispatch]
    );

    return (
        <VStack
            gap='16'
            className={classNames(cls.ArticleComments, {}, [className])}
        >
            {/* <AddCommentForm onSendComment={onSendComment} /> */}
            <Text
                size={TextSize.L}
                title={t('Комментарии')}
                className={cls.commentTitle}
            />
            <CommentList isLoading={isLoading} comments={comments} />
        </VStack>
    );
});
