import { classNames } from 'shared/lib/classNames/classNames';
import { VFC, memo } from 'react';
import cls from './Icon.module.scss';

interface IconProps {
    className?: string;
    Svg: VFC<React.SVGProps<SVGSVGElement>>;
}

export const Icon = memo(({ className, Svg }: IconProps) => <Svg className={classNames(cls.Icon, {}, [className])} />);
