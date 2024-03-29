import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, ThemeButton } from '@/shared/UI/Button';
import { getArticleDetailsData } from '@/entities/Article';
import { HStack } from '@/shared/UI/Stack';
import { getCanEditArticle } from '../modal/selectors/getCanEditArticle';
import {
    getRouteArticleEdit,
    getRouteArticles,
} from '@/shared/consts/route';

export const ArticleDetailsPageHeader = memo(() => {
    const navigate = useNavigate();

    //! флаг разрешения на редактирование статьи возвращется из createSelector который проверяет совпадает ли айди автора с айди текущего пользователя
    const canEdit = useSelector(getCanEditArticle);

    const article = useSelector(getArticleDetailsData);
    //! обратно на список
    const onBackToList = useCallback(() => {
        navigate(getRouteArticles());
    }, [navigate]);
    //! на страницу редактирования если canEdit
    const onEditToList = useCallback(() => {
        navigate(getRouteArticleEdit(`${article?.id}`));
    }, [navigate, article?.id]);

    const { t } = useTranslation('articles');

    return (
        <HStack justify="between" max>
            <Button
                onClick={onBackToList}
                theme={ThemeButton.OUTLINE}
            >
                {t('Назад к списку')}
            </Button>
            {canEdit && (
                <Button
                    onClick={onEditToList}
                    theme={ThemeButton.OUTLINE}
                >
                    {t('Редактировать')}
                </Button>
            )}
        </HStack>
    );
});
