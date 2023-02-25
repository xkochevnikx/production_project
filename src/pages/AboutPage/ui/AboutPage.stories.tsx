import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { AboutPageAsync } from './AboutPage.async';

export default {
   title: 'page/AboutPageAsync',
   component: AboutPageAsync,
   argTypes: {
      backgroundColor: { control: 'color' },
   },
} as ComponentMeta<typeof AboutPageAsync>;

const Template: ComponentStory<typeof AboutPageAsync> = (args) => (
   <AboutPageAsync {...args} />
);

export const Light = Template.bind({});
Light.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
