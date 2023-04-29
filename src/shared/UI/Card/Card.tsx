import { classNames } from 'shared/lib/classNames/classNames';
import { HTMLAttributes, ReactNode, memo } from 'react';
import cls from './Card.module.scss';

export enum CardTheme {
    NORMAL = 'normal',
    OUTLINED = 'outlined',
}
interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
}

export const Card = memo(
    ({ className, children, ...otherProps }: CardProps) => (
        <div className={classNames(cls.Card, {}, [className])} {...otherProps}>
            {children}
        </div>
    ),
);
