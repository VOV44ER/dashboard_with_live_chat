import React, { useEffect, useMemo } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useLocation } from 'react-router-dom';
import {
  NewCampaingsBoxStyled,
  NavButtonStyled,
  TypographySubtitleStyled,
  TextFieldStyled,
} from './stylesShowCampaign';
import { history } from '../../routes/historyHelper/history';
import useAppSelector from '../../store/hooks/useAppSelector';
import { Campaign } from '../../models/types';
import { CAMPAINGS_SCREEN } from '../../routes/routes';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import { getCampaigns } from '../../store/thunks/campaignsThunks';

type LocationState = {
  id: string;
};

export const ShowCampaign: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { campaigns } = useAppSelector((state) => state.campaings);
  const { id } = location.state as LocationState;

  const campaign: Campaign | undefined = useMemo(() => {
    if (id !== '1') {
      const camp = campaigns.find((item) => item.id === id);
      return camp;
    }
    const camp = campaigns[campaigns.length - 1];
    return camp;
  }, [campaigns, id]);

  useEffect(() => {
    dispatch(getCampaigns());
  }, []);

  return (
    <NewCampaingsBoxStyled>
      <NavButtonStyled
        onClick={() => history.push(CAMPAINGS_SCREEN)}
        variant="text"
        size="large"
        startIcon={<ArrowBackIcon />}
      >
        Campaigns Table
      </NavButtonStyled>
      {campaign && (
      <Paper elevation={3} sx={{ padding: '40px' }}>
        <Stack spacing={2} sx={{ marginBottom: '25px' }}>
          <Typography variant="h5">API Campaign</Typography>
          <TypographySubtitleStyled variant="subtitle2">
            Connect your existing systems with our endpoints & send
            <br />
            notifications to your users on WhatsApp
          </TypographySubtitleStyled>
        </Stack>
        <Grid container spacing={3} sx={{ marginBottom: '15px' }} direction="column">
          <Grid container item xs={6} spacing={5}>
            <Grid
              item
              container
              direction="column"
              xs={12}
              sx={{ gap: '10px' }}
            >
              <Typography variant="h5">API endpoint</Typography>
              <TypographySubtitleStyled variant="subtitle2">
                Use this endpoint to sent data
              </TypographySubtitleStyled>
              <TextFieldStyled
                variant="outlined"
                required
                id="name"
                name="name"
                value={process.env.REACT_APP_API_VAR}
                autoComplete="off"
                inputProps={
                { readOnly: true }
              }
              />
            </Grid>
          </Grid>
          <Grid container item xs={6} spacing={5}>
            <Grid
              item
              container
              direction="column"
              xs={6}
              sx={{ gap: '10px' }}
            >
              <Typography variant="h5">Campaign ID</Typography>
              <TextFieldStyled
                variant="outlined"
                required
                id="id"
                name="id"
                value={campaign.id}
                autoComplete="off"
                inputProps={
                { readOnly: true }
              }
              />
            </Grid>
            <Grid
              item
              container
              direction="column"
              xs={6}
              sx={{ gap: '10px' }}
            >
              <Typography variant="h5">Campaign Name</Typography>
              <TextFieldStyled
                variant="outlined"
                required
                id="name"
                name="name"
                value={campaign.name}
                autoComplete="off"
                inputProps={
                { readOnly: true }
              }
              />
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid
              item
              container
              justifyContent="center"
              alignItems="center"
              direction="column"
              xs={12}
              sx={{ gap: '10px' }}
            >
              <Typography variant="h5">Message</Typography>
              <TypographySubtitleStyled variant="subtitle2">
                Your message content
              </TypographySubtitleStyled>
              <TextFieldStyled
                variant="outlined"
                required
                id="message"
                name="message"
                multiline
                value={campaign.templateText}
                rows={8}
                sx={{ minWidth: '400px' }}
                autoComplete="off"
                inputProps={
                { readOnly: true }
              }
              />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      )}
    </NewCampaingsBoxStyled>
  );
};
