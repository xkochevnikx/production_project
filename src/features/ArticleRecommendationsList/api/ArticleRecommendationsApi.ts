import { IArticle } from '@/entities/Article';
import { rtkApi } from '@/shared/api/rtkApi';

// todo - добавляем асинхронный эндпоинт который принимает число и подставляем его в лимит и возвращает массив статей
const recommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticlesRecommendationsList: build.query<IArticle[], number>({
            query: (limit) => ({
                url: '/articles',
                params: {
                    _limit: limit,
                },
            }),
        }),
    }),
});

export const useArticleRecommendationsList = recommendationsApi.useGetArticlesRecommendationsListQuery;
