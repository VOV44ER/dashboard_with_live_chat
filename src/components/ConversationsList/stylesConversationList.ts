import { styled } from '@mui/system';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Badge, { BadgeProps } from '@mui/material/Badge';

export const ListStyled = styled(List)({
  width: '100%',
  margin: '0',
  padding: '0',
  backgroundColor: 'background.paper',
});

export const ListItemButtonStyled = styled(ListItemButton)({
  maxHeight: '100px',
  overflow: 'hidden',
});

export const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 30,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));
