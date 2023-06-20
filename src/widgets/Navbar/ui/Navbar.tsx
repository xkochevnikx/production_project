import { getUserAuthData, userActions } from 'entities/User';
import { LoginModal } from 'features/AuthByUsername';
import {
    memo, useCallback, useEffect, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/UI/Button/ui/Button';
import { Text, TextTheme } from 'shared/UI/Text/ui/Text';
import { AppLink, AppLinkTheme } from 'shared/UI/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Dropdown } from 'shared/UI/Dropdown/Dropdown';
import { Avatar } from 'shared/UI/Avatar/Avatar';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const isAuth = useSelector(getUserAuthData);

    const [isAuthModal, setIsAuthModal] = useState(false);

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
                        {
                            content: t('Выйти'),
                            onClick: onLogout,
                        },
                        {
                            content: t('Аккаунт'),
                            href: RoutePath.profile + isAuth.id,
                        },
                        {
                            content: t('Админка'),
                            href: RoutePath.admin_page,
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
