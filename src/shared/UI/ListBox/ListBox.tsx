import { Listbox as HListbox } from '@headlessui/react';
import React, { ReactNode } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { DropDownDirection } from 'shared/types/ui';
import cls from './ListBox.module.scss';
import { Button } from '../Button/ui/Button';

export interface IListBoxItems {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

interface IListBoxProps {
    items?: IListBoxItems[];
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
    readonly?: boolean;
    direction?: DropDownDirection;
}

export function ListBox(props: IListBoxProps) {
    const {
        items,
        className,
        onChange,
        value,
        readonly,
        direction = 'top left',
    } = props;

    const mapDirectionClass: Record<DropDownDirection, string> = {
        'bottom left': cls.bottomLeft,
        'bottom right': cls.bottomRight,
        'top left': cls.topLeft,
        'top right': cls.topRight,
    };

    return (
        <HListbox
            disabled={readonly}
            as="div"
            className={classNames(cls.ListBox, {}, [className])}
            value={value}
            onChange={onChange}
        >
            <HListbox.Button className={cls.trigger}>
                <Button disabled={readonly}>{value}</Button>
            </HListbox.Button>
            <HListbox.Options
                className={classNames(
                    cls.options,
                    { [mapDirectionClass[direction]]: true },
                    [],
                )}
            >
                {items?.map((item) => (
                    <HListbox.Option
                        as={React.Fragment}
                        key={item.value}
                        value={item.value}
                        disabled={item.disabled}
                    >
                        {({ active, selected }) => (
                            <li
                                className={classNames(
                                    cls.item,
                                    {
                                        [cls.active]: active,
                                        [cls.disabled]: item.disabled,
                                    },
                                    [],
                                )}
                            >
                                {selected && '✔ '}
                                {item.content}
                            </li>
                        )}
                    </HListbox.Option>
                ))}
            </HListbox.Options>
        </HListbox>
    );
}
