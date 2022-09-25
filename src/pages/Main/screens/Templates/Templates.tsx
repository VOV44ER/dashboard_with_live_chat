import React from 'react';
import { Outlet } from 'react-router-dom';
import { SideBar } from '../../../../components/SideBar/SideBar';
import { BoxTemplateStyled } from './stylesTemplate';

export const Templates: React.FC = () => (
  <BoxTemplateStyled>
    <SideBar />
    <Outlet />
  </BoxTemplateStyled>
);
