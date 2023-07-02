import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text, TextAlign, TextSize } from '@/shared/UI/Text/Text';
import { Skeleton } from '@/shared/UI/Skeleton/Skeleton';
import { Avatar } from '@/shared/UI/Avatar/Avatar';
import { Icon } from '@/shared/UI/Icon/Icon';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { HStack } from '@/shared/UI/Stack/HStack/HStack';
import { VStack } from '@/shared/UI/Stack/VStack/VStack';
import { renderBlock } from '../../modal/lib/renderBlock/renderBlock';
import { ArticleDetailsReducer } from '../../modal/slice/ArticleDetailsSlice';
import { fetchArticleById } from '../../modal/services/fetchArticleById';
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from '../../modal/selectors/getAllArticleDetails';
import EyeIcon from '../../../../shared/assets/icons/eye.svg';
import CalendarIcon from '../../../../shared/assets/icons/calendar.svg';

interface ArticleDetailsProps {
    id?: string;
}

const reducers: ReducersList = {
    articleDetails: ArticleDetailsReducer,
};

export const ArticleDetails = memo(({ id }: ArticleDetailsProps) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation('articles');

    const article = useSelector(getArticleDetailsData);

    const error = useSelector(getArticleDetailsError);

    const isLoading = useSelector(getArticleDetailsIsLoading);

    useInitialEffect(() => {
        if (id) {
            dispatch(fetchArticleById(id));
        }
    });

    //! тут динамическое содержимое контента на отрисовку. внизу проходимся по блокам статьи и на каждый тип возвращам свой компонент с помощью функции хелпера
    let content;
    if (isLoading) {
        content = (
            <HStack>
                <Skeleton border="50%" width={200} height={200} />
            </HStack>
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
            <VStack gap="16" align="start">
                <HStack max>
                    <Avatar size={200} src={article?.img} />
                </HStack>

                <Text
                    title={article?.title}
                    text={article?.subtitle}
                    size={TextSize.L}
                />
                <HStack gap="8" justify="start">
                    <Icon Svg={EyeIcon} />
                    <Text text={String(article?.views)} />
                </HStack>

                <HStack align="start" gap="8" justify="start">
                    <Icon Svg={CalendarIcon} />
                    <Text text={article?.createdAt} />
                </HStack>

                {article?.blocks.map((b) => renderBlock(b))}
            </VStack>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <VStack gap="8" align="start">
                {content}
            </VStack>
        </DynamicModuleLoader>
    );
});
