import {
    MutableRefObject, ReactNode, useRef, UIEvent,
} from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useTrottle } from '@/shared/lib/hooks/useTrottle/useTrottle';
import {
    getScrollSaveSelectors,
    scrollSaveSliceActions,
} from '@/features/ScrollSave';
import cls from './Page.module.scss';

interface PageProps {
    className?: string;
    children?: ReactNode;
    onScrollEnd?: () => void;
    //! сохраняю скролл только там где это нужно по флагу isSaveScroll
    isSaveScroll?: boolean;
}

export const Page = ({
    className,
    children,
    onScrollEnd,
    isSaveScroll,
}: PageProps) => {
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;

    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    const dispatch = useAppDispatch();

    const { pathname } = useLocation();

    //! в селектор который вытаскивает объект с текущим положением скролла где ключ это адрес а значение это положение. вытаскиваю из него значение в массиве и преобразовываю его в число которое передаю ниже в wrapperRef.current.scrollTop при каждом рендере
    const scrollPosition = Number(
        Object.values(useSelector(getScrollSaveSelectors)),
    );

    //! хук подгрузки на скролл.
    useInfiniteScroll({
        wrapperRef,
        triggerRef,
        callback: onScrollEnd,
    });

    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    });

    const onScroll = useTrottle((e: UIEvent<HTMLDivElement>) => {
        if (isSaveScroll) {
            dispatch(
                scrollSaveSliceActions.setScrollPosition({
                    //! e.currentTarget.scrollTop возвращает сколько отмотали от верхней точки страницы в пикселях
                    position: e.currentTarget.scrollTop,
                    path: pathname,
                }),
            );
        }
    }, 200);

    //! если приняли пропсом со страницы onScrollEnd то внизу под компонентом добавляем див и сохраняем его в triggerRef
    //! вешаем на section onScroll который возвращаем объект события UIEvent
    return (
        <main
            onScroll={onScroll}
            ref={wrapperRef}
            className={classNames(cls.Page, {}, [className])}
        >
            {children}
            {onScrollEnd && <div ref={triggerRef} className={cls.triggerDiv} />}
        </main>
    );
};
