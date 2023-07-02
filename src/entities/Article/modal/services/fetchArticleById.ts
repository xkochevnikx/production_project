import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from '@/app/providers/StoreProviders';
import { IArticle } from '../types/article';

export const fetchArticleById = createAsyncThunk<
    IArticle,
    string,
    IThunkConfig<string>
>('articleDetails/fetchArticleById', async (id, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
        const response = await extra.api.get<IArticle>(`/articles/${id}`, {
            params: {
                _expand: 'user',
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
