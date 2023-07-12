import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ArticlesSearch } from './ArticlesSearch';
import { Theme } from '@/shared/consts/theme';

export default {
    title: 'features/ArticlesSearch',
    component: ArticlesSearch,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticlesSearch>;

const Template: ComponentStory<typeof ArticlesSearch> = (args) => (
    <ArticlesSearch {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    search: 'кусь',
};
Primary.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];

export const Orange = Template.bind({});
Orange.args = {};
Orange.decorators = [ThemeDecorator(Theme.ORANGE), StoreDecorator({})];
