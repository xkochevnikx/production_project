import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Flex } from './Flex';

export default {
    title: 'shared/Flex',
    component: Flex,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = (args) => <Flex {...args} />;

export const Row16 = Template.bind({});
Row16.args = {
    gap: '16',
    children: (
        <>
            <div>qwerty</div>
            <div>qwerty</div>
            <div>qwerty</div>
        </>
    ),
};
export const Column4 = Template.bind({});
Column4.args = {
    direction: 'column',
    gap: '4',
    align: 'end',
    children: (
        <>
            <div>qwerty</div>
            <div>qwerty</div>
            <div>qwerty</div>
        </>
    ),
};
export const RowJustify16 = Template.bind({});
RowJustify16.args = {
    justify: 'between',
    gap: '16',
    children: (
        <>
            <div>qwerty</div>
            <div>qwerty</div>
            <div>qwerty</div>
        </>
    ),
};
export const ColumnJustify32 = Template.bind({});
ColumnJustify32.args = {
    direction: 'column',
    justify: 'end',
    gap: '32',
    children: (
        <>
            <div>qwerty</div>
            <div>qwerty</div>
            <div>qwerty</div>
        </>
    ),
};

export const RowBetween = Template.bind({});
RowBetween.args = {
    justify: 'between',
    children: (
        <>
            <div>qwerty</div>
            <div>qwerty</div>
            <div>qwerty</div>
        </>
    ),
};
