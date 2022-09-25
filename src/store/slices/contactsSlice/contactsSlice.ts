import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GridRowId } from '@mui/x-data-grid';
import { Contact } from '../../../models/types';
import { createContact, getContacts } from '../../thunks/contactsThunks';

type ContactsState = {
  contacts: Contact[];
};

const initialState = {
  contacts: [],
} as ContactsState;

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    deleteContact(state, { payload }: PayloadAction<GridRowId>) {
      state.contacts = state.contacts.filter((item) => item.id !== payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getContacts.fulfilled,
      (state, { payload }: PayloadAction<Contact[]>) => {
        state.contacts = payload;
      },
    );
    builder.addCase(
      createContact.fulfilled,
      (state, { payload }: PayloadAction<Contact>) => {
        state.contacts.push(payload);
      },
    );
  },
});

export const { deleteContact } = contactsSlice.actions;

export default contactsSlice.reducer;
