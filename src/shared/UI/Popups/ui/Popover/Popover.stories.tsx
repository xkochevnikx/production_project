import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Popover } from './Popover';

export default {
    title: 'shared/Popover',
    component: Popover,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (arg) => <Popover {...arg} />;

export const Primary = Template.bind({});
Primary.args = {
    // value: 'qwerty',
    // items: [
    //     { value: '123', content: '123', disabled: true },
    //     { value: '123', content: '123', disabled: false },
    // ],
};
