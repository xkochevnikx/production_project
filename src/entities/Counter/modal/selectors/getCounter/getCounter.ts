import { IStateSchema } from 'app/providers/StoreProviders';

export const getCounter = (state: IStateSchema) => state.counter;
