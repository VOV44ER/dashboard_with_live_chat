import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ForumIcon from '@mui/icons-material/Forum';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import ContactsIcon from '@mui/icons-material/Contacts';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import { useRouteMatch } from '../../helpers/useRouteMatch';
import {
  CAMPAINGS_SCREEN,
  CHAT_SCREEN, CONTACTS_SCREEN, DASHBOARD_SCREEN, Routes, TEMPLATES_SCREEN,
} from '../../routes/routes';
import useAppSelector from '../../store/hooks/useAppSelector';
import names from '../../names.json';

interface StyledTabProps {
  label: string;
  to: Routes;
  icon: any;
  value: Routes;
  invisible?: boolean;
}

const StyledTab = (props: StyledTabProps) => (
  <Tab
    component={Link}
    sx={{
      fontSize: '12px',
      width: '100px',
      color: 'secondary.main',
    }}
    {...props}
  />
);

const ChatTab = (props: StyledTabProps) => {
  const { invisible, ...rest } = props;
  return (
    <Badge
      color="secondary"
      overlap="circular"
      badgeContent=" "
      variant="dot"
      invisible={invisible}
    >
      <Tab
        component={Link}
        sx={{
          fontSize: '12px',
          width: '100px',
          color: 'secondary.main',
        }}
        {...rest}
      />
    </Badge>
  );
};

export const Navigation: React.FC = () => {
  const currentTab = useRouteMatch(Object.values(Routes));
  const { conversations } = useAppSelector((state) => state.messages);
  return (
    <Tabs
      value={currentTab}
      aria-label="nav tabs"
      orientation="vertical"
      textColor="secondary"
      indicatorColor="secondary"
      sx={{
        '.MuiTabs-indicator': {
          left: 0,
        },
      }}
    >
      <StyledTab
        label={names.NAVIGATION_DASHBOARD}
        value={DASHBOARD_SCREEN}
        to={DASHBOARD_SCREEN}
        icon={<DashboardIcon />}
      />
      <ChatTab
        label={names.NAVIGATION_LIVE_CHAT}
        value={CHAT_SCREEN}
        to={CHAT_SCREEN}
        icon={<ForumIcon />}
        invisible={conversations.every((item) => item.unreadCount === 0)}
      />
      <StyledTab
        label={names.NAVIGATION_TEMPLATES}
        value={TEMPLATES_SCREEN}
        to={TEMPLATES_SCREEN}
        icon={<ArticleIcon />}
      />
      <StyledTab
        label="Contacts"
        value={CONTACTS_SCREEN}
        to={CONTACTS_SCREEN}
        icon={<ContactsIcon />}
      />
      <StyledTab
        label="Campaigns"
        value={CAMPAINGS_SCREEN}
        to={CAMPAINGS_SCREEN}
        icon={<AirplanemodeActiveIcon />}
      />
    </Tabs>
  );
};
