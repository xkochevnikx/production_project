import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleDetailsPage.module.scss';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

interface ArticleDetailsPageProps {
    className?: string;
}

export const ArticleDetailsPage = memo(
    ({ className }: ArticleDetailsPageProps) => {
        const { t } = useTranslation('articles');
        return (
            <div
                className={classNames(cls.ArticleDetailsPage, {}, [className])}
            >
                <h1>{t('Детали статьи')}</h1>
            </div>
        );
    }
);
