import { IStateSchema } from '@/app/providers/StoreProviders';

export const getProfileData = (state: IStateSchema) => state.profile?.data;
