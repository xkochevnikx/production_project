import { CSSProperties, memo, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
}

export const Avatar = memo((props: AvatarProps) => {
    const {
        className, size, src, alt,
    } = props;

    const styles = useMemo<CSSProperties>(
        () => ({
            width: size || 50,
            height: size || 50,
        }),
        [size],
    );
    return (
        <img
            style={styles}
            src={src}
            alt={alt}
            className={classNames(cls.Avatar, {}, [className])}
        />
    );
});
