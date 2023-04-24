import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { ArticleView } from 'entities/Article';
import { Button, ThemeButton } from 'shared/UI/Button/ui/Button';
import { Icon } from 'shared/UI/Icon/Icon';
import tiledIcon from '../../../shared/assets/icons/articlesSwitcher1.svg';
import listIcon from '../../../shared/assets/icons/articlesSwitcher2.svg';
import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView;
    onViewClick?: (view: ArticleView) => void;
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
    ({ className, view, onViewClick }: ArticleViewSelectorProps) => {
        const onClick = (newView: ArticleView) => () => onViewClick?.(newView);

        return (
            <div className={cls.ArticleViewSelector}>
                {viewTypes.map((viewItem) => (
                    <Button
                        key={viewItem.view}
                        onClick={onClick(viewItem.view)}
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
