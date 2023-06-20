import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { t } from 'i18next';
import { Page } from 'widgets/Page/Page';

interface ForbiddenPageProps {
    className?: string;
}

export const ForbiddenPage = memo(({ className }: ForbiddenPageProps) => {
    return (
        <Page className={classNames('', {}, [className])}>
            {t('У Вас нет прав')}
        </Page>
    );
});
