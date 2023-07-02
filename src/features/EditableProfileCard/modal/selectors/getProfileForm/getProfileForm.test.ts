import { IStateSchema } from '@/app/providers/StoreProviders';
import { getProfileForm } from './getProfileForm';

describe('getProfileForm.test', () => {
    test('Form', () => {
        const data = {
            username: 'qwe',
            first: 'qwe',
            lastname: 'qwe',
            age: 123,
            city: 'qwer',
        };

        const state: DeepPartial<IStateSchema> = {
            profile: {
                form: data,
            },
        };
        expect(getProfileForm(state as IStateSchema)).toEqual(data);
    });

    test('Form undefined', () => {
        const state: DeepPartial<IStateSchema> = {};
        expect(getProfileForm(state as IStateSchema)).toEqual(undefined);
    });
});
