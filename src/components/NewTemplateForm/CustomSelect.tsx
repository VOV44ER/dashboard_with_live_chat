import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { FormControlStyled, TypographySubtitleStyled } from './stylesNewTemplateForm';

interface SelectProps {
  label: string,
  text: string,
  placeholder: string,
  data: { id: string, value: string, name: string }[],
  val: string,
  change: any,
  name: string,
  error: any,
}

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 220,
      width: 250,
    },
  },
};

export const CustomSelect: React.FC<SelectProps> = ({
  label,
  data,
  text,
  placeholder,
  val,
  change,
  name,
  error,
}) => (
  <FormControlStyled>
    <Typography variant="h5">{label}</Typography>
    <TypographySubtitleStyled variant="subtitle2">
      {text}
    </TypographySubtitleStyled>
    <Select
      displayEmpty
      MenuProps={MenuProps}
      renderValue={(value) => {
        if (value === '') {
          return <Typography sx={{ color: 'gray' }}>{placeholder}</Typography>;
        }
        return data.find((item) => item.value === value)?.name;
      }}
      value={val}
      sx={{ width: { lg: '400px', md: '300px' }, background: '#DCDCDC' }}
      id={name}
      name={name}
      onChange={change}
      error={error}
    >
      {data.map(({ id, value, name: nam }) => (
        <MenuItem key={id} value={value}>
          {nam}
        </MenuItem>
      ))}
    </Select>
  </FormControlStyled>
);
