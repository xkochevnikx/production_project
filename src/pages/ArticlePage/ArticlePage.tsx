import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

interface ArticlesPageProps {
    className?: string;
}

export const ArticlesPage = memo(({ className }: ArticlesPageProps) => {
    const { t } = useTranslation('articles');
    return (
        <div className={classNames('', {}, [className])}>
            {t('Страница статей')}
        </div>
    );
});
