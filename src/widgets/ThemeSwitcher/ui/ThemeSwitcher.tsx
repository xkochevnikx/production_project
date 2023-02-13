import { Theme, useTheme } from 'app/providers/ThemeProvider';
import { classNames } from 'shared/lib/classNames/classNames';
import LightTheme from 'shared/assets/icons/lightTheme.svg';
import DarkTheme from 'shared/assets/icons/darkTheme.svg';
import { Button, ThemeButton } from 'shared/UI/Button/ui/Button';
import cls from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
   className?: string;
}

export function ThemeSwitcher(props: ThemeSwitcherProps) {
   const { className } = props;
   const { theme, toggleTheme } = useTheme();

   return (
      <Button
         theme={ThemeButton.CLEAR}
         onClick={toggleTheme}
         className={classNames(cls.ThemeSwitcher, {}, [className])}
      >
         {theme === Theme.LIGHT ? <LightTheme /> : <DarkTheme />}
      </Button>
   );
}
