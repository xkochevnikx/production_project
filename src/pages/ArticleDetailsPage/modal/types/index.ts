import { IArticleDetailsCommentsSchema } from './ArticleDetailsCommentsSchema';
import { IArticleDetailsRecommendationsSchema } from './ArticleDetailsRecommendationsSchema';

export interface IArticleDetailsPageSchema {
    comments: IArticleDetailsCommentsSchema;
    recommendations: IArticleDetailsRecommendationsSchema;
}
