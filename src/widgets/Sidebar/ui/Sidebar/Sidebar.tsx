import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { LanguageSwitcher } from 'widgets/LanguageSwitcher';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher/';
import cls from './Sidebar.module.scss';

interface SidebarProps {
   className?: string;
}

export function Sidebar({ className }: SidebarProps) {
   const { t } = useTranslation();
   const [collapsed, setCollapsed] = useState(false);

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
         <button data-testid="sideToggle" type="button" onClick={toggleOn}>
            {t('Открыть')}
         </button>
         <div className={cls.switchers}>
            <ThemeSwitcher />
            <LanguageSwitcher />
         </div>
      </div>
   );
}
