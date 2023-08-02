import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AdminPanelPage.module.scss';
import { Page } from '@/widgets/Page';

export interface IAdminPanelPageProps {
    className?: string;
}

const AdminPanelPage = memo(
    (props: IAdminPanelPageProps) => {
        const { className } = props;
        const { t } = useTranslation();

        return (
            <Page
                data-testid="AdminPanelPage"
                className={classNames(
                    cls.AdminPanelPage,
                    {},
                    [className],
                )}
            >
                Admin Panel Page
            </Page>
        );
    },
);

export default AdminPanelPage;
