import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { MainPageAsync } from './MainPage.async';

export default {
   title: 'page/MainPageAsync',
   component: MainPageAsync,
   argTypes: {
      backgroundColor: { control: 'color' },
   },
} as ComponentMeta<typeof MainPageAsync>;

const Template: ComponentStory<typeof MainPageAsync> = (args) => (
   <MainPageAsync {...args} />
);

export const Light = Template.bind({});
Light.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
