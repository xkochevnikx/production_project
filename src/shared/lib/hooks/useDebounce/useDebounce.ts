import { MutableRefObject, useCallback, useRef } from 'react';

//! дебаунс позволяет отменять какое то событие в течении какого то времени и выполнять коллбэк только по истчению таймера который запускается на каждое новое событие. когда события нет заданное время то коллбэк отрабатывает. Разница между троттлингом в том что тут отрабатывается только последнее событие и игнорируются предыдушие, а в троллинге одно событие из массы выполняется один раз в один момент времени например каждую секунду. При каждом вызове хука в timer.current появляется setTimeout. и выполнять только последнее по истечению какого то интервала.
export const useDebounce = (
    callback: (...args: any[]) => void,
    delay: number
) => {
    //! изменение рефа не запускает ререндер компонента, а стейт запускал
    const timer = useRef() as MutableRefObject<any>;

    return useCallback(
        (...args: any[]) => {
            if (timer.current) {
                clearTimeout(timer.current);
            }

            timer.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay]
    );
};
