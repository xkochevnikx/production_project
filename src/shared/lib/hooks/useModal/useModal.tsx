import {
    MutableRefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';

interface useModalProps {
    onClose?: () => void;
    isOpen?: boolean;
    animationDelay?: number;
}

/**
 * Переиспользуемый хук для модальных компонентов (drawer/modal)
 * @param animationDelay
 * @param isOpen
 * @param onClose
 */

export function useModal({
    onClose,
    isOpen,
    animationDelay = 300,
}: useModalProps) {
    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    const timerRef = useRef() as MutableRefObject<
        ReturnType<typeof setTimeout>
    >;
    // todo - функция хендлер сначала проверяет передана ли сверху функция закрытия и изменяет локальное состояние которое нужно для навешивания доп класса для анимации по закрытию окна. в момент навешивания класса окно уменьшается, вызывается функция закрытия которая изменяет прокинутый сверху флаг и модалка исчезает возвращая свои дефлтные стили скрывающие её. таймаут сохранён в реф что бы в эффекте при размонтировании очистить его.
    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, animationDelay);
        }
    }, [onClose, animationDelay]);

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

    return { isMounted, isClosing, closeHandler };
}
