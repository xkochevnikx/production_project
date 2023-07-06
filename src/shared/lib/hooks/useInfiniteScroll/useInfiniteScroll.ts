import { MutableRefObject, useEffect } from 'react';

export interface IuseInfiniteScrollProps {
    //! это функция подгрузки новой порции статей
    callback?: () => void;
    wrapperRef?: MutableRefObject<HTMLElement>;
    triggerRef: MutableRefObject<HTMLElement>;
}

export function useInfiniteScroll({
    callback,
    triggerRef,
    wrapperRef,
}: IuseInfiniteScrollProps) {
    useEffect(() => {
        const triggerElement = triggerRef.current;

        let observer: IntersectionObserver | null = null;

        //! сделали объект наблюдатель, если в хук передали какую либо функцию коллбек отработает при условии
        if (callback) {
            observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    callback();
                }
            });

            //! сказали зачем наблюдать
            observer.observe(triggerElement);
        }

        //! при демонтировании компонента отписываемся от слежки во избежании утечек памяти
        return () => {
            if (observer && triggerElement) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(triggerElement);
            }
        };
    }, [callback, triggerRef, wrapperRef]);
}
