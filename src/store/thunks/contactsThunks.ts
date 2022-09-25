import { createAsyncThunk } from '@reduxjs/toolkit';
import { GridRowId } from '@mui/x-data-grid';
import { contactsApi } from '../../api/appApi';
import { Contact, CreateNewContact } from '../../models/types';

export const getContacts = createAsyncThunk('getContacts', async (_, thunkApi) => {
  try {
    const { data }: { data: Contact[] } = await contactsApi.getContacts();

    return data;
  } catch (e) {
    return thunkApi.rejectWithValue('getting contacts failed');
  }
});

export const deleteContact = createAsyncThunk(
  'deleteContact',
  async (id: GridRowId, thunkApi) => {
    try {
      const { data }: { data: string } = await contactsApi.deleteContact(id);

      return data;
    } catch (e) {
      return thunkApi.rejectWithValue('deleting contact failed');
    }
  },
);

export const createContact = createAsyncThunk(
  'createContact',
  async (body: CreateNewContact, thunkApi) => {
    try {
      const { data }: { data: { contact: Contact } } = await contactsApi.createContact(body);

      return data.contact;
    } catch (e) {
      return thunkApi.rejectWithValue('creating contact failed');
    }
  },
);
