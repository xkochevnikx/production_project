import { classNames } from 'shared/lib/classNames/classNames';
import cls from './OVerlay.module.scss';
import { memo } from 'react';

interface OverlayProps {
    className?: string;
    onClick: () => void;
}

export const Overlay = memo(({ className, onClick }: OverlayProps) => {
    return (
        <div
            onClick={onClick}
            className={classNames(cls.Overlay, {}, [className])}
        />
    );
});
