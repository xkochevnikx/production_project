import { Story } from '@storybook/react';
import { IStateSchema, StoreProvider } from 'app/providers/StoreProviders';
import { ArticleDetailsReducer } from 'entities/Article/modal/slice/ArticleDetailsSlice';
import { addCommentFormReducer } from 'features/AddCommentForm/modal/slice/addCommentFormSlice';
import { loginReducer } from 'features/AuthByUsername/modal/slice/loginSlice';
import { ProfileReducer } from 'features/EditableProfileCard/modal/slice/ProfileSlice';
import { articleDetailsPageReducer } from 'pages/ArticleDetailsPage/modal/slice';
import { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

//! поскольку эти слайсы асинхронные их надо отдельно добавлять для тестирования компонентов но так же можно еще дополнительно передавать слайсы в стор провайдер.
const defaultAsyncReducer: ReducersList = {
    loginForm: loginReducer,
    profile: ProfileReducer,
    articleDetails: ArticleDetailsReducer,
    addCommentForm: addCommentFormReducer,
    articleDetailsPage: articleDetailsPageReducer,
};

export const StoreDecorator = (state: DeepPartial<IStateSchema>, asyncReducers?: ReducersList) => (StoryComponent: Story) => (
    <StoreProvider
        initialState={state}
        asyncReducers={{ ...defaultAsyncReducer, ...asyncReducers }}
    >
        <StoryComponent />
    </StoreProvider>
);
