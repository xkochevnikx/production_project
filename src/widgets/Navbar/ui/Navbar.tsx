import { getUserAuthData } from 'entities/User';
import { LoginModal } from 'features/AuthByUsername';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/UI/Button/Button';
import { Text, TextTheme } from 'shared/UI/Text/Text';
import { AppLink, AppLinkTheme } from 'shared/UI/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { HStack } from 'shared/UI/Stack/HStack/HStack';
import { NotificationButton } from 'features/NotificationButton';
import { AvatarDropdown } from 'features/AvatarDropdown';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const isAuth = useSelector(getUserAuthData);

    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);

    //! при изменении любого пропса компонерт перерисовывается поэтому сохраняем функции которые передаём пропсами в юзколлбэк чтобы ссылка не менялась
    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

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
                <HStack gap="32" className={cls.actions}>
                    <NotificationButton />
                    <AvatarDropdown />
                </HStack>

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
