import { useEffect, useState } from 'react';

// todo - кастомный хук определяющий устройство пользователя и возвращающий флаг для условного рендеринга. это альтернатива библиотеке react-device-detected

export const useDevice = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.matchMedia('(pointer:coarse)').matches);

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize); // удаляем обработчик
    }, []);

    return isMobile;
};
