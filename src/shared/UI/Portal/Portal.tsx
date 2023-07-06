import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: ReactNode;
    element?: HTMLElement;
}

//! конкретно тут портал телепортирует элемент на верхний уровень, это дефолтная логика которую можно пропсами переопределять
export function Portal({ children, element = document.body }: PortalProps) {
    return createPortal(children, element);
}
