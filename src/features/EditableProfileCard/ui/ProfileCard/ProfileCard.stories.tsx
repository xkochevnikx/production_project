import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ProfileCard } from './ProfileCard';
import Avatar from '../../../../shared/assets/test/крош.jpg';

export default {
    title: 'feature/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => (
    <ProfileCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    data: {
        username: 'qwe',
        first: 'qwe',
        lastname: 'qwe',
        age: 123,
        city: 'qwer',
        avatar: Avatar,
    },
};

export const Dark = Template.bind({});
Dark.args = {
    data: {
        username: 'qwe',
        first: 'qwe',
        lastname: 'qwe',
        age: 123,
        city: 'qwer',
    },
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Error = Template.bind({});
Error.args = {
    error: 'error',
};

export const Loading = Template.bind({});
Loading.args = {
    isLoading: true,
};
