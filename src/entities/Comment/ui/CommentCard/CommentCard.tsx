import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/UI/Avatar';
import { Text } from '@/shared/UI/Text';
import { Skeleton } from '@/shared/UI/Skeleton';
import { AppLink } from '@/shared/UI/AppLink';
import { VStack } from '@/shared/UI/Stack';
import { IComment } from '../../modal/types/comment';
import cls from './CommentCard.module.scss';
import { getRouteProfile } from '@/shared/consts/route';

interface CommentCardProps {
    className?: string;
    comment?: IComment;
    isLoading?: boolean;
}

export const CommentCard = memo(
    ({
        className,
        comment,
        isLoading,
    }: CommentCardProps) => {
        if (isLoading) {
            return (
                <VStack
                    max
                    gap="8"
                    align="start"
                    className={classNames(
                        cls.CommentCard,
                        {},
                        [className, cls.loading],
                    )}
                >
                    <div className={cls.header}>
                        <Skeleton
                            width={30}
                            height={30}
                            border="50px"
                        />
                        <Skeleton width={100} height={16} />
                    </div>
                    <Skeleton
                        width="100%"
                        height={50}
                        className={cls.text}
                    />
                </VStack>
            );
        }

        if (!comment) {
            return null;
        }

        return (
            <VStack
                max
                gap="8"
                align="start"
                className={classNames(cls.CommentCard, {}, [
                    className,
                ])}
            >
                <AppLink
                    className={cls.header}
                    to={getRouteProfile(
                        `${comment.user.id}`,
                    )}
                >
                    {comment?.user.avatar ? (
                        <Avatar
                            size={30}
                            src={comment?.user.avatar}
                        />
                    ) : null}

                    <Text title={comment?.user.username} />
                </AppLink>
                <Text
                    text={comment?.text}
                    className={cls.text}
                />
            </VStack>
        );
    },
);
