import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/UI/Text';
import { Icon } from '@/shared/UI/Icon';
import { Card } from '@/shared/UI/Card';
import { Avatar } from '@/shared/UI/Avatar';
import { Button, ThemeButton } from '@/shared/UI/Button';
import { AppLink } from '@/shared/UI/AppLink';
import { HStack, VStack } from '@/shared/UI/Stack';

import {
    ArticleBlockType,
    ArticleView,
} from '../../modal/consts/consts';
import {
    IArticle,
    IArticleTextBlock,
} from '../../modal/types/article';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import IconEye from '../../../../shared/assets/icons/eye.svg';
import cls from './ArticleListItem.module.scss';
import { getRouteArticleDetails } from '@/shared/consts/route';

interface ArticleListItemProps {
    className?: string;
    article: IArticle;
    view: ArticleView;
    target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo(
    ({
        className,
        article,
        view,
        target,
    }: ArticleListItemProps) => {
        const { t } = useTranslation();

        //! элементы на отрисовку вынесли в переиспользуемые для удобства потому что повторяются в обеих видах карточки
        const types = (
            <Text
                text={article.type.join(', ')}
                className={cls.types}
            />
        );
        const views = (
            <>
                <Text
                    text={String(article.views)}
                    className={cls.views}
                />
                <Icon Svg={IconEye} />
            </>
        );

        if (view === ArticleView.BIG) {
            const textBlock = article.blocks.find(
                (block) =>
                    block.type === ArticleBlockType.TEXT
            ) as IArticleTextBlock;

            return (
                <div
                    className={classNames(
                        cls.ArticleListItem,
                        {},
                        [className, cls[view]]
                    )}
                >
                    <Card>
                        <HStack align="center">
                            <Avatar
                                size={30}
                                src={article.user.avatar}
                            />
                            <Text
                                text={article.user.username}
                                className={cls.username}
                            />
                            <Text
                                text={article.createdAt}
                                className={cls.data}
                            />
                        </HStack>

                        <Text
                            text={article.title}
                            className={cls.title}
                        />
                        {types}
                        <img
                            src={article.img}
                            alt={article.title}
                            className={cls.img}
                        />
                        <VStack gap="16" align="start">
                            {textBlock && (
                                <ArticleTextBlockComponent
                                    block={textBlock}
                                    className={
                                        cls.textBlock
                                    }
                                />
                            )}
                            <HStack
                                align="center"
                                justify="between"
                                max
                            >
                                <AppLink
                                    target={target}
                                    to={getRouteArticleDetails(
                                        `${article.id}`
                                    )}
                                >
                                    <Button
                                        theme={
                                            ThemeButton.OUTLINE
                                        }
                                    >
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
                to={getRouteArticleDetails(`${article.id}`)}
                className={classNames(
                    cls.ArticleListItem,
                    {},
                    [className, cls[view]]
                )}
            >
                <Card>
                    <div className={cls.imageWrapper}>
                        <img
                            src={article.img}
                            alt={article.title}
                            className={cls.img}
                        />
                        <Text
                            text={article.createdAt}
                            className={cls.date}
                        />
                    </div>
                    <div className={cls.infoWrapper}>
                        {types}
                        {views}
                    </div>
                    <Text
                        text={article.title}
                        className={cls.title}
                    />
                </Card>
            </AppLink>
        );
    }
);
