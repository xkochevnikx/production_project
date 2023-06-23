import { getIsRole, getUserAuthData } from 'entities/User';
import { UserRoles } from 'entities/User/modal/consts/consts';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

interface IRequireAuthProps {
    children: JSX.Element;
    roles?: UserRoles[];
}
// todo - функция проверки авторизации пользователя и нужных прав для определённых страниц. Функция оборачивает элементы на отрисовку у которых есть поле isAuth и принимает так же массив с ролями из этих элементов который хранит роли которым доступен конкретно этот путь\страница.

export function RequireAuth({ children, roles }: IRequireAuthProps) {
    // получаем данные о наличии регистрации пользователя
    const auth = useSelector(getUserAuthData);
    // получаем данные о ролях текущего авторизованного пользователя.
    const isRole = useSelector(getIsRole);

    const location = useLocation();

    // мемоизирую вычисления что бы при каждой перерисовке не переписывать и не перерасчитывать резултат при условии того что зависимости не менялись. функция вычисляет, обладает ли текщий пользователь ролями даущиими права доступа к маршруту для которого нужно обладать некими ролями.
    const hasRequiredRoles = useMemo(() => {
        // если в переданном сверху пропсе roles от компоента ничего нет то есть не нужно обладать какими либо ролями возвращаем тру и не проводим дальше никакие вычисления.
        if (!roles) {
            return true;
        }
        // если всё таки в roles есть требования то итерируемся по этому массиву методом some и проверяю, удовлетворяет ли какой-либо элемент массива условию. а условие такое - ЕСЛИ массив ролей текущего пользователя isRole содержит какую либо из ролей переданных сюда в пропсе roles то в переменную возвращается true/если никакой из элементов не вернул true то some вренет false
        return roles.some((requiredRole) => {
            const hasRole = isRole?.includes(requiredRole);

            return hasRole;
        });
    }, [roles, isRole]);

    if (!hasRequiredRoles) {
        return (
            <Navigate
                to={RoutePath.forbidden_page}
                state={{ from: location }}
                replace
            />
        );
    }
    if (!auth) {
        return (
            <Navigate to={RoutePath.main} state={{ from: location }} replace />
        );
    }
    return children;
}
