import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Currency } from '@/entities/Current/modal/types/currency';
import { CurrencySelect } from './CurrencySelect';

export default {
    title: 'entities/CurrencySelect',
    component: CurrencySelect,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        (Story) => (
            <div
                style={{
                    display: 'flex',
                    width: '100vw',
                    height: '100vh',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Story />
            </div>
        ),
    ],
} as ComponentMeta<typeof CurrencySelect>;

const Template: ComponentStory<typeof CurrencySelect> = (args) => (
    <CurrencySelect {...args} />
);

export const PrimaryReadonly = Template.bind({});
PrimaryReadonly.args = {
    value: Currency.EUR,
    readonly: true,
};

export const Dark = Template.bind({});
Dark.args = {
    value: Currency.RUB,
};
Dark.decorators = [
    (Story) => (
        <div
            style={{
                display: 'flex',
                width: '100vw',
                height: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Story />
        </div>
    ),
    ThemeDecorator(Theme.DARK),
];

export const Orange = Template.bind({});
Orange.args = {
    value: Currency.EUR,
};
Orange.decorators = [
    (Story) => (
        <div
            style={{
                display: 'flex',
                width: '100vw',
                height: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Story />
        </div>
    ),
    ThemeDecorator(Theme.ORANGE),
];
