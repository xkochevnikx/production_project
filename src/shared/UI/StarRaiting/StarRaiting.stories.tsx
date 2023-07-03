import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { StarRaiting } from './StarRaiting';

export default {
    title: 'shared/StarRaiting',
    component: StarRaiting,

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
} as ComponentMeta<typeof StarRaiting>;

const Template: ComponentStory<typeof StarRaiting> = (args) => (
    <StarRaiting {...args} />
);

export const JustifyRowStart = Template.bind({});
JustifyRowStart.args = {};
