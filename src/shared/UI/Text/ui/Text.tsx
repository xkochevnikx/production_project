import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export enum TextTheme {
    PRIMARY = 'primary',
    INVERTED = 'inverted',
    ERROR = 'error',
}

export enum TextSize {
    S = 'size_s',
    M = 'size_m',
    L = 'size_l',
}

export enum TextAlign {
    RIGHT = 'right',
    LEFT = 'left',
    CENTER = 'center',
}

interface ITextProps {
    className?: string;
    title?: string;
    text?: string;
    theme?: TextTheme;
    align?: TextAlign;
    size?: TextSize;
}

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeHeaderTag: Record<TextSize, HeaderTagType> = {
    [TextSize.S]: 'h3',
    [TextSize.M]: 'h2',
    [TextSize.L]: 'h1',
};

export const Text = memo((props: ITextProps) => {
    const {
        className,
        title,
        text,
        theme = TextTheme.PRIMARY,
        align = TextAlign.LEFT,
        size = TextSize.M,
    } = props;

    // todo - в зависимости от пропса size с помощью мапера из объекта достаём нужный нам тег для верной семантики заголовка. если возвращаем текст то там обычный параграф размеры которого задаются в стилях тоже исходя из принимаемого пропса size, класс навешивается в модах по условию его наличия. если ничего не передано дефолтно используем размер М.
    const HeaderTag = mapSizeHeaderTag[size];

    return (
        <div
            className={classNames(
                cls.Text,
                { [cls[theme]]: true, [cls[size]]: true, [cls[align]]: true },
                [className],
            )}
        >
            {title && <HeaderTag className={cls.title}>{title}</HeaderTag>}
            {text && <p className={cls.text}>{text}</p>}
        </div>
    );
});
