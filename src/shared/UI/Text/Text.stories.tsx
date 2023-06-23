import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
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

export const Error = Template.bind({});
Error.args = {
    title: 'title',
    text: 'text',
    theme: TextTheme.ERROR,
};

export const OnlyText = Template.bind({});
OnlyText.args = {
    text: 'text',
};

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
    title: 'title',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    title: 'title',
    text: 'text',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SizeS = Template.bind({});
SizeS.args = {
    align: TextAlign.RIGHT,
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
