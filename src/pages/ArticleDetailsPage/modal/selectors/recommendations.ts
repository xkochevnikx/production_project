import { IStateSchema } from 'app/providers/StoreProviders';
import { recommendationsAdapter } from '../slice/articleDetailsPageRecommendationsSlice';

export const getArticleRecommendationsError = (state: IStateSchema) => state.articleDetailsPage?.recommendations.error;

export const getArticleRecommendationsIsLoading = (state: IStateSchema) => state.articleDetailsPage?.recommendations.isLoading;

export const getArticleRecommendations = recommendationsAdapter.getSelectors<IStateSchema>(
    (state) => state.articleDetailsPage?.recommendations
            || recommendationsAdapter.getInitialState(),
);
