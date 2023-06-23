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
import { IArticleDetailsSchema } from 'entities/Article';
import { ICommentFormSchema } from 'entities/CommentForm';
import { iScrollSaveSchema } from 'features/ScrollSave';
import { rtkApi } from 'shared/api/rtkApi';
import { IArticleDetailsCommentsSchema } from 'features/ArticleComments/model/types/ArticleDetailsCommentsSchema';
import { IArticlesPageSchema } from 'features/ArticlesInfiniteList';
import { IProfileSchema } from 'features/EditableProfileCard';

export interface IStateSchema {
    user: IUserSchema;
    scrollSave: iScrollSaveSchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

    // async reducers
    loginForm?: ILoginSchema;
    profile?: IProfileSchema;
    articleDetails?: IArticleDetailsSchema;
    commentForm?: ICommentFormSchema;
    articlesPage?: IArticlesPageSchema;
    articleDetailsComments?: IArticleDetailsCommentsSchema;
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
