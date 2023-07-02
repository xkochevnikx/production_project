import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { Card, CardTheme } from './Card';
import { Text } from '../Text/Text';

export default {
    title: 'shared/Card',
    component: Card,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const PrimaryChildrenNode = Template.bind({});
PrimaryChildrenNode.args = {
    theme: CardTheme.NORMAL,
    children: (
        <Text text="Для современного мира постоянный количественный рост и сфера нашей активности влечёт за собой интересный процесс внедрения модернизации соответствующих условий активизации" />
    ),
};

export const Outlined = Template.bind({});
Outlined.args = {
    theme: CardTheme.OUTLINED,
    children: (
        <Text text="Для современного мира постоянный количественный рост и сфера нашей активности влечёт за собой интересный процесс внедрения модернизации соответствующих условий активизации" />
    ),
};
export const OutlinedDark = Template.bind({});
OutlinedDark.args = {
    theme: CardTheme.OUTLINED,
    children: (
        <Text text="Для современного мира постоянный количественный рост и сфера нашей активности влечёт за собой интересный процесс внедрения модернизации соответствующих условий активизации" />
    ),
};
OutlinedDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OutlinedOrange = Template.bind({});
OutlinedOrange.args = {
    theme: CardTheme.OUTLINED,
    children: (
        <Text text="Для современного мира постоянный количественный рост и сфера нашей активности влечёт за собой интересный процесс внедрения модернизации соответствующих условий активизации" />
    ),
};
OutlinedOrange.decorators = [ThemeDecorator(Theme.ORANGE)];
