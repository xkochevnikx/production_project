import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { Flex } from './Flex';

export default {
    title: 'shared/Flex',
    component: Flex,

    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        (Story) => (
            <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
                <Story />
            </div>
        ),
    ],
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = (args) => <Flex {...args} />;

export const JustifyRowStart = Template.bind({});
JustifyRowStart.args = {
    justify: 'start',
    max: true,
    children: (
        <>
            <div>qwerty</div>
            <div>qwerty</div>
            <div>qwerty</div>
        </>
    ),
};

export const JustifyRowStartDark = Template.bind({});
JustifyRowStartDark.args = {
    justify: 'start',
    max: true,
    children: (
        <>
            <div>qwerty</div>
            <div>qwerty</div>
            <div>qwerty</div>
        </>
    ),
};
JustifyRowStartDark.decorators = [ThemeDecorator(Theme.DARK)];

export const JustifyRowCenter = Template.bind({});
JustifyRowCenter.args = {
    max: true,
    children: (
        <>
            <div>qwerty</div>
            <div>qwerty</div>
            <div>qwerty</div>
        </>
    ),
};

export const JustifyRowCenter4 = Template.bind({});
JustifyRowCenter4.args = {
    max: true,
    gap: '4',
    children: (
        <>
            <div>qwerty</div>
            <div>qwerty</div>
            <div>qwerty</div>
        </>
    ),
};

export const JustifyRowCenter8 = Template.bind({});
JustifyRowCenter8.args = {
    gap: '8',
    max: true,
    children: (
        <>
            <div>qwerty</div>
            <div>qwerty</div>
            <div>qwerty</div>
        </>
    ),
};

export const JustifyRowCenter16 = Template.bind({});
JustifyRowCenter16.args = {
    max: true,
    gap: '16',
    children: (
        <>
            <div>qwerty</div>
            <div>qwerty</div>
            <div>qwerty</div>
        </>
    ),
};

export const JustifyRowCenter32 = Template.bind({});
JustifyRowCenter32.args = {
    max: true,
    gap: '32',
    children: (
        <>
            <div>qwerty</div>
            <div>qwerty</div>
            <div>qwerty</div>
        </>
    ),
};

export const JustifyRowEnd = Template.bind({});
JustifyRowEnd.args = {
    max: true,
    justify: 'end',
    children: (
        <>
            <div>qwerty</div>
            <div>qwerty</div>
            <div>qwerty</div>
        </>
    ),
};

export const JustifyRowBetween = Template.bind({});
JustifyRowBetween.args = {
    justify: 'between',
    max: true,
    children: (
        <>
            <div>qwerty</div>
            <div>qwerty</div>
            <div>qwerty</div>
        </>
    ),
};

export const Column = Template.bind({});
Column.args = {
    direction: 'column',
    max: true,
    children: (
        <>
            <div>qwerty</div>
            <div>qwerty</div>
            <div>qwerty</div>
        </>
    ),
};

export const ColumnAlignStart = Template.bind({});
ColumnAlignStart.args = {
    align: 'start',
    direction: 'column',
    max: true,
    children: (
        <>
            <div>qwerty</div>
            <div>qwerty</div>
            <div>qwerty</div>
        </>
    ),
};

export const ColumnAlignEnd = Template.bind({});
ColumnAlignEnd.args = {
    align: 'end',
    direction: 'column',
    max: true,
    children: (
        <>
            <div>qwerty</div>
            <div>qwerty</div>
            <div>qwerty</div>
        </>
    ),
};
