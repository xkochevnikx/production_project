import { ReducersMapObject } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { IStateSchema } from '../config/StateSchema';
import { createReduxStore } from '../config/Store';

interface StoreProviderProps {
    children?: ReactNode;
    initialState?: DeepPartial<IStateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<IStateSchema>>;
}

export function StoreProvider(props: StoreProviderProps) {
    const { children, initialState, asyncReducers } = props;

    const store = createReduxStore(
        initialState as IStateSchema,
        asyncReducers as ReducersMapObject<IStateSchema>
    );

    return <Provider store={store}>{children}</Provider>;
}
