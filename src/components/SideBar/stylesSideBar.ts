import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

export const SidebarStyled = styled(Box)(({ theme }) => ({
  width: '100px',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: theme.palette.primary.main,
  padding: '20px 0',
}));

export const AvatarStyled = styled(Avatar)(({ theme }) => ({
  bgcolor: theme.palette.primary.main,
}));
