import { AboutPage } from '@/pages/AboutPage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage';
import { ArticleEditPage } from '@/pages/ArticleEditPage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { UserRoles } from '@/entities/User';
import {
    AppRoutes,
    getRouteAbout,
    getRouteAdminPage,
    getRouteArticleCreate,
    getRouteArticleDetails,
    getRouteArticleEdit,
    getRouteArticles,
    getRouteForbiddenPage,
    getRouteMain,
    getRouteNotFoundPage,
    getRouteProfile,
} from '@/shared/consts/route';
import { AppRouterProps } from '@/shared/types/route';

export const routeConfig: Record<
    AppRoutes,
    AppRouterProps
> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
    },

    [AppRoutes.ABOUT]: {
        path: getRouteAbout(),
        element: <AboutPage />,
    },

    [AppRoutes.PROFILE]: {
        path: getRouteProfile(':id'),
        element: <ProfilePage />,
        authOnly: true,
    },

    [AppRoutes.NOT_FOUND]: {
        path: getRouteNotFoundPage(),
        element: <NotFoundPage />,
    },

    [AppRoutes.ARTICLES]: {
        path: getRouteArticles(),
        element: <ArticlesPage />,
        authOnly: true,
    },

    [AppRoutes.ARTICLE_DETAILS]: {
        path: getRouteArticleDetails(':id'),
        element: <ArticleDetailsPage />,
        authOnly: true,
    },

    [AppRoutes.ARTICLE_EDIT]: {
        path: getRouteArticleEdit(':id'),
        element: <ArticleEditPage />,
        authOnly: true,
    },

    [AppRoutes.ARTICLE_CREATE]: {
        path: getRouteArticleCreate(),
        element: <ArticleEditPage />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_PAGE]: {
        path: getRouteAdminPage(),
        element: <AdminPanelPage />,
        authOnly: true,
        roles: [UserRoles.ADMIN, UserRoles.MANAGER],
    },
    [AppRoutes.FORBIDDEN_PAGE]: {
        path: getRouteForbiddenPage(),
        element: <ForbiddenPage />,
    },
};
