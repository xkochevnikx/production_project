import { IStateSchema } from '@/app/providers/StoreProviders';

export const getLoginUsername = (state: IStateSchema) => state?.loginForm?.username || '';
