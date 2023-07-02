import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { Popover } from '@/shared/UI/Popups';
import { Button, ThemeButton } from '@/shared/UI/Button/Button';
import { Icon } from '@/shared/UI/Icon/Icon';
import { NotificationList } from '@/entities/Notification';
import { Drawer } from '@/shared/UI/Drawer/Drawer';
import { AnimationProvider } from '@/shared/lib/components/AnimationProvider';
import cls from './NotificationButton.module.scss';
import Alert from '../../../shared/assets/icons/alert.svg';

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = memo(
    ({ className }: NotificationButtonProps) => {
        const [isOpenDrawer, setIsOpenDrawer] = useState(false);
        const onOpenDrawer = useCallback(() => {
            setIsOpenDrawer(true);
        }, []);
        const onCloseDrawer = useCallback(() => {
            setIsOpenDrawer(false);
        }, []);

        const trigger = (
            <Button onClick={onOpenDrawer} theme={ThemeButton.CLEAR}>
                <Icon Svg={Alert} inverted />
            </Button>
        );

        return (
            <div>
                <BrowserView>
                    <Popover trigger={trigger} direction="bottom left">
                        <NotificationList className={cls.notification} />
                    </Popover>
                </BrowserView>
                <MobileView>
                    {trigger}
                    <AnimationProvider>
                        <Drawer isOpen={isOpenDrawer} onClose={onCloseDrawer}>
                            <NotificationList />
                        </Drawer>
                    </AnimationProvider>
                </MobileView>
            </div>
        );
    },
);
