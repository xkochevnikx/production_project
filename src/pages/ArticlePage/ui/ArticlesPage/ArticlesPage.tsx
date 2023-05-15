import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { ArticlesList } from 'entities/Article';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useSelector } from 'react-redux';
import { Page } from 'widgets/Page/Page';
import { ArticlesPageFilter } from 'widgets/ArticlesPageFilter';
import {
    articlesPageReducer,
    getArticles,
} from '../../modal/slice/articlesPageSlice';
import cls from './ArticlesPage.module.scss';
import {
    getArticlesPageIsLoading,
    getArticlesPageView,
} from '../../modal/selectors/getArticlesPageSelectors';

import { fetchNextArticlesPage } from '../../modal/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../modal/services/initArticlesPage/initArticlesPage';
// import {  useSearchParams } from 'react-router-dom';

interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = memo(({ className }: ArticlesPageProps) => {
    const dispatch = useAppDispatch();

    // let [searchParams] = useSearchParams(); или олдскул ниже

    const searchParams = new URLSearchParams(window.location.search);

    const view = useSelector(getArticlesPageView);

    const articles = useSelector(getArticles.selectAll);

    const isLoading = useSelector(getArticlesPageIsLoading);

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Page
                onScrollEnd={onLoadNextPart}
                className={classNames(cls.ArticlesPage, {}, [className])}
            >
                <ArticlesPageFilter />
                <ArticlesList
                    articles={articles}
                    isLoading={isLoading}
                    view={view}
                />
            </Page>
        </DynamicModuleLoader>
    );
});

export default ArticlesPage;
