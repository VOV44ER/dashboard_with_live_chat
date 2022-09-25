import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertColor } from '@mui/material/Alert';
import { createTemplate } from '../../thunks/templatesThunks';

type NotificationState = {
  text: string;
  type: AlertColor;
};

const initialState = {
  text: '',
  type: 'info',
} as NotificationState;

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(
      state,
      { payload }: PayloadAction<{ text: string; type: AlertColor }>,
    ) {
      state.text = payload.text;
      state.type = payload.type;
    },
    removeNotification(state) {
      state.text = '';
      state.type = 'info';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      createTemplate.fulfilled,
      (state) => {
        state.text = 'Template created successfully';
        state.type = 'success';
      },
    );
    builder.addCase(createTemplate.rejected, (state) => {
      state.text = 'Template creating error';
      state.type = 'error';
    });
  },
});

export const { addNotification, removeNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
