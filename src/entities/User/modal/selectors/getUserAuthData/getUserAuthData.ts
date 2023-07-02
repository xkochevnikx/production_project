import { IStateSchema } from '@/app/providers/StoreProviders';

export const getUserAuthData = (state: IStateSchema) => state.user.authData;
