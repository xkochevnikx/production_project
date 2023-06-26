import { memo } from 'react';
import { Popover } from 'shared/UI/Popups';
import { Button, ThemeButton } from 'shared/UI/Button/Button';
import { Icon } from 'shared/UI/Icon/Icon';
import { NotificationList } from 'entities/Notification';
import cls from './NotificationButton.module.scss';
import Alert from '../../../shared/assets/icons/alert.svg';

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = memo(
    ({ className }: NotificationButtonProps) => (
        <Popover
            trigger={(
                <Button theme={ThemeButton.CLEAR}>
                    <Icon Svg={Alert} inverted />
                </Button>
            )}
            direction="bottom left"
        >
            <NotificationList className={cls.notification} />
        </Popover>
    ),
);
