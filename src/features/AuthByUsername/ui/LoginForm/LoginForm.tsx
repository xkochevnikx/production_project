import { getLoginState } from 'features/AuthByUsername/modal/selectors/getLoginState/getLoginState';
import { loginByUserName } from 'features/AuthByUsername/modal/services/loginByUserName/loginByUserName';
import { loginActions } from 'features/AuthByUsername/modal/slice/loginSlice';
import { memo, Suspense, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import i18n from 'shared/config/i18n/i18n';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/UI/Button/ui/Button';
import { Input } from 'shared/UI/Input/UI/Input';
import { Text, TextTheme } from 'shared/UI/Text/ui/Text';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = memo(({ className }: LoginFormProps) => {
    const dispatch = useDispatch();

    const {
        username, password, error, isLoading,
    } = useSelector(getLoginState);

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

    const onLoginClick = useCallback(() => {
        dispatch(loginByUserName({ username, password }));
    }, [dispatch, username, password]);

    const { t } = useTranslation();
    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Text title={t('форма авторизации')} />

            {error && (
                <Text theme={TextTheme.ERROR} text={i18n.t('Вы ввели неправильные данные')} />
            )}

            <Input
                onChange={onChangeUserName}
                type="text"
                className={cls.input}
                placeholder="введите имя"
                value={username}
            />
            <Input
                onChange={onChangePassword}
                type="text"
                className={cls.input}
                placeholder="введите пароль"
                value={password}
            />
            <Button
                disabled={isLoading}
                onClick={onLoginClick}
                theme={ThemeButton.OUTLINE}
                className={cls.loginBtn}
            >
                {t('войти')}
            </Button>
        </div>
    );
});
