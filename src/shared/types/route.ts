import { RouteProps } from 'react-router-dom';
// eslint-disable-next-line
import { UserRoles } from '@/entities/User';

export type AppRouterProps = RouteProps & {
    authOnly?: boolean;
    roles?: UserRoles[];
};
