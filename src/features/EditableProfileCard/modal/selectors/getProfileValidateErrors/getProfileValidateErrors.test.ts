import { IStateSchema } from 'app/providers/StoreProviders';
import { getProfileValidateErrors } from './getProfileValidateErrors';
import { ValidateProfileError } from '../../consts/consts';

describe('getProfileValidateErrors.test', () => {
    test('validateErrors', () => {
        const state: DeepPartial<IStateSchema> = {
            profile: {
                validateErrors: [ValidateProfileError.SERVER_ERROR],
            },
        };
        expect(getProfileValidateErrors(state as IStateSchema)).toEqual([
            ValidateProfileError.SERVER_ERROR,
        ]);
    });

    test('validateErrors undefined', () => {
        const state: DeepPartial<IStateSchema> = {};
        expect(getProfileValidateErrors(state as IStateSchema)).toEqual(
            undefined,
        );
    });
});
