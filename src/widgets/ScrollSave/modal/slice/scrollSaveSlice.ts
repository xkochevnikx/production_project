import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { iScrollSaveSchema } from '../types/scrollSaveSchema';

const initialState: iScrollSaveSchema = {
    scroll: {},
};

const scrollSaveSlice = createSlice({
    name: 'scrollSaveSlice',
    initialState,

    reducers: {
        setScrollPosition: (
            state,
            action: PayloadAction<{ path: string; position: number }>,
        ) => {
            state.scroll = { [action.payload.path]: action.payload.position };
        },
    },
});

export const { reducer: scrollSaveSliceReducer } = scrollSaveSlice;
export const { actions: scrollSaveSliceActions } = scrollSaveSlice;
