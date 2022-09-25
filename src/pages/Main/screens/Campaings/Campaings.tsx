import React from 'react';
import Stack from '@mui/material/Stack';
import { Outlet } from 'react-router-dom';
import { SideBar } from '../../../../components/SideBar/SideBar';

export const Campaings: React.FC = () => (
  <Stack direction="row">
    <SideBar />
    <Outlet />
  </Stack>
);
