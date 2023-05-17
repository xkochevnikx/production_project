import { IStateSchema } from 'app/providers/StoreProviders';
import { commentsAdapter } from '../slice/articleDetailsCommentsSlice';

export const getArticleCommentsIsLoading = (state: IStateSchema) => state.articleDetailsPage?.comments.isLoading;

export const getArticleCommentsError = (state: IStateSchema) => state.articleDetailsPage?.comments.error;

export const getArticleComments = commentsAdapter.getSelectors<IStateSchema>(
    (state) => state.articleDetailsPage?.comments || commentsAdapter.getInitialState(),
);
