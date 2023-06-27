import { ComponentStory, ComponentMeta } from '@storybook/react';
import Krochik from './крош.jpg';
import { Avatar } from '../../assets/icons/крош.jpg';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

export default {
    title: 'shared/Avatar',
    component: Avatar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    size: 150,
    src: Krochik,
};
export const Dark = Template.bind({});
Dark.args = {
    size: 150,
    src: Krochik,
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Orange = Template.bind({});
Orange.args = {
    size: 150,
    src: Krochik,
};
Orange.decorators = [ThemeDecorator(Theme.ORANGE)];
