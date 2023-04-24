import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProviders';
import { IArticle } from 'entities/Article';
import { getArticlesPageLimit } from '../../selectors/getArticlesPageSelectors';

interface IFetchArticleListProps {
    page: number;
}

export const fetchArticlesList = createAsyncThunk<
    IArticle[],
    IFetchArticleListProps,
    IThunkConfig<string>
>('articlesPage/fetchArticlesList', async (props, thunkApi) => {
    const { page = 1 } = props;
    const limit = getArticlesPageLimit(thunkApi.getState());

    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<IArticle[]>('/articles', {
            params: {
                _expand: 'user',
                _limit: limit,
                _page: page,
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
