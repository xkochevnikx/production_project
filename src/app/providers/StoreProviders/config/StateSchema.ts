import {
    AnyAction,
    CombinedState,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';
import { IUserSchema } from 'entities/User';
import { ILoginSchema } from 'features/AuthByUsername';
import { AxiosInstance } from 'axios';
import { IProfileSchema } from 'features/EditableProfileCard/modal/types/profile';
import { IArticleDetailsSchema } from 'entities/Article';
import { IArticleDetailsCommentsSchema } from 'pages/ArticleDetailsPage';
import { IAddCommentFormSchema } from 'features/AddCommentForm';
import { IArticlesPageSchema } from 'pages/ArticlePage';
import { iScrollSaveSchema } from 'widgets/ScrollSave';

export interface IStateSchema {
    user: IUserSchema;
    scrollSave: iScrollSaveSchema;

    // async reducers
    loginForm?: ILoginSchema;
    profile?: IProfileSchema;
    articleDetails?: IArticleDetailsSchema;
    articleDetailsComments?: IArticleDetailsCommentsSchema;
    addCommentForm?: IAddCommentFormSchema;
    articlesPage?: IArticlesPageSchema;
}

export type StateSchemaKey = keyof IStateSchema;

export interface IReducerManager {
    getReducerMap: () => ReducersMapObject<IStateSchema>;
    reduce: (
        state: IStateSchema,
        action: AnyAction
    ) => CombinedState<IStateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface IReduxStoreWithManager extends EnhancedStore<IStateSchema> {
    reducerManager: IReducerManager;
}

export interface IThunkExtraArg {
    api: AxiosInstance;
}

export interface IThunkConfig<T> {
    rejectValue: T;
    extra: IThunkExtraArg;
    state: IStateSchema;
}
