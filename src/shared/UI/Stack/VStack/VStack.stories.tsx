import { ComponentStory, ComponentMeta } from '@storybook/react';
import { VStack } from './VStack';

export default {
    title: 'shared/VStack',
    component: VStack,
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
} as ComponentMeta<typeof VStack>;

const Template: ComponentStory<typeof VStack> = (args) => <VStack {...args} />;

export const Column = Template.bind({});
Column.args = {
    max: true,
    children: (
        <>
            <div>qwerty</div>
            <div>qwerty</div>
            <div>qwerty</div>
        </>
    ),
};
