import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Text, TextAlign, TextTheme } from 'shared/UI/Text/ui/Text';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/UI/Input/UI/Input';
import { IProfile } from 'features/EditableProfileCard/modal/types/profile';
import { Loader } from 'shared/UI/Loader/Loader';
import { Avatar } from 'shared/UI/Avatar/Avatar';
import { Currency, CurrencySelect } from 'entities/Current';
import { Country, CountrySelect } from 'entities/Country';
import cls from './ProfileCard.module.scss';

interface IProfileCardProps {
    className?: string;
    data?: IProfile;
    isLoading?: boolean;
    error?: string;
    readonly?: boolean;
    onChangeFirstname?: (value: string) => void;
    onChangeLastname?: (value: string) => void;
    onChangeAge?: (value: string) => void;
    onChangeCity?: (value: string) => void;
    onChangeAvatar?: (value: string) => void;
    onChangeUsername?: (value: string) => void;
    onChangeCurrency?: (currency: Currency) => void;
    onChangeCountry?: (country: Country) => void;
}

export const ProfileCard = memo((props: IProfileCardProps) => {
    const {
        className,
        data,
        isLoading,
        error,
        readonly,
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeAvatar,
        onChangeUsername,
        onChangeCountry,
        onChangeCurrency,
    } = props;

    const { t } = useTranslation();

    if (isLoading) {
        return (
            <div
                className={classNames(cls.ProfileCard, {}, [
                    className,
                    cls.loading,
                ])}
            >
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div
                className={classNames(cls.ProfileCard, {}, [
                    className,
                    cls.error,
                ])}
            >
                <Text
                    theme={TextTheme.ERROR}
                    title={t('Произошла ошибка')}
                    text={t('Попробуйте перезагрузить страницу')}
                    align={TextAlign.CENTER}
                />
            </div>
        );
    }

    const mods = {
        [cls.editing]: !readonly,
    };

    return (
        <div className={classNames(cls.ProfileCard, mods, [className])}>
            {data?.avatar && (
                <div className={cls.avatarWrapper}>
                    <Avatar src={data?.avatar} />
                </div>
            )}

            <Input
                onChange={onChangeFirstname}
                className={cls.input}
                value={data?.first}
                placeholder={t('Ваше имя')}
                readonly={readonly}
            />

            <Input
                onChange={onChangeLastname}
                className={cls.input}
                value={data?.lastname}
                placeholder={t('Ваше фамилия')}
                readonly={readonly}
            />

            <Input
                onChange={onChangeAge}
                className={cls.input}
                value={data?.age}
                placeholder={t('Ваш возраст')}
                readonly={readonly}
            />

            <Input
                onChange={onChangeCity}
                className={cls.input}
                value={data?.city}
                placeholder={t('Ваш город')}
                readonly={readonly}
            />

            <Input
                onChange={onChangeUsername}
                className={cls.input}
                value={data?.username}
                placeholder={t('введите ник')}
                readonly={readonly}
            />

            <Input
                onChange={onChangeAvatar}
                className={cls.input}
                value={data?.avatar}
                placeholder={t('введите ссылку на аватар')}
                readonly={readonly}
            />

            <CurrencySelect
                className={cls.input}
                value={data?.currency}
                onChange={onChangeCurrency}
                readonly={readonly}
            />

            <CountrySelect
                className={cls.input}
                value={data?.country}
                onChange={onChangeCountry}
                readonly={readonly}
            />
        </div>
    );
});
