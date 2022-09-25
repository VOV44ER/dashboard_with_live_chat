import { createAsyncThunk } from '@reduxjs/toolkit';
import { GridRowId } from '@mui/x-data-grid';
import { templatesApi } from '../../api/appApi';
import { CreateNewTemplate, Template } from '../../models/types';

export const getTemplates = createAsyncThunk(
  'getTemplates',
  async (_, thunkApi) => {
    try {
      const { data }: { data: Template[] } = await templatesApi.getTemplates();

      return data;
    } catch (e) {
      return thunkApi.rejectWithValue('getting templates failed');
    }
  },
);

export const deleteTemplate = createAsyncThunk(
  'deleteTemplate',
  async (id: GridRowId, thunkApi) => {
    try {
      const { data }: { data: string } = await templatesApi.deleteTemplate(id);

      return data;
    } catch (e) {
      return thunkApi.rejectWithValue('deleting template failed');
    }
  },
);

export const createTemplate = createAsyncThunk(
  'createTemplate',
  async (body: CreateNewTemplate, thunkApi) => {
    try {
      const { data }: { data: { template: Template } } = await templatesApi.createTemplate(body);

      return data.template;
    } catch (e) {
      return thunkApi.rejectWithValue('creating template failed');
    }
  },
);
