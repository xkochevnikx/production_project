import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Page } from 'widgets/Page/Page';
import { useTranslation } from 'react-i18next';

interface ForbiddenPageProps {
    className?: string;
}

export const ForbiddenPage = memo(({ className }: ForbiddenPageProps) => {
    const { t } = useTranslation();
    return (
        <Page className={classNames('', {}, [className])}>
            <h2>{t('У Вас нет прав для доступа к этой странице')}</h2>
        </Page>
    );
});
