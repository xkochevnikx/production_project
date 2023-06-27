import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { AppLink, AppLinkTheme } from './AppLink';
import { Button } from '../Button/Button';

export default {
    title: 'shared/AppLink',
    component: AppLink,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        to: '/',
    },
} as ComponentMeta<typeof AppLink>;

const Template: ComponentStory<typeof AppLink> = (args) => (
    <AppLink {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    children: 'qwerty',
};

export const PrimaryChildrenNode = Template.bind({});
PrimaryChildrenNode.args = {
    children: <Button>кусь</Button>,
};

export const Secondary = Template.bind({});
Secondary.args = {
    children: 'qwerty',
    theme: AppLinkTheme.SECONDARY,
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    children: 'qwerty',
    theme: AppLinkTheme.PRIMARY,
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SecondaryOrange = Template.bind({});
SecondaryOrange.args = {
    children: 'qwerty',
    theme: AppLinkTheme.SECONDARY,
};
SecondaryOrange.decorators = [ThemeDecorator(Theme.ORANGE)];
