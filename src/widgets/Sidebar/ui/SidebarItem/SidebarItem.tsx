import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/UI/AppLink/AppLink';
import { ISidebarItemType } from 'widgets/Sidebar/modal/items';
import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
    item: ISidebarItemType;
    collapsed: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
    const { t } = useTranslation();
    const { path, text, Icon } = item;
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
