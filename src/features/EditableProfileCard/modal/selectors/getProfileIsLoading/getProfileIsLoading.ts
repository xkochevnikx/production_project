import { IStateSchema } from 'app/providers/StoreProviders';

export const getProfileIsLoading = (state: IStateSchema) => state.profile?.isLoading;
