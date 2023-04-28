import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { ArticleViewSelector } from 'features/ArticleViewSelector';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ArticleSortField, ArticleView } from 'entities/Article';
import { useTranslation } from 'react-i18next';
import { Card } from 'shared/UI/Card/Card';
import { Input } from 'shared/UI/Input/UI/Input';
import { ArticlesSortSelected } from 'features/ArticlesSortSelected';
import {
    articlesPageActions,
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageView,
} from 'pages/ArticlePage';
import { SortOrder } from 'shared/types';
import cls from './ArticlesPageFilter.module.scss';
import { fetchArticlesList } from 'pages/ArticlePage/modal/services/fetchArticlesList/fetchArticlesList';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';

interface ArticlesPageFilterProps {
    className?: string;
}

export const ArticlesPageFilter = memo(
    ({ className }: ArticlesPageFilterProps) => {
        const { t } = useTranslation();
        const dispatch = useAppDispatch();

        const view = useSelector(getArticlesPageView);

        const sort = useSelector(getArticlesPageSort);
        const order = useSelector(getArticlesPageOrder);
        const search = useSelector(getArticlesPageSearch);

        const fetchData = useCallback(() => {
            dispatch(fetchArticlesList({ replace: true }));
        }, [dispatch]);

        const debounceFetchData = useDebounce(fetchData, 500);

        const onChangeView = useCallback(
            (view: ArticleView) => {
                dispatch(articlesPageActions.setView(view));
                dispatch(articlesPageActions.setPage(1));
                debounceFetchData();
            },
            [dispatch, debounceFetchData]
        );

        const onChangeOrder = useCallback(
            (newOrder: SortOrder) => {
                dispatch(articlesPageActions.setOrder(newOrder));
                dispatch(articlesPageActions.setPage(1));
                debounceFetchData();
            },
            [dispatch, debounceFetchData]
        );

        const onChangeSort = useCallback(
            (newSort: ArticleSortField) => {
                dispatch(articlesPageActions.setSort(newSort));
                dispatch(articlesPageActions.setPage(1));
                debounceFetchData();
            },
            [dispatch, debounceFetchData]
        );

        const onChangeSearch = useCallback(
            (newSearch: string) => {
                dispatch(articlesPageActions.setSearch(newSearch));
                dispatch(articlesPageActions.setPage(1));
                debounceFetchData();
            },
            [dispatch, debounceFetchData]
        );

        return (
            <div
                className={classNames(cls.ArticlesPageFilter, {}, [className])}
            >
                <div className={cls.sortWrapper}>
                    <ArticleViewSelector
                        view={view}
                        onViewClick={onChangeView}
                    />
                    <ArticlesSortSelected
                        sort={sort}
                        order={order}
                        onChangeOrder={onChangeOrder}
                        onChangeSort={onChangeSort}
                    />
                </div>
                <Card className={cls.Card}>
                    <Input
                        onChange={onChangeSearch}
                        value={search}
                        placeholder={t('Поиск')}
                    />
                </Card>
            </div>
        );
    }
);
