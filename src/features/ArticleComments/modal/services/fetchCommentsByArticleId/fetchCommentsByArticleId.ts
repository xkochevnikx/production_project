import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from '@/app/providers/StoreProviders';
import { IComment } from '@/entities/Comment';

export const fetchCommentsByArticleId = createAsyncThunk<
    IComment[],
    string,
    IThunkConfig<string>
>('articleDetails/fetchCommentsByArticleId', async (articleId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<IComment[]>('/comments/', {
            params: {
                articleId,
                _expand: 'user',
            },
        });

        if (!response.data) {
            throw new Error('Ошибка при подгрузки комментариев для статьи');
        }

        return response.data;
    } catch (error) {
        return rejectWithValue('error');
    }
});
