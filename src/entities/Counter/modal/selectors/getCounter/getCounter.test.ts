import { IStateSchema } from 'app/providers/StoreProviders';
import { DeepPartial } from '@reduxjs/toolkit';
import { getCounter } from './getCounter';

describe('getCounter', () => {
    test('return counter value', () => {
        const state: DeepPartial<IStateSchema> = {
            counter: { value: 10 },
        };
        expect(getCounter(state as IStateSchema)).toEqual({ value: 10 });
    });
});
