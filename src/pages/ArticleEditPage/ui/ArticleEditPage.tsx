import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page/Page';

export interface IArticleEditPageProps {
    className?: string;
}
//! это пример того как можно испоользовать один и тот же компонент.но лучше делать отдельные страницы
const ArticleEditPage = memo(({ className }: IArticleEditPageProps) => {
    const { id } = useParams<{ id: string }>();

    const { t } = useTranslation();

    const isEdit = Boolean(id);
    return (
        <Page className={classNames('', {}, [className])}>
            {isEdit
                ? t('Редактирование статьи с ID = ') + id
                : t('Создание новой статьи')}
        </Page>
    );
});

export default ArticleEditPage;
