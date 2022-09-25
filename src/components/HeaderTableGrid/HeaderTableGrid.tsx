import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import {
  BoxTableHeaderStyled,
  SearchIconWrapper,
  StyledInputBase,
  Search,
} from './stylesHeaderTableGrid';

interface HeaderTableGridProps {
  click?: any;
  CustomButton?: React.FC;
}

export const HeaderTableGrid: React.FC<HeaderTableGridProps> = ({
  click,
  CustomButton,
}) => (
  <BoxTableHeaderStyled>
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
    {CustomButton && <CustomButton />}
    {!CustomButton && (
      <Button sx={{ height: '40px' }} onClick={click} variant="contained">
        + Add New
      </Button>
    )}
  </BoxTableHeaderStyled>
);
