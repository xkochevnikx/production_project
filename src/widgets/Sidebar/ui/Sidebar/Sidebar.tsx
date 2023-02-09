import { useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { LanguageSwitcher } from "shared/UI/LanguageSwitcher/LanguageSwitcher";
import { ThemeSwitcher } from "shared/UI/ThemeSwitcher";
import cls from "./Sidebar.module.scss";

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  function toggleOn() {
    setCollapsed(prev => !prev);
  }

  return (
    <div
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className,
      ])}>
      <button onClick={toggleOn}>toggle</button>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </div>
  );
};
