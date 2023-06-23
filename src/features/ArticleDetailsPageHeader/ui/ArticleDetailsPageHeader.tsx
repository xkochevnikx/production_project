import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/UI/Button/Button';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useSelector } from 'react-redux';
import { getArticleDetailsData } from 'entities/Article';
import { HStack } from 'shared/UI/Stack/HStack/HStack';
import { getCanEditArticle } from '../modal/selectors/getCanEditArticle';

export const ArticleDetailsPageHeader = memo(() => {
    const navigate = useNavigate();

    //! флаг разрешения на редактирование статьи возвращется из createSelector который проверяет совпадает ли айди автора с айди текущего пользователя
    const canEdit = useSelector(getCanEditArticle);

    const article = useSelector(getArticleDetailsData);
    //! обратно на список
    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles);
    }, [navigate]);
    //! на страницу редактирования если canEdit
    const onEditToList = useCallback(() => {
        navigate(`${RoutePath.articles}/${article?.id}/edit`);
    }, [navigate, article?.id]);

    const { t } = useTranslation('articles');

    return (
        <HStack justify='between' max>
            <Button onClick={onBackToList} theme={ThemeButton.OUTLINE}>
                {t('Назад к списку')}
            </Button>
            {canEdit && (
                <Button onClick={onEditToList} theme={ThemeButton.OUTLINE}>
                    {t('Редактировать')}
                </Button>
            )}
        </HStack>
    );
});
