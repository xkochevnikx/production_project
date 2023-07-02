import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import i18n from '@/shared/config/i18n/i18n';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ThemeButton } from '@/shared/UI/Button/Button';
import { Input } from '@/shared/UI/Input/Input';
import { Text, TextTheme } from '@/shared/UI/Text/Text';
import { VStack } from '@/shared/UI/Stack/VStack/VStack';
import { loginActions, loginReducer } from '../../modal/slice/loginSlice';
import { loginByUserName } from '../../modal/services/loginByUserName/loginByUserName';
import { getLoginUsername } from '../../modal/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../modal/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../modal/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../modal/selectors/getLoginError/getLoginError';

export interface ILoginFormProps {
    className?: string;
    onSuccess: () => void;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: ILoginFormProps) => {
    const dispatch = useAppDispatch();

    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);

    const onChangeUserName = useCallback(
        (value: string) => {
            dispatch(loginActions.setUsername(value));
        },
        [dispatch],
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value));
        },
        [dispatch],
    );

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUserName({ username, password }));
        //! когда запрос выполнен успешно вызываем функцию закрытия модального окна которую спускаем сюда пропсами из навбара
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
        }
    }, [dispatch, username, password, onSuccess]);

    const { t } = useTranslation('loginform');
    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
            <VStack gap="8" align="start">
                <Text title={t('Форма авторизации')} />

                {error && (
                    <Text
                        theme={TextTheme.ERROR}
                        text={i18n.t('Вы ввели неправильные данные')}
                    />
                )}

                <Input
                    onChange={onChangeUserName}
                    type="text"
                    placeholder={t('Введите имя')}
                    value={username}
                />
                <Input
                    onChange={onChangePassword}
                    type="text"
                    placeholder={t('Введите пароль')}
                    value={password}
                />
                <Button
                    disabled={isLoading}
                    onClick={onLoginClick}
                    theme={ThemeButton.OUTLINE}
                >
                    {t('Войти')}
                </Button>
            </VStack>
        </DynamicModuleLoader>
    );
});

export default LoginForm;
