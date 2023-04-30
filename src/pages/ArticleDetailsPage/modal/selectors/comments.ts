import { IStateSchema } from 'app/providers/StoreProviders';

export const getArticleCommentsIsLoading = (state: IStateSchema) => state.articleDetailsPage?.comments.isLoading;

export const getArticleCommentsError = (state: IStateSchema) => state.articleDetailsPage?.comments.error;
