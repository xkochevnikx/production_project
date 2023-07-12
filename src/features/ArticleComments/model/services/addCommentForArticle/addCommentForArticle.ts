import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from '@/app/providers/StoreProviders';
import { IComment } from '@/entities/Comment';
import { getUserAuthData } from '@/entities/User';
import { getArticleDetailsData } from '@/entities/Article';
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<
    IComment,
    string,
    IThunkConfig<string>
>('articleDetails/addCommentForArticle', async (text, thunkApi) => {
    const {
        extra, rejectWithValue, getState, dispatch,
    } = thunkApi;

    //! принимаем коммент строкой получаем айди статьи и юзера и отправляем
    const userData = getUserAuthData(getState());
    const article = getArticleDetailsData(getState());

    if (!userData || !text || !article) {
        return rejectWithValue('no data');
    }
    try {
        const response = await extra.api.post<IComment>('/comments', {
            text,
            articleId: article.id,
            userId: userData.id,
        });

        if (!response.data) {
            throw new Error();
        }
        //! после отправка нового комментария заново запрашиваем обновленный список
        dispatch(fetchCommentsByArticleId(article.id));

        return response.data;
    } catch (error) {
        return rejectWithValue('error');
    }
});
