import { IStateSchema } from '@/app/providers/StoreProviders';

export const getScrollSaveSelectors = (state: IStateSchema) => state.scrollSave.scroll || {};
