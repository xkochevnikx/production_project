import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'shared/UI/Select/Select';
import { SortOrder } from 'shared/types';
import { ArticleSortField } from 'entities/Article';
import cls from './ArticlesSortSelected.module.scss';

interface ArticlesSortSelectedProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticlesSortSelected = memo((props: ArticlesSortSelectedProps) => {
    const {
        className, onChangeOrder, onChangeSort, order, sort,
    } = props;
    const { t } = useTranslation();

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

    const onChangeSortHandler = useCallback(
        (newSort: string) => {
            onChangeSort(newSort as ArticleSortField);
        },
        [onChangeSort],
    );

    const onChangeOrderHandler = useCallback(
        (newOrder: string) => {
            onChangeOrder(newOrder as SortOrder);
        },
        [onChangeOrder],
    );

    return (
        <div className={classNames(cls.ArticlesSortSelected, {}, [className])}>
            <Select
                onChange={onChangeSortHandler}
                options={sortFieldOptions}
                label={t('Сортировать по')}
                value={sort}
            />
            <Select
                options={orderOptions}
                label={t('по')}
                value={order}
                onChange={onChangeOrderHandler}
            />
        </div>
    );
});
