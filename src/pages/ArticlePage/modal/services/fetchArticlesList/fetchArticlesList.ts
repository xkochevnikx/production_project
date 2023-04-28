import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProviders';
import { IArticle } from 'entities/Article';
import {
    getArticlesPageLimit,
    getArticlesPageNum,
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
} from '../../selectors/getArticlesPageSelectors';

export interface IFetchArticleListProps {
    replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<
    IArticle[],
    IFetchArticleListProps,
    IThunkConfig<string>
>('articlesPage/fetchArticlesList', async (replace, thunkApi) => {
    const limit = getArticlesPageLimit(thunkApi.getState());
    const sort = getArticlesPageSort(thunkApi.getState());
    const order = getArticlesPageOrder(thunkApi.getState());
    const search = getArticlesPageSearch(thunkApi.getState());
    const page = getArticlesPageNum(thunkApi.getState());

    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<IArticle[]>('/articles', {
            params: {
                _expand: 'user',
                _limit: limit,
                _page: page,
                q: search,
                _sort: sort,
                _order: order,
            },
        });

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (error) {
        return rejectWithValue('error');
    }
});
