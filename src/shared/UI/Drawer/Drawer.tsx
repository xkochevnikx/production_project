import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Drawer.module.scss';
import { ReactNode, memo } from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';

interface IDrawerProps {
    className?: string;
    children: ReactNode;
    isOpen: boolean;
    isClose: () => void;
}

export const Drawer = memo((props: IDrawerProps) => {
    const { children, isClose, isOpen, className } = props;

    const { theme } = useTheme();

    return (
        <Portal>
            <div
                className={classNames(cls.Drawer, { [cls.opened]: isOpen }, [
                    className,
                    theme,
                    'app_drawer',
                ])}
            >
                <Overlay onClick={isClose} />
                <div className={cls.content}> {children}</div>
            </div>
        </Portal>
    );
});
