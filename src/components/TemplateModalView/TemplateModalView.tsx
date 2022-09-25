import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { GridRowId } from '@mui/x-data-grid';
import useAppSelector from '../../store/hooks/useAppSelector';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface TemplateModalViewProps {
  id: GridRowId;
}

export const TemplateModalView: React.FC<TemplateModalViewProps> = ({ id }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [bodyText, setBodyText] = useState<string>('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { templates } = useAppSelector((state) => state.templates);
  const selected = templates.find((item) => item.id === id);

  useEffect(() => {
    if (selected) {
      let text = selected.bodyText;
      // eslint-disable-next-line no-restricted-syntax
      for (const item of selected.exampleParameters) {
        text = text.replace(/{{(\d)}}/, `<mark>{{${item}}}</mark>`);
      }
      setBodyText(text);
    }
  }, [selected]);

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <VisibilityIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text:
          </Typography>
          {bodyText && <p style={{ maxWidth: '300px', wordWrap: 'break-word' }} dangerouslySetInnerHTML={{ __html: bodyText }} />}
        </Box>
      </Modal>
    </div>
  );
};
