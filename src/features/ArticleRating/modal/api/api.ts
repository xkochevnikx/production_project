import { IRating } from '@/entities/Rating';
import { rtkApi } from '@/shared/api/rtkApi';

interface getArticleRating {
    userId: string;
    articleId: string;
}

interface postArticleRating {
    userId: string;
    articleId: string;
    feedback?: string;
    rate: number;
}
const articlesRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRating: build.query<IRating[], getArticleRating>({
            query: ({ articleId, userId }) => ({
                url: '/article-rating',
                params: {
                    userId,
                    articleId,
                },
            }),
        }),
        postArticleRating: build.mutation<void, postArticleRating>({
            query: (arg) => ({
                url: '/article-rating',
                method: 'POST',
                body: arg,
            }),
        }),
    }),
});

export const useArticleRating = articlesRatingApi.useGetArticleRatingQuery;

export const useRateArticle = articlesRatingApi.usePostArticleRatingMutation;
