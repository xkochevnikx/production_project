import React, {
    MutableRefObject,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { classNames, Mode } from 'shared/lib/classNames/classNames';
import { Portal } from '../Portal/Portal';
import cls from './Modal.module.scss';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

export function Modal(props: ModalProps) {
    const [isClosing, setIsClosing] = useState(false);

    const timerRef = useRef() as MutableRefObject<
        ReturnType<typeof setTimeout>
    >;

    const {
        className, children, isOpen, onClose,
    } = props;

    //! логика открытия такая - модалка скрыта и вызывается в набаре и у неё есть уже ряд стилей, в том числе контентная часть маленькая.Когда навешиваем спускаемый сверху isOpen оно появляется из потрала и у контентной части становиться больше размер при этом есть задержка в анимации для плавности. После нажатия на любую часть кроме контентной срабатывает функция закрытия и сначала идёт проверка если эту функцию закрытия передали (она в конце возвращает модалку к первоначальным стилям когда она скрыта), дальше при помощи локального стейте мы навешиваем дополнительный класс, который делает плавным закрытие контентной части уменьшая её размер. Дальше через 300мс меняем основные стили на первоначальные и убираем класс закрытия контентой части потому что он уже не нужен окно скрыто. Ниже в юзэффекте очищаем таймер
    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, 300);
        }
    }, [onClose]);

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeHandler();
            }
        },
        [closeHandler],
    );
    //! если модалка открыта, флаг передан, на глобальное окно навешиваем слушатель событий который будет запускать функцию которая проверяем если нажали escape то вызываем функцию закрытия модалки и в конце очищаем таймер и очищаем событие
    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }
        return () => {
            clearInterval(timerRef.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    //! поскольку события всплывают с родительсткого элемента, на дочернем отменяем вызов функции закрытия модалки
    function onContentClick(e: React.MouseEvent): void {
        e.stopPropagation();
    }

    const mods: Mode = {
        [cls.opened]: isOpen,
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
                <div className={cls.overlay} onClick={closeHandler}>
                    <div onClick={onContentClick} className={cls.content}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
}
