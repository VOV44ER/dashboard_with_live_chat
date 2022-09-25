import { styled } from '@mui/system';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const BoxPopperStyled = styled(Paper)({
  border: 1,
  padding: '15px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const BoxGridStyled = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: '30px',
});

export const TitleStyled = styled(Typography)({
  textTransform: 'uppercase',
  marginBottom: '50px',
});
