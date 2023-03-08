import { DeepPartial } from '@reduxjs/toolkit';
import { IStateSchema } from 'app/providers/StoreProviders';
import { getLoginUsername } from './getLoginUsername';

describe('getLoginUsername.test', () => {
    test('username', () => {
        const state: DeepPartial<IStateSchema> = {
            loginForm: {
                username: 'qwe',
            },
        };
        expect(getLoginUsername(state as IStateSchema)).toEqual('qwe');
    });

    test('username default', () => {
        const state: DeepPartial<IStateSchema> = {};
        expect(getLoginUsername(state as IStateSchema)).toEqual('');
    });
});
