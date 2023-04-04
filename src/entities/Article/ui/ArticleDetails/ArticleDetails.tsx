import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Text, TextAlign, TextSize } from 'shared/UI/Text/ui/Text';
import { useTranslation } from 'react-i18next';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';
import { Avatar } from 'shared/UI/Avatar/Avatar';
import { Icon } from 'shared/UI/Icon/Icon';
import {
    ArticleBlock,
    ArticleBlockType,
} from 'entities/Article/modal/types/article';
import { ArticleDetailsReducer } from '../../modal/slice/ArticleDetailsSlice';
import { fetchArticleById } from '../../modal/services/fetchArticleById';
import cls from './ArticleDetails.module.scss';
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from '../../modal/selectors/getAllArticleDetails';
import EyeIcon from '../../../../shared/assets/icons/eye.svg';
import CalendarIcon from '../../../../shared/assets/icons/calendar.svg';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponents/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

interface ArticleDetailsProps {
    className?: string;
    id: string;
}

const reducers: ReducersList = {
    articleDetails: ArticleDetailsReducer,
};

export const ArticleDetails = memo(({ className, id }: ArticleDetailsProps) => {
    const dispatch = useAppDispatch();

    const { t } = useTranslation('articles');

    const article = useSelector(getArticleDetailsData);
    console.log(article);

    const error = useSelector(getArticleDetailsError);
    const isLoading = useSelector(getArticleDetailsIsLoading);

    useEffect(() => {
        dispatch(fetchArticleById(id));
    }, [dispatch, id]);

    const renderBlock = (block: ArticleBlock) => {
        switch (block.type) {
        case ArticleBlockType.CODE:
            return (
                <ArticleCodeBlockComponent
                    block={block}
                    className={cls.block}
                />
            );
        case ArticleBlockType.IMAGE:
            return (
                <ArticleImageBlockComponent
                    block={block}
                    className={cls.block}
                />
            );
        case ArticleBlockType.TEXT:
            return (
                <ArticleTextBlockComponent
                    block={block}
                    className={cls.block}
                />
            );
        default:
            return null;
        }
    };

    let content;

    if (isLoading) {
        content = (
            <div>
                <Skeleton
                    className={cls.avatar}
                    border="50%"
                    width={200}
                    height={200}
                />
            </div>
        );
    } else if (error) {
        content = (
            <Text
                title={t('Произошла ошибка при подгрузке статьи')}
                align={TextAlign.CENTER}
            />
        );
    } else {
        content = (
            <>
                <div className={cls.avatarWrapper}>
                    <Avatar
                        size={200}
                        className={cls.avatar}
                        src={article?.img}
                    />
                </div>
                <Text
                    className={cls.title}
                    title={article?.title}
                    text={article?.subtitle}
                    size={TextSize.L}
                />
                <div className={cls.articleInfo}>
                    <Icon Svg={EyeIcon} />
                    <Text text={String(article?.views)} />
                </div>
                <div className={cls.articleInfo}>
                    <Icon Svg={CalendarIcon} />
                    <Text text={article?.createdAt} />
                </div>
                {article?.blocks.map((b) => renderBlock(b))}
            </>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames(cls.ArticleDetails, {}, [className])}>
                {content}
            </div>
        </DynamicModuleLoader>
    );
});
