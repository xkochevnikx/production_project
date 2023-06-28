import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { ProfileCard } from './ProfileCard';
import AvatarImg from '../../../shared/assets/test/крош.jpg';

export default {
    title: 'entities/ProfileCard',
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
        avatar: AvatarImg,
    },
};

export const PrimaryReadonly = Template.bind({});
PrimaryReadonly.args = {
    readonly: true,
    data: {
        username: 'qwe',
        first: 'qwe',
        lastname: 'qwe',
        age: 123,
        city: 'qwer',
        avatar: AvatarImg,
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
        avatar: AvatarImg,
    },
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Orange = Template.bind({});
Orange.args = {
    data: {
        username: 'qwe',
        first: 'qwe',
        lastname: 'qwe',
        age: 123,
        city: 'qwer',
        avatar: AvatarImg,
    },
};
Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

export const Error = Template.bind({});
Error.args = {
    error: 'error',
};

export const isLoading = Template.bind({});
isLoading.args = {
    isLoading: true,
};
