import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { Dropdown } from './Dropdown';
import { Button } from '../../../Button/Button';

export default {
    title: 'shared/Dropdown',
    component: Dropdown,
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
    ],
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (arg) => (
    <Dropdown {...arg} />
);

export const Primary = Template.bind({});
Primary.args = {
    trigger: <Button>open</Button>,
    items: [
        {
            content: 'first',
        },
        {
            content: 'second',
        },
    ],
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    trigger: <Button>open</Button>,
    items: [
        {
            content: 'first',
        },
        {
            content: 'second',
        },
    ],
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const PrimaryOrange = Template.bind({});
PrimaryOrange.args = {
    trigger: <Button>open</Button>,
    items: [
        {
            content: 'first',
        },
        {
            content: 'second',
        },
    ],
};
PrimaryOrange.decorators = [ThemeDecorator(Theme.ORANGE)];

export const PrimaryBottomRight = Template.bind({});
PrimaryBottomRight.args = {
    direction: 'bottom right',
    trigger: <Button>open</Button>,
    items: [
        {
            content: 'first',
        },
        {
            content: 'second',
        },
    ],
};

export const PrimaryTopRight = Template.bind({});
PrimaryTopRight.args = {
    direction: 'top right',
    trigger: <Button>open</Button>,
    items: [
        {
            content: 'first',
        },
        {
            content: 'second',
        },
    ],
};

export const PrimaryTopLeft = Template.bind({});
PrimaryTopLeft.args = {
    direction: 'top left',
    trigger: <Button>open</Button>,
    items: [
        {
            content: 'first',
        },
        {
            content: 'second',
        },
    ],
};
