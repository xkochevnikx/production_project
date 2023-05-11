import {
    CombinedState,
    configureStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';
import { userReducer } from 'entities/User';
import { $api } from 'shared/api/api';
import { scrollSaveSliceReducer } from 'widgets/ScrollSave';
import { createReducerManager } from './ReducerManager';
import { IStateSchema, IThunkExtraArg } from './StateSchema';

export function createReduxStore(
    //! все пропсы для тестирования
    initialState?: IStateSchema,
    asyncReducers?: ReducersMapObject<IStateSchema>,
) {
    const rootReducer: ReducersMapObject<IStateSchema> = {
        ...asyncReducers,
        user: userReducer,
        scrollSave: scrollSaveSliceReducer,
    };

    //! в корневой редюсере передаём только обязательные
    const reducerManager = createReducerManager(rootReducer);

    const extraArg: IThunkExtraArg = {
        api: $api,
    };

    //! создаём стор
    const store = configureStore({
        //! в корневой редюсер добавляем редюсер менеджер который в свою очередь выше создаётся и в него все срезы добаляются. но еще вызываю функцию редюс которая возвращает набор актуальных слайсов
        reducer: reducerManager.reduce as Reducer<CombinedState<IStateSchema>>,
        //! только в режиме разработки
        devTools: __IS_DEV__,
        //! для тестов
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument: extraArg,
            },
        }),
    });
    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
