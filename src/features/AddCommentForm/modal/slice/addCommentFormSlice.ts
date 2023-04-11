import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAddCommentFormSchema } from '../types/AddCommentForm';

const initialState: IAddCommentFormSchema = {
    text: '',
    error: '',
};

export const addCommentFormSlice = createSlice({
    name: 'addCommentForm',
    initialState,
    reducers: {
        setText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },
    },

    // extraReducers: (builder) => {
    //     builder
    //         .addCase(.pending, (state) => {
    //             state.isLoading = true;
    //             state.error = undefined;
    //         })
    //         .addCase(.fulfilled, (state) => {
    //             state.isLoading = false;
    //         })
    //         .addCase(.rejected, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});

export const { actions: addCommentFormActions } = addCommentFormSlice;
export const { reducer: addCommentFormReducer } = addCommentFormSlice;
