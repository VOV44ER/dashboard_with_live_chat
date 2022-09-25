import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export const ButtonStyled = styled(Button)({
  height: '40px',
});

export const BoxModalStyled = styled(Box)(({ theme }) => ({
  position: 'absolute',
  display: 'flex',
  gap: '50px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: theme.palette.background.paper,
  borderRadius: '20px',
  boxShadow: '24',
  padding: '20px',
  width: '800px',
}));

export const BoxLinkStyled = styled(Box)(({ theme }) => ({
  border: '2px solid',
  borderColor: theme.palette.primary.light,
  borderRadius: '20px',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
}));

export const ButtonLinkStyled = styled(Button)(({ theme }) => ({
  color: theme.palette.secondary.main,
  marginTop: '20px',
  alignSelf: 'flex-end',
}));
