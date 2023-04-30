import { IStateSchema } from 'app/providers/StoreProviders';

export const getArticleRecommendationsError = (state: IStateSchema) => state.articleDetailsPage?.recommendations.error;

export const getArticleRecommendationsIsLoading = (state: IStateSchema) => state.articleDetailsPage?.recommendations.isLoading;
