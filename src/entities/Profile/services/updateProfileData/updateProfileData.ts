import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProviders';
import { IProfile } from 'entities/Profile/modal/types/profile';

export const updateProfileData = createAsyncThunk<
    IProfile,
    void,
    IThunkConfig<string>
>('profile/updateProfileData', async (_, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    const formData = getState().profile?.form;
    try {
        const response = await extra.api.put<IProfile>('/profile', formData);

        return response.data;
    } catch (error) {
        return rejectWithValue('error');
    }
});
