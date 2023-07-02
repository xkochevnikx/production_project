import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextAlign, TextTheme } from '@/shared/UI/Text/Text';
import { Input } from '@/shared/UI/Input/Input';
import { Loader } from '@/shared/UI/Loader/Loader';
import { Avatar } from '@/shared/UI/Avatar/Avatar';
import { Currency, CurrencySelect } from '@/entities/Current';
import { Country, CountrySelect } from '@/entities/Country';
import { VStack } from '@/shared/UI/Stack/VStack/VStack';
import { HStack } from '@/shared/UI/Stack/HStack/HStack';
import { IProfile } from '@/features/EditableProfileCard';
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

    const { t } = useTranslation('profile');

    if (isLoading) {
        return (
            <HStack
                justify="center"
                max
                className={classNames(cls.ProfileCard, {}, [
                    className,
                    cls.loading,
                ])}
            >
                <Loader />
            </HStack>
        );
    }

    if (error) {
        return (
            <HStack
                justify="center"
                max
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
            </HStack>
        );
    }

    const mods = {
        [cls.editing]: !readonly,
    };

    // todo - на первых двух инпутах тестовые айди для тестирования отработки валидационых ошибок в компоненте editableProfileCard
    return (
        <VStack
            gap="8"
            max
            align="start"
            className={classNames(cls.ProfileCard, mods, [className])}
        >
            {data?.avatar && (
                <HStack justify="center" className={cls.avatarWrapper}>
                    <Avatar src={data?.avatar} />
                </HStack>
            )}

            <Input
                onChange={onChangeFirstname}
                className={cls.input}
                value={data?.first}
                placeholder={t('Ваше имя_')}
                readonly={readonly}
                data-testid="ProfileCard.firstname"
            />

            <Input
                onChange={onChangeLastname}
                className={cls.input}
                value={data?.lastname}
                placeholder={t('Ваше фамилия_')}
                readonly={readonly}
                data-testid="ProfileCard.lastname"
            />

            <Input
                onChange={onChangeAge}
                className={cls.input}
                value={data?.age}
                placeholder={t('Ваш возраст_')}
                readonly={readonly}
            />

            <Input
                onChange={onChangeCity}
                className={cls.input}
                value={data?.city}
                placeholder={t('Ваш город_')}
                readonly={readonly}
            />

            <Input
                onChange={onChangeUsername}
                className={cls.input}
                value={data?.username}
                placeholder={t('Введите логин_')}
                readonly={readonly}
            />

            <Input
                onChange={onChangeAvatar}
                className={cls.input}
                value={data?.avatar}
                placeholder={t('Введите ссылку на аватар_')}
                readonly={readonly}
            />
            <HStack gap="8">
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
            </HStack>
        </VStack>
    );
});
