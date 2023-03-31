import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticlePage.module.scss';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

interface ArticlesPageProps {
    className?: string;
}

export const ArticlesPage = memo(({ className }: ArticlesPageProps) => {
    const { t } = useTranslation('articles');
    return (
        <div className={classNames(cls.ArticlesPage, {}, [className])}>
            <h1>{t('Статьи')}</h1>
        </div>
    );
});
