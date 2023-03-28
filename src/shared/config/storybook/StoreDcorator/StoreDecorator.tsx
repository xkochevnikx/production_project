import { Story } from '@storybook/react';
import { IStateSchema, StoreProvider } from 'app/providers/StoreProviders';
import { loginReducer } from 'features/AuthByUsername/modal/slice/loginSlice';
import { ProfileReducer } from 'features/EditableProfileCard/modal/slice/ProfileSlice';
import { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

const defaultAsyncReducer: ReducersList = {
    loginForm: loginReducer,
    profile: ProfileReducer,
};

export const StoreDecorator = (state: DeepPartial<IStateSchema>, asyncReducers?: ReducersList) => (StoryComponent: Story) => (
    <StoreProvider
        initialState={state}
        asyncReducers={{ ...defaultAsyncReducer, ...asyncReducers }}
    >
        <StoryComponent />
    </StoreProvider>
);
