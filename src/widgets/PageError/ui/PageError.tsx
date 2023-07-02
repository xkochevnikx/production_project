import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonSize } from '@/shared/UI/Button/Button';
import cls from './PageError.module.scss';

interface PageErrorProps {
    className?: string;
}

export function PageError({ className }: PageErrorProps) {
    const reloadPage = useCallback(() => {
        //! у объекта локэйшн есть функция релоад с помощью которой можно перезагрузить страницу
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    }, []);

    const { t } = useTranslation();
    return (
        <div className={classNames(cls.PageError, {}, [className])}>
            <h2>{t('Произошла непредвиденная ошибка')}</h2>
            <Button size={ButtonSize.XL} onClick={reloadPage}>
                {t('Обновить страницу')}
            </Button>
        </div>
    );
}
