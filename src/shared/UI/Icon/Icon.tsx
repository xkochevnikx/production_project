import { classNames } from 'shared/lib/classNames/classNames';
import { VFC, memo } from 'react';
import cls from './Icon.module.scss';

interface IconProps {
    className?: string;
    Svg: VFC<React.SVGProps<SVGSVGElement>>;
    inverted?: boolean;
}

export const Icon = memo(({ className, Svg, inverted }: IconProps) => (
    <Svg
        className={classNames(inverted ? cls.inverted : cls.Icon, {}, [
            className,
        ])}
    />
));
