import {
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
import { Overlay } from '../Overlay/Overlay';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

//todo - компонент модального окна принимает состояние функцию закрытия и ноду на отрисовку. модалка изначально имеет ряд стилей, зафиксирована на весь экран, прозрачна и скрыта z index -1. после получения состояния об открытии на неё навештвается дополнительный класс который переопределяет эти стили и портал монтирует этот компонент в боди поверх всего. В себе модалка содержит переиспользуемый компонет подложку с затемненным фоном имеющий индекс меньше контентного поэтому контент лежит поверх подложки которая растянута на всю видимую область экрана. так же на подложку навешиваю функцю закрытия
export function Modal(props: ModalProps) {
    const [isClosing, setIsClosing] = useState(false);

    const timerRef = useRef() as MutableRefObject<
        ReturnType<typeof setTimeout>
    >;

    const { className, children, isOpen, onClose } = props;

    //todo - функция хендлер сначала проверяет передана ли сверху функция закрытия и изменяет локальное состояние которое нужно для навешивания доп класса для анимации по закрытию окна. в момент навешивания класса окно уменьшается, вызывается функция закрытия которая изменяет прокинутый сверху флаг и модалка исчезает возвращая свои дефлтные стили скрывающие её. таймаут сохранён в реф что бы в эффекте при размонтировании очистить его.
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
        [closeHandler]
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
    // function onContentClick(e: React.MouseEvent): void {
    //     e.stopPropagation();
    // }

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
                <Overlay onClick={closeHandler} />

                <div className={cls.content}>{children}</div>
            </div>
        </Portal>
    );
}
