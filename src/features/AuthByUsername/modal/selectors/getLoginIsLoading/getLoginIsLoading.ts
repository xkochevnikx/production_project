import { IStateSchema } from '@/app/providers/StoreProviders';

export const getLoginIsLoading = (state: IStateSchema) => state?.loginForm?.isLoading || false;
