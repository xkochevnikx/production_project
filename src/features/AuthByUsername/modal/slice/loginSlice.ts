import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginByUserName } from '../services/loginByUserName/loginByUserName';
import { ILoginSchema } from '../types/loginSchema';

const initialState: ILoginSchema = {
    isLoading: false,
    username: '',
    password: '',
    error: '',
};

//! логика регистрации такая - thunk loginByUserName берёт от сюда значения инпутов и отправляет их на сервер дальше если ответ положительный те данные об авторизации пользователя добавляю в локал и диспатчю прямо из фанка в userSlice.
export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(loginByUserName.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(loginByUserName.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(loginByUserName.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
