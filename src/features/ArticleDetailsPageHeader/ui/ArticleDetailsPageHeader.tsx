import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/UI/Button/ui/Button';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useSelector } from 'react-redux';
import { getArticleDetailsData } from 'entities/Article';
import { getCanEditArticle } from '../modal/selectors/getCanEditArticle';
import cls from './ArticleDetailsPageHeader.module.scss';

interface ArticleDetailsPageHeaderProps {
    className?: string;
}

export const ArticleDetailsPageHeader = memo(
    ({ className }: ArticleDetailsPageHeaderProps) => {
        const navigate = useNavigate();

        const canEdit = useSelector(getCanEditArticle);

        const article = useSelector(getArticleDetailsData);

        const onBackToList = useCallback(() => {
            navigate(RoutePath.articles);
        }, [navigate]);

        const onEditToList = useCallback(() => {
            navigate(`${RoutePath.articles}/${article?.id}/edit`);
        }, [navigate, article?.id]);

        const { t } = useTranslation('articles');

        return (
            <div
                className={classNames(cls.ArticleDetailsPageHeader, {}, [
                    className,
                ])}
            >
                <Button onClick={onBackToList} theme={ThemeButton.OUTLINE}>
                    {t('Назад к списку')}
                </Button>
                {canEdit && (
                    <Button onClick={onEditToList} theme={ThemeButton.OUTLINE}>
                        {t('Редактировать')}
                    </Button>
                )}
            </div>
        );
    },
);
