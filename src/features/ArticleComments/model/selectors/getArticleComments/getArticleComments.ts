import { IStateSchema } from '@/app/providers/StoreProviders';
import { commentsAdapter } from '../../slice/articleDetailsCommentsSlice';

export const getArticleCommentsIsLoading = (state: IStateSchema) => state.articleDetailsComments?.isLoading;

export const getArticleCommentsError = (state: IStateSchema) => state.articleDetailsComments?.error;

export const getArticleComments = commentsAdapter.getSelectors<IStateSchema>(
    (state) => state.articleDetailsComments || commentsAdapter.getInitialState(),
);
