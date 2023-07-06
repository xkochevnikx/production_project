import { UserRoles } from '../consts/consts';

export interface IUser {
    id: string;
    username: string;
    avatar?: string;
    roles?: UserRoles[];
}

export interface IUserSchema {
    authData?: IUser;

    _inited: boolean;
}
