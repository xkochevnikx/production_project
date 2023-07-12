import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { CountrySelect } from './CountrySelect';
import { Country } from '../modal/types/country';
import { Theme } from '@/shared/consts/theme';

export default {
    title: 'entities/CountrySelect',
    component: CountrySelect,
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
} as ComponentMeta<typeof CountrySelect>;

const Template: ComponentStory<typeof CountrySelect> = (args) => (
    <CountrySelect {...args} />
);

export const PrimaryReadonly = Template.bind({});
PrimaryReadonly.args = {
    value: Country.Ingermanland,
    readonly: true,
};

export const Dark = Template.bind({});
Dark.args = {
    value: Country.Ingermanland,
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
    value: Country.Ingermanland,
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
