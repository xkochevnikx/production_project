import { Listbox as HListbox } from '@headlessui/react';
import React, { ReactNode } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/UI/Button/ui/Button';
import cls from './ListBox.module.scss';

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
}

export function ListBox(props: IListBoxProps) {
    const {
        items, className, onChange, value, readonly,
    } = props;

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
            <HListbox.Options className={cls.options}>
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
