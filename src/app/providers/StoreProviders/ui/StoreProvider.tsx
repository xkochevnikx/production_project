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

//! это компонет в который мы оборачиваем приложение давая доступ к стору в любой точке.  initialState нужен только для
export function StoreProvider(props: StoreProviderProps) {
    const { children, initialState, asyncReducers } = props;

    const store = createReduxStore(
        //! этот пропс для componentRender что бы можно было задавать свой стейт для тестирования
        initialState as IStateSchema,
        //! этот пропс для тестирования асинхронных компонентов
        asyncReducers as ReducersMapObject<IStateSchema>,
    );

    return <Provider store={store}>{children}</Provider>;
}
