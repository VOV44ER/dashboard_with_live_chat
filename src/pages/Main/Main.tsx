import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import webSocket from '../../api/webSocket/websocket';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import {
  updateConversations,
  updateMessage,
} from '../../store/slices/chatSlice/chatSlice';
import { getConversations } from '../../store/thunks/chatThunks';
import useAppSelector from '../../store/hooks/useAppSelector';
import { addNotification, removeNotification } from '../../store/slices/notificationSlice/notificationSlice';
import { updateTemplate } from '../../store/slices/templatesSlice/templatesSlice';
import { getMe } from '../../store/thunks/authThunks';
import { SIGN_IN_SCREEN } from '../../routes/routes';

export const Main: React.FC = () => {
  const { text, type } = useAppSelector((state) => state.notifications);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(removeNotification());
  };

  useEffect(() => {
    webSocket((message) => {
      const newMessage = JSON.parse(message.body);

      if (newMessage?.message?.deliveryStatus) {
        dispatch(updateMessage(newMessage.message));
        if (newMessage.message.content) {
          dispatch(updateConversations(newMessage.message));
          dispatch(
            addNotification({
              text: 'You have recived a new message',
              type: 'info',
            }),
          );
        }
      }

      if (newMessage?.template?.status === 'APPROVED') {
        dispatch(
          addNotification({
            text: `Your template with name: ${newMessage.template.name} has been approved`,
            type: 'success',
          }),
        );
        dispatch(updateTemplate(newMessage.template));
      }
    }).activate();
  }, [dispatch]);

  useEffect(() => {
    dispatch(getConversations());
    const isLogin = async () => {
      const { payload } = await dispatch(getMe());
      payload === 401 && navigate(SIGN_IN_SCREEN);
    };
    isLogin();
  }, [dispatch, navigate]);

  return (
    <div>
      <Snackbar
        onClose={handleClose}
        open={!!text}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert onClose={handleClose} severity={type}>
          {text && text}
        </MuiAlert>
      </Snackbar>
      <Outlet />
    </div>
  );
};
