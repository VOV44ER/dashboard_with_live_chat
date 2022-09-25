import * as React from 'react';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation';
import { SidebarStyled, AvatarStyled } from './stylesSideBar';
import { localStorageService } from '../../utils/localStorageService';
import { SIGN_IN_SCREEN } from '../../routes/routes';

export const SideBar: React.FC = () => {
  const navigate = useNavigate();
  const onLogOut = () => {
    localStorageService.clearStorage();
    navigate(SIGN_IN_SCREEN, { replace: true });
  };
  return (
    <SidebarStyled>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={6}
      >
        <AvatarStyled>
          <AssignmentIcon />
        </AvatarStyled>
        <Navigation />
      </Stack>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Avatar>M</Avatar>
        <Button variant="text" color="secondary" onClick={onLogOut}>
          Log Out
        </Button>
      </Stack>
    </SidebarStyled>
  );
};
