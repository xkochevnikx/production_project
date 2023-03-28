import { Country } from 'entities/Country';
import { Currency } from 'entities/Current';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { IProfileSchema, ValidateProfileError } from '../types/profile';
import { ProfileActions, ProfileReducer } from './ProfileSlice';

const data = {
    username: 'admin',
    age: 22,
    country: Country.Ukraine,
    lastname: 'ulbi tv',
    first: 'asd',
    city: 'asf',
    currency: Currency.USD,
};

describe('ProfileSlice.test', () => {
    test('readonly success', () => {
        const state: DeepPartial<IProfileSchema> = { readonly: false };
        expect(
            ProfileReducer(
                state as IProfileSchema,
                ProfileActions.setReadonly(true),
            ),
        ).toEqual({ readonly: true });
    });

    test('cancelEdit test', () => {
        const state: DeepPartial<IProfileSchema> = { data };
        expect(
            ProfileReducer(state as IProfileSchema, ProfileActions.cancelEdit()),
        ).toEqual({
            data,
            form: data,
            readonly: true,
            validateErrors: undefined,
        });
    });

    test('update test', () => {
        const state: DeepPartial<IProfileSchema> = {
            form: { username: '12345' },
        };
        expect(
            ProfileReducer(
                state as IProfileSchema,
                ProfileActions.updateProfile({
                    username: 'svyat',
                }),
            ),
        ).toEqual({ form: { username: 'svyat' } });
    });

    test('update profile panding', () => {
        const state: DeepPartial<IProfileSchema> = {
            isLoading: false,
            validateErrors: [ValidateProfileError.SERVER_ERROR],
        };
        expect(
            ProfileReducer(state as IProfileSchema, updateProfileData.pending),
        ).toEqual({ isLoading: true, validateErrors: undefined });
    });

    test('update profile fullfield', () => {
        const state: DeepPartial<IProfileSchema> = {
            isLoading: false,
        };
        expect(
            ProfileReducer(
                state as IProfileSchema,
                updateProfileData.fulfilled(data, ''),
            ),
        ).toEqual({
            isLoading: false,
            validateErrors: undefined,
            data,
            form: data,
            readonly: true,
        });
    });
});
