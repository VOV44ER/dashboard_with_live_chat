import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Conversation, Message } from '../../../models/types';
import { getConversations, getMessages } from '../../thunks/chatThunks';

type MessagesState = {
  conversations: Conversation[];
  messages: Message[];
  partner: string;
};

const initialState = {
  conversations: [],
  messages: [],
  partner: '',
} as MessagesState;

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    updateConversations(state, { payload }: PayloadAction<Message>) {
      const conversation = state.conversations.find(
        (item) => item.partner.number === payload.partner,
      );
      if (conversation) {
        conversation.lastMessage = payload;
        conversation.unreadCount += 1;
        state.conversations.sort(
          (a, b) => Date.parse(b.lastMessage.createdAt)
            - Date.parse(a.lastMessage.createdAt),
        );
      }
    },
    addMessages(state, { payload }: PayloadAction<Message[]>) {
      state.messages = payload;
    },
    addMessage(state, { payload }: PayloadAction<Message>) {
      state.messages.push(payload);
    },
    addPartner(state, { payload }: PayloadAction<string>) {
      state.partner = payload;
    },
    updateMessage(state, { payload }: PayloadAction<Message>) {
      if (state.messages.length === 0) {
        return;
      }
      console.log(payload);
      if (payload.content && state.partner === payload.partner) {
        state.messages.push(payload);
      }
      if (payload.content) {
        state.conversations.find(
          (item) => item.partner.number === payload.partner,
        )?.lastMessages.unshift(payload);
      }

      const message = state.messages.find((item) => item.id === payload.id);
      if (message && message.deliveryStatus !== 'read') {
        message.deliveryStatus = payload.deliveryStatus;
      }
    },
    makeAsRead(state, { payload }: PayloadAction<string>) {
      const conversation = state.conversations.find((item) => item.partner.number === payload);

      if (conversation) {
        conversation.unreadCount = 0;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getConversations.fulfilled,
      (state, { payload }: PayloadAction<Conversation[]>) => {
        state.conversations = payload;
      },
    );
    builder.addCase(
      getMessages.fulfilled,
      (state, { payload }: PayloadAction<Message[]>) => {
        state.messages = [...payload, ...state.messages];
      },
    );
  },
});

export const {
  updateConversations,
  makeAsRead,
  addMessages,
  addMessage,
  updateMessage,
  addPartner,
} = chatSlice.actions;

export default chatSlice.reducer;
