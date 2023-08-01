import { memo } from 'react';
import { useSelector } from 'react-redux';
import { ArticlesList } from '@/entities/Article';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
    articlesPageReducer,
    getArticles,
} from '../modal/slice/articlesPageSlice';
import {
    getArticlesPageIsLoading,
    getArticlesPageView,
} from '../modal/selectors/getArticlesPageSelectors';

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

export const ArticlesInfitineList = memo(() => {
    const view = useSelector(getArticlesPageView);

    const articles = useSelector(getArticles.selectAll);

    const isLoading = useSelector(getArticlesPageIsLoading);

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount={false}
        >
            <ArticlesList
                articles={articles}
                isLoading={isLoading}
                view={view}
            />
        </DynamicModuleLoader>
    );
});
