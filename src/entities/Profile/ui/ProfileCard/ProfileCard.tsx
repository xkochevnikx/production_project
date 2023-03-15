import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { getProfileData } from 'entities/Profile/modal/selectors/getProfileData/getProfileData';
import { getProfileError } from 'entities/Profile/modal/selectors/getProfileError/getProfileData';
import { getProfileIsLoading } from 'entities/Profile/modal/selectors/getProfileIsLoading/getProfileIsLoading';
import { Text } from 'shared/UI/Text/ui/Text';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
import { Button, ThemeButton } from 'shared/UI/Button/ui/Button';
import { Input } from 'shared/UI/Input/UI/Input';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string;
}

export const ProfileCard = memo(({ className }: ProfileCardProps) => {
    const translation = useTranslation();
    const data = useSelector(getProfileData);
    const error = useSelector(getProfileError);
    const isLoading = useSelector(getProfileIsLoading);

    return (
        <div className={classNames(cls.ProfileCard, {}, [className])}>
            <div className={cls.header}>
                <Text title={t('Профиль')} />
                <Button theme={ThemeButton.OUTLINE}>
                    {t('Редактировать')}
                </Button>
            </div>
            <div className={cls.data}>
                <Input
                    className={cls.input}
                    value={data?.first}
                    placeholder={t('Ваше имя')}
                />
                <Input
                    className={cls.input}
                    value={data?.lastname}
                    placeholder={t('Ваше фамилия')}
                />
            </div>
        </div>
    );
});
