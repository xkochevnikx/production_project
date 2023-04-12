import { getUserAuthData } from 'entities/User';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/UI/AppLink/AppLink';
import cls from './SidebarItem.module.scss';
import { ISidebarItemType } from 'widgets/Sidebar/modal/types/sidebar';

interface SidebarItemProps {
    item: ISidebarItemType;
    collapsed: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
    const { t } = useTranslation();

    const isAuth = useSelector(getUserAuthData);

    const { path, text, Icon } = item;

    if (item.isAuthOnly && !isAuth) {
        return null;
    }

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
