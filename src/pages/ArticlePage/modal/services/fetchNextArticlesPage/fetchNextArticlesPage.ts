import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProviders';
import {
    getArticlesPageHasMore,
    getArticlesPageIsLoading,
    getArticlesPageNum,
} from '../../selectors/getArticlesPageSelectors';
import { articlesPageActions } from '../../slice/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

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
        thunkApi.dispatch(fetchArticlesList({}));
    }
});
