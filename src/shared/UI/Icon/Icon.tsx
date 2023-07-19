import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

// расширенный тип для разворачивания в компонент любых пропсов
interface IconProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
    Svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    inverted?: boolean;
}

export const Icon = memo(
    ({
        className, Svg, inverted, ...otherProps
    }: IconProps) => (
        <Svg
            className={classNames(inverted ? cls.inverted : cls.Icon, {}, [
                className,
            ])}
            {...otherProps}
        />
    ),
);
