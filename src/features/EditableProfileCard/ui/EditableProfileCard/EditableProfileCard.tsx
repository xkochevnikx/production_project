import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Currency } from '@/entities/Current';
import { Country } from '@/entities/Country';
import { Text, TextTheme } from '@/shared/UI/Text';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { VStack } from '@/shared/UI/Stack';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ProfileCard } from '@/entities/ProfileCard';
import { ProfileActions, ProfileReducer } from '../../modal/slice/ProfileSlice';
import { getProfileValidateErrors } from '../../modal/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { fetchProfileData } from '../../modal/services/fetchProfileData/fetchProfileData';
import { getProfileReadonly } from '../../modal/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileIsLoading } from '../../modal/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileError } from '../../modal/selectors/getProfileError/getProfileError';
import { getProfileForm } from '../../modal/selectors/getProfileForm/getProfileForm';
import { ProfilePageHeader } from '../ProfilePageHeader/ProfilePageHeader';
import { ValidateProfileError } from '../../modal/consts/consts';

interface IEditableProfileProps {
    id?: string;
}

export const EditableProfileCard = memo((props: IEditableProfileProps) => {
    const { id } = props;

    const { t } = useTranslation('profile');

    const reducers: ReducersList = {
        profile: ProfileReducer,
    };
    //! на отрисовку идут данные из поля форм
    const form = useSelector(getProfileForm);
    const error = useSelector(getProfileError);
    const isLoading = useSelector(getProfileIsLoading);
    //! прокидываем в карточку редонли и далее в инпутах навешиваем класс по условию.
    const readonly = useSelector(getProfileReadonly);
    //! при обновлении фанк может вернуть ошибку из фунгкции валидации, массив этих ошибок помещаем в стейт и тут над карточкой отрисовывам
    const validateErrors = useSelector(getProfileValidateErrors);

    const validateErrorTranslates = {
        [ValidateProfileError.INCORRECT_USER_DATA]: t('Введите имя и фамилию'),
        [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
        [ValidateProfileError.NO_DATA]: t('Данные не указаны'),
        [ValidateProfileError.SERVER_ERROR]: t('Ошибка на сервере'),
    };

    const dispatch = useAppDispatch();

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

    // todo - для тестирования того что в случае  ошибки отрисовывается компоент текст вешаю на него дататестайди
    return (
        <DynamicModuleLoader reducers={reducers}>
            <VStack max gap="16">
                <ProfilePageHeader />
                {validateErrors?.length
                    && validateErrors.map((error) => (
                        <Text
                            theme={TextTheme.ERROR}
                            text={validateErrorTranslates[error]}
                            key={error}
                            data-testid="EditableProfileCard.Error"
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
            </VStack>
        </DynamicModuleLoader>
    );
});
