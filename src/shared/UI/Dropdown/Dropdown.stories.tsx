import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Dropdown } from './Dropdown';
import { Button } from '../Button/ui/Button';

export default {
    title: 'shared/Dropdown',
    component: Dropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (arg) => (
    <Dropdown {...arg} />
);

export const Primary = Template.bind({});
Primary.args = {
    trigger: <Button>open</Button>,
    items: [
        {
            content: 'first',
        },
        {
            content: 'second',
        },
    ],
};
