import { Story } from '@storybook/react';
import { Suspense } from 'react';
//! что бы было видно ссылки из роутер дома
export const SuspenseDecorator = (StoryComponentn: Story) => (
    <Suspense>
        <StoryComponentn />
    </Suspense>
);
