import { useCallback, useMemo, useState } from 'react';

interface IUseHoverBind {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

type UseHoverResult = [boolean, IUseHoverBind];
//! когда hover нужно реализовать через js а не css
//! хук обработки события наведения мыши на компонент. в сам компонент разворачиваем функции слушатели событий которые меняют флаг.

export const useHover = (): UseHoverResult => {
    const [isHover, setIsHover] = useState(false);

    const onMouseEnter = useCallback(() => {
        setIsHover(true);
    }, []);

    const onMouseLeave = useCallback(() => {
        setIsHover(false);
    }, []);

    return useMemo(
        () => [isHover, { onMouseEnter, onMouseLeave }],
        [isHover, onMouseEnter, onMouseLeave],
    );
};

//!  в компоненте вызываем const [isHover, bindHover] = useHover();
//!  и на блок либо какой то другой ui компонент вешаем  {...bindHover}
