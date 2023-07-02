import { classNames } from '@/shared/lib/classNames/classNames';
import { SVGProps, memo } from 'react';
import cls from './Icon.module.scss';

interface IconProps {
    className?: string;
    Svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    inverted?: boolean;
}

export const Icon = memo(({ className, Svg, inverted }: IconProps) => (
    <Svg
        className={classNames(inverted ? cls.inverted : cls.Icon, {}, [
            className,
        ])}
    />
));
