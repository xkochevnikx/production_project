import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProviders';
import i18next from 'i18next';

export const fetchArticleComments = createAsyncThunk<
    any,
    IArticleCommentsProps,
    IThunkConfig<string>
>('***/articleComments', async (_, thunkApi) => {
    const { dispatch, extra, rejectWithValue, getState } = thunkApi;

    try {
        const response = await extra.api.post<any>('/***', {});
        if (!response.data) throw new Error();

        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(i18next.t('ERROR'));
    }
});
