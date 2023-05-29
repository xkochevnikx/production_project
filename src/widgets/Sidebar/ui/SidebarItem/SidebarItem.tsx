import { getUserAuthData } from 'entities/User';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/UI/AppLink/AppLink';
import { ISidebarItemType } from '../../modal/types/sidebar';
import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
    item: ISidebarItemType;
    collapsed: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
    const { t } = useTranslation();

    const isAuth = useSelector(getUserAuthData);

    const { path, text, Icon } = item;

    //! доп проверка на авторизацию
    if (item.isAuthOnly && !isAuth) {
        return null;
    }

    //! отрисовка в зависимости от флага открытия и закрытия сайдбара, при отсутсвии класса текст ссылки становиться невидимым и сжатым
    return (
        <AppLink
            className={classNames(cls.item, { [cls.collapsed]: collapsed })}
            to={path}
        >
            <Icon className={cls.icon} />
            <span className={cls.link}>{t(text)}</span>
        </AppLink>
    );
});
