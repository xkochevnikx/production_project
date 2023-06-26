import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ListBox } from './ListBox';

export default {
    title: 'shared/ListBox',
    component: ListBox,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (arg) => <ListBox {...arg} />;

export const Primary = Template.bind({});
Primary.args = {
    value: 'qwerty',
    items: [
        { value: '123', content: '123', disabled: true },
        { value: '123', content: '123', disabled: false },
    ],
};
