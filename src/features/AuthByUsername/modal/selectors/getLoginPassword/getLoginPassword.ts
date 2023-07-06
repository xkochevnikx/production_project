import { IStateSchema } from '@/app/providers/StoreProviders';

export const getLoginPassword = (state: IStateSchema) => state?.loginForm?.password || '';
