import { Story } from '@storybook/react';
import { Theme } from '@/shared/consts/theme';
import { ThemeProvider } from '@/shared/lib/context/ThemeContext';

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) => (
    //! пропс initialTheme только тут для сториз в остальных случаях берём из локала при первом рендере
    <ThemeProvider initialTheme={theme}>
        <div className={`app ${theme}`} style={{ width: '100%' }}>
            <StoryComponent />
        </div>
    </ThemeProvider>
);
