import { Suspense } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Loader } from 'shared/UI/Loader/Loader';
import { Modal } from 'shared/UI/Modal/Modal';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';

interface LoginModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

//! все ленивые компоненты должны быть обёрнуты в саспенс потому что под капотом они на промисах.
//! тут при нажатии на модалку срабатывает функция закрытия но не срабатывает на вложенный в неё компонент так задумано в самом модал
export function LoginModal({ className, isOpen, onClose }: LoginModalProps) {
    return (
        <Modal
            className={classNames('', {}, [className])}
            isOpen={isOpen}
            onClose={onClose}
        >
            <Suspense fallback={<Loader />}>
                <LoginFormAsync onSuccess={onClose} />
            </Suspense>
        </Modal>
    );
}
