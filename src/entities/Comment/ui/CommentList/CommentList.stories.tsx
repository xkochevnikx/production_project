import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { UserRoles } from 'entities/User';
import { CommentList } from './CommentList';

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
                roles: [UserRoles.USER],
            },
        },
    ],
};
Primary.decorators = [StoreDecorator({})];

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
