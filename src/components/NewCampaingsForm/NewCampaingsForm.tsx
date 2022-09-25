import React, { useEffect, useMemo } from 'react';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  CAMPAINGS_SCREEN, NEWTEMPLATE_SCREEN, SHOWCAMPAIGNS_SCREEN, TEMPLATES_SCREEN,
} from '../../routes/routes';
import {
  NewCampaingsBoxStyled,
  NavButtonStyled,
  TypographySubtitleStyled,
  TextFieldStyled,
  BoxWrapperSubmit,
  FormControlStyled,
} from './stylesNewCampaingsForm';
import useAppSelector from '../../store/hooks/useAppSelector';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import { getTemplates } from '../../store/thunks/templatesThunks';
import { createCampaign } from '../../store/thunks/campaignsThunks';
import { history } from '../../routes/historyHelper/history';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 220,
      width: 250,
    },
  },
};

const validationSchema = yup.object().shape({
  name: yup.string().trim().required('Required'),
  templateId: yup
    .string()
    .trim()
    .required('Please select a tamplate'),
});

export const NewCampaingsForm: React.FC = () => {
  const { templates } = useAppSelector((state) => state.templates);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      name: '',
      templateId: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const response = await dispatch(createCampaign({ type: 'api', ...values }));
      response && history.push(`${CAMPAINGS_SCREEN}/${SHOWCAMPAIGNS_SCREEN}`, { id: '1' });
    },
  });

  useEffect(() => {
    dispatch(getTemplates());
  }, []);

  const text = useMemo(() => {
    const template = templates.find(
      (item) => item.id === formik.values.templateId,
    );
    let content = template?.bodyText;
    if (template?.exampleParameters) {
      // eslint-disable-next-line no-restricted-syntax
      for (const item of template.exampleParameters) {
        content = content?.replace(/{{(\d)}}/, `<mark>{{${item}}}</mark>`);
      }
    }
    return content || '';
  }, [formik.values.templateId, templates]);

  return (
    <NewCampaingsBoxStyled>
      <NavButtonStyled
        onClick={() => navigate(CAMPAINGS_SCREEN)}
        variant="text"
        size="large"
        startIcon={<ArrowBackIcon />}
      >
        Campaigns Table
      </NavButtonStyled>
      <Paper elevation={3} sx={{ padding: '40px' }}>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2} sx={{ marginBottom: '100px' }}>
            <Typography variant="h5">API Campaign</Typography>
            <TypographySubtitleStyled variant="subtitle2">
              Connect your existing systems with our endpoints & send
              <br />
              notifications to your users on WhatsApp
            </TypographySubtitleStyled>
          </Stack>
          <Grid container spacing={30} sx={{ marginBottom: '60px' }}>
            <Grid container item xs={6} spacing={5}>
              <Grid
                item
                container
                direction="column"
                xs={12}
                sx={{ gap: '10px' }}
              >
                <Typography variant="h5">Campaign Name</Typography>
                <TypographySubtitleStyled variant="subtitle2">
                  Pick something that describes your audience & goals
                </TypographySubtitleStyled>
                <TextFieldStyled
                  variant="outlined"
                  placeholder="Enter campaign name"
                  required
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid
                item
                container
                direction="column"
                xs={12}
                sx={{ gap: '10px' }}
              >
                <FormControlStyled>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    direction="row"
                  >
                    <Typography variant="h5">Template</Typography>
                    <Button
                      variant="contained"
                      type="submit"
                      onClick={() => history.push(`${TEMPLATES_SCREEN}/${NEWTEMPLATE_SCREEN}`, { from: 'Create Campaign' })}
                    >
                      Create New
                    </Button>
                  </Grid>
                  <TypographySubtitleStyled variant="subtitle2">
                    Select one from your WhatsApp approved template messages
                  </TypographySubtitleStyled>
                  <Select
                    displayEmpty
                    MenuProps={MenuProps}
                    renderValue={(value) => {
                      if (value === '') {
                        return (
                          <Typography sx={{ color: 'gray' }}>
                            Select template
                          </Typography>
                        );
                      }
                      return templates.find((item) => item.id === value)?.name;
                    }}
                    value={formik.values.templateId}
                    sx={{ background: '#DCDCDC' }}
                    id="templateId"
                    name="templateId"
                    onChange={formik.handleChange}
                    error={
                      formik.touched.templateId
                      && Boolean(formik.errors.templateId)
                    }
                  >
                    {templates
                      && templates.map(({ id, name: nam }) => (
                        <MenuItem key={id} value={id}>
                          {nam}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControlStyled>
              </Grid>
            </Grid>
            {formik.values.templateId && (
              <Grid container item xs={6}>
                <Paper
                  elevation={2}
                  sx={{ bgcolor: 'primary.light', width: '300px' }}
                >
                  <TypographySubtitleStyled
                    variant="body1"
                    sx={{ color: 'primary.main', wordWrap: 'break-word' }}
                    dangerouslySetInnerHTML={{ __html: text }}
                  />
                </Paper>
              </Grid>
            )}
          </Grid>
          <BoxWrapperSubmit>
            <Button variant="contained" type="submit">
              Set Live
            </Button>
            <Typography variant="subtitle2" sx={{ color: 'gray' }}>
              Set your campaign live.
            </Typography>
          </BoxWrapperSubmit>
        </form>
      </Paper>
    </NewCampaingsBoxStyled>
  );
};
