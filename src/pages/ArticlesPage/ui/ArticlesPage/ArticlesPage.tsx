import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Page } from '@/widgets/Page/ui/Page';
import { ArticlesPageFilter } from '@/widgets/ArticlesPageFilter';
import { ArticlesInfitineList } from '@/features/ArticlesInfiniteList/ui/ArticlesInfitineList';
import { initArticlesPage } from '@/features/ArticlesInfiniteList/modal/services/initArticlesPage/initArticlesPage';
import cls from './ArticlesPage.module.scss';
import { fetchNextArticlesPage } from '../../modal/services/fetchNextArticlesPage/fetchNextArticlesPage';
// import {  useSearchParams } from 'react-router-dom';

interface ArticlesPageProps {
    className?: string;
}

const ArticlesPage = memo(({ className }: ArticlesPageProps) => {
    const dispatch = useAppDispatch();

    //! let [searchParams] = useSearchParams(); или олдскул ниже
    const searchParams = new URLSearchParams(window.location.search);

    //! фанк для подгрузки новой порции статей спускаем в компонет page
    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    //! при первом рендере вызываем фанк который передаёт данные из адресной строки в слайс, инициализирует вид и делает первый запрос на получение статей
    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });
    //! сохраняю скролл только там где это нужно по флагу  isSaveScroll
    return (
        <Page
            isSaveScroll
            onScrollEnd={onLoadNextPart}
            className={classNames(cls.ArticlesPage, {}, [className])}
        >
            <ArticlesPageFilter />
            <ArticlesInfitineList />
        </Page>
    );
});

export default ArticlesPage;
