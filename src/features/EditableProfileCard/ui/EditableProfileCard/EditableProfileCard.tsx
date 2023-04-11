import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ProfileActions } from 'features/EditableProfileCard/modal/slice/ProfileSlice';
import { Currency } from 'entities/Current';
import { Country } from 'entities/Country';
import { Text, TextTheme } from 'shared/UI/Text/ui/Text';
import { useTranslation } from 'react-i18next';
import { ValidateProfileError } from 'features/EditableProfileCard/modal/types/profile';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useParams } from 'react-router-dom';
import { getProfileValidateErrors } from '../../modal/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { fetchProfileData } from '../../modal/services/fetchProfileData/fetchProfileData';
import { getProfileReadonly } from '../../modal/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileIsLoading } from '../../modal/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileError } from '../../modal/selectors/getProfileError/getProfileError';
import { getProfileForm } from '../../modal/selectors/getProfileForm/getProfileForm';
import { ProfileCard } from '../ProfileCard/ProfileCard';

export const EditableProfileCard = memo(() => {
    const { t } = useTranslation('profile');
    const form = useSelector(getProfileForm);
    const error = useSelector(getProfileError);
    const isLoading = useSelector(getProfileIsLoading);
    const readonly = useSelector(getProfileReadonly);
    const validateErrors = useSelector(getProfileValidateErrors);

    const validateErrorTranslates = {
        [ValidateProfileError.INCORRECT_USER_DATA]: t('Введите имя и фамилию'),
        [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
        [ValidateProfileError.NO_DATA]: t('Данные не указаны'),
        [ValidateProfileError.SERVER_ERROR]: t('Ошибка на сервере'),
    };

    const dispatch = useAppDispatch();

    const { id } = useParams<{ id: string }>();

    useInitialEffect(() => {
        if (id) {
            dispatch(fetchProfileData(id));
        }
    });
    const onChangeFirstname = useCallback(
        (value?: string) => {
            dispatch(ProfileActions.updateProfile({ first: value || '' }));
        },
        [dispatch],
    );

    const onChangeLastname = useCallback(
        (value?: string) => {
            dispatch(ProfileActions.updateProfile({ lastname: value || '' }));
        },
        [dispatch],
    );

    const onChangeAge = useCallback(
        (value?: string) => {
            dispatch(
                ProfileActions.updateProfile({
                    age: Number(value?.replace(/\D/gi, '') || 0),
                }),
            );
        },
        [dispatch],
    );

    const onChangeCity = useCallback(
        (value?: string) => {
            dispatch(ProfileActions.updateProfile({ city: value || '' }));
        },
        [dispatch],
    );

    const onChangeUsername = useCallback(
        (value?: string) => {
            dispatch(ProfileActions.updateProfile({ username: value || '' }));
        },
        [dispatch],
    );

    const onChangeAvatar = useCallback(
        (value?: string) => {
            dispatch(ProfileActions.updateProfile({ avatar: value || '' }));
        },
        [dispatch],
    );

    const onChangeCurrency = useCallback(
        (currency: Currency) => {
            dispatch(ProfileActions.updateProfile({ currency }));
        },
        [dispatch],
    );

    const onChangeCountry = useCallback(
        (country: Country) => {
            dispatch(ProfileActions.updateProfile({ country }));
        },
        [dispatch],
    );
    return (
        <div>
            {validateErrors?.length
                && validateErrors.map((error) => (
                    <Text
                        theme={TextTheme.ERROR}
                        text={validateErrorTranslates[error]}
                        key={error}
                    />
                ))}
            <ProfileCard
                data={form}
                isLoading={isLoading}
                error={error}
                onChangeFirstname={onChangeFirstname}
                onChangeLastname={onChangeLastname}
                onChangeAge={onChangeAge}
                onChangeCity={onChangeCity}
                onChangeUsername={onChangeUsername}
                onChangeAvatar={onChangeAvatar}
                onChangeCurrency={onChangeCurrency}
                onChangeCountry={onChangeCountry}
                readonly={readonly}
            />
        </div>
    );
});
