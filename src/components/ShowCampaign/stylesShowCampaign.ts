import { styled } from '@mui/system';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export const FormControlStyled = styled(FormControl)({
  display: 'flex',
  gap: '10px',
});

export const TypographySubtitleStyled = styled(Typography)({
  color: 'gray',
  maxWidth: '400px',
  height: '40px',
});

export const NewCampaingsBoxStyled = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  padding: '3%',
  width: '100%',
});

export const NavButtonStyled = styled(Button)({
  maxWidth: '400px',
});

export const TextFieldStyled = styled(TextField)({
  background: '#DCDCDC',
});

export const BoxWrapperFormat = styled(Box)({
  display: 'flex',
  gap: '25px',
});

export const BoxWrapperSubmit = styled(Box)({
  marginBottom: '20px',
  marginTop: '20px',
  display: 'flex',
  gap: '20px',
  alignItems: 'center',
});
