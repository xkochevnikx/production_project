import { ReactNode } from 'react';
import { classNames, Mode } from 'shared/lib/classNames/classNames';
import { Portal } from '../Portal/Portal';
import cls from './Modal.module.scss';
import { Overlay } from '../Overlay/Overlay';
import { useModal } from 'shared/lib/hooks/useModal/useModal';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

// todo - компонент модального окна принимает состояние функцию закрытия и ноду на отрисовку и передаёт в хук. модалка изначально имеет ряд стилей, зафиксирована на весь экран, прозрачна и скрыта z index -1. после получения состояния об открытии на неё навештвается дополнительный класс который переопределяет эти стили и портал монтирует этот компонент в боди поверх всего. В себе модалка содержит переиспользуемый компонет подложку с затемненным фоном имеющий индекс меньше контентного поэтому контент лежит поверх подложки которая растянута на всю видимую область экрана. так же на подложку навешиваю функцю закрытия. СОСТОЯНИЕ, ФУНКЦИЮ ЗАКРЫТИЯ И ЗАДЕРЖКУ ДЛЯ АНИМАЦИИ ПРИНИМАЕТ СНАЧАЛА ХУК КОТОРЫЙ СОДЕРЖИТ В СЕБЕ ПЕРЕИСПОЛЬЗУЕМУЮ В ДВУХ КОМПОНЕНТАХ ЛОГИКУ И ВОЗВРАЩАЕТ СОСТОЯНИЕ ДЛЯ АНИМАЦИИ ЗАКРЫТИЯ ФУНКЦИЮ ЗАКРЫТИЯ И ТЕКУЩЕЕ СОСТОЯНИЕ.
export function Modal(props: ModalProps) {
    const { className, children, isOpen, onClose } = props;

    const { closeHandler, isClosing, isMounted } = useModal({
        isOpen,
        onClose,
        animationDelay: 300,
    });

    //! поскольку события всплывают с родительсткого элемента, на дочернем отменяем вызов функции закрытия модалки
    // function onContentClick(e: React.MouseEvent): void {
    //     e.stopPropagation();
    // }

    const mods: Mode = {
        [cls.opened]: isMounted,
        [cls.isClosing]: isClosing,
    };

    return (
        <Portal>
            <div
                className={classNames(cls.Modal, mods, [
                    className,
                    'app_modal',
                ])}
            >
                <Overlay onClick={closeHandler} />

                <div className={cls.content}>{children}</div>
            </div>
        </Portal>
    );
}
