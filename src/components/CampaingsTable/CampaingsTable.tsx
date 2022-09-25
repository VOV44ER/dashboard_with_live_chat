import React, { useEffect } from 'react';
import {
  GridColDef,
  GridValueFormatterParams,
} from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import moment from 'moment';
import { DataGridTable } from '../DataGridTable/DataGridTable';
import { CampaingsAddNew } from '../CampaingsAddNew/CampaingsAddNew';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import { getCampaigns } from '../../store/thunks/campaignsThunks';
import useAppSelector from '../../store/hooks/useAppSelector';
import { history } from '../../routes/historyHelper/history';
import { CAMPAINGS_SCREEN, SHOWCAMPAIGNS_SCREEN } from '../../routes/routes';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Campaign', flex: 1 },
  {
    field: 'type',
    headerName: 'Type',
    flex: 1,
    valueFormatter: (params: GridValueFormatterParams<string>) => {
      const valueFormatted = params.value.toUpperCase();
      return valueFormatted;
    },
  },
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
    field: 'status',
    headerName: 'Status',
    flex: 1,
  },
  {
    field: 'audience',
    headerName: 'Audience',
    flex: 1,
  },
  {
    field: 'submitted',
    headerName: 'Submitted',
    flex: 1,
  },
  {
    field: 'col6',
    headerName: 'Action',
    flex: 1,
    renderCell: ({ id }) => (
      <Stack direction="row" spacing={2}>
        <IconButton onClick={() => history.push(`${CAMPAINGS_SCREEN}/${SHOWCAMPAIGNS_SCREEN}`, { id })}>
          <VisibilityIcon />
        </IconButton>
      </Stack>
    ),
  },
];

export const CampaingsTable: React.FC = () => {
  const { campaigns } = useAppSelector((state) => state.campaings);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCampaigns());
  }, []);
  return (
    <DataGridTable
      title="campaigns"
      rows={campaigns}
      columns={columns}
      sortBy="name"
      button={CampaingsAddNew}
    />
  );
};
