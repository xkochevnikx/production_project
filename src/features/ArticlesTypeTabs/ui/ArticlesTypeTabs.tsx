import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useMemo } from 'react';
import { ArticleType } from 'entities/Article';
import { useTranslation } from 'react-i18next';
import { articlesPageActions } from 'pages/ArticlePage';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ThemeButton } from 'shared/UI/Button/ui/Button';
import cls from './ArticlesTypeTabs.module.scss';
import { IArticleTypeBtnItem } from '../modal/types/articleTypeTabItem';

export interface IArticlesTypeTabsProps {
    className?: string;
    debounce: () => void;
    type: string;
}

export const ArticlesTypeTabs = memo((props: IArticlesTypeTabsProps) => {
    const { className, debounce, type } = props;

    const dispatch = useAppDispatch();

    const { t } = useTranslation('articles');

    const onChangeType = useCallback(
        (tab: IArticleTypeBtnItem) => {
            dispatch(articlesPageActions.setType(tab.value as ArticleType));
            //! страницу сбрасываем что бы поиск происходит сначала с первой страницы то есть в первой партии подгруженных статей. если этого не сделать будет фильтрация по типам начиная с места где находимся
            dispatch(articlesPageActions.setPage(1));
            debounce();
        },
        [dispatch, debounce]
    );

    const typeBtn = useMemo<IArticleTypeBtnItem[]>(
        () => [
            { value: ArticleType.ALL, content: t('Все статьи') },
            { value: ArticleType.IT, content: t('Айти') },
            { value: ArticleType.ECONOMICS, content: t('Экономика') },
            { value: ArticleType.SIENCE, content: t('Наука') },
        ],
        [t]
    );

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {typeBtn.map((tab) => (
                <Button
                    onClick={() => onChangeType(tab)}
                    theme={
                        tab.value === type
                            ? ThemeButton.BACKGROUND_INVERTED
                            : ThemeButton.OUTLINE
                    }
                    className={cls.tab}
                    key={tab.value}
                >
                    {tab.content}
                </Button>
            ))}
        </div>
    );
});
