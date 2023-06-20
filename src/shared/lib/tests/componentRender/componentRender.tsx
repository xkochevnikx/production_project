import { render } from '@testing-library/react';
import { IStateSchema, StoreProvider } from 'app/providers/StoreProviders';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import { ReducersMapObject } from '@reduxjs/toolkit';
import i18nForTests from '../../../config/i18n/i18nForTests';

export interface IComponentRender {
    route?: string;
    initialState?: DeepPartial<IStateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<IStateSchema>>;
}

//! универсальный хелпер для UI тестирования компонентов
export function componentRender(
    component: ReactNode,
    options: IComponentRender = {},
) {
    const { route = '/', initialState, asyncReducers } = options;

    return render(
        <MemoryRouter initialEntries={[route]}>
            <StoreProvider
                initialState={initialState}
                asyncReducers={asyncReducers}
            >
                <I18nextProvider i18n={i18nForTests}>
                    {component}
                </I18nextProvider>
            </StoreProvider>
        </MemoryRouter>,
    );
}
