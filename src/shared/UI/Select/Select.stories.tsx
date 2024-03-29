import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Select } from './Select';
import { Theme } from '@/shared/consts/theme';

export default {
    title: 'shared/Select',
    component: Select,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    label: 'qwerty',
    options: [
        { value: '1234', content: 'qwerty' },
        { value: '12345', content: 'qwerty' },
    ],
};

export const PrimaryDisabled = Template.bind({});
PrimaryDisabled.args = {
    readonly: true,
    label: 'qwerty',
    options: [
        { value: '1234', content: 'qwerty' },
        { value: '12345', content: 'qwerty' },
    ],
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    label: 'qwerty',
    options: [
        { value: '1234', content: 'qwerty' },
        { value: '12345', content: 'qwerty' },
    ],
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const PrimaryOrange = Template.bind({});
PrimaryOrange.args = {
    label: 'qwerty',
    options: [
        { value: '1234', content: 'qwerty' },
        { value: '12345', content: 'qwerty' },
    ],
};
PrimaryOrange.decorators = [ThemeDecorator(Theme.ORANGE)];
