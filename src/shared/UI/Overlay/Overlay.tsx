import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './OVerlay.module.scss';

interface OverlayProps {
    className?: string;
    onClick: () => void;
}

export const Overlay = memo(({ className, onClick }: OverlayProps) => (
    <div
        onClick={onClick}
        className={classNames(cls.Overlay, {}, [className])}
    />
));
