import {
    CombinedState,
    configureStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';
import { userReducer } from '@/entities/User';
import { $api } from '@/shared/api/api';
import { scrollSaveSliceReducer } from '@/features/ScrollSave';
import { rtkApi } from '@/shared/api/rtkApi';
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
        [rtkApi.reducerPath]: rtkApi.reducer,
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
        }).concat(rtkApi.middleware),
    });
    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

//! типизируем тип диспатча что бы использовать его в хуке useAppDispatch. это делается что автокоплита тайпскрипта что бы он подхватывал типы возвращаемые диспатчем потому что по умолчанию диспатч не типизирован
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
