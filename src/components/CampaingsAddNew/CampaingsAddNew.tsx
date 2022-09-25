import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { history } from '../../routes/historyHelper/history';
import {
  ButtonStyled, BoxModalStyled, BoxLinkStyled, ButtonLinkStyled,
} from './stylesCampaingsAddNew';
import { CAMPAINGS_SCREEN, NEWCAMPAINGS_SCREEN } from '../../routes/routes';

const ModalBox: React.FC<{ title: string, text: string, url: string }> = ({ title, text, url }) => (
  <BoxLinkStyled>
    <Typography id="modal-modal-title" variant="h6">
      {title}
    </Typography>
    <Typography id="modal-modal-title" variant="body2">
      {text}
    </Typography>
    <ButtonLinkStyled onClick={() => history.push(url)} variant="contained" endIcon={<ArrowForwardIcon />}>Next</ButtonLinkStyled>
  </BoxLinkStyled>
);

export const CampaingsAddNew: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <ButtonStyled onClick={handleOpen} variant="contained">
        + Add New
      </ButtonStyled>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <BoxModalStyled>
          <ModalBox
            title="API"
            text="Select a template and connect your exisiting systems with our API, And automated messages done"
            url={`${CAMPAINGS_SCREEN}/${NEWCAMPAINGS_SCREEN}`}
          />
          <ModalBox
            title="API"
            text="Select a template and connect your exisiting systems with our API, And automated messages done"
            url={`${CAMPAINGS_SCREEN}/${NEWCAMPAINGS_SCREEN}`}
          />
        </BoxModalStyled>
      </Modal>
    </div>
  );
};
