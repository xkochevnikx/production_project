import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'shared/UI/Select/Select';
import { SortOrder } from 'shared/types';
import { ArticleSortField } from 'entities/Article';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { articlesPageActions } from 'pages/ArticlePage';
import cls from './ArticlesSortSelected.module.scss';

interface ArticlesSortSelectedProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    debounce: () => void;
}

export const ArticlesSortSelected = memo((props: ArticlesSortSelectedProps) => {
    const {
        className, debounce, order, sort,
    } = props;

    const { t } = useTranslation('articles');

    const dispatch = useAppDispatch();

    const orderOptions = useMemo(
        () => [
            {
                value: 'asc',
                content: t('По возрастанию'),
            },
            {
                value: 'desc',
                content: t('По убыванию'),
            },
        ],
        [t],
    );

    const sortFieldOptions = useMemo(
        () => [
            {
                value: ArticleSortField.CREATED,
                content: t('По созданию'),
            },
            {
                value: ArticleSortField.TITLE,
                content: t('По названию'),
            },
            {
                value: ArticleSortField.VIEWS,
                content: t('По просмотрам'),
            },
        ],
        [t],
    );

    const onChangeOrder = useCallback(
        (newOrder: string) => {
            dispatch(articlesPageActions.setOrder(newOrder as SortOrder));
            dispatch(articlesPageActions.setPage(1));
            debounce();
        },
        [dispatch, debounce],
    );

    const onChangeSort = useCallback(
        (newSort: string) => {
            dispatch(articlesPageActions.setSort(newSort as ArticleSortField));
            dispatch(articlesPageActions.setPage(1));
            debounce();
        },
        [dispatch, debounce],
    );

    return (
        <div className={classNames(cls.ArticlesSortSelected, {}, [className])}>
            <Select
                onChange={onChangeSort}
                options={sortFieldOptions}
                label={t('Сортировать по')}
                value={sort}
            />
            <Select
                options={orderOptions}
                label={t('по')}
                value={order}
                onChange={onChangeOrder}
            />
        </div>
    );
});
