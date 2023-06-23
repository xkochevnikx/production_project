import { IStateSchema } from 'app/providers/StoreProviders';

// селектор сохраняеет сюда массив ролей
export const getIsRole = (state: IStateSchema) => state.user.authData?.roles;
