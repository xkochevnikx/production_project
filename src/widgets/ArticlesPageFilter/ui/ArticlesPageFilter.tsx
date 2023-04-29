import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useMemo } from 'react';
import { ArticleViewSelector } from 'features/ArticleViewSelector';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ArticleView } from 'entities/Article';
import { ArticlesSortSelected } from 'features/ArticlesSortSelected';
import {
    articlesPageActions,
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType,
    getArticlesPageView,
} from 'pages/ArticlePage';
import { fetchArticlesList } from 'pages/ArticlePage/modal/services/fetchArticlesList/fetchArticlesList';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { ArticlesTypeTabs } from 'features/ArticlesTypeTabs';
import { ArticlesSearch } from 'features/ArticlesSearch/ArticlesSearch';
import cls from './ArticlesPageFilter.module.scss';

interface ArticlesPageFilterProps {
    className?: string;
}

export const ArticlesPageFilter = memo(
    ({ className }: ArticlesPageFilterProps) => {
        const dispatch = useAppDispatch();

        const view = useSelector(getArticlesPageView);
        const type = useSelector(getArticlesPageType);
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
            [dispatch, debounceFetchData],
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
                    <ArticlesTypeTabs
                        type={type}
                        debounce={debounceFetchData}
                    />
                    <ArticlesSortSelected
                        sort={sort}
                        order={order}
                        debounce={debounceFetchData}
                    />
                </div>
                <ArticlesSearch
                    className={cls.Card}
                    debounce={debounceFetchData}
                    search={search}
                />
            </div>
        );
    },
);
