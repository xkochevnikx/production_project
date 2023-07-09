export type { IArticleDetailsSchema } from './modal/types/articleDetailsSchema';
export type { IArticle } from './modal/types/article';

export {
    ArticleView,
    ArticleSortField,
    ArticleType,
    ArticleBlockType,
} from './modal/consts/consts';

export { getArticleDetailsData } from './modal/selectors/getAllArticleDetails';

export { ArticlesList } from './ui/ArticleList/ArticlesList';

export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails';

export { ArticleDetailsReducer } from './modal/slice/ArticleDetailsSlice';
