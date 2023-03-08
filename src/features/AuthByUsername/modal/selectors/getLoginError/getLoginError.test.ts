import { DeepPartial } from '@reduxjs/toolkit';
import { IStateSchema } from 'app/providers/StoreProviders';
import { getLoginError } from './getLoginError';

describe('getLoginError.test', () => {
    test('return error', () => {
        const state: DeepPartial<IStateSchema> = {
            loginForm: {
                error: 'error',
            },
        };
        expect(getLoginError(state as IStateSchema)).toEqual('error');
    });

    test('return undefined', () => {
        const state: DeepPartial<IStateSchema> = {};
        expect(getLoginError(state as IStateSchema)).toEqual(undefined);
    });
});
