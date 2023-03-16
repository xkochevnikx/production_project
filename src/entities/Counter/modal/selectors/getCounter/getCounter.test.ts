import { IStateSchema } from 'app/providers/StoreProviders';
import { getCounter } from './getCounter';

describe('getCounter', () => {
    test('return counter value', () => {
        const state: DeepPartial<IStateSchema> = {
            counter: { value: 10 },
        };
        expect(getCounter(state as IStateSchema)).toEqual({ value: 10 });
    });
});
