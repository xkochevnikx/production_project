import React, {
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
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

    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    const {
        className, children, isOpen, onClose,
    } = props;

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

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }
        return () => {
            clearInterval(timerRef.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    function onContentClick(e: React.MouseEvent): void {
        e.stopPropagation();
    }

    const mods: Record<string, boolean> = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className])}>
                <div className={cls.overlay} onClick={closeHandler}>
                    <div onClick={onContentClick} className={cls.content}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
}
