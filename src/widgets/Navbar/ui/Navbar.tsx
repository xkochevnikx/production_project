import { getIsRole, getUserAuthData, userActions } from 'entities/User';
import { LoginModal } from 'features/AuthByUsername';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/UI/Button/Button';
import { Text, TextTheme } from 'shared/UI/Text/Text';
import { AppLink, AppLinkTheme } from 'shared/UI/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Dropdown } from 'shared/UI/Dropdown/Dropdown';
import { Avatar } from 'shared/UI/Avatar/Avatar';
import { UserRoles } from 'entities/User/modal/consts/consts';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const isAuth = useSelector(getUserAuthData);
    const [isAuthModal, setIsAuthModal] = useState(false);
    const isRole = useSelector(getIsRole);
    // todo - достаю флаги ролей пользователя. в селекторе через createSelector не получилось, делаю тут в лоб
    const isManager = Boolean(isRole?.includes(UserRoles.MANAGER));
    const isAdmin = Boolean(isRole?.includes(UserRoles.ADMIN));
    // ниже проверяю наличие оснований в ролях для доступа к кнопке перехода на админ панель
    const isAdminPanelAvailable = isAdmin || isManager;

    //! при изменении любого пропса компонерт перерисовывается поэтому сохраняем функции которые передаём пропсами в юзколлбэк чтобы ссылка не менялась
    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const onLogout = useCallback(() => {
        //! кнопка с этой функцией доступна если пользователь авторизован и после нажатия стираем все данные об авторизации
        dispatch(userActions.logout());
    }, [dispatch]);

    // todo - в итемс по условию isAdminPanelAvailable добавляю еще один объект. Там у меня основной массвив и внутри него есть другой массив который разворачивается деструктуризацией в основной по условию. Если условие верно разворачиваю массив с одним объектом в основной, если не верно разворачиваю пустой массив в основной, соответственно ничего не происходит
    if (isAuth) {
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>
                <Text
                    className={cls.appName}
                    title={t('svyat app')}
                    theme={TextTheme.INVERTED}
                />
                <AppLink
                    to={RoutePath.article_create}
                    theme={AppLinkTheme.PRIMARY}
                    className={cls.createLink}
                >
                    {t('Создать статью')}
                </AppLink>
                <Dropdown
                    className={cls.btnLog}
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
                            content: t('Аккаунт'),
                            href: RoutePath.profile + isAuth.id,
                        },
                    ]}
                />

                <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
            </header>
        );
    }

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <Button
                onClick={onShowModal}
                theme={ThemeButton.CLEAR_INVERTED}
                className={cls.links}
            >
                {t('Войти')}
            </Button>
            {isAuthModal && (
                <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
            )}
        </header>
    );
});

export default Navbar;
