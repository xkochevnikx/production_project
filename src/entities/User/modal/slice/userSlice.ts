import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from '@/shared/consts/localstorage';
import { IUser, IUserSchema } from '../types/user';

const initialState: IUserSchema = {
    _inited: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,

    reducers: {
        //! сюда прилетают данные об авторизации от фанка loginByUserName
        setAuthData: (state, action: PayloadAction<IUser>) => {
            state.authData = action.payload;
        },
        //! при обновлении страницы из локала берём данные и записываем сюда снова. и меняем флаг который говорит что мы авторизованы, он нужен что бы впоследствии в app его передать и создавать маршруты уже на этом основании, поскольку если рендерить app без этого условия асинкфанк пришлёт сведения об авторизации позже создания маршрутов.
        initAuthData: (state) => {
            const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
            if (user) {
                state.authData = JSON.parse(user);
            }
            state._inited = true;
        },
        //! при разлогинивании затираем записи везде.
        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        },
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
