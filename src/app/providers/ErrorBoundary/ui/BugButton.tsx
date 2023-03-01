import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/UI/Button/ui/Button';

//! это учебный компонент для тестирования ErrorBoundary
export function BugButton() {
    const { t } = useTranslation();
    const [error, setError] = useState(false);

    function toThrow() {
        setError(true);
    }

    useEffect(() => {
        if (error) {
            throw new Error();
        }
    }, [error]);
    return <Button onClick={toThrow}>{t('Прокинуть ошибку')}</Button>;
}
