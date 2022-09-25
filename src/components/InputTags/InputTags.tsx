import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Cancel';

const Tags = ({
  data,
  handleDelete,
}: {
  data: string;
  handleDelete: (value: string) => void;
}) => (
  <Box
    sx={{
      background: 'primary.main',
      height: '100%',
      display: 'flex',
      padding: '0.4rem',
      margin: '0 0.5rem 0 0',
      justifyContent: 'center',
      alignContent: 'center',
      color: 'primary.main',
    }}
  >
    <Stack direction="row" gap={1}>
      <Typography>{data}</Typography>
      <CancelIcon
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          handleDelete(data);
        }}
      />
    </Stack>
  </Box>
);

export const InputTags: React.FC<{ tags: string[], setTags: any }> = ({
  tags,
  setTags,
}) => {
  const tagRef = useRef<HTMLInputElement>();

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    if (tagRef.current && tagRef.current.value.length > 0) {
      setTags([...tags, tagRef.current.value]);
      tagRef.current.value = '';
    }
  };

  const handleDelete = (value: string) => {
    const newtags = tags.filter((val) => val !== value);
    setTags(newtags);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <TextField
        inputRef={tagRef}
        onKeyDown={(e) => e.key === ' ' && handleOnSubmit(e)}
        fullWidth
        variant="standard"
        size="small"
        sx={{ margin: '1rem 0' }}
        margin="none"
        placeholder={tags.length < 3 ? 'Enter tags' : ''}
        InputProps={{
          startAdornment: (
            <Box sx={{ margin: '0 0.2rem 0 0', display: 'flex' }}>
              {tags.map((data) => (
                <Tags handleDelete={handleDelete} data={data} key={data} />
              ))}
            </Box>
          ),
        }}
      />
    </form>
  );
};
