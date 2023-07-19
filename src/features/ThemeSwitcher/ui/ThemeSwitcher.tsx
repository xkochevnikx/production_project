import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import LightTheme from '@/shared/assets/icons/lightTheme.svg';
import DarkTheme from '@/shared/assets/icons/darkTheme.svg';
import { Button, ThemeButton } from '@/shared/UI/Button';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Theme } from '@/shared/consts/theme';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo((props: ThemeSwitcherProps) => {
    const { className } = props;
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            theme={ThemeButton.CLEAR}
            onClick={toggleTheme}
            className={classNames('', {}, [className])}
        >
            {theme === Theme.LIGHT ? <DarkTheme /> : <LightTheme />}
        </Button>
    );
});
