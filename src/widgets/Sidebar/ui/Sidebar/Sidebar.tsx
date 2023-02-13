import { useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { LanguageSwitcher } from 'widgets/LanguageSwitcher';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher/';
import cls from './Sidebar.module.scss';

interface SidebarProps {
   className?: string;
}

export function Sidebar({ className }: SidebarProps) {
   const [collapsed, setCollapsed] = useState(false);

   function toggleOn() {
      setCollapsed((prev) => !prev);
   }

   return (
      <div
         className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
            className,
         ])}
      >
         <button type="button" onClick={toggleOn}>
            toggle
         </button>
         <div className={cls.switchers}>
            <ThemeSwitcher />
            <LanguageSwitcher />
         </div>
      </div>
   );
}
