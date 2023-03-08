import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/consts/localstorage';
import axios from 'axios';

export interface ILoginByUserNameProps {
    username: string;
    password: string;
}

export const loginByUserName = createAsyncThunk<
    IUser,
    ILoginByUserNameProps,
    { rejectValue: string }
>('login/loginByUserName', async (authData, thunkAPI) => {
    try {
        const response = await axios.post<IUser>('http://localhost:8000/login', authData);
        if (!response.data) {
            throw new Error();
        }

        localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
        thunkAPI.dispatch(userActions.setAuthData(response.data));
        return response.data;
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue('error');
    }
});
