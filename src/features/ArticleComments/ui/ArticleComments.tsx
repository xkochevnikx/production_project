import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { VStack } from '@/shared/UI/Stack/VStack/VStack';
import { Text, TextSize } from '@/shared/UI/Text/Text';
import { CommentList } from '@/entities/Comment';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { addCommentForArticle } from '@/features/ArticleComments/model/services/addCommentForArticle/addCommentForArticle';
import { CommentForm } from '@/entities/CommentForm';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { fetchCommentsByArticleId } from '../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import {
    getArticleComments,
    getArticleCommentsIsLoading,
} from '../model/selectors/getArticleComments/getArticleComments';
import { articleDetailsCommentsReducer } from '../model/slice/articleDetailsCommentsSlice';

export interface IArticleCommentsProps {
    id?: string;
}

const reducers: ReducersList = {
    articleDetailsComments: articleDetailsCommentsReducer,
};

export const ArticleComments = memo((props: IArticleCommentsProps) => {
    const { id } = props;

    const dispatch = useAppDispatch();

    const { t } = useTranslation();

    const comments = useSelector(getArticleComments.selectAll);

    const isLoading = useSelector(getArticleCommentsIsLoading);

    //! получаем список комментариев
    useInitialEffect(() => {
        if (id) {
            dispatch(fetchCommentsByArticleId(id));
        }
    });

    //! в AddCommentForm передаём функцию добавления комментария к статье и в ней дёргам фанк
    const onSendComment = useCallback(
        (text: string) => {
            if (text) {
                dispatch(addCommentForArticle(text));
            }
        },
        [dispatch],
    );

    return (
        <DynamicModuleLoader reducers={reducers}>
            <VStack max gap="16" align="start">
                <Text size={TextSize.L} title={t('Комментарии')} />
                <CommentForm onSendComment={onSendComment} />
                <CommentList isLoading={isLoading} comments={comments} />
            </VStack>
        </DynamicModuleLoader>
    );
});
