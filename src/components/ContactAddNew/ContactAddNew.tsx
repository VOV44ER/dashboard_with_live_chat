import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { MuiTelInput, isValidPhoneNumber } from 'mui-tel-input';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as yup from 'yup';
import { InputTags } from '../InputTags/InputTags';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import { createContact } from '../../store/thunks/contactsThunks';

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
});

export const ContactAddNew: React.FC = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState<boolean>(false);
  const [number, setNumber] = useState<string>('');
  const [tags, SetTags] = useState<string[]>([]);
  const [isValid, setIsValid] = React.useState(false);
  const dispatch = useAppDispatch();

  const handleChange = (newValue: string) => {
    setIsValid(isValidPhoneNumber(newValue));
    setNumber(newValue);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!isValid) {
        return;
      }
      const preparedObject = {
        name: values.name,
        phoneNumber: number,
        tags,
      };

      const response = await dispatch(createContact(preparedObject));
      response && setOpen(false);
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
    setNumber('');
    SetTags([]);
    formik.resetForm({
      values: { name: '' },
    });
  };

  return (
    <div>
      <Button
        sx={{ height: '40px' }}
        onClick={handleClickOpen}
        variant="contained"
      >
        + Add New
      </Button>
      <Dialog
        disableEscapeKeyDown
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>
          Fill the form
        </DialogTitle>
        <DialogContent sx={{ minWidth: !fullScreen ? '450px' : '' }}>
          <Box
            component="form"
            id="expenseForm"
            onSubmit={formik.handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <TextField
              sx={{ m: 1, minWidth: 120 }}
              id="name"
              label="name"
              variant="outlined"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <MuiTelInput
              sx={{ m: 1, minWidth: 120 }}
              id="phone"
              label="phone"
              preferredCountries={['IT', 'GB']}
              forceCallingCode
              value={number}
              onChange={handleChange}
            />
            {!isValid && number && (
              <Typography
                sx={{ marginLeft: '15px', color: '#B00' }}
                variant="caption"
              >
                Number is not valid
              </Typography>
            )}
          </Box>
          <InputTags tags={tags} setTags={SetTags} />
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="expenseForm">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
