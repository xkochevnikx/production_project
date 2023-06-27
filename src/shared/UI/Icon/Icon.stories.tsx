import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Icon } from './Icon';
import Alert from '../../assets/icons/alert.svg';

export default {
    title: 'shared/Icon',
    component: Icon,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    Svg: Alert,
};

export const PrimaryInverted = Template.bind({});
PrimaryInverted.args = {
    inverted: true,
    Svg: Alert,
};

export const Dark = Template.bind({});
Dark.args = {
    Svg: Alert,
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Orange = Template.bind({});
Orange.args = {
    Svg: Alert,
};
Orange.decorators = [ThemeDecorator(Theme.ORANGE)];
