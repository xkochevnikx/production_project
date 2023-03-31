import React from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import MainIcon from '../../../shared/assets/icons/main.svg';
import AboutIcon from '../../../shared/assets/icons/about.svg';
import ProfileIcon from '../../../shared/assets/icons/profile.svg';
import ArticlesIcon from '../../../shared/assets/icons/articles.svg';

export interface ISidebarItemType {
    path: string;
    text: string;
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
    isAuthOnly?: boolean;
}

export const SidebarItemList: ISidebarItemType[] = [
    {
        path: RoutePath.main,
        Icon: MainIcon,
        text: 'Главная',
    },
    {
        path: RoutePath.about,
        Icon: AboutIcon,
        text: 'О сайте',
    },
    {
        path: RoutePath.profile,
        Icon: ProfileIcon,
        text: 'Профиль',
        isAuthOnly: true,
    },
    {
        path: RoutePath.articles,
        Icon: ArticlesIcon,
        text: 'Статьи',
        isAuthOnly: true,
    },
];
