import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GridRowId } from '@mui/x-data-grid';
import { Template } from '../../../models/types';
import { getTemplates } from '../../thunks/templatesThunks';

type TemplatesState = {
  templates: Template[];
};

const initialState = {
  templates: [],
} as TemplatesState;

const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    deleteTemplat(state, { payload }: PayloadAction<GridRowId>) {
      state.templates = state.templates.filter((item) => item.id !== payload);
    },
    updateTemplate(state, { payload }: PayloadAction<any>) {
      const template = state.templates.find((item) => item.id === payload.id);
      if (template) {
        template.status = payload.status;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getTemplates.fulfilled,
      (state, { payload }: PayloadAction<Template[]>) => {
        state.templates = payload;
      },
    );
  },
});

export const { deleteTemplat, updateTemplate } = templateSlice.actions;

export default templateSlice.reducer;
