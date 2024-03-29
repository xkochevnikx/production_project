import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { CommentList } from './CommentList';
import { UserRoles } from '@/entities/User';
import { Theme } from '@/shared/consts/theme';

export default {
    title: 'entities/Comment/CommentList',
    component: CommentList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => (
    <CommentList {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    comments: [
        {
            id: '1',
            text: 'qwerty',
            user: {
                avatar: 'https://chudo-prirody.com/uploads/posts/2023-04/1682586022_chudo-prirody-com-p-nerpi-baikalskie-foto-19.jpg',
                id: '1',
                username: 'svyat',
                roles: [UserRoles.ADMIN],
            },
        },
        {
            id: '2',
            text: 'asdfg',
            user: {
                avatar: 'https://chudo-prirody.com/uploads/posts/2023-04/1682586022_chudo-prirody-com-p-nerpi-baikalskie-foto-19.jpg',
                id: '2',
                username: 'sssss',
                roles: [UserRoles.USER],
            },
        },
    ],
};
Primary.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {
    comments: [
        {
            id: '1',
            text: 'qwerty',
            user: {
                avatar: 'https://chudo-prirody.com/uploads/posts/2023-04/1682586022_chudo-prirody-com-p-nerpi-baikalskie-foto-19.jpg',
                id: '1',
                username: 'svyat',
                roles: [UserRoles.ADMIN],
            },
        },
        {
            id: '2',
            text: 'asdfg',
            user: {
                avatar: 'https://chudo-prirody.com/uploads/posts/2023-04/1682586022_chudo-prirody-com-p-nerpi-baikalskie-foto-19.jpg',
                id: '2',
                username: 'sssss',
                roles: [UserRoles.USER],
            },
        },
    ],
};
Dark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];

export const Orange = Template.bind({});
Orange.args = {
    comments: [
        {
            id: '1',
            text: 'qwerty',
            user: {
                avatar: 'https://chudo-prirody.com/uploads/posts/2023-04/1682586022_chudo-prirody-com-p-nerpi-baikalskie-foto-19.jpg',
                id: '1',
                username: 'svyat',
                roles: [UserRoles.ADMIN],
            },
        },
        {
            id: '2',
            text: 'asdfg',
            user: {
                avatar: 'https://chudo-prirody.com/uploads/posts/2023-04/1682586022_chudo-prirody-com-p-nerpi-baikalskie-foto-19.jpg',
                id: '2',
                username: 'sssss',
                roles: [UserRoles.USER],
            },
        },
    ],
};
Orange.decorators = [StoreDecorator({}), ThemeDecorator(Theme.ORANGE)];

export const Loading = Template.bind({});
Loading.args = {
    comments: [
        {
            id: '1',
            text: 'qwerty',
            user: {
                id: '1',
                username: 'svyat',
                roles: [UserRoles.ADMIN],
            },
        },
        {
            id: '2',
            text: 'asdfg',
            user: {
                id: '2',
                username: 'sssss',
                roles: [UserRoles.MANAGER],
            },
        },
    ],

    isLoading: true,
};
Loading.decorators = [StoreDecorator({})];
