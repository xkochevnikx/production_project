import { Reducer } from '@reduxjs/toolkit';
import { ReactNode, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { IReduxStoreWithManager, IStateSchema, StateSchemaKey } from '@/app/providers/StoreProviders';

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer<NonNullable<IStateSchema[name]>>;
};

interface IDynamicModuleLoaderProps {
    reducers: ReducersList;
    removeAfterUnmount?: boolean;
    children: ReactNode;
}

//! все это вмонтирование имеет смысл только когда компонент в котором лежит это асинхронный редюсер является ленивым. То есть подгружается отдельным чанком и тогда в момент монтирования подгруженного чанка добавляется асинхронный редюсер
export const DynamicModuleLoader = (props: IDynamicModuleLoaderProps) => {
    const store = useStore() as IReduxStoreWithManager;

    const dispatch = useDispatch();

    const { children, reducers, removeAfterUnmount = true } = props;

    useEffect(() => {
        // eslint-disable-next-line
        //! тут получаем массив добавленных редюсеров
        const mountedReducers = store.reducerManager.getReducerMap();
        // eslint-disable-next-line
        //! объект превращаем в кортеж это массивы в массиве где в каждом подмассиве лежит ключ и значение.
        Object.entries(reducers).forEach(([name, reducer]) => {
            // eslint-disable-next-line
            //! тут в массиве добавленных редюсеров по названию нашего монтируемого смотрим есть он уже или нет. и на этом основании либо добавляем снова или нет
            const mounted = mountedReducers[name as StateSchemaKey];
            if (!mounted) {
                store.reducerManager.add(name as StateSchemaKey, reducer);
                dispatch({ type: `@INIT ${name} reducer` });
            }
        });

        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name, reducer]) => {
                    store.reducerManager.remove(name as StateSchemaKey);
                    dispatch({ type: `@DESTROY ${name} reducer` });
                });
            }
        };
        // eslint-disable-next-line
    }, []);

    return <>{children}</>;
};
