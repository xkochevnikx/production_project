import { classNames } from 'shared/lib/classNames/classNames';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInited, userActions } from 'entities/User';
import { AppRouter } from './router';
import { useTheme } from './providers/lib/useTheme';

function App() {
    //! хук переключения темы
    const { theme } = useTheme();

    const inited = useSelector(getUserInited);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    //! suspense это крутилка из коробки для асинхронных чанков. В роуте есть ленивые компоненты подгрузка которых основана на промисе и на время пока компонент можно например показывать лоадер
    //!  для класса вызываем функцию в которую передаём основной , в объекте дополниельный и тему в массиве.
    //! в саспенс оборачиваем всё потому что переводы подгружаются асинхронно в том числе их чанки для отдельных страниц
    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback=''>
                <Navbar />
                <div className='content-page'>
                    <Sidebar />
                    {inited && <AppRouter />}
                </div>
            </Suspense>
        </div>
    );
}

export default App;
