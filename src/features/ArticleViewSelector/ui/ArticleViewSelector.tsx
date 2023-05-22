import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { ArticleView } from 'entities/Article';
import { Button, ThemeButton } from 'shared/UI/Button/ui/Button';
import { Icon } from 'shared/UI/Icon/Icon';
import tiledIcon from '../../../shared/assets/icons/articlesSwitcher1.svg';
import listIcon from '../../../shared/assets/icons/articlesSwitcher2.svg';
import cls from './ArticleViewSelector.module.scss';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { articlesPageActions } from 'pages/ArticlePage';

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView;
    debounce: () => void;
}

const viewTypes = [
    {
        view: ArticleView.SMALL,
        icon: tiledIcon,
    },
    {
        view: ArticleView.BIG,
        icon: listIcon,
    },
];

export const ArticleViewSelector = memo(
    ({ className, view, debounce }: ArticleViewSelectorProps) => {
        const dispatch = useAppDispatch();

        const onChangeView = useCallback(
            (view: ArticleView) => {
                dispatch(articlesPageActions.setView(view));
                dispatch(articlesPageActions.setPage(1));
                debounce();
            },
            [dispatch, debounce]
        );

        return (
            <div className={cls.ArticleViewSelector}>
                {viewTypes.map((viewItem) => (
                    <Button
                        key={viewItem.view}
                        onClick={() => onChangeView(viewItem.view)}
                        theme={ThemeButton.CLEAR}
                    >
                        <Icon
                            Svg={viewItem.icon}
                            className={classNames(
                                '',
                                { [cls.notSelected]: viewItem.view !== view },
                                [className]
                            )}
                        />
                    </Button>
                ))}
            </div>
        );
    }
);
