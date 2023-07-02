import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ArticleComments } from './ArticleComments';

export default {
    title: 'features/ArticleComments',
    component: ArticleComments,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleComments>;

const Template: ComponentStory<typeof ArticleComments> = (arg) => (
    <ArticleComments {...arg} />
);

export const Primary = Template.bind({});
Primary.args = { id: '1' };
Primary.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = { id: '1' };
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];

export const Orange = Template.bind({});
Orange.args = { id: '1' };
Orange.decorators = [ThemeDecorator(Theme.ORANGE), StoreDecorator({})];
