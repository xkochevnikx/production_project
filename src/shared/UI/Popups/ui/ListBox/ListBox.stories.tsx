import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { ListBox } from './ListBox';

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
    items,
};

export const Dark = Template.bind({});
Dark.args = {
    value: 'qwerty',
    items,
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Orange = Template.bind({});
Orange.args = {
    value: 'qwerty',
    items,
};
Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

export const PrimaryTopRight = Template.bind({});
PrimaryTopRight.args = {
    direction: 'top right',
    value: 'qwerty',
    items,
};

export const PrimaryBottomLeft = Template.bind({});
PrimaryBottomLeft.args = {
    direction: 'bottom left',
    value: 'qwerty',
    items,
};

export const PrimaryBottomRight = Template.bind({});
PrimaryBottomRight.args = {
    direction: 'bottom right',
    value: 'qwerty',
    items,
};

export const PrimaryDisabled = Template.bind({});
PrimaryDisabled.args = {
    readonly: true,
    value: 'qwerty',
    items,
};
