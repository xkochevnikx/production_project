import { AsyncThunkAction, DeepPartial, Dispatch } from '@reduxjs/toolkit';
import { IStateSchema } from 'app/providers/StoreProviders';
import axios, { AxiosStatic } from 'axios';

type ActionCreatorType<Return, Arg, RejectedValue> = (
    arg: Arg
) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>;

jest.mock('axios');
const mockedAxios = jest.mocked(axios, true);

export function TestAsyncThunk<Return, Arg, RejectedValue>(
    actionCreator: ActionCreatorType<Return, Arg, RejectedValue>,
    state?: DeepPartial<IStateSchema>,
) {
    //! типизируем функции возвращаемые экшеном
    const dispatch: Dispatch = jest.fn();
    const getState: () => IStateSchema = jest.fn(() => state as IStateSchema);
    const api: jest.MockedFunctionDeep<AxiosStatic> = mockedAxios;

    //! возвращаем эту функцию которая принимает для вызова данные и вызывает асинк фанк возвращая экшн криэйтер в котором уже замоканные функции
    const callThunk = async (arg: Arg) => {
        const action = actionCreator(arg);
        const result = await action(dispatch, getState, { api });

        return result;
    };

    return {
        dispatch, getState, api, callThunk,
    };
}
