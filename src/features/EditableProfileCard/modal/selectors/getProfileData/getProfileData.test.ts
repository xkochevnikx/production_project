import { IStateSchema } from 'app/providers/StoreProviders';
import { getProfileData } from './getProfileData';

describe('getProfileData.test', () => {
    test('data', () => {
        const data = {
            username: 'qwe',
            first: 'qwe',
            lastname: 'qwe',
            age: 123,
            city: 'qwer',
        };

        const state: DeepPartial<IStateSchema> = {
            profile: {
                data,
            },
        };
        expect(getProfileData(state as IStateSchema)).toEqual(data);
    });

    test('data undefined', () => {
        const state: DeepPartial<IStateSchema> = {};
        expect(getProfileData(state as IStateSchema)).toEqual(undefined);
    });
});
