import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/UI/Button/ui/Button';
import { Input } from 'shared/UI/Input/UI/Input';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
}

export function LoginForm({ className }: LoginFormProps) {
    const { t } = useTranslation();
    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Input type="text" className={cls.input} placeholder="введите имя" />
            <Input type="text" className={cls.input} placeholder="введите пароль" />
            <Button className={cls.loginBtn}>{t('войти')}</Button>
        </div>
    );
}
