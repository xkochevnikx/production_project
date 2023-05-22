import { useCallback, useEffect, useRef } from 'react';
//! троттлинг позволяет выполнить одно событие в промежуток времени. в нашем случае что бы не спамить постоянно данными о скролле и не перегружать девтулзы и производительность. Сохраняем в реф - фолс и если его значение фолс то коллбек отрабатывает и сразу после отработки меняет значение рефа в тру и условие не срабатывает. дальше после этого через заданнное время сеттаймаут меняет значение рефа в фолс и коллбек снова отрабатывает
export const useTrottle = (
    callback: (...args: any[]) => void,
    delay: number
) => {
    const trottleRef = useRef(false);
    //! ref для очистки тайиаута при размонтировании
    const timeoutRef = useRef<any>(null);
    //! при размонтировании очищаем память
    useEffect(() => {
        return () => clearInterval(timeoutRef.current);
    }, []);

    const trottle = useCallback(
        (...args: any[]) => {
            if (!trottleRef.current) {
                callback(...args);

                trottleRef.current = true;

                timeoutRef.current = setTimeout(() => {
                    trottleRef.current = false;
                }, delay);
            }
        },
        [callback, delay]
    );
    return trottle;
};
