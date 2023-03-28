import { IStateSchema } from 'app/providers/StoreProviders';

export const getProfileForm = (state: IStateSchema) => state.profile?.form;
