import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Button, ButtonSize, ThemeButton } from './Button';

export default {
    title: 'shared/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

// theme
export const Outline = Template.bind({});
Outline.args = {
    children: 'кусь',
};

export const OutlineDark = Template.bind({});
OutlineDark.args = {
    children: 'Text',
    theme: ThemeButton.OUTLINE,
};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OutlineOrange = Template.bind({});
OutlineOrange.args = {
    children: 'Text',
    theme: ThemeButton.OUTLINE,
};
OutlineOrange.decorators = [ThemeDecorator(Theme.ORANGE)];

export const Clear = Template.bind({});
Clear.args = {
    children: 'кусь',
    theme: ThemeButton.CLEAR,
};

export const ClearInverted = Template.bind({});
ClearInverted.args = {
    children: 'кусь',
    theme: ThemeButton.CLEAR_INVERTED,
};

export const OutlineRed = Template.bind({});
OutlineRed.args = {
    children: 'кусь',
    theme: ThemeButton.OUTLINE_RED,
};

export const Background = Template.bind({});
Background.args = {
    children: 'кусь',
    theme: ThemeButton.BACKGROUND,
};

export const BackgroundInverted = Template.bind({});
BackgroundInverted.args = {
    children: 'кусь',
    theme: ThemeButton.BACKGROUND_INVERTED,
};

// size

export const Disabled = Template.bind({});
Disabled.args = {
    children: '>',
    theme: ThemeButton.OUTLINE,
    disabled: true,
};

export const Square = Template.bind({});
Square.args = {
    children: '>',
    theme: ThemeButton.BACKGROUND,
    square: true,
};

export const SquareSizeL = Template.bind({});
SquareSizeL.args = {
    children: '>',
    theme: ThemeButton.BACKGROUND,
    square: true,
    size: ButtonSize.L,
};

export const SquareSizeXL = Template.bind({});
SquareSizeXL.args = {
    children: '>',
    theme: ThemeButton.BACKGROUND,
    square: true,
    size: ButtonSize.XL,
};

export const OutlineSizeL = Template.bind({});
OutlineSizeL.args = {
    children: 'Text',
    theme: ThemeButton.OUTLINE,
    size: ButtonSize.L,
};

export const OutlineSizeXL = Template.bind({});
OutlineSizeXL.args = {
    children: 'Text',
    theme: ThemeButton.OUTLINE,
    size: ButtonSize.XL,
};
