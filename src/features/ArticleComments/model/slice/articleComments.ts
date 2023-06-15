import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchArticleComments } from '../services/fetchArticleComments/fetchArticleComments';
import { IArticleCommentsSchema } from '../types/articleComments';

const initialState: IArticleCommentsSchema = {
    isLoading: false,
    error: string,
    data: [],
};

export const articleCommentsSlice = createSlice({
    name: 'articleComments',
    initialState,
    reducers: {
        setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleComments.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchArticleComments.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                },
            )
            .addCase(fetchArticleComments.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: articleCommentsActions } = articleCommentsSlice;
export const { reducer: articleCommentsReducer } = articleCommentsSlice;
