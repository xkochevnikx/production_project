import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './VStack.module.scss';

interface VStackProps {
    className?: string;
}

export const VStack = memo(({ className }: VStackProps) => <div className={classNames(cls.VStack, {}, [className])} />);
