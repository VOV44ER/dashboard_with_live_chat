import React, {
  useRef, useEffect, useState,
} from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import SendIcon from '@mui/icons-material/Send';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ScheduleIcon from '@mui/icons-material/Schedule';
import Avatar from '@mui/material/Avatar';
import moment from 'moment';
import { useParams, useLocation } from 'react-router-dom';
import {
  FormControlStyled,
  BoxConversationStyled,
  BoxConversationWrapperStyled,
  ListConversationStyled,
  BoxMessagesWrapperStyled,
  BoxMessageWrapperStyled,
  ListItemTextMessageStyled,
  ListItemTextTimeStyled,
  BoxFormStyled,
  FilledInputStyled,
} from './stylesConversation';
import useAppSelector from '../../store/hooks/useAppSelector';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import {
  getConversations,
  getMessages, markAsRead, sendMessage,
} from '../../store/thunks/chatThunks';
import {
  addMessage, addMessages, addPartner, makeAsRead,
} from '../../store/slices/chatSlice/chatSlice';

type LocationState = {
  can: boolean;
};

export const Conversation: React.FC = () => {
  const messagesEndRef = useRef<null | HTMLElement>(null);
  const messagesStartRef = useRef<null | HTMLUListElement>(null);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { partner } = useParams();
  const [currPage, setCurrPage] = useState(0);
  const [message, setMessage] = useState<string>('');
<<<<<<< HEAD
  const { trigger } = useAppSelector((state) => state.messages);

  const canSend = location.state as LocationState;

=======
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { conversations, messages, partner: partn } = useAppSelector((state) => state.messages);
  let canSend = location.state as LocationState;

  const oneDay = 1000 * 60 * 60 * 24;
  const currentDate = +new Date();
  const dateOfLastMessage = +new Date(messages[messages.length - 1]?.createdAt);
  const differenceBetweenDays = Math.trunc((currentDate - dateOfLastMessage) / oneDay);

  if (differenceBetweenDays === 0) {
    canSend = { can: true };
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
  };

  const onScroll = async () => {
    if (messagesStartRef.current) {
      const { scrollTop } = messagesStartRef.current;
      if (scrollTop <= 300) {
        setIsLoading(true);
      }
    }
  };

>>>>>>> 86602d1dd898aaef0b196987188aa2d854b598ec
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const onClickSendMessage = async () => {
    if (partner && message.length > 0) {
      const response = await dispatch(
        sendMessage({ to: partner, body: message }),
      ).unwrap();
      response && dispatch(addMessage(response.message));
      response && dispatch(getConversations());
      response && setMessage('');
      response && scrollToBottom();
    }
  };

  useEffect(() => {
    if (partner) {
      const conversation = conversations.find(
        (item) => item.partner.number === partner,
      );
      const mess = conversation?.lastMessages;

      if ((mess && partn !== partner) || (mess && messages.length === 0)) {
        setCurrPage(0);
        dispatch(addMessages(([...mess].reverse())));
      }
      dispatch(markAsRead(partner));
      dispatch(makeAsRead(partner));
      dispatch(addPartner(partner));
    }
  }, [partner, conversations]);

  useEffect(() => {
    if (messages.length <= 30) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    const loadMore = async (part: string) => {
      const response = await dispatch(
        getMessages({ id: part, page: currPage + 1 }),
      ).unwrap();
      response && setCurrPage((prev) => prev + 1);
      response && setIsLoading((prev) => !prev);
    };
    if (partner && isLoading) {
      loadMore(partner);
    }
  }, [isLoading, partner]);

  return (
    <BoxConversationStyled>
      {messages && messages.length > 0 && (
        <BoxConversationWrapperStyled>
          <ListConversationStyled ref={messagesStartRef} onScroll={onScroll}>
            {messages?.map(
              ({
                content, sentBy, createdAt, deliveryStatus,
              }) => (
                <ListItem key={createdAt}>
                  <BoxMessagesWrapperStyled>
                    <BoxMessageWrapperStyled sentBy={sentBy}>
                      {sentBy === 'partner' && (
                      <ListItemAvatar>
                        <Avatar alt="partner conversation">
                          {partner && partner[0]}
                        </Avatar>
                      </ListItemAvatar>
                      )}
                      <ListItemTextMessageStyled
                        sentBy={sentBy}
                        primary={content}
                      />
                    </BoxMessageWrapperStyled>
                    <BoxMessageWrapperStyled sentBy={sentBy}>
                      <ListItemTextTimeStyled
                        secondary={moment(createdAt).utc().format('LT')}
                      />
                      {sentBy === 'owner' && deliveryStatus === 'delivered' && (
                      <DoneIcon />
                      )}
                      {sentBy === 'owner' && deliveryStatus === 'sent' && (
                      <DoneIcon />
                      )}
                      {sentBy === 'owner' && deliveryStatus === 'pending' && (
                      <ScheduleIcon />
                      )}
                      {sentBy === 'owner' && deliveryStatus === 'read' && (
                      <DoneAllIcon sx={{ color: 'blue' }} />
                      )}
                    </BoxMessageWrapperStyled>
                  </BoxMessagesWrapperStyled>
                </ListItem>
              ),
            )}
            <Box ref={messagesEndRef} />
          </ListConversationStyled>
          {canSend?.can ? (
            <BoxFormStyled>
              <FormControlStyled variant="filled">
                <FilledInputStyled
                  id="outlined-input"
                  fullWidth
                  disableUnderline
                  autoComplete="off"
                  value={message}
                  onChange={handleChange}
                  onKeyDown={(e) => e.key === 'Enter' && onClickSendMessage()}
                  endAdornment={(
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="send button"
                        onClick={onClickSendMessage}
                        edge="end"
                      >
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  )}
                />
              </FormControlStyled>
              <Box />
            </BoxFormStyled>
          ) : (
            <h1 style={{ textAlign: 'center' }}>
              You cannot reply to this conversation
            </h1>
          )}
        </BoxConversationWrapperStyled>
      )}
    </BoxConversationStyled>
  );
};
