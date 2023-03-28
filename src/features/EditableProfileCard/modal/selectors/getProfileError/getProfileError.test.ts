import { IStateSchema } from 'app/providers/StoreProviders';
import { getProfileError } from './getProfileError';

describe('getProfileError.test', () => {
    test('data', () => {
        const state: DeepPartial<IStateSchema> = {
            profile: {
                error: 'error',
            },
        };
        expect(getProfileError(state as IStateSchema)).toEqual('error');
    });

    test('data undefined', () => {
        const state: DeepPartial<IStateSchema> = {};
        expect(getProfileError(state as IStateSchema)).toEqual('');
    });
});
