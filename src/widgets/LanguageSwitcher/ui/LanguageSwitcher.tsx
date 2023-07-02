import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ThemeButton } from '../../../shared/UI/Button/Button';

interface LangSwitcherProps {
    className?: string;
}

export const LanguageSwitcher = memo(({ className }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();

    const toggle = useCallback(async () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    }, [i18n]);

    return (
        <Button
            className={classNames('', {}, [className])}
            theme={ThemeButton.CLEAR}
            onClick={toggle}
        >
            {t('RU')}
        </Button>
    );
});
