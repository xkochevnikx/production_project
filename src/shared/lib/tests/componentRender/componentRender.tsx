import { DeepPartial } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { IStateSchema, StoreProvider } from 'app/providers/StoreProviders';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import i18n from '../../../config/i18n/i18nForTests';

export interface IcomponentRender {
    route?: string;
    initialState?: DeepPartial<IStateSchema>;
}

export function componentRender(component: ReactNode, options: IcomponentRender = {}) {
    const { route = '/', initialState } = options;
    return render(
        <StoreProvider initialState={initialState}>
            <MemoryRouter initialEntries={[route]}>
                <I18nextProvider i18n={i18n}>{component}</I18nextProvider>
            </MemoryRouter>
        </StoreProvider>
    );
}
