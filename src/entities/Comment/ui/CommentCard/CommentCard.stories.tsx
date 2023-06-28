import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { UserRoles } from 'entities/User/modal/consts/consts';
import { CommentCard } from './CommentCard';

export default {
    title: 'entities/Comment/CommentCard',
    component: CommentCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => (
    <CommentCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    comment: {
        id: '1',
        text: 'qwerty',
        user: {
            avatar: 'https://chudo-prirody.com/uploads/posts/2023-04/1682586022_chudo-prirody-com-p-nerpi-baikalskie-foto-19.jpg',
            id: '1',
            username: 'svyat',
            roles: [UserRoles.ADMIN],
        },
    },
};
Primary.decorators = [StoreDecorator({})];

export const isLoading = Template.bind({});
isLoading.args = {
    isLoading: true,
};

export const isLoadingDark = Template.bind({});
isLoadingDark.args = {
    isLoading: true,
};
isLoadingDark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];

export const isLoadingOrange = Template.bind({});
isLoadingOrange.args = {
    isLoading: true,
};
isLoadingOrange.decorators = [StoreDecorator({}), ThemeDecorator(Theme.ORANGE)];
