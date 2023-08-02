import { CSSProperties, memo, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import { AppImage } from '../AppImage';
import UserIcon from '../../assets/icons/user-avatar.svg';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
    avatarInverted?: boolean;
}

export const Avatar = memo((props: AvatarProps) => {
    const {
        className, size, src, alt, avatarInverted,
    } = props;

    const styles = useMemo<CSSProperties>(
        () => ({
            width: size || 50,
            height: size || 50,
        }),
        [size],
    );

    const errorFallback = (
        <Icon
            width={size}
            height={size}
            Svg={UserIcon}
            inverted={avatarInverted}
        />
    );

    const fallback = (
        <Skeleton width={size} height={size} border="50%" />
    );

    return (
        <AppImage
            errorFallback={errorFallback}
            fallback={fallback}
            style={styles}
            src={src}
            alt={alt}
            className={classNames(cls.Avatar, {}, [
                className,
            ])}
        />
    );
});
