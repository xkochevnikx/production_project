import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { INotification } from '../../modal/types/notification';
import { Card, CardTheme } from '@/shared/UI/Card';
import { Text } from '@/shared/UI/Text';
import cls from './NotificationItem.module.scss';

interface NotificationItemProps {
    className?: string;
    item: INotification;
}

export const NotificationItem = memo(
    ({ className, item }: NotificationItemProps) => {
        const content = (
            <Card
                theme={CardTheme.OUTLINED}
                className={classNames(cls.NotificationItem, {}, [className])}
            >
                <Text title={item.title} text={item.description} />
            </Card>
        );

        if (item.href) {
            return (
                <a
                    className={cls.link}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                >
                    {content}
                </a>
            );
        }

        return content;
    },
);
