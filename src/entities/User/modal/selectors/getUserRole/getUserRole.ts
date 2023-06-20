import { IStateSchema } from 'app/providers/StoreProviders';
import { UserRoles } from '../../types/user';

//селектор сохраняеет сюда массив ролей
export const getIsRole = (state: IStateSchema) => state.user.authData?.roles;
