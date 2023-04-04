import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
    className?: string;
}

export const ArticleDetailsPage = memo(
    ({ className }: ArticleDetailsPageProps) => {
        const { id } = useParams<{ id: string }>();

        const { t } = useTranslation('articles');

        if (!id) {
            return (
                <div
                    className={classNames(cls.ArticleDetailsPage, {}, [
                        className,
                    ])}
                >
                    <h1>{t('Статья не найдена')}</h1>
                </div>
            );
        }
        return (
            <div
                className={classNames(cls.ArticleDetailsPage, {}, [className])}
            >
                <h1>{t('Детали статьи')}</h1>
                <ArticleDetails id={id} />
            </div>
        );
    },
);
