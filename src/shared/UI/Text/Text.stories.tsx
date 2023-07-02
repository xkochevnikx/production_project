import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import {
    Text, TextAlign, TextSize, TextTheme,
} from './Text';

export default {
    title: 'shared/Text',
    component: Text,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    title: 'title',
    text: 'text',
};

export const PrimaryCenter = Template.bind({});
PrimaryCenter.args = {
    title: 'title',
    text: 'text',
    align: TextAlign.CENTER,
};

export const PrimaryRight = Template.bind({});
PrimaryRight.args = {
    title: 'title',
    text: 'text',
    align: TextAlign.RIGHT,
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    title: 'title',
    text: 'text',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Inverted = Template.bind({});
Inverted.args = {
    title: 'title',
    text: 'text',
    theme: TextTheme.INVERTED,
};

export const InvertedDark = Template.bind({});
InvertedDark.args = {
    title: 'title',
    text: 'text',
    theme: TextTheme.INVERTED,
};
InvertedDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Error = Template.bind({});
Error.args = {
    title: 'title',
    text: 'text',
    theme: TextTheme.ERROR,
};

export const ErrorDark = Template.bind({});
ErrorDark.args = {
    title: 'title',
    text: 'text',
    theme: TextTheme.ERROR,
};
ErrorDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyText = Template.bind({});
OnlyText.args = {
    text: 'text',
};

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
    title: 'title',
};

export const SizeS = Template.bind({});
SizeS.args = {
    text: 'text',
    title: 'title',
    size: TextSize.S,
};

export const SizeM = Template.bind({});
SizeM.args = {
    text: 'text',
    title: 'title',
    size: TextSize.M,
};

export const SizeL = Template.bind({});
SizeL.args = {
    text: 'text',
    title: 'title',
    size: TextSize.L,
};
