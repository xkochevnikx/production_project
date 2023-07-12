import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Dropdown } from '@/shared/UI/Popups';
import { Avatar } from '@/shared/UI/Avatar/Avatar';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    UserRoles,
    getIsRole,
    getUserAuthData,
    userActions,
} from '@/entities/User';
import { RoutePath } from '@/shared/consts/route';

interface AvatarDropdownProps {
    className?: string;
}

export const AvatarDropdown = memo(({ className }: AvatarDropdownProps) => {
    const isAuth = useSelector(getUserAuthData);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const isRole = useSelector(getIsRole);
    // todo - достаю флаги ролей пользователя. в селекторе через createSelector не получилось, делаю тут в лоб
    const isManager = Boolean(isRole?.includes(UserRoles.MANAGER));
    const isAdmin = Boolean(isRole?.includes(UserRoles.ADMIN));
    // ниже проверяю наличие оснований в ролях для доступа к кнопке перехода на админ панель
    const isAdminPanelAvailable = isAdmin || isManager;

    const onLogout = useCallback(() => {
        //! кнопка с этой функцией доступна если пользователь авторизован и после нажатия стираем все данные об авторизации
        dispatch(userActions.logout());
    }, [dispatch]);

    if (!isAuth) {
        return null;
    }
    return (
        <Dropdown
            trigger={<Avatar size={30} src={isAuth.avatar} />}
            items={[
                ...(isAdminPanelAvailable
                    ? [
                          {
                              content: t('Админка'),
                              href: RoutePath.admin_panel,
                          },
                      ]
                    : []),
                {
                    content: t('Выйти'),
                    onClick: onLogout,
                },
                {
                    content: t('Профиль'),
                    href: RoutePath.profile + isAuth.id,
                },
            ]}
        />
    );
});
