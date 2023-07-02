import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/UI/Text/Text';
import cls from './ArticlesList.module.scss';
import { IArticle } from '../../modal/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { ArticleView } from '../../modal/consts/consts';

interface ArticlesListProps {
    className?: string;
    articles: IArticle[];
    view?: ArticleView;
    isLoading?: boolean;
    //! это атрибут которые передаётся ссылке в самый низ для того что бы она открывалась в новом окне
    target?: HTMLAttributeAnchorTarget;
}

//! в зависимости от view массив скелетонов возвращаемых функцией имеет определённую длинну, специально для страницы статей. он  ждёт когда будет isLoading
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
                {articles
                    ? articles.map((article) => renderArticle(article))
                    : null}
                {isLoading && getSkeletons(view)}
            </div>
        );
    },
);
