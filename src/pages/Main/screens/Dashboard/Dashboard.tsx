import * as React from 'react';
import Box from '@mui/material/Box';
import { SideBar } from '../../../../components/SideBar/SideBar';

export const Dashboard: React.FC = () => (
  <Box sx={{ display: 'flex' }}>
    <SideBar />
    <Box sx={{
      width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center',
    }}
    >
      <h1>Dashboard</h1>
    </Box>
  </Box>
);
