import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProviders';
import { IProfile } from 'entities/Profile/modal/types/profile';

export const fetchProfileData = createAsyncThunk<
    IProfile,
    void,
    IThunkConfig<string>
>('profile/profileByUserName', async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
        const response = await extra.api.get<IProfile>('/profile');

        return response.data;
    } catch (error) {
        return rejectWithValue('error');
    }
});
