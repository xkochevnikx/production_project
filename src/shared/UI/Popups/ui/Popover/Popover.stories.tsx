import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NotificationList } from 'entities/Notification';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import withMock from 'storybook-addon-mock';
import { INotification } from 'entities/Notification/modal/types/notification';
import { Button, ThemeButton } from 'shared/UI/Button/Button';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Popover } from './Popover';

export default {
    title: 'shared/Popover',
    component: Popover,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        (Story) => (
            <div
                style={{
                    display: 'flex',
                    width: '100vw',
                    height: '100vh',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Story />
            </div>
        ),
        withMock,
    ],
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (arg) => <Popover {...arg} />;

const notification: INotification = {
    id: 1,
    title: 'пиздык',
    description: 'хуяк',
    userId: 1,
};

export const Primary = Template.bind({});
Primary.args = {
    trigger: <Button theme={ThemeButton.OUTLINE}>жмяк</Button>,
    children: <NotificationList />,
};
Primary.decorators = [StoreDecorator({})];
Primary.parameters = {
    mockData: [
        {
            url: `${__API__}/notifications`,
            method: 'GET',
            status: 200,
            response: [
                { ...notification, id: '1' },
                { ...notification, id: '2' },
            ],
        },
    ],
};

export const PrimaryTopRight = Template.bind({});
PrimaryTopRight.args = {
    direction: 'top right',
    trigger: <Button theme={ThemeButton.OUTLINE}>жмяк</Button>,
    children: <NotificationList />,
};
PrimaryTopRight.decorators = [StoreDecorator({})];
PrimaryTopRight.parameters = {
    mockData: [
        {
            url: `${__API__}/notifications`,
            method: 'GET',
            status: 200,
            response: [
                { ...notification, id: '1' },
                { ...notification, id: '2' },
            ],
        },
    ],
};

export const PrimaryTopLeft = Template.bind({});
PrimaryTopLeft.args = {
    direction: 'top left',
    trigger: <Button theme={ThemeButton.OUTLINE}>жмяк</Button>,
    children: <NotificationList />,
};
PrimaryTopLeft.decorators = [StoreDecorator({})];
PrimaryTopLeft.parameters = {
    mockData: [
        {
            url: `${__API__}/notifications`,
            method: 'GET',
            status: 200,
            response: [
                { ...notification, id: '1' },
                { ...notification, id: '2' },
            ],
        },
    ],
};

export const PrimaryBottomRight = Template.bind({});
PrimaryBottomRight.args = {
    direction: 'bottom right',
    trigger: <Button theme={ThemeButton.OUTLINE}>жмяк</Button>,
    children: <NotificationList />,
};
PrimaryBottomRight.decorators = [StoreDecorator({})];
PrimaryBottomRight.parameters = {
    mockData: [
        {
            url: `${__API__}/notifications`,
            method: 'GET',
            status: 200,
            response: [
                { ...notification, id: '1' },
                { ...notification, id: '2' },
            ],
        },
    ],
};

export const OrangeBottomRight = Template.bind({});
OrangeBottomRight.args = {
    direction: 'bottom right',
    trigger: <Button theme={ThemeButton.OUTLINE}>жмяк</Button>,
    children: <NotificationList />,
};
OrangeBottomRight.decorators = [
    StoreDecorator({}),
    ThemeDecorator(Theme.ORANGE),
];
OrangeBottomRight.parameters = {
    mockData: [
        {
            url: `${__API__}/notifications`,
            method: 'GET',
            status: 200,
            response: [
                { ...notification, id: '1' },
                { ...notification, id: '2' },
            ],
        },
    ],
};

export const DarkBottomRight = Template.bind({});
DarkBottomRight.args = {
    direction: 'bottom right',
    trigger: <Button theme={ThemeButton.OUTLINE}>жмяк</Button>,
    children: <NotificationList />,
};
DarkBottomRight.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];
DarkBottomRight.parameters = {
    mockData: [
        {
            url: `${__API__}/notifications`,
            method: 'GET',
            status: 200,
            response: [
                { ...notification, id: '1' },
                { ...notification, id: '2' },
            ],
        },
    ],
};
