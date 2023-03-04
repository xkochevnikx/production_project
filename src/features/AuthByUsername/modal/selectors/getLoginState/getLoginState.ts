import { IStateSchema } from 'app/providers/StoreProviders';

export const getLoginState = (state: IStateSchema) => state?.loginForm;
