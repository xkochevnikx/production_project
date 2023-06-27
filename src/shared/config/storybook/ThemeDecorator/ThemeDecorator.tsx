import { Theme, ThemeProvider } from 'app/providers/ThemeProvider';
import { Story } from '@storybook/react';

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) =>
    (
        //! пропс initialTheme только тут для сториз в остальных случаях берём из локала при первом рендере
        <ThemeProvider initialTheme={theme}>
            <div className={`app ${theme}`} style={{ width: '100%' }}>
                <StoryComponent />
            </div>
        </ThemeProvider>
    );
