import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProviders';
import { IArticle } from 'entities/Article';

export interface IFetchArticleListProps {
    replace?: boolean;
}

export const fetchArticleRecommendations = createAsyncThunk<
    IArticle[],
    void,
    IThunkConfig<string>
>('articleDetailsPage/fetchArticleRecommendations', async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<IArticle[]>('/articles', {
            params: {
                _limit: 5,
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
