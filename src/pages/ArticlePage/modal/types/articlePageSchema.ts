import { EntityState } from '@reduxjs/toolkit';
import { ArticleView, IArticle } from 'entities/Article';
import { ArticleSortField } from 'entities/Article/modal/types/article';
import { SortOrder } from 'shared/types';

export interface IArticlesPageSchema extends EntityState<IArticle> {
    isLoading?: boolean;
    error?: string;

    // pagination
    page: number;
    limit: number;
    hasMore: boolean;
    // filters
    view: ArticleView;
    order: SortOrder;
    sort: ArticleSortField;
    search: string;
    inited: boolean;
}
