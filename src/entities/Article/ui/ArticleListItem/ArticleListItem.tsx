import { classNames } from 'shared/lib/classNames/classNames';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { Text } from 'shared/UI/Text/Text';
import { Icon } from 'shared/UI/Icon/Icon';
import { Card } from 'shared/UI/Card/Card';
import { Avatar } from 'shared/UI/Avatar/Avatar';
import { Button, ThemeButton } from 'shared/UI/Button/Button';
import { useTranslation } from 'react-i18next';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { AppLink } from 'shared/UI/AppLink/AppLink';
import { HStack } from 'shared/UI/Stack/HStack/HStack';
import { VStack } from 'shared/UI/Stack/VStack/VStack';
import {
    ArticleBlockType,
    ArticleView,
} from 'entities/Article/modal/consts/consts';
import { IArticle, IArticleTextBlock } from '../../modal/types/article';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import IconEye from '../../../../shared/assets/icons/eye.svg';
import cls from './ArticleListItem.module.scss';

interface ArticleListItemProps {
    className?: string;
    article: IArticle;
    view: ArticleView;
    target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo(
    ({ className, article, view, target }: ArticleListItemProps) => {
        const { t } = useTranslation();

        //! элементы на отрисовку вынесли в переиспользуемые для убобства потому что повторяются в обеих видах карточки
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
                (block) => block.type === ArticleBlockType.TEXT
            ) as IArticleTextBlock;

            return (
                <div
                    className={classNames(cls.ArticleListItem, {}, [
                        className,
                        cls[view],
                    ])}
                >
                    <Card>
                        <HStack align='center'>
                            <Avatar size={30} src={article.user.avatar} />
                            <Text
                                text={article.user.username}
                                className={cls.username}
                            />
                            <Text
                                text={article.createdAt}
                                className={cls.data}
                            />
                        </HStack>

                        <Text text={article.title} className={cls.title} />
                        {types}
                        <img
                            src={article.img}
                            alt={article.title}
                            className={cls.img}
                        />
                        <VStack gap='16' align='start'>
                            {textBlock && (
                                <ArticleTextBlockComponent
                                    block={textBlock}
                                    className={cls.textBlock}
                                />
                            )}
                            <HStack align='center' justify='between' max>
                                <AppLink
                                    target={target}
                                    to={RoutePath.article_details + article.id}
                                >
                                    <Button theme={ThemeButton.OUTLINE}>
                                        {t('Читать далее')}
                                    </Button>
                                </AppLink>
                                {views}
                            </HStack>
                        </VStack>
                    </Card>
                </div>
            );
        }

        return (
            <AppLink
                target={target}
                to={RoutePath.article_details + article.id}
                className={classNames(cls.ArticleListItem, {}, [
                    className,
                    cls[view],
                ])}
            >
                <Card>
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
            </AppLink>
        );
    }
);
