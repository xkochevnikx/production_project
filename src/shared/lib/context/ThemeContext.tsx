import {
    createContext, ReactNode, useMemo, useState,
} from 'react';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/consts/localstorage';
import { Theme } from '@/shared/consts/theme';

export interface IThemeContextProps {
    theme?: Theme;
    setTheme?: (Theme: Theme) => void;
}
//! для контекста устанавливаем типы выше
export const ThemeContext = createContext<IThemeContextProps>({});

//! это название ключа
interface IThemeProviderProps {
    initialTheme?: Theme;
    children: ReactNode;
}

//! это значение дефолтной темы его получаем из локал если его там нет по умолчанию ставим светлую. *as преобразование к типу THEME делается потому что в локале лежит json формат
const defaultTheme = (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT;

//! это функция обертка которая обортивает компонент и которому становится доступен функционал переключения тем. Для доступа к чидренам нужно поставить тип functional components FC
export const ThemeProvider = (props: IThemeProviderProps) => {
    const { initialTheme, children } = props;

    //! тут храним состояние темы и инициализируем его или переданным в initialTheme или берём из локала. Передавать нужно только для декакораторов сторибука
    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

    //! тут мы передаём мемоизированное состояние и функцию его изменения в провайдер. а делаем мы это для того что бы при перерисовки компонента ссылка на объект не менялась если не изменилось ничего из массвива зависимостей
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
