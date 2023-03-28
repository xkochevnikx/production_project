import { IStateSchema } from 'app/providers/StoreProviders';
import { getProfileReadonly } from './getProfileReadonly';

describe('getProfileReadonly.test', () => {
    test('readonly', () => {
        const state: DeepPartial<IStateSchema> = {
            profile: {
                readonly: true,
            },
        };
        expect(getProfileReadonly(state as IStateSchema)).toEqual(true);
    });

    test('ReadonlygetProfileReadonly undefined', () => {
        const state: DeepPartial<IStateSchema> = {};
        expect(getProfileReadonly(state as IStateSchema)).toEqual(undefined);
    });
});
