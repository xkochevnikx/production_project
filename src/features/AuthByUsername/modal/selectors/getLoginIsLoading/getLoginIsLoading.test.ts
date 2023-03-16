import { IStateSchema } from 'app/providers/StoreProviders';
import { getLoginIsLoading } from './getLoginIsLoading';

describe('getLoginIsLoading.test', () => {
    test('isLoading', () => {
        const state: DeepPartial<IStateSchema> = {
            loginForm: {
                isLoading: true,
            },
        };
        expect(getLoginIsLoading(state as IStateSchema)).toEqual(true);
    });
    test('isLoading false', () => {
        const state: DeepPartial<IStateSchema> = {};
        expect(getLoginIsLoading(state as IStateSchema)).toEqual(false);
    });
});
