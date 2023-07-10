import { Story } from '@storybook/react';
import { IStateSchema, StoreProvider } from '@/app/providers/StoreProviders';
import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { loginReducer } from '@/features/AuthByUsername/testing';
import { ProfileReducer } from '@/features/EditableProfileCard/testing';
import { ArticleDetailsReducer } from '@/entities/Article/testing';
import { CommentFormReducer } from '@/entities/CommentForm/testing';
import { articleDetailsCommentsReducer } from '@/features/ArticleComments/testing';

//! поскольку эти слайсы асинхронные их надо отдельно добавлять для тестирования компонентов но так же можно еще дополнительно передавать слайсы в стор провайдер.
const defaultAsyncReducer: ReducersList = {
    loginForm: loginReducer,
    profile: ProfileReducer,
    articleDetails: ArticleDetailsReducer,
    commentForm: CommentFormReducer,
    articleDetailsComments: articleDetailsCommentsReducer,
};

export const StoreDecorator = (state: DeepPartial<IStateSchema>, asyncReducers?: ReducersList) => (StoryComponent: Story) => (
    <StoreProvider
        initialState={state}
        asyncReducers={{ ...defaultAsyncReducer, ...asyncReducers }}
    >
        <StoryComponent />
    </StoreProvider>
);
