import { render } from '@testing-library/react';
import { IStateSchema, StoreProvider } from 'app/providers/StoreProviders';
import { ReactNode, Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import i18nForTests from '../../../config/i18n/i18nForTests';

export interface IComponentRender {
    route?: string;
    initialState?: DeepPartial<IStateSchema>;
}

export function componentRender(
    component: ReactNode,
    options: IComponentRender = {},
) {
    const { route = '/', initialState } = options;

    return render(
        <MemoryRouter initialEntries={[route]}>
            <StoreProvider initialState={initialState}>
                <I18nextProvider i18n={i18nForTests}>
                    {component}
                </I18nextProvider>
            </StoreProvider>
            {' '}
        </MemoryRouter>,
    );
}
