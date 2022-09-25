import { configureStore, combineReducers } from '@reduxjs/toolkit';
import messagesReducer from './slices/chatSlice/chatSlice';
import templateReducer from './slices/templatesSlice/templatesSlice';
import notificationReducer from './slices/notificationSlice/notificationSlice';
import contactsReducer from './slices/contactsSlice/contactsSlice';
import campaingsReducer from './slices/campaignsSlice/campaignsSlice';

const rootReducer = combineReducers({
  messages: messagesReducer,
  templates: templateReducer,
  notifications: notificationReducer,
  contacts: contactsReducer,
  campaings: campaingsReducer,
});

export const setupStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof setupStore.getState>;
export type AppDispatch = typeof setupStore.dispatch;
