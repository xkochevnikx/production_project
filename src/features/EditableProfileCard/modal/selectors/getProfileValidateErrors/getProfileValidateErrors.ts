import { IStateSchema } from '@/app/providers/StoreProviders';

export const getProfileValidateErrors = (state: IStateSchema) => state.profile?.validateErrors;
