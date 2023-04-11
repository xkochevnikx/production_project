import { IUser } from 'entities/User';

export interface IComment {
    id: string;
    text: string;
    user: IUser;
}
