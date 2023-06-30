import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { NotificationItem } from './NotificationItem';

export default {
    title: 'entities/NotificationItem',
    component: NotificationItem,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof NotificationItem>;

const Template: ComponentStory<typeof NotificationItem> = (args) => (
    <NotificationItem {...args} />
);

const item = {
    id: 1,
    title: 'кусь',
    description: 'кусь',
    userId: 1,
};

export const Primary = Template.bind({});
Primary.args = {
    item,
};

export const Dark = Template.bind({});
Dark.args = {
    item,
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Orange = Template.bind({});
Orange.args = {
    item,
};
Orange.decorators = [ThemeDecorator(Theme.ORANGE)];
