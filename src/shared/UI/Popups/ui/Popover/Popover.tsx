import { classNames } from 'shared/lib/classNames/classNames';
import { Popover as HPopover } from '@headlessui/react';
import { DropDownDirection } from 'shared/types/ui';
import { ReactNode } from 'react';
import cls from './Popover.module.scss';
import popupCls from '../../styles/popup.module.scss';

import { mapDirectionClass } from '../../styles/consts';

interface IPopoverProps {
    className?: string;
    trigger: ReactNode;
    direction?: DropDownDirection;
    children?: ReactNode;
}

export function Popover(props: IPopoverProps) {
    const {
        className, direction = 'top left', trigger, children,
    } = props;

    const directions = mapDirectionClass[direction];

    return (
        <HPopover
            className={classNames(cls.Popover, {}, [className, popupCls.popup])}
        >
            <HPopover.Button className={popupCls.trigger}>
                {trigger}
            </HPopover.Button>
            <HPopover.Panel
                className={classNames(cls.panel, {}, [className, directions])}
            >
                {children}
            </HPopover.Panel>
        </HPopover>
    );
}
