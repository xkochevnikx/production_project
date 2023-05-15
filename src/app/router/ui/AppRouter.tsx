import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'widgets/PageLoader';
import { RequireAuth } from './RequireAuth';

export function AppRouter() {
    // const renderWithWrapper = useCallback((route: AppRouterProps) => {
    //     const element = (
    //         <Suspense fallback={<PageLoader />}>
    //             <div className='page-wrapper'>{route.element}</div>
    //         </Suspense>
    //     );
    //     return (
    //         <Route
    //             key={route.path}
    //             path={route.path}
    //             element={
    //                 route.authOnly ? (
    //                     <RequireAuth>{element}</RequireAuth>
    //                 ) : (
    //                     element
    //                 )
    //             }
    //         />
    //     );
    // }, []);

    // return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
    //! тут саспенс потому что среди путей есть ленивые компоненты которые надо оборачивать. что происходит - в роутконфиге лежит объект в котором а каждом ключе (адресе роута) лежит объект с ключами в котором указан путь и отрисовываемый по этому пути элемент. Достаем значения объектов и на каждый объект создаём роут. Если в каком либо из значений объектов есть поле authOnly то есть он должен  доступен только зарегистрированным пользователям, помешаем этот компонет в функцию которая проверяет если авторизован ли пользователь. Если он авторизован функция возращает этот путь и он становиться доступен,  если нет то при переходе на этот адрес будет редирект на главную. Если поля authOnly нет то просто создаётся  путь
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {Object.values(routeConfig).map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={
                            route.authOnly ? (
                                <RequireAuth>
                                    <>{route.element}</>
                                </RequireAuth>
                            ) : (
                                <>{route.element}</>
                            )
                        }
                    />
                ))}
            </Routes>
        </Suspense>
    );
}
