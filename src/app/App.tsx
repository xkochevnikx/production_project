import { classNames } from 'shared/lib/classNames/classNames';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { Suspense, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from 'entities/User';
import { AppRouter } from './router';
import { useTheme } from './providers/lib/useTheme';

function App() {
    // ? хук переключения темы
    const { theme } = useTheme();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    // const [isOpen, setIsOpen] = useState(false);

    // ? suspense это крутилка из коробки для асинхронных чанков
    // ? для класса вызываем функцию в которую передаём основной , в объекте дополниельный и тему в массиве.
    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <Navbar />
                {/* <button onClick={() => setIsOpen(true)}>modal</button> */}

                <div className="content-page">
                    <Sidebar />
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
}

export default App;
