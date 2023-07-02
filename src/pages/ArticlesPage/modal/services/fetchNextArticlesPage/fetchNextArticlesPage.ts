import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from '@/app/providers/StoreProviders';
import { articlesPageActions } from '@/features/ArticlesInfiniteList';
import { fetchArticlesList } from '@/features/ArticlesInfiniteList/modal/services/fetchArticlesList/fetchArticlesList';
import {
    getArticlesPageHasMore,
    getArticlesPageIsLoading,
    getArticlesPageNum,
} from '../../../../../features/ArticlesInfiniteList/modal/selectors/getArticlesPageSelectors';

export const fetchNextArticlesPage = createAsyncThunk<
    void,
    void,
    IThunkConfig<string>
>('articlesPage/fetchNextArticlesPage', async (_, thunkApi) => {
    const hasMore = getArticlesPageHasMore(thunkApi.getState());
    const page = getArticlesPageNum(thunkApi.getState());
    const isLoading = getArticlesPageIsLoading(thunkApi.getState());

    if (hasMore && !isLoading) {
        thunkApi.dispatch(articlesPageActions.setPage(page + 1));
        thunkApi.dispatch(fetchArticlesList({ replace: false }));
    }
});
