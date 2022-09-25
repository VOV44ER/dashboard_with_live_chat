import { createAsyncThunk } from '@reduxjs/toolkit';

import { chatApi } from '../../api/appApi';
import { Conversation, Message } from '../../models/types';

export const getConversations = createAsyncThunk('getConversations', async (_, thunkApi) => {
  try {
    const { data }: { data: Conversation[] } = await chatApi.getConversations();

    return data;
  } catch (e) {
    return thunkApi.rejectWithValue('getting conversations failed');
  }
});

export const getMessages = createAsyncThunk(
  'getMessages',
  async (body: { id: string, page: number }, thunkApi) => {
    try {
      const { data }: { data: Message[] } = await chatApi.getMessages(body);

      return data;
    } catch (e) {
      return thunkApi.rejectWithValue('getting messages failed');
    }
  },
);

export const sendMessage = createAsyncThunk(
  'sendMessage',
  async (body: { to: string, body: string }, thunkApi) => {
    try {
      const { data }: { data: { message: Message } } = await chatApi.sendMessage(body);

      return data;
    } catch (e) {
      return thunkApi.rejectWithValue('sending message failed');
    }
  },
);

export const markAsRead = createAsyncThunk(
  'markAsRead',
  async (id: string, thunkApi) => {
    try {
      const { data }: { data: 'string' } = await chatApi.markAsRead(id);

      return data;
    } catch (e) {
      return thunkApi.rejectWithValue('mark as read failed');
    }
  },
);
