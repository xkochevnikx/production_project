import { IStateSchema } from 'app/providers/StoreProviders';

export const getProfileError = (state: IStateSchema) => state.profile?.error;
