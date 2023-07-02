import { ComponentStory, ComponentMeta } from '@storybook/react';
import withMock from 'storybook-addon-mock';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { NotificationList } from './NotificationList';

export default {
    title: 'entities/NotificationList',
    component: NotificationList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [withMock],
} as ComponentMeta<typeof NotificationList>;

const Template: ComponentStory<typeof NotificationList> = (args) => (
    <NotificationList {...args} />
);

const item = {
    id: 1,
    title: 'кусь',
    description: 'кусь',
    userId: 1,
};

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [StoreDecorator({})];
Primary.parameters = {
    mockData: [
        {
            url: `${__API__}/notifications`,
            method: 'GET',
            status: 200,
            response: [
                { ...item, id: '1' },
                { ...item, id: '2' },
                { ...item, id: '3' },
            ],
        },
    ],
};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];
Dark.parameters = {
    mockData: [
        {
            url: `${__API__}/notifications`,
            method: 'GET',
            status: 200,
            response: [
                { ...item, id: '1' },
                { ...item, id: '2' },
                { ...item, id: '3' },
            ],
        },
    ],
};

export const Orange = Template.bind({});
Orange.args = {};
Orange.decorators = [StoreDecorator({}), ThemeDecorator(Theme.ORANGE)];
Orange.parameters = {
    mockData: [
        {
            url: `${__API__}/notifications`,
            method: 'GET',
            status: 200,
            response: [
                { ...item, id: '1' },
                { ...item, id: '2' },
                { ...item, id: '3' },
            ],
        },
    ],
};
