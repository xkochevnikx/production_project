import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Modal } from './Modal';
import { Button } from '../Button/Button';

export default {
    title: 'shared/Modal',
    component: Modal,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    isOpen: true,
    children:
        'Не следует, однако, забывать, что консультация с широким активом позволяет оценить значение новых принципов формирования материально-технической и кадровой базы.',
};

export const PrimaryChildrenNode = Template.bind({});
PrimaryChildrenNode.args = {
    isOpen: true,
    children: <Button>кусь</Button>,
};

export const PrimaryIsOpenFalse = Template.bind({});
PrimaryIsOpenFalse.args = {
    isOpen: false,
    children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
};

export const Dark = Template.bind({});
Dark.args = {
    isOpen: true,
    children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Orange = Template.bind({});
Orange.args = {
    isOpen: true,
    children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
};
Orange.decorators = [ThemeDecorator(Theme.ORANGE)];
