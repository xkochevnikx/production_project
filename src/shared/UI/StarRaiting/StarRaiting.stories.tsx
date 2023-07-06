import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { StarRating } from './StarRating';

export default {
    title: 'shared/StarRaiting',
    component: StarRating,

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
} as ComponentMeta<typeof StarRating>;

const Template: ComponentStory<typeof StarRating> = (args) => (
    <StarRating {...args} />
);

export const JustifyRowStart = Template.bind({});
JustifyRowStart.args = {};
