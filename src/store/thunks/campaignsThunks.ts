import { createAsyncThunk } from '@reduxjs/toolkit';
import { campaignsApi } from '../../api/appApi';
import { Campaign } from '../../models/types';

export const getCampaigns = createAsyncThunk('getCampaigns', async (_, thunkApi) => {
  try {
    const { data }: { data: Campaign[] } = await campaignsApi.getCampaigns();

    return data;
  } catch (e) {
    return thunkApi.rejectWithValue('getting campaings failed');
  }
});

export const createCampaign = createAsyncThunk(
  'createCampaign',
  async (body: { name: string; type: string; templateId: string }, thunkApi) => {
    try {
      const { data }: { data: Campaign } = await campaignsApi.createCampaign(body);

      return data;
    } catch (e) {
      return thunkApi.rejectWithValue('creating campaings failed');
    }
  },
);
