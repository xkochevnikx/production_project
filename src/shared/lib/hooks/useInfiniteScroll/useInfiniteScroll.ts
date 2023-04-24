import { MutableRefObject, useEffect, useRef } from 'react';

export interface IuseInfiniteScrollProps {
    callback?: () => void;

    wrapperRef: MutableRefObject<HTMLElement>;
    triggerRef: MutableRefObject<HTMLElement>;
}

export function useInfiniteScroll({
    callback,
    triggerRef,
    wrapperRef,
}: IuseInfiniteScrollProps) {
    useEffect(() => {
        // const wrapperElement = wrapperRef.current;
        const triggerElement = triggerRef.current;

        let observer: IntersectionObserver | null = null;

        if (callback) {
            observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    callback();
                }
            });

            observer.observe(triggerElement);
        }

        return () => {
            if (observer && triggerElement) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(triggerElement);
            }
        };
    }, [callback, triggerRef, wrapperRef]);
}
