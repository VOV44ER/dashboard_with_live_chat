import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi } from '../../api/appApi';
import { User } from '../../models/types';
import { localStorageService } from '../../utils/localStorageService';

export const signIn = createAsyncThunk('signIn', async (body: { username: string, password: string }, thunkApi) => {
  try {
    const { data }: { data: { authenticationToken: string } } = await loginApi.signIn(
      body,
    );
    localStorageService.setToken(data.authenticationToken);

    return data;
  } catch (e) {
    return thunkApi.rejectWithValue('sign in failed');
  }
});

export const getMe = createAsyncThunk(
  'getMe',
  async (_, thunkApi) => {
    try {
      const { data }: { data: User } = await loginApi.getMe();
      localStorageService.setUser(data.phoneNumber);

      return data;
    } catch (e: any) {
      if (e.response.status === 401) {
        localStorageService.clearStorage();
      }
      return thunkApi.rejectWithValue(e.response.status);
    }
  },
);
