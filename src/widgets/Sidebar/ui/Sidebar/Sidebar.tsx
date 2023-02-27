import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/UI/AppLink/AppLink';
import { Button, ButtonSize, ThemeButton } from 'shared/UI/Button/ui/Button';
import { LanguageSwitcher } from 'widgets/LanguageSwitcher';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher/';
import cls from './Sidebar.module.scss';
import MainIcon from '../../../../shared/assets/icons/Main.svg';
import AboutIcon from '../../../../shared/assets/icons/About.svg';

interface SidebarProps {
   className?: string;
}

export function Sidebar({ className }: SidebarProps) {
   const [collapsed, setCollapsed] = useState(true);

   const { t } = useTranslation();

   function toggleOn() {
      setCollapsed((prev) => !prev);
   }

   return (
      <div
         data-testid="sidebar"
         className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
            className,
         ])}
      >
         <div className={cls.items}>
            <AppLink className={cls.item} to={RoutePath.main}>
               <MainIcon className={cls.icon} />
               <span className={cls.link}>
                  {' '}
                  {t('главная')}
               </span>
            </AppLink>

            <AppLink className={cls.item} to={RoutePath.about}>
               <AboutIcon className={cls.icon} />
               <span className={cls.link}>{t('о сайте')}</span>
            </AppLink>
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
            <LanguageSwitcher short={collapsed} />
         </div>
      </div>
   );
}
