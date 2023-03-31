import { IStateSchema } from 'app/providers/StoreProviders';

export const getUserInited = (state: IStateSchema) => state.user._inited;
