import { IStateSchema } from '@/app/providers/StoreProviders';
import { buildSelector } from '@/shared/lib/store/buildSelector';

export const [useLoginUsername, getLoginUsername] = buildSelector(
    (state: IStateSchema) => state?.loginForm?.username || '',
);
