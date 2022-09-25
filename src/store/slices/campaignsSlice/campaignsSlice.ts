import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Campaign } from '../../../models/types';
import { getCampaigns } from '../../thunks/campaignsThunks';

type CampaignsState = {
  campaigns: Campaign[];
};

const initialState = {
  campaigns: [],
} as CampaignsState;

const campaignsSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getCampaigns.fulfilled,
      (state, { payload }: PayloadAction<Campaign[]>) => {
        state.campaigns = payload;
      },
    );
  },
});

// export const {} = campaignsSlice.actions;

export default campaignsSlice.reducer;
