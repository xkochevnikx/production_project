import { Menu } from '@headlessui/react';
import React, { ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropDownDirection } from '@/shared/types/ui';
import cls from './Dropdown.module.scss';
//! общие стили вынес в отдельный файл
import popupCls from '../../styles/popup.module.scss';
import { AppLink } from '../../../AppLink/AppLink';
//! мапер вынесен в отдельный файл
import { mapDirectionClass } from '../../styles/consts';

export interface IDropdownItem {
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
    disabled?: boolean;
}

interface IDropdownProps {
    className?: string;
    items: IDropdownItem[];
    trigger: ReactNode;
    direction?: DropDownDirection;
}

export function Dropdown(props: IDropdownProps) {
    // todo - как настроен дропдаун
    const {
        className, trigger, items, direction = 'bottom left',
    } = props;

    // ? как работает мапер. тут я задаю распрложение выпадющего дропа и у меня есть 4 варианта в стилях, 4 класса. у меня есть тип перечисление строк которые в мапере заданы как ключи а в значениях этих ключей лежит строка которая динамически навешивается на компонент меню. допустим у меня дефолтно задан тип боттом лефт и попадая в моды функции класснеймс он становиться тру доставая строку с названием класса одновременно. что бы задавая в пропсах этих ключи я создал для них отдельный тип который принимаю в интерфейсе, и который является ключами в моем мапере. либо можно сразу готовую строку ложить в аддишионал массив функции класснеймс, ниже пример закомментирован

    // const directions = mapDirectionClass[direction];

    return (
        <Menu
            as="div"
            className={classNames(cls.Dropdown, {}, [
                className,
                popupCls.popup,
            ])}
        >
            <Menu.Button className={popupCls.trigger}>{trigger}</Menu.Button>
            <Menu.Items
                className={classNames(
                    cls.menu,
                    { [mapDirectionClass[direction]]: true },
                    [],
                )}
            >
                {items.map((item, index) => {
                    // eslint-disable-next-line
                    function content({ active }: { active: boolean }) {
                        return (
                            <div
                                key={index}
                                onClick={item.onClick}
                                className={classNames(cls.item, {
                                    [popupCls.active]: active,
                                })}
                            >
                                {item.content}
                            </div>
                        );
                    }

                    if (item.href) {
                        return (
                            <Menu.Item
                                key={index}
                                as={AppLink}
                                to={item.href}
                                disabled={item.disabled}
                            >
                                {content}
                            </Menu.Item>
                        );
                    }

                    return (
                        <Menu.Item
                            as={React.Fragment}
                            disabled={item.disabled}
                            key={index}
                        >
                            {content}
                        </Menu.Item>
                    );
                })}
            </Menu.Items>
        </Menu>
    );
}
