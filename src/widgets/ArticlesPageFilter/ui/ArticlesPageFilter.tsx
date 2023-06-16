import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { ArticleViewSelector } from 'features/ArticleViewSelector';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ArticlesSortSelected } from 'features/ArticlesSortSelected';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { ArticlesTypeTabs } from 'features/ArticlesTypeTabs';
import { ArticlesSearch } from 'features/ArticlesSearch';
import {
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType,
    getArticlesPageView,
} from 'features/ArticlesInfiniteList';
import { fetchArticlesList } from 'features/ArticlesInfiniteList/modal/services/fetchArticlesList/fetchArticlesList';
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

        //! после изменения в каом либо из поисковых критериев состояние этих поисковых полей меняется на новое, номер страницы изменяется на первую и дергается запрос на сервер в флагом replace тру что бы запросить полностью новую пачку чтатей по заданным параметрам поиска. но дергаем запрос через хук дебаунс

        const fetchData = useCallback(() => {
            dispatch(fetchArticlesList({ replace: true }));
        }, [dispatch]);

        //! сохраняем вызов хука в переменную что бы передать в компоненты
        const debounceFetchData = useDebounce(fetchData, 500);

        return (
            <div
                className={classNames(cls.ArticlesPageFilter, {}, [className])}
            >
                <div className={cls.sortWrapper}>
                    <ArticleViewSelector
                        view={view}
                        debounce={debounceFetchData}
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
