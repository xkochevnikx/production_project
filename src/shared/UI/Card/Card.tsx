import { HTMLAttributes, ReactNode, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export enum CardTheme {
    NORMAL = 'normal',
    OUTLINED = 'outlined',
}
interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    theme?: CardTheme;
    fullWidth?: boolean;
}

export const Card = memo(
    ({
        className,
        children,
        theme = CardTheme.NORMAL,
        fullWidth,
        ...otherProps
    }: CardProps) => (
        <div
            className={classNames(cls.Card, { [cls.fullWidth]: fullWidth }, [
                className,
                cls[theme],
            ])}
            {...otherProps}
        >
            {children}
        </div>
    )
);
