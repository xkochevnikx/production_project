import { Listbox as HListbox } from '@headlessui/react';
import React, { ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { DropDownDirection } from 'shared/types/ui';
import cls from './ListBox.module.scss';
import popupCls from '../../styles/popup.module.scss';
import { Button } from '../../../Button/Button';
import { mapDirectionClass } from '../../styles/consts';

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

    return (
        <HListbox
            disabled={readonly}
            as="div"
            className={classNames(cls.ListBox, {}, [className, popupCls.popup])}
            value={value}
            onChange={onChange}
        >
            <HListbox.Button as="div" className={popupCls.trigger}>
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
                                        [popupCls.active]: active,
                                        [popupCls.disabled]: item.disabled,
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
