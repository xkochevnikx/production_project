import { useEffect } from 'react';

export const useInitialEffect = (callback: () => void) => {
    useEffect(() => {
        //! отправляем запрос только если значение глобальное переменной не сторибук. в режиме сторибука нам не надо отправлять запросы на сервер мы сами задаём фейковые значения
        if (__PROJECT__ !== 'storybook') {
            callback();
        }
        // eslint-disable-next-line
    }, []);
};
