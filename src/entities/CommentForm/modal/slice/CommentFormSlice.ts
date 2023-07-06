import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICommentFormSchema } from '../types/CommentForm';

const initialState: ICommentFormSchema = {
    text: '',
    error: '',
};

export const CommentFormSlice = createSlice({
    name: 'CommentForm',
    initialState,
    reducers: {
        setText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },
    },
});

export const { actions: CommentFormActions } = CommentFormSlice;
export const { reducer: CommentFormReducer } = CommentFormSlice;
