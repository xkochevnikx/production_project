import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { IProfile, IProfileSchema } from '../types/profile';

const initialState: IProfileSchema = {
    readonly: true,
    isLoading: false,
    data: undefined,
    form: undefined,
    error: undefined,
    validateErrors: undefined,
};

export const ProfileSlice = createSlice({
    name: 'Profile',
    initialState,
    reducers: {
        setReadonly: (state, action: PayloadAction<boolean>) => {
            state.readonly = action.payload;
        },
        //! отменяем редактирование
        cancelEdit: (state) => {
            state.readonly = true;
            state.validateErrors = undefined;
            state.form = state.data;
        },
        updateProfile: (state, action: PayloadAction<IProfile>) => {
            state.form = {
                ...state.form,
                ...action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileData.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(
                //! при первой подгрузке данные распихиваем по двум полям. дубликат дата нужен для отмены редактирования и возвращение к старым данным.. в поле форм данные, поля в которых меняются при изменении в любом инпуте и выводятся на странице
                fetchProfileData.fulfilled,
                (state, action: PayloadAction<IProfile>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                    state.form = action.payload;
                },
            )
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(updateProfileData.pending, (state) => {
                state.isLoading = true;
                state.validateErrors = undefined;
            })
            .addCase(
                //! при нажатии сохранить фанк берёт данные из поля форм и отправляет на сервер запрос на изменение данных. потом резултат так же как и при первом рендеринге распихивает в обе формы
                updateProfileData.fulfilled,
                (state, action: PayloadAction<IProfile>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                    state.form = action.payload;
                    state.readonly = true;
                    state.validateErrors = undefined;
                },
            )
            .addCase(updateProfileData.rejected, (state, action) => {
                state.isLoading = false;
                //! в случае ошибки фанк возвращет массив определённых полей и этот массив записываем в поле слайса и далее в компоненте через селектор его вытаскиваем и отрисовываем
                state.validateErrors = action.payload;
            });
    },
});

export const { actions: ProfileActions } = ProfileSlice;
export const { reducer: ProfileReducer } = ProfileSlice;
