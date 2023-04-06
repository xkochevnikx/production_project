import { Story } from '@storybook/react';
import { IStateSchema, StoreProvider } from 'app/providers/StoreProviders';
import { ArticleDetailsReducer } from 'entities/Article/modal/slice/ArticleDetailsSlice';
import { loginReducer } from 'features/AuthByUsername/modal/slice/loginSlice';
import { ProfileReducer } from 'features/EditableProfileCard/modal/slice/ProfileSlice';
import { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

const defaultAsyncReducer: ReducersList = {
    loginForm: loginReducer,
    profile: ProfileReducer,
    articleDetails: ArticleDetailsReducer,
};

export const StoreDecorator = (state: DeepPartial<IStateSchema>, asyncReducers?: ReducersList) => (StoryComponent: Story) => (
    <StoreProvider
        initialState={state}
        asyncReducers={{ ...defaultAsyncReducer, ...asyncReducers }}
    >
        <StoryComponent />
    </StoreProvider>
);
