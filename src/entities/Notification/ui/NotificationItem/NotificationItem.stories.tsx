import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NotificationItem } from './NotificationItem';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

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
    item: item,
};

export const Dark = Template.bind({});
Dark.args = {
    item: item,
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Orange = Template.bind({});
Orange.args = {
    item: item,
};
Orange.decorators = [ThemeDecorator(Theme.ORANGE)];
