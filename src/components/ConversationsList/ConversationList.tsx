import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { ListStyled, ListItemButtonStyled, StyledBadge } from './stylesConversationList';
import useAppSelector from '../../store/hooks/useAppSelector';
import { dateCalc } from '../../helpers/dateCalc';
import { history } from '../../routes/historyHelper/history';

export const ConversationList: React.FC = () => {
  const { conversations } = useAppSelector((state) => state.messages);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string,
    canSendMessages: boolean,
  ) => {
    history.push(`/chat/${id}`, { can: canSendMessages });
  };

  return (
    <ListStyled>
      {conversations.length > 0
        && conversations.map(
          ({
            id, partner, lastMessage, unreadCount, canSendMessages,
          }) => (
            <Box key={id}>
              <ListItemButtonStyled
                alignItems="flex-start"
                onClick={(event) => handleListItemClick(event, partner.number, canSendMessages)}
              >
                <ListItemAvatar>
                  <Avatar alt="partner conversation">
                    {partner.number[0]}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={partner.number}
                  secondary={`${
                    lastMessage.content.length > 30
                      ? `${lastMessage.content.slice(0, 30)}...`
                      : lastMessage.content
                  } ${dateCalc(lastMessage.createdAt)}`}
                />
                <StyledBadge
                  badgeContent={unreadCount}
                  color="primary"
                  invisible={unreadCount === 0 && true}
                />
              </ListItemButtonStyled>
              <Divider variant="inset" component="li" />
            </Box>
          ),
        )}
    </ListStyled>
  );
};
