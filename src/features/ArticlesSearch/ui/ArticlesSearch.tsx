import { memo, useCallback } from 'react';
import { Card } from 'shared/UI/Card/Card';
import { Input } from 'shared/UI/Input/UI/Input';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { classNames } from 'shared/lib/classNames/classNames';
import { articlesPageActions } from 'features/ArticlesInfiniteList';

interface ArticlesSearchProps {
    className?: string;
    search: string;
    debounce: () => void;
}

export const ArticlesSearch = memo(
    ({ className, search, debounce }: ArticlesSearchProps) => {
        const { t } = useTranslation('articles');

        const dispatch = useAppDispatch();

        const onChangeSearch = useCallback(
            (newSearch: string) => {
                dispatch(articlesPageActions.setSearch(newSearch));
                dispatch(articlesPageActions.setPage(1));
                debounce();
            },
            [dispatch, debounce],
        );

        return (
            <Card className={classNames('', {}, [className])}>
                <Input
                    onChange={onChangeSearch}
                    value={search}
                    placeholder={t('Поиск')}
                />
            </Card>
        );
    },
);
