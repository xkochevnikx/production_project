import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProviders/config/StateSchema';
import { IUser, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/consts/localstorage';

export interface ILoginByUserNameProps {
    username: string;
    password: string;
}

export const loginByUserName = createAsyncThunk<
    IUser,
    ILoginByUserNameProps,
    IThunkConfig<string>
>('login/loginByUserName', async (authData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
    try {
        const response = await extra.api.post<IUser>('/login', authData);
        if (!response.data) {
            throw new Error();
        }
        //! данные об успешной авторизации добавлям в локал и диспатчик в стейт
        localStorage.setItem(
            USER_LOCALSTORAGE_KEY,
            JSON.stringify(response.data),
        );
        dispatch(userActions.setAuthData(response.data));
        return response.data;
    } catch (error) {
        return rejectWithValue('error');
    }
});
