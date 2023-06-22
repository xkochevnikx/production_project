import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import withMock from 'storybook-addon-mock';
import { IArticle } from 'entities/Article';
import { ArticleRecommendationsList } from './ArticleRecommendationsList';

const article: IArticle = {
    id: '32',
    title: 'Python news',
    subtitle: 'Что нового в Python за 2022 год?',
    img: 'https://cdn-icons-png.flaticon.com/512/5968/5968350.png',
    views: 1022,
    createdAt: '26.02.2022',
    type: [],
    blocks: [],
    user: { id: ' 1', username: 'svyat' },
};

export default {
    title: 'features/ArticleRecommendationsList',
    component: ArticleRecommendationsList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [withMock], // для мокания возвращаемых сервером данных
} as ComponentMeta<typeof ArticleRecommendationsList>;

const Template: ComponentStory<typeof ArticleRecommendationsList> = () => (
    <ArticleRecommendationsList />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
Normal.parameters = {
    mockData: [
        {
            url: `${__API__}/articles?_limit=3`,
            method: 'GET',
            status: 200,
            response: [
                { ...article, id: '1' },
                { ...article, id: '2' },
                { ...article, id: '3' },
                { ...article, id: '4' },
                { ...article, id: '5' },
            ],
        },
    ],
};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];
