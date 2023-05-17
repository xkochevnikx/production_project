import { classNames } from 'shared/lib/classNames/classNames';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { Text } from 'shared/UI/Text/ui/Text';
import { useTranslation } from 'react-i18next';
import cls from './ArticlesList.module.scss';
import { ArticleView, IArticle } from '../../modal/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';

interface ArticlesListProps {
    className?: string;
    articles: IArticle[];
    view?: ArticleView;
    isLoading?: boolean;
    target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((_, index) => <ArticleListItemSkeleton key={index} view={view} />);

export const ArticlesList = memo(
    ({
        className,
        articles,
        view = ArticleView.SMALL,
        isLoading,
        target,
    }: ArticlesListProps) => {
        const { t } = useTranslation('articles');

        const renderArticle = (article: IArticle) => (
            <ArticleListItem
                target={target}
                article={article}
                view={view}
                className={cls.card}
                key={article.id}
            />
        );

        if (!isLoading && !articles.length) {
            return (
                <div
                    className={classNames(cls.ArticleList, {}, [
                        className,
                        cls[view],
                    ])}
                >
                    <Text title={t('Статей с такой категорией не найдено')} />
                </div>
            );
        }

        return (
            <div
                className={classNames(cls.ArticleList, {}, [
                    className,
                    cls[view],
                ])}
            >
                {articles.length > 0
                    ? articles.map((article) => renderArticle(article))
                    : null}
                {isLoading && getSkeletons(view)}
            </div>
        );
    },
);
