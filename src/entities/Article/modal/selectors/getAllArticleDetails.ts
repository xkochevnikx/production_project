import { IStateSchema } from '@/app/providers/StoreProviders';

export const getArticleDetailsData = (state: IStateSchema) => state.articleDetails?.data;

export const getArticleDetailsIsLoading = (state: IStateSchema) => state.articleDetails?.isLoading || false;

export const getArticleDetailsError = (state: IStateSchema) => state.articleDetails?.error;
