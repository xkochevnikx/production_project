import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import { classNames, Mode } from 'shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export enum ThemeButton {
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clearInverted',
    OUTLINE = 'outline',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ThemeButton;
    square?: boolean;
    size?: ButtonSize;
    disabled?: boolean;
    children?: ReactNode;
}

export const Button = memo((props: IButtonProps) => {
    const {
        className,
        size = ButtonSize.M,
        children,
        theme = ThemeButton.OUTLINE,
        square,
        disabled,
        ...otherProps
    } = props;

    const mods: Mode = {
        [cls[theme]]: true,
        [cls.square]: square,
        [cls[size]]: true,
        [cls.disabled]: disabled,
    };

    return (
        <button
            disabled={disabled}
            type="button"
            {...otherProps}
            className={classNames(cls.Button, mods, [className])}
        >
            {children}
        </button>
    );
});
