import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { AppRouter } from './AppRouter';
import {
    getRouteAbout,
    getRouteAdminPage,
    getRouteProfile,
} from '@/shared/consts/route';

describe('AppRouter', () => {
    test('рендер страницы', async () => {
        componentRender(<AppRouter />, {
            route: getRouteAbout(),
        });

        const page = await screen.findByTestId('AboutPage');
        expect(page).toBeInTheDocument();
    });

    test('Страница не найдена', async () => {
        componentRender(<AppRouter />, {
            route: '/qwerty',
        });

        const page = await screen.findByTestId(
            'NotFoundPage',
        );
        expect(page).toBeInTheDocument();
    });

    test('редирет неавторизованного пользователя на мэйн', async () => {
        componentRender(<AppRouter />, {
            route: getRouteProfile('1'),
        });
        const page = await screen.findByTestId('MainPage');
        expect(page).toBeInTheDocument();
    });

    // test('доступ авторизованного пользователя к профилю', async () => {
    //     componentRender(<AppRouter />, {
    //         route: getRouteProfile('1'),
    //         initialState: {
    //             user: {
    //                 _inited: true,
    //                 authData: {},
    //             },
    //         },
    //     });
    //     const page = await screen.findByTestId(
    //         'ProfilePage'
    //     );
    //     expect(page).toBeInTheDocument();
    // });

    test('доступ запрещен (отстутсвует роль)', async () => {
        componentRender(<AppRouter />, {
            route: getRouteAdminPage(),
            initialState: {
                user: {
                    _inited: true,
                    authData: {},
                },
            },
        });
        const page = await screen.findByTestId(
            'ForbiddenPage',
        );
        expect(page).toBeInTheDocument();
    });

    // test('доступ разрешен админу', async () => {
    //     componentRender(<AppRouter />, {
    //         route: getRouteAdminPage(),
    //         initialState: {
    //             user: {
    //                 _inited: true,
    //                 authData: { roles: [UserRoles.ADMIN] },
    //             },
    //         },
    //     });
    //     const page = await waitFor(() => {
    //         screen.findByTestId('AdminPanelPage');
    //     });
    //     await waitFor(() => {
    //         expect(page).toBeInTheDocument();
    //     });
    // });
});
