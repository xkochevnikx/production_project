import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProviders';
import { articlesPageActions } from '../../slice/articlesPageSlice';
import { getArticlesPageInited } from '../../selectors/getArticlesPageSelectors';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<
    void,
    void,
    IThunkConfig<string>
>('articlesPage/initArticlesPage', async (_, thunkApi) => {
    const inited = getArticlesPageInited(thunkApi.getState());

    if (!inited) {
        thunkApi.dispatch(articlesPageActions.initState());
        thunkApi.dispatch(fetchArticlesList({}));
    }
});
