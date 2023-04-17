import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import {
    ArticleBlockType,
    ArticleView,
    IArticle,
    IArticleTextBlock,
} from 'entities/Article/modal/types/article';
import { Text } from 'shared/UI/Text/ui/Text';
import { Icon } from 'shared/UI/Icon/Icon';
import { Card } from 'shared/UI/Card/Card';
import { Avatar } from 'shared/UI/Avatar/Avatar';
import { Button, ThemeButton } from 'shared/UI/Button/ui/Button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import IconEye from '../../../../shared/assets/icons/eye.svg';
import cls from './ArticleListItem.module.scss';

interface ArticleListItemProps {
    className?: string;
    article: IArticle;
    view: ArticleView;
}

export const ArticleListItem = memo(
    ({ className, article, view }: ArticleListItemProps) => {
        const { t } = useTranslation();

        const navigate = useNavigate();

        const onOpenArticle = useCallback(() => {
            navigate(RoutePath.article_details + article.id);
        }, [navigate, article.id]);

        const types = (
            <Text text={article.type.join(', ')} className={cls.types} />
        );

        const views = (
            <>
                <Text text={String(article.views)} className={cls.views} />
                <Icon Svg={IconEye} />
            </>
        );

        if (view === ArticleView.BIG) {
            const textBlock = article.blocks.find(
                (block) => block.type === ArticleBlockType.TEXT,
            ) as IArticleTextBlock;

            return (
                <div
                    className={classNames(cls.ArticleListItem, {}, [
                        className,
                        cls[view],
                    ])}
                >
                    <Card>
                        <div className={cls.header}>
                            <Avatar size={30} src={article.user.avatar} />
                            <Text
                                text={article.user.username}
                                className={cls.username}
                            />
                            <Text
                                text={article.createdAt}
                                className={cls.data}
                            />
                        </div>
                        <Text text={article.title} className={cls.title} />
                        {types}
                        <img
                            src={article.img}
                            alt={article.title}
                            className={cls.img}
                        />
                        {textBlock && (
                            <ArticleTextBlockComponent
                                block={textBlock}
                                className={cls.textBlock}
                            />
                        )}
                        <div className={cls.footer}>
                            <Button
                                onClick={onOpenArticle}
                                theme={ThemeButton.OUTLINE}
                            >
                                {t('Читать далее')}
                            </Button>
                            {views}
                        </div>
                    </Card>
                </div>
            );
        }

        return (
            <div
                className={classNames(cls.ArticleListItem, {}, [
                    className,
                    cls[view],
                ])}
            >
                <Card onClick={onOpenArticle}>
                    <div className={cls.imageWrapper}>
                        <img
                            src={article.img}
                            alt={article.title}
                            className={cls.img}
                        />
                        <Text text={article.createdAt} className={cls.date} />
                    </div>
                    <div className={cls.infoWrapper}>
                        {types}
                        {views}
                    </div>
                    <Text text={article.title} className={cls.title} />
                </Card>
            </div>
        );
    },
);
