import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
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
            },
        },
        {
            id: '2',
            text: 'asdfg',
            user: {
                id: '2',
                username: 'sssss',
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
            },
        },
        {
            id: '2',
            text: 'asdfg',
            user: {
                id: '2',
                username: 'sssss',
            },
        },
    ],

    isLoading: true,
};
Loading.decorators = [StoreDecorator({})];
