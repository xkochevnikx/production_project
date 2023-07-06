export { userReducer, userActions } from './modal/slice/userSlice';
export type { IUser, IUserSchema } from './modal/types/user';
export { getUserAuthData } from './modal/selectors/getUserAuthData/getUserAuthData';
export { getUserInited } from './modal/selectors/getUserInited/getUserInited';
export { getIsRole } from './modal/selectors/getUserRole/getUserRole';
