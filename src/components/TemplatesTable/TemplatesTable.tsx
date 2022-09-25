import React, { useEffect, useState } from 'react';
import {
  GridColDef,
  GridCellParams,
  GridValueFormatterParams,
  GridRowId,
} from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import clsx from 'clsx';
import moment from 'moment';
import Popper from '@mui/material/Popper';
import Box from '@mui/material/Box';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import { deleteTemplate, getTemplates } from '../../store/thunks/templatesThunks';
import useAppSelector from '../../store/hooks/useAppSelector';
import {
  BoxPopperStyled,
} from './stylesTemplatesTable';
import { NEWTEMPLATE_SCREEN, TEMPLATES_SCREEN } from '../../routes/routes';
import { deleteTemplat } from '../../store/slices/templatesSlice/templatesSlice';
import { TemplateModalView } from '../TemplateModalView/TemplateModalView';
import { DataGridTable } from '../DataGridTable/DataGridTable';
import { history } from '../../routes/historyHelper/history';
import { addNotification } from '../../store/slices/notificationSlice/notificationSlice';

export const TemplatesTable: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteId, setDeleteId] = useState<GridRowId>('');
  const { templates } = useAppSelector((state) => state.templates);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTemplates());
  }, [dispatch]);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      cellClassName: (params: GridCellParams<string>) => {
        if (params.value == null) {
          return '';
        }

        return clsx('super-app', {
          negative: params.value.toLowerCase() === 'approved',
          positive: params.value.toLowerCase() === 'rejected',
          pending: params.value.toLowerCase() === 'pending',
        });
      },
    },
    { field: 'type', headerName: 'Media Type', flex: 1 },
    { field: 'category', headerName: 'Category', flex: 1 },
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
      field: 'col5',
      headerName: 'Action',
      width: 240,
      renderCell: ({ id }) => {
        const onDelete = async () => {
          setAnchorEl(null);
          const response : any = await dispatch(deleteTemplate(deleteId));
          if (response && !response?.error?.message) {
            dispatch(deleteTemplat(deleteId));
          } else {
            dispatch(
              addNotification({
                text: 'You can\'t delete template, which attached to a company',
                type: 'error',
              }),
            );
          }
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
            <IconButton>
              <FavoriteIcon />
            </IconButton>
            <TemplateModalView id={id} />
            <IconButton onClick={() => navigate(`/templates/new/${id}`)}>
              <ContentCopyIcon />
            </IconButton>
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

  const CustomButton: React.FC = () => (
    <Button
      sx={{ height: '40px' }}
      onClick={() => history.push(`${TEMPLATES_SCREEN}/${NEWTEMPLATE_SCREEN}`, { from: 'Template Table' })}
      variant="contained"
    >
      + Add New
    </Button>
  );

  return (
    <DataGridTable
      title="template managment"
      rows={templates}
      columns={columns}
      sortBy="createdAt"
      button={CustomButton}
    />
  );
};
