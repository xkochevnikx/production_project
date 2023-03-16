import { IStateSchema } from 'app/providers/StoreProviders';
import { getLoginPassword } from './getLoginPassword';

describe('getLoginPassword.test', () => {
    test('password', () => {
        const state: DeepPartial<IStateSchema> = {
            loginForm: {
                password: '123',
            },
        };
        expect(getLoginPassword(state as IStateSchema)).toEqual('123');
    });

    test('password false', () => {
        const state: DeepPartial<IStateSchema> = {};
        expect(getLoginPassword(state as IStateSchema)).toEqual('');
    });
});
