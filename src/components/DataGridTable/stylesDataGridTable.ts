import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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

export const BoxTableWrapperStyled = styled(Box)(({ theme }) => ({
  width: '100%',
  maxHeight: '631px',
  '& .super-app.negative': {
    backgroundColor: theme.palette.primary.main,
    color: '#1a3e72',
    fontWeight: '600',
  },
  '& .super-app.positive': {
    backgroundColor: '#d47483',
    color: '#1a3e72',
    fontWeight: '600',
  },
  '& .super-app.pending': {
    backgroundColor: '#b5c04e',
    color: '#1a3e72',
    fontWeight: '600',
  },
}));
