import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Input } from './Input';

export default {
    title: 'shared/Input',
    component: Input,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

export const PrimaryValue = Template.bind({});
PrimaryValue.args = {
    value: 'кусь',
};

export const PrimaryPlaceholder = Template.bind({});
PrimaryPlaceholder.args = {
    value: 'кусь',
    placeholder: 'сильный',
};

export const PrimaryDisabled = Template.bind({});
PrimaryDisabled.args = {
    readonly: true,
    value: 'кусь',
    placeholder: 'сильный',
};

export const PrimaryTypeCheck = Template.bind({});
PrimaryTypeCheck.args = {
    type: 'checkbox',
};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Orange = Template.bind({});
Orange.args = {};
Orange.decorators = [ThemeDecorator(Theme.ORANGE)];
