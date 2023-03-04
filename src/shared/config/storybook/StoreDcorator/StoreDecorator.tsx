import { Story } from '@storybook/react';
import { DeepPartial } from '@reduxjs/toolkit';
import { IStateSchema, StoreProvider } from 'app/providers/StoreProviders';

export const StoreDecorator = (state: DeepPartial<IStateSchema>) => (StoryComponent: Story) => (
    <StoreProvider initialState={state}>
        <StoryComponent />
    </StoreProvider>
);
