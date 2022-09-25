import { styled } from '@mui/system';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import FilledInput from '@mui/material/FilledInput';
import Image from '../../img/wallpaper.jpg';

export const FormControlStyled = styled(FormControl)({
  width: '100%',
});

export const BoxConversationStyled = styled(Box)({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export const BoxConversationWrapperStyled = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  backgroundImage: `url(${Image})`,
});

export const ListConversationStyled = styled(List)({
  flex: '1',
  overflow: 'auto',
});

export const BoxMessagesWrapperStyled = styled(Box)({
  width: '100%',
});

export const ListItemTextMessageStyled = styled(ListItemText, {
  shouldForwardProp: (prop) => prop !== 'sentBy',
})<{ sentBy?: string }>(({ sentBy, theme }) => ({
  display: 'flex',
  maxWidth: '250px',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '25px',
  padding: '1.5%',
  background: sentBy === 'owner' ? theme.palette.secondary.main : theme.palette.primary.light,
  wordBreak: 'break-word',
}));

export const ListItemTextTimeStyled = styled(ListItemText)({
  textAlign: 'end',
  maxWidth: '300px',
});

export const BoxMessageWrapperStyled = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'sentBy',
})<{ sentBy?: string }>(({ sentBy }) => ({
  display: 'flex',
  justifyContent: sentBy === 'owner' ? 'flex-end' : 'flex-start',
}));

export const BoxFormStyled = styled(Box)({
  padding: '0 20px',
  height: '150px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const FilledInputStyled = styled(FilledInput)(({ theme }) => ({
  height: '100px',
  background: theme.palette.secondary.main,
  borderRadius: '25px',
  '&:hover': {
    background: theme.palette.secondary.main,
  },
}));
