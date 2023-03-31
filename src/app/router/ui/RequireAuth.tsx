import { getUserAuthData } from 'entities/User';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

// todo тут у нас функция проверки авторизации пользователя и если её нет его при переходе на маршрут на котором нужна авторизация его редиректит на main

export function RequireAuth({ children }: { children: JSX.Element }) {
    const auth = useSelector(getUserAuthData);
    const location = useLocation();

    if (!auth) {
        return (
            <Navigate to={RoutePath.main} state={{ from: location }} replace />
        );
    }

    return children;
}
