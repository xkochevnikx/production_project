import { useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonSize, ThemeButton } from 'shared/UI/Button/ui/Button';
import { LanguageSwitcher } from 'widgets/LanguageSwitcher';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher/';
import { useSelector } from 'react-redux';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import cls from './Sidebar.module.scss';
import { getSidebarItems } from '../../modal/selectors/getSidebarItems';

interface SidebarProps {
    className?: string;
}

export function Sidebar({ className }: SidebarProps) {
    const [collapsed, setCollapsed] = useState(false);

    const sidebarItemList = useSelector(getSidebarItems);

    const toggleOn = useCallback(() => {
        setCollapsed((prev) => !prev);
    }, []);

    return (
        <div
            data-testid="sidebar"
            className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
                className,
            ])}
        >
            <div className={cls.items}>
                {sidebarItemList.map((item) => (
                    <SidebarItem
                        item={item}
                        collapsed={collapsed}
                        key={item.path}
                    />
                ))}
            </div>
            <Button
                theme={ThemeButton.BACKGROUND_INVERTED}
                className={cls.collapseBtn}
                data-testid="sideToggle"
                type="button"
                onClick={toggleOn}
                square
                size={ButtonSize.L}
            >
                {collapsed ? '<' : '>'}
            </Button>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LanguageSwitcher short={collapsed} className={cls.lang} />
            </div>
        </div>
    );
}
