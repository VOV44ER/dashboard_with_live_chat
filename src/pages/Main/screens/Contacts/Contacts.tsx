import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import {
  GridColDef,
  GridValueFormatterParams,
  GridRenderCellParams,
  GridRowId,
} from '@mui/x-data-grid';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Popper from '@mui/material/Popper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import moment from 'moment';
import { SideBar } from '../../../../components/SideBar/SideBar';
import { BoxPopperStyled, BoxGridStyled, TitleStyled } from './stylesContacts';
import useAppDispatch from '../../../../store/hooks/useAppDispatch';
import { deleteContact, getContacts } from '../../../../store/thunks/contactsThunks';
import useAppSelector from '../../../../store/hooks/useAppSelector';
import { deleteContact as deleteContac } from '../../../../store/slices/contactsSlice/contactsSlice';
import { ContactAddNew } from '../../../../components/ContactAddNew/ContactAddNew';
import { DataGridTable } from '../../../../components/DataGridTable/DataGridTable';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ marginTop: '20px' }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index: number) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

const mockRow = [
  {
    name: 'Clienti Tagliere',
    description: 'All contact',
    createdAt: 'May 25, 2020',
    contacts: '15 of 23',
    id: '1',
  },
  {
    name: 'Clienti Tagliere',
    description: 'All contact',
    createdAt: 'May 25, 2020',
    contacts: '15 of 23',
    id: '2',
  },
  {
    name: 'Clienti Tagliere',
    description: 'All contact',
    createdAt: 'May 25, 2020',
    contacts: '15 of 23',
    id: '3',
  },
  {
    name: 'Clienti Tagliere',
    description: 'All contact',
    createdAt: 'May 25, 2020',
    contacts: '15 of 23',
    id: '4',
  },
  {
    name: 'Clienti Tagliere',
    description: 'All contact',
    createdAt: 'May 25, 2020',
    contacts: '15 of 23',
    id: '5',
  },
  {
    name: 'Clienti Tagliere',
    description: 'All contact',
    createdAt: 'May 25, 2020',
    contacts: '15 of 23',
    id: '6',
  },
  {
    name: 'Clienti Tagliere',
    description: 'All contact',
    createdAt: 'May 25, 2020',
    contacts: '15 of 23',
    id: '7',
  },
  {
    name: 'Clienti Tagliere',
    description: 'All contact',
    createdAt: 'May 25, 2020',
    contacts: '15 of 23',
    id: '8',
  },
];

export const Contacts: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteId, setDeleteId] = useState<GridRowId>('');
  const [value, setValue] = React.useState<number>(0);
  const { contacts } = useAppSelector((state) => state.contacts);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const columnsAll: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'phoneNumber', headerName: 'Phone', flex: 1 },
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1,
      valueFormatter: (params: GridValueFormatterParams<string>) => {
        if (params.value == null) {
          return '';
        }

        const valueFormatted = moment(params.value).utc().format('LL');
        return valueFormatted;
      },
    },
    {
      field: 'whatsappVerified',
      headerName: 'WhatsApp Verifed',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (params.value === true ? (
        <CheckIcon sx={{ color: 'primary.main' }} />
      ) : (
        <CloseIcon sx={{ color: 'red' }} />
      )),
    },
    {
      field: 'tags',
      headerName: 'Tags',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => params.row.tags.map((item: string) => <Chip key={item} label={item} size="small" />),
    },
    {
      field: 'col5',
      headerName: 'Action',
      flex: 1,
      renderCell: ({ id }) => {
        const onDelete = async () => {
          setAnchorEl(null);
          const response = await dispatch(deleteContact(deleteId));
          response && dispatch(deleteContac(deleteId));
        };

        const handleClick = (
          event: React.MouseEvent<HTMLElement>,
          ids: GridRowId,
        ) => {
          setAnchorEl(anchorEl ? null : event.currentTarget);
          setDeleteId(ids);
        };

        const open = Boolean(anchorEl);
        const ids = open ? 'simple-popper' : undefined;
        return (
          <Stack direction="row" spacing={2}>
            <IconButton onClick={(e) => handleClick(e, id)}>
              <DeleteIcon />
            </IconButton>
            <Popper placement="top" id={ids} open={open} anchorEl={anchorEl}>
              <BoxPopperStyled elevation={2}>
                Do you really want to delete?
                <Box>
                  <Button variant="text" onClick={onDelete}>
                    Yes
                  </Button>
                  <Button
                    variant="text"
                    onClick={() => {
                      setAnchorEl(null);
                      setDeleteId('');
                    }}
                  >
                    No
                  </Button>
                </Box>
              </BoxPopperStyled>
            </Popper>
          </Stack>
        );
      },
    },
  ];

  const columnsLists: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1,
    },
    {
      field: 'contacts',
      headerName: 'Contacts',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Stack>
          <Button sx={{ height: '15px' }} variant="text" size="small">
            {params.value}
          </Button>
          Subscribed
        </Stack>
      ),
    },
    {
      field: 'col4',
      headerName: 'Action',
      flex: 1,
      renderCell: () => (
        <Stack direction="row" spacing={2}>
          <IconButton>
            <DeleteIcon />
          </IconButton>
          <IconButton>
            <VisibilityIcon />
          </IconButton>
          <IconButton>
            <EditIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <Stack direction="row">
      <SideBar />
      <Stack sx={{ width: '100%' }} direction="column">
        <BoxGridStyled>
          <TitleStyled variant="h4">Contacts</TitleStyled>
          <Box sx={{ borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="All" {...a11yProps(0)} />
              <Tab label="Lists" {...a11yProps(1)} />
              <Tab label="Fields" {...a11yProps(2)} />
              <Tab label="Tags" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <DataGridTable
              rows={contacts}
              columns={columnsAll}
              sortBy="name"
              button={ContactAddNew}
              withTabs
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <DataGridTable
              rows={mockRow}
              columns={columnsLists}
              sortBy="name"
              button={ContactAddNew}
              withTabs
              checkboxSelection
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <DataGridTable
              rows={contacts}
              columns={columnsAll}
              sortBy="name"
              button={ContactAddNew}
              withTabs
            />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <DataGridTable
              rows={mockRow}
              columns={columnsLists}
              sortBy="name"
              button={ContactAddNew}
              withTabs
              checkboxSelection
            />
          </TabPanel>
        </BoxGridStyled>
      </Stack>
    </Stack>
  );
};
