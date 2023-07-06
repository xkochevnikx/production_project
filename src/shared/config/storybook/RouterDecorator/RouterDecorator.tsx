import { Story } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
//! что бы было видно ссылки из роутер дома
export const RouterDecorator = (StoryComponentn: Story) => (
    <BrowserRouter>
        <StoryComponentn />
    </BrowserRouter>
);
