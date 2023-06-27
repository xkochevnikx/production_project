import { ComponentStory, ComponentMeta } from '@storybook/react';
import { HStack } from './HStack';

export default {
    title: 'shared/HStack',
    component: HStack,
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
} as ComponentMeta<typeof HStack>;

const Template: ComponentStory<typeof HStack> = (args) => <HStack {...args} />;

export const Row = Template.bind({});
Row.args = {
    max: true,
    children: (
        <>
            <div>qwerty</div>
            <div>qwerty</div>
            <div>qwerty</div>
        </>
    ),
};
