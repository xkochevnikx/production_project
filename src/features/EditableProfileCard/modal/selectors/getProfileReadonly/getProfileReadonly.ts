import { IStateSchema } from '@/app/providers/StoreProviders';

export const getProfileReadonly = (state: IStateSchema) => state.profile?.readonly;
