import { styled } from '@mui/system';
import Box from '@mui/material/Box';

export const BoxChatStyled = styled(Box)({
  display: 'flex',
});

export const BoxChatWrapperStyled = styled(Box)({
  height: '100vh',
  width: '100%',
  overflow: 'hidden',
});

export const BoxChatHeaderStyled = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '50px',
  backgroundColor: theme.palette.primary.main,
}));

export const BoxChatConversationStyled = styled(Box)({
  display: 'flex',
  width: '100%',
  height: 'calc(100% - 50px)',
});

export const BoxChatConversationListStyled = styled(Box)({
  width: '30%',
  height: '100%',
  overflowY: 'auto',
});
