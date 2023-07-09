import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotFoundPage.module.scss';
import { Page } from '@/widgets/Page';

interface NotFoundPageProps {
    className?: string;
}

export function NotFoundPage({ className }: NotFoundPageProps) {
    const { t } = useTranslation();
    return (
        <Page className={classNames(cls.NotFoundPage, {}, [className])}>
            {t('Страница не найдена')}
        </Page>
    );
}
