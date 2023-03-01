import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/UI/Button/ui/Button';
import { Modal } from 'shared/UI/Modal/Modal';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export function Navbar({ className }: NavbarProps) {
    const [isAuthModal, setIsAuthModal] = useState(false);

    // ? при изменении любого пропса компонерт перерисовывается поэтому сохраняем функции которые передаём пропсами в юзколлбэк чтобы ссылка не менялась
    const onToggleModal = useCallback(() => {
        setIsAuthModal((prev) => !prev);
    }, []);

    const { t } = useTranslation();
    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <Button
                onClick={onToggleModal}
                theme={ThemeButton.CLEAR_INVERTED}
                className={cls.links}
            >
                {t('войти')}
            </Button>
            <Modal isOpen={isAuthModal} onClose={onToggleModal}>
                <h2>{t('Lorem ipsum dolor sit amet consectetur adipisicing elit')}</h2>
            </Modal>
        </div>
    );
}

export default Navbar;
