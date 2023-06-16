import {
    PayloadAction,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import { IComment } from 'entities/Comment';
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { IArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema';

//! создаём адаптер и задаём функцию получения ключей. Ключём будет comment.id. ОН после запроса получает массив комментариев и создаёт свой стейт
export const commentsAdapter = createEntityAdapter<IComment>({
    selectId: (comment) => comment.id,
});

//! по умолчению адаптер возвращает entities и ids расширяю его доп типом с ошибкой и загрузкой
const initialState = commentsAdapter.getInitialState<IArticleDetailsCommentsSchema>({
    isLoading: false,
    error: undefined,
    ids: [], //! ключи это ссылки на объекты где значение это сам объект
    entities: {}, //! сами объекты айди которых становятся ключами
});

const articleDetailsCommentsSlice = createSlice({
    name: 'articleDetailsCommentsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentsByArticleId.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(
                fetchCommentsByArticleId.fulfilled,
                (state, action: PayloadAction<IComment[]>) => {
                    state.isLoading = false;
                    //! в адаптер помешаем массив функций который адаптер фильтрует и превращает в стейт с полями entities и ids
                    commentsAdapter.setAll(state, action.payload);
                },
            )
            .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});
export const { reducer: articleDetailsCommentsReducer } = articleDetailsCommentsSlice;
