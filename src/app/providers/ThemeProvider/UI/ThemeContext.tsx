import { createContext, FC, useMemo, useState } from "react";

export enum Theme {
   LIGHT = "light",
   DARK = "dark",
}

export interface IThemeContextProps {
   theme?: Theme;
   setTheme?: (Theme: Theme) => void;
}

export const LOCAL_STORAGE_THEME_KEY = "theme";

export const ThemeContext = createContext<IThemeContextProps>({});

const defaultTheme =
   (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT;

export const ThemeProvider: FC = ({ children }) => {
   const [theme, setTheme] = useState<Theme>(defaultTheme);

   const defaultProps = useMemo(
      () => ({
         theme,
         setTheme,
      }),
      [theme]
   );

   return (
      <ThemeContext.Provider value={defaultProps}>
         {children}
      </ThemeContext.Provider>
   );
};
