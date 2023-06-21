import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './AdminPanelPage.module.scss';
import { Page } from 'widgets/Page/Page';

export interface IAdminPanelPageProps {
    className?: string;
}

const AdminPanelPage = memo((props: IAdminPanelPageProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <Page className={classNames(cls.AdminPanelPage, {}, [className])}>
            Admin Panel Page
        </Page>
    );
});

export default AdminPanelPage;
