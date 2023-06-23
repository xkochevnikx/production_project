import { ComponentStory, ComponentMeta } from '@storybook/react';
import { HStack } from './HStack';

export default {
    title: 'shared/HStack',
    component: HStack,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof HStack>;

const Template: ComponentStory<typeof HStack> = (args) => <HStack {...args} />;

export const Row16 = Template.bind({});
Row16.args = {};
