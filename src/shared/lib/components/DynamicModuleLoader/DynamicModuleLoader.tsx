import { Reducer } from '@reduxjs/toolkit';
import { IReduxStoreWithManager } from 'app/providers/StoreProviders';
import { StateSchemaKey } from 'app/providers/StoreProviders/config/StateSchema';
import { FC, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

export type ReducersList = {
    [key in StateSchemaKey]?: Reducer;
};

interface IDynamicModuleLoaderProps {
    name: StateSchemaKey;
    reducers: ReducersList;
    removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader: FC<IDynamicModuleLoaderProps> = (props) => {
    const store = useStore() as IReduxStoreWithManager;

    const dispatch = useDispatch();

    const {
        children, name, reducers, removeAfterUnmount,
    } = props;

    useEffect(() => {
        // ? объект превращаем в кортеж это массивы в массиве где в каждом подмассиве лежит ключ и значение.
        Object.entries(reducers).forEach(([name, reducer]) => {
            store.reducerManager.add(name as StateSchemaKey, reducer);
            dispatch({ type: `@INIT ${name} reducer` });
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

    return <div>{children}</div>;
};
