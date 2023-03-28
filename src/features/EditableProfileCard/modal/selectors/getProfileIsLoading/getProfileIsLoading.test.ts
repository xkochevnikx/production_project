import { IStateSchema } from 'app/providers/StoreProviders';
import { getProfileIsLoading } from './getProfileIsLoading';

describe('getProfileIsLoading.test', () => {
    test('isLoading', () => {
        const state: DeepPartial<IStateSchema> = {
            profile: {
                isLoading: true,
            },
        };
        expect(getProfileIsLoading(state as IStateSchema)).toEqual(true);
    });

    test('data undefined', () => {
        const state: DeepPartial<IStateSchema> = {};
        expect(getProfileIsLoading(state as IStateSchema)).toEqual(undefined);
    });
});
