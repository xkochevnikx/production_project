import { IStateSchema } from 'app/providers/StoreProviders';
import { getCounterValue } from './getCounterValue';

describe('getCounterValue', () => {
    test('return counter value', () => {
        const state: DeepPartial<IStateSchema> = {
            counter: { value: 10 },
        };
        expect(getCounterValue(state as IStateSchema)).toEqual(10);
    });
});
