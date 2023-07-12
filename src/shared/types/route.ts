import { RouteProps } from 'react-router-dom';
import { UserRoles } from '@/entities/User';

export type AppRouterProps = RouteProps & {
    authOnly?: boolean;
    roles?: UserRoles[];
};
