import { classNames } from 'shared/lib/classNames/classNames';
import {
    MutableRefObject, ReactNode, useRef, UIEvent, useMemo,
} from 'react';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { scrollSaveSliceActions } from 'widgets/ScrollSave/modal/slice/scrollSaveSlice';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { getScrollByPath } from 'widgets/ScrollSave/modal/selectors/getScrollSaveSelectors';
import { IStateSchema } from 'app/providers/StoreProviders';
import { useTrottle } from 'shared/lib/hooks/useTrottle/useTrottle';
import cls from './Page.module.scss';

interface PageProps {
    className?: string;
    children?: ReactNode;
    onScrollEnd?: () => void;
}

export const Page = ({ className, children, onScrollEnd }: PageProps) => {
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;

    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    const dispatch = useAppDispatch();

    const { pathname } = useLocation();

    const scrollPosition = useSelector((state: IStateSchema) => getScrollByPath(state, pathname));

    useInfiniteScroll({
        wrapperRef,
        triggerRef,
        callback: onScrollEnd,
    });

    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    });

    const onScroll = useTrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(
            scrollSaveSliceActions.setScrollPosition({
                position: e.currentTarget.scrollTop,
                path: pathname,
            }),
        );
    }, 300);

    return (
        <section
            onScroll={onScroll}
            ref={wrapperRef}
            className={classNames(cls.Page, {}, [className])}
        >
            {children}
            <div ref={triggerRef} />
        </section>
    );
};
