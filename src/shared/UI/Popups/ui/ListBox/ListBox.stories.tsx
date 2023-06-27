import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ListBox } from './ListBox';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

export default {
    title: 'shared/ListBox',
    component: ListBox,
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
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (arg) => <ListBox {...arg} />;

const items = [
    { value: '123', content: '123', disabled: true },
    { value: '123', content: '123', disabled: false },
];

export const Primary = Template.bind({});
Primary.args = {
    value: 'qwerty',
    items: items,
};

export const Dark = Template.bind({});
Dark.args = {
    value: 'qwerty',
    items: items,
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Orange = Template.bind({});
Orange.args = {
    value: 'qwerty',
    items: items,
};
Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

export const PrimaryTopRight = Template.bind({});
PrimaryTopRight.args = {
    direction: 'top right',
    value: 'qwerty',
    items: items,
};

export const PrimaryBottomLeft = Template.bind({});
PrimaryBottomLeft.args = {
    direction: 'bottom left',
    value: 'qwerty',
    items: items,
};

export const PrimaryBottomRight = Template.bind({});
PrimaryBottomRight.args = {
    direction: 'bottom right',
    value: 'qwerty',
    items: items,
};

export const PrimaryDisabled = Template.bind({});
PrimaryDisabled.args = {
    readonly: true,
    value: 'qwerty',
    items: items,
};
