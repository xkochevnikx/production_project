import { createSelector } from '@reduxjs/toolkit';
import { IStateSchema } from 'app/providers/StoreProviders';

export const getScrollSaveSelectors = (state: IStateSchema) => state.scrollSave.scroll;

export const getScrollByPath = createSelector(
    getScrollSaveSelectors,
    (state: IStateSchema, path: string) => path,
    (scroll, path) => scroll[path] || 0,
);
