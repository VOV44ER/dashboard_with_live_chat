import { styled } from '@mui/system';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

export const FormControlStyled = styled(FormControl)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

export const TypographySubtitleStyled = styled(Typography)(({ theme }) => ({
  color: 'gray',
  [theme.breakpoints.up('lg')]: {
    maxWidth: '400px',
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '300px',
  },
  height: '40px',
}));

export const NewTemplateBoxStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('lg')]: {
    padding: '3%',
  },
  [theme.breakpoints.down('lg')]: {
    padding: '1%',
  },
  width: '100%',
}));

export const NavButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    maxWidth: '400px',
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '300px',
  },
}));

export const MainGridWrapperStyled = styled(Grid)({
  padding: '40px',
});

export const TextFieldStyled = styled(TextField)(({ theme }) => ({
  background: '#DCDCDC',
  [theme.breakpoints.up('lg')]: {
    width: '400px',
  },
  [theme.breakpoints.down('lg')]: {
    width: '300px',
  },
}));

export const BoxWrapperFormat = styled(Box)({
  display: 'flex',
  gap: '25px',
});

export const BoxWrapperSubmit = styled(Box)({
  marginLeft: '200px',
  marginBottom: '20px',
  marginTop: '20px',
  display: 'flex',
  gap: '20px',
  alignItems: 'center',
});
