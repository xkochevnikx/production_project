import { classNames } from '@/shared/lib/classNames/classNames';
import { ReactNode, memo } from 'react';
import cls from './Flex.module.scss';

export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';
export type FlexGap = '4' | '8' | '16' | '32';

const justifyClasses: Record<FlexJustify, string> = {
    start: cls.justifyStart,
    center: cls.justifyCenter,
    end: cls.justifyEnd,
    between: cls.justifyBetween,
};

const gapClasses: Record<FlexGap, string> = {
    4: cls.gap4,
    8: cls.gap8,
    16: cls.gap16,
    32: cls.gap32,
};

const alignClasses: Record<FlexAlign, string> = {
    start: cls.alignStart,
    center: cls.alignCenter,
    end: cls.alignEnd,
};

const directionClasses: Record<FlexDirection, string> = {
    row: cls.directionRow,
    column: cls.directionColumn,
};

export interface FlexProps {
    className?: string;
    children: ReactNode;
    justify?: FlexJustify;
    align?: FlexAlign;
    direction: FlexDirection;
    gap?: FlexGap;
    max?: boolean;
}

// todo - це дизайн обёртка для элементов задающая для элементов внутри флекс параметры расположения в контейнере. на вход принимаем пропсы и в зависимости от типа (значения) пропса подставляем это значение в качетсве ключа в массив классов. Не которые имеют уже дефолтные значнеия на случай если ничего не передано.

export const Flex = memo((props: FlexProps) => {
    const {
        justify = 'center',
        align = 'center',
        direction = 'row',
        children,
        className,
        gap,
        max,
    } = props;

    //! в зависмости от переданных пропсов навешиваем класс с помощью индексной нотации обращаяс к объекту по динамическому ключу достаём нужный класс. Выше в пропсах у нас есть некоторые дефолтные значения на случай если значения не заданы пропсами сверху.

    const classes = [
        className,
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        gap && gapClasses[gap],
    ];

    return (
        <div className={classNames(cls.Flex, { [cls.max]: max }, classes)}>
            {children}
        </div>
    );
});
