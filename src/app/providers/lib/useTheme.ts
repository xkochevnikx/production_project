//! это хук который фактически включает всю логику переключения темы за исключением контекста. При этом из него мы получаем всё что надо при этом нет необходимости знать о существовании контекста.

import { useContext } from 'react';
import {
    LOCAL_STORAGE_THEME_KEY,
    Theme,
    ThemeContext,
} from '../ThemeProvider/UI/ThemeContext';

//! это типы которые хук возвращает
interface UseThemeResult {
    toggleTheme: () => void;
    theme: Theme;
}

export function useTheme(): UseThemeResult {
    //! получаем тему из контекста который берёт текущую тему из своего стейта в который она добавлятеся из локала при первом рендере. Если локал пуст стейт использует дефолтное значение.
    const { theme, setTheme } = useContext(ThemeContext);
    //! функция переключения которая в зависимости от текущей темы изменяет на другую сохраняя новую в переменную и передавая выше новове значение через вызов функции изменениея состояния .
    function toggleTheme() {
        let newTheme: Theme;
        switch (theme) {
            case Theme.DARK:
                newTheme = Theme.ORANGE;
                break;
            case Theme.ORANGE:
                newTheme = Theme.LIGHT;
                break;
            case Theme.LIGHT:
                newTheme = Theme.DARK;
                break;
            default:
                newTheme = Theme.LIGHT;
        }

        setTheme?.(newTheme);
        //! после изменения состоятния сохраняем новое значение в локал от куда при первом рендере будут братся актуальное значение темы
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    }
    //! дальше после всех махинаций хук возвращает из себя в компонент App текущее состояние темы и функцию по её изменению которую надо будет вызывать в компоненте переключения ThemeSwitcher
    return {
        theme: theme || Theme.LIGHT,

        toggleTheme,
    };
}
