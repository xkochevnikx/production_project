import { Menu } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import React, { ReactNode } from 'react';
import { DropDownDirection } from 'shared/types/ui';
import cls from './Dropdown.module.scss';
import { AppLink } from '../AppLink/AppLink';

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
    // todo - как настроен дропдаун Ж
    const {
        className, trigger, items, direction = 'bottom left',
    } = props;

    // ? как работает мапер. тут я задаю распрложение выпадющего дропа и у меня есть 4 варианта в стилях, 4 класса. у меня есть тип перечисление строк которые в мапере заданы как ключи а в значениях этих ключей лежит строка которая динамически навешивается на компонент меню. допустим у меня дефолтно задан тип боттом лефт и попадая в моды функции класснеймс он становиться тру доставая строку с названием класса одновременно. что бы задавая в пропсах этих ключи я создал для них отдельный тип который принимаю в интерфейсе, и который является ключами в моем мапере. либо можно сразу готовую строку ложить в аддишионал массив функции класснеймс, ниже пример закомментирован

    // const directions = mapDirectionClass[direction];

    const mapDirectionClass: Record<DropDownDirection, string> = {
        'bottom left': cls.bottomLeft,
        'bottom right': cls.bottomRight,
        'top left': cls.topLeft,
        'top right': cls.topRight,
    };
    return (
        <Menu as="div" className={classNames(cls.Dropdown, {}, [className])}>
            <Menu.Button className={cls.btn}>{trigger}</Menu.Button>
            <Menu.Items
                className={classNames(
                    cls.menu,
                    { [mapDirectionClass[direction]]: true },
                    [],
                )}
            >
                {items.map((item, index) => {
                    const content = ({ active }: { active: boolean }) => (
                        <button
                            key={index}
                            type="button"
                            disabled={item.disabled}
                            onClick={item.onClick}
                            className={classNames(cls.item, {
                                [cls.active]: active,
                            })}
                        >
                            {item.content}
                        </button>
                    );

                    if (item.href) {
                        return (
                            <Menu.Item
                                as={AppLink}
                                to={item.href}
                                disabled={item.disabled}
                            >
                                {content}
                            </Menu.Item>
                        );
                    }

                    return (
                        <Menu.Item as={React.Fragment} disabled={item.disabled}>
                            {content}
                        </Menu.Item>
                    );
                })}
            </Menu.Items>
        </Menu>
    );
}
