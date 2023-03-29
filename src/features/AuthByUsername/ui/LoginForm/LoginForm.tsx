import { getLoginError } from 'features/AuthByUsername/modal/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from 'features/AuthByUsername/modal/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginPassword } from 'features/AuthByUsername/modal/selectors/getLoginPassword/getLoginPassword';
import { getLoginUsername } from 'features/AuthByUsername/modal/selectors/getLoginUsername/getLoginUsername';
import { loginByUserName } from 'features/AuthByUsername/modal/services/loginByUserName/loginByUserName';
import {
    loginActions,
    loginReducer,
} from 'features/AuthByUsername/modal/slice/loginSlice';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import i18n from 'shared/config/i18n/i18n';
import { classNames } from 'shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ThemeButton } from 'shared/UI/Button/ui/Button';
import { Input } from 'shared/UI/Input/UI/Input';
import { Text, TextTheme } from 'shared/UI/Text/ui/Text';
import cls from './LoginForm.module.scss';

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
        [dispatch]
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value));
        },
        [dispatch]
    );

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUserName({ username, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
        }
    }, [dispatch, username, password, onSuccess]);

    const { t } = useTranslation('loginform');
    return (
        <DynamicModuleLoader
            name='loginForm'
            reducers={initialReducers}
            removeAfterUnmount
        >
            <div className={classNames(cls.LoginForm, {}, [className])}>
                <Text title={t('Форма авторизации')} />

                {error && (
                    <Text
                        theme={TextTheme.ERROR}
                        text={i18n.t('Вы ввели неправильные данные')}
                    />
                )}

                <Input
                    onChange={onChangeUserName}
                    type='text'
                    className={cls.input}
                    placeholder={t('Введите имя')}
                    value={username}
                />
                <Input
                    onChange={onChangePassword}
                    type='text'
                    className={cls.input}
                    placeholder={t('Введите пароль')}
                    value={password}
                />
                <Button
                    disabled={isLoading}
                    onClick={onLoginClick}
                    theme={ThemeButton.OUTLINE}
                    className={cls.loginBtn}
                >
                    {t('Войти')}
                </Button>
            </div>
        </DynamicModuleLoader>
    );
});

export default LoginForm;
