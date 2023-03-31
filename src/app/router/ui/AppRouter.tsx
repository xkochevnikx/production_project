import { Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
    AppRouterProps,
    routeConfig,
} from 'shared/config/routeConfig/routeConfig';
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
                                    <div className="page-wrapper">
                                        {route.element}
                                    </div>
                                </RequireAuth>
                            ) : (
                                <div className="page-wrapper">
                                    {route.element}
                                </div>
                            )
                        }
                    />
                ))}
            </Routes>
        </Suspense>
    );
}
