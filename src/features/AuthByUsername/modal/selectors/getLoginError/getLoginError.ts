import { IStateSchema } from 'app/providers/StoreProviders';

export const getLoginError = (state: IStateSchema) => state?.loginForm?.error;
