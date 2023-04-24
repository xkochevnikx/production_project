import { EntityState } from '@reduxjs/toolkit';
import { ArticleView, IArticle } from 'entities/Article';

export interface IArticlesPageSchema extends EntityState<IArticle> {
    isLoading?: boolean;
    error?: string;
    view: ArticleView;
    // pagination
    page: number;
    limit?: number;
    hasMore: boolean;
}
