import { Story } from '@storybook/react';
import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit';
import { IStateSchema, StoreProvider } from 'app/providers/StoreProviders';
import { loginReducer } from 'features/AuthByUsername/modal/slice/loginSlice';

const defaultAsyncReducer: DeepPartial<ReducersMapObject<IStateSchema>> = {
    loginForm: loginReducer,
};

export const StoreDecorator = (
    state: DeepPartial<IStateSchema>,
    asyncReducers: DeepPartial<ReducersMapObject<IStateSchema>>,
) => (StoryComponent: Story) => (
    <StoreProvider
        initialState={state}
        asyncReducers={{ ...defaultAsyncReducer, ...asyncReducers }}
    >
        <StoryComponent />
    </StoreProvider>
);
