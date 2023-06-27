import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { EditableProfileCard } from './EditableProfileCard';
import Avatar from '../../../../shared/assets/icons/крош.jpg';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Current';

export default {
    title: 'features/EditableProfileCard',
    component: EditableProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof EditableProfileCard>;

const Template: ComponentStory<typeof EditableProfileCard> = (args) => (
    <EditableProfileCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = { id: '1' };
Primary.decorators = [
    StoreDecorator({
        profile: {
            form: {
                username: 'кусь',
                first: 'ладожский',
                lastname: 'ластоногий',
                age: 13,
                city: 'СПБ',
                avatar: Avatar,
                country: Country.Ingermanland,
                currency: Currency.EUR,
            },
        },
    }),
];

export const Dark = Template.bind({});
Dark.args = { id: '1' };
Dark.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
        profile: {
            form: {
                username: 'кусь',
                first: 'ладожский',
                lastname: 'ластоногий',
                age: 13,
                city: 'СПБ',
                avatar: Avatar,
                country: Country.Ingermanland,
                currency: Currency.EUR,
            },
        },
    }),
];

export const Orange = Template.bind({});
Orange.args = { id: '1' };
Orange.decorators = [
    ThemeDecorator(Theme.ORANGE),
    StoreDecorator({
        profile: {
            form: {
                username: 'кусь',
                first: 'ладожский',
                lastname: 'ластоногий',
                age: 13,
                city: 'СПБ',
                avatar: Avatar,
                country: Country.Ingermanland,
                currency: Currency.EUR,
            },
        },
    }),
];
