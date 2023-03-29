import {
    createContext, FC, useMemo, useState,
} from 'react';

export enum Theme {
    LIGHT = 'app_light_theme',
    DARK = 'app_dark_theme',
    ORANGE = 'app_orange_theme',
}

export interface IThemeContextProps {
    theme?: Theme;
    setTheme?: (Theme: Theme) => void;
}

export const LOCAL_STORAGE_THEME_KEY = 'theme';

export const ThemeContext = createContext<IThemeContextProps>({});

interface IThemeProviderProps {
    initialTheme?: Theme;
}

const defaultTheme = (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT;

export const ThemeProvider: FC<IThemeProviderProps> = (props) => {
    const { initialTheme, children } = props;

    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

    const defaultProps = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme],
    );

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};
