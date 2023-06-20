export enum UserRoles {
    ADMIN = 'ADMIN',
    MANAGER = 'MANAGER',
    USER = 'USER',
}

export interface IUser {
    id: string;
    username: string;
    avatar?: string;
    roles: UserRoles[];
}

export interface IUserSchema {
    authData?: IUser;

    _inited: boolean;
}
