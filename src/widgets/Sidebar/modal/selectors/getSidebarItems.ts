import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import { ISidebarItemType } from '../types/sidebar';
import MainIcon from '../../../../shared/assets/icons/main.svg';
import AboutIcon from '../../../../shared/assets/icons/about.svg';
import ProfileIcon from '../../../../shared/assets/icons/profile.svg';
import ArticlesIcon from '../../../../shared/assets/icons/articles.svg';
import {
    getRouteAbout,
    getRouteArticles,
    getRouteMain,
    getRouteProfile,
} from '@/shared/consts/route';

//! это список ссылок для отрисовки на сайдбаре. в селекторе изолирум логику по его формирвоанию в зависимости от авторизации добавлям приватные ссылки
export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const sidebarItemList: ISidebarItemType[] = [
            {
                path: getRouteMain(),
                Icon: MainIcon,
                text: 'Главная',
            },
            {
                path: getRouteAbout(),
                Icon: AboutIcon,
                text: 'О сайте',
            },
        ];
        if (userData) {
            sidebarItemList.push(
                {
                    //! так же для перехода на нужный профиль переходим на адрес использую данные об активном пользователе
                    path: getRouteProfile(`${userData.id}`),
                    Icon: ProfileIcon,
                    text: 'Профиль',
                    isAuthOnly: true,
                },
                {
                    path: getRouteArticles(),
                    Icon: ArticlesIcon,
                    text: 'Статьи',
                    isAuthOnly: true,
                },
            );
        }

        return sidebarItemList;
    },
);
