import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useNotifications } from 'entities/Notification/api/notificationApi';
import { VStack } from 'shared/UI/Stack/VStack/VStack';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';

interface NotificationListProps {
    className?: string;
}

export const NotificationList = memo(({ className }: NotificationListProps) => {
    const { data, isLoading } = useNotifications(null, {
        pollingInterval: 5000,
    });

    if (isLoading) {
        return (
            <VStack gap='16' max className={classNames('', {}, [className])}>
                <Skeleton width={'100%'} height={'80px'} border={'8px'} />
                <Skeleton width={'100%'} height={'80px'} border={'8px'} />
                <Skeleton width={'100%'} height={'80px'} border={'8px'} />
            </VStack>
        );
    }
    return (
        <VStack
            gap='16'
            max
            className={classNames(cls.NotificationList, {}, [className])}
        >
            {data?.map((item) => (
                <NotificationItem key={item.id} item={item} />
            ))}
        </VStack>
    );
});
