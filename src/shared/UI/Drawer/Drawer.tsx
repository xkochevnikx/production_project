import { Mode, classNames } from 'shared/lib/classNames/classNames';
import { ReactNode, memo, useEffect } from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { useModal } from 'shared/lib/hooks/useModal/useModal';
import cls from './Drawer.module.scss';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';

interface IDrawerProps {
    className?: string;
    children: ReactNode;
    isOpen: boolean;
    isClose: () => void;
    lazy?: boolean;
}

export const Drawer = memo((props: IDrawerProps) => {
    const {
        children, isClose, isOpen, className, lazy,
    } = props;

    const { theme } = useTheme();

    const { isMounted, isClosing, closeHandler } = useModal({
        isOpen,
        onClose: isClose,
    });

    const mods: Mode = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    return (
        <Portal>
            <div
                className={classNames(cls.Drawer, mods, [
                    className,
                    theme,
                    'app_drawer',
                ])}
            >
                <Overlay onClick={closeHandler} />
                <div className={cls.content}>{children}</div>
            </div>
        </Portal>
    );
});
